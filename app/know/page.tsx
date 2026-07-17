'use client';

import { useEffect, useState, useCallback } from 'react';
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
    meta: KnowMeta;
}

interface KnowResponse {
    items: KnowItem[];
    total: number;
    page: number;
    totalPages: number;
    message?: string;
    error?: string;
}

const TABS: { key: KnowType; label: string }[] = [
    { key: 'tool', label: 'Tools' },
    { key: 'exercise', label: 'Exercises' },
    { key: 'muscle', label: 'Muscles' },
];

export default function KnowPage() {
    const [activeType, setActiveType] = useState<KnowType>('tool');
    const [items, setItems] = useState<KnowItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async (type: KnowType) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/know?type=${type}&page=1&limit=16`, {
                cache: 'no-store',
            });

            const data: KnowResponse = await res.json();

            if (!res.ok) {
                // Surface the REAL server error instead of a generic message
                throw new Error(data?.error || data?.message || `Request failed with status ${res.status}`);
            }

            setItems(data.items ?? []);
        } catch (err: any) {
            console.error('Failed to load know items:', err);
            setError(err?.message || 'Could not load this section. Please try again.');
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems(activeType);
    }, [activeType, fetchItems]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Know Base
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Explore tools, exercises, and muscles used across your training.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveType(tab.key)}
                            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${activeType === tab.key
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
                        : items.map((item) => <KnowCard key={item.slug} item={item} />)}
                </div>

                {!loading && !error && items.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        No items found in this section yet.
                    </div>
                )}
            </div>
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

                <button className="mt-3 w-full rounded-lg bg-indigo-600 text-white text-sm py-2 group-hover:bg-indigo-700 transition">
                    View Details
                </button>
            </div>
        </Link>
    );
}

function CardSkeleton() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white h-full overflow-hidden animate-pulse">
            <div className="h-44 bg-gray-200" />
            <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                <div className="h-8 bg-gray-200 rounded mt-3" />
            </div>
        </div>
    );
}