// app/know/[id]/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type KnowType = 'tool' | 'exercise' | 'muscle';

interface KnowMeta {
    price?: string;
    date?: string;
    rating?: number;
    location?: string;
    difficulty?: string;
    targetMuscle?: string;
    duration?: string;
    muscleGroup?: string;
    category?: string;
    [key: string]: any;
}

interface KnowItem {
    slug: string;
    type: KnowType;
    title: string;
    image: string;
    shortDescription: string;
    description?: string;
    meta: KnowMeta;
}

interface KnowDetailResponse {
    item: KnowItem;
    related: KnowItem[];
    message?: string;
    error?: string;
}

const TYPE_LABEL: Record<KnowType, string> = {
    tool: 'Tool',
    exercise: 'Exercise',
    muscle: 'Muscle',
};

export default function KnowDetailPage() {
    // Folder is app/know/[id]/page.tsx, so the param key is "id"
    const params = useParams<{ id: string }>();
    const slug = params?.id;

    const [item, setItem] = useState<KnowItem | null>(null);
    const [related, setRelated] = useState<KnowItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItem = useCallback(async (slug: string) => {
        setLoading(true);
        setError(null);
        try {
            // Now hitting the single /api/know route with a slug query param
            const res = await fetch(`/api/know?slug=${encodeURIComponent(slug)}`, {
                cache: 'no-store',
            });
            const data: KnowDetailResponse = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || data?.message || `Request failed with status ${res.status}`);
            }

            setItem(data.item);
            setRelated(data.related ?? []);
        } catch (err: any) {
            console.error('Failed to load know item:', err);
            setError(err?.message || 'Could not load this item. Please try again.');
            setItem(null);
            setRelated([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (slug) fetchItem(slug);
    }, [slug, fetchItem]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <DetailSkeleton />
                </div>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <Link href="/know" className="text-sm text-indigo-600 hover:underline">
                        &larr; Back to Know Base
                    </Link>
                    <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mt-6">
                        {error || 'Item not found.'}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Link href="/know" className="text-sm text-indigo-600 hover:underline">
                    &larr; Back to Know Base
                </Link>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="inline-block w-fit text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-3 py-1 mb-3">
                            {TYPE_LABEL[item.type]}
                        </span>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {item.title}
                        </h1>

                        <p className="text-gray-500 mt-2">{item.shortDescription}</p>

                        <MetaGrid meta={item.meta} />

                        {item.description && (
                            <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
                                {item.description}
                            </div>
                        )}
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="mt-14">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Related {TYPE_LABEL[item.type]}s
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related.map((r) => (
                                <KnowCard key={r.slug} item={r} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function MetaGrid({ meta }: { meta: KnowMeta }) {
    const entries = Object.entries(meta || {}).filter(
        ([, v]) => v !== undefined && v !== null && v !== ''
    );

    if (entries.length === 0) return null;

    return (
        <div className="grid grid-cols-2 gap-3 mt-6">
            {entries.map(([key, value]) => (
                <div
                    key={key}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2"
                >
                    <div className="text-xs text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                        {key === 'rating' ? `⭐ ${value}` : String(value)}
                    </div>
                </div>
            ))}
        </div>
    );
}

function KnowCard({ item }: { item: KnowItem }) {
    const secondaryMeta =
        item.meta?.price ??
        item.meta?.difficulty ??
        item.meta?.muscleGroup ??
        item.meta?.category ??
        item.meta?.location ??
        '';

    return (
        <Link
            href={`/know/${item.slug}`}
            className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
        >
            <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="flex flex-col flex-1 p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1 flex-1">
                    {item.shortDescription}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 mt-3">
                    {item.meta?.rating != null && <span>⭐ {item.meta.rating}</span>}
                    {secondaryMeta && <span className="truncate max-w-[60%]">{secondaryMeta}</span>}
                </div>
            </div>
        </Link>
    );
}

function DetailSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-72 sm:h-96 bg-gray-200 rounded-2xl" />
                <div className="space-y-3">
                    <div className="h-4 w-20 bg-gray-200 rounded-full" />
                    <div className="h-8 w-3/4 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
}