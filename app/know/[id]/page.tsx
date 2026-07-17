'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Spec {
    label: string;
    value: string;
}

interface KnowItem {
    slug: string;
    type: string;
    title: string;
    image: string;
    shortDescription: string;
    description: string;
    meta: {
        price: string;
        category: string;
        rating: number;
        date: string;
        location: string;
    };
    specifications?: Spec[];
}

export default function KnowDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [item, setItem] = useState<KnowItem | null>(null);
    const [related, setRelated] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        async function fetchDetailData() {
            try {
                setLoading(true);
                const res = await fetch(`/api/know/${id}`);

                if (!res.ok) {
                    throw new Error('Item details could not be found');
                }

                const data = await res.json();
                setItem(data.item);
                setRelated(data.related || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDetailData();
    }, [id]);

    if (loading) return <DetailPageSkeleton />;

    if (error || !item) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100">
                <p className="text-xl text-red-400 font-semibold mb-4">{error || 'Item not found'}</p>
                <button
                    onClick={() => router.push('/know')}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 hover:bg-slate-800 transition"
                >
                    Go Back to Directory
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-12">

                <button
                    onClick={() => router.push('/know')}
                    className="text-sm text-emerald-400 hover:underline flex items-center gap-2 transition"
                >
                    ← Back to Knowledge Base
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="relative aspect-video md:aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                                {item.type}
                            </span>
                            <h1 className="text-3xl font-extrabold mt-3 tracking-tight sm:text-4xl text-slate-100">
                                {item.title}
                            </h1>
                        </div>

                        <p className="text-lg text-slate-300 leading-relaxed">
                            {item.shortDescription}
                        </p>

                        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl text-sm">
                            <div>
                                <span className="block text-slate-500 text-xs">Access</span>
                                <span className="font-semibold text-slate-200">{item.meta?.price || 'Free'}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-xs">Category</span>
                                <span className="font-semibold text-slate-200">{item.meta?.category || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-xs">Rating</span>
                                <span className="font-semibold text-emerald-400">★ {item.meta?.rating || '5.0'}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-xs">Target Location</span>
                                <span className="font-semibold text-slate-200">{item.meta?.location || 'Full Body'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-900" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold text-slate-200">Description Overview</h2>
                        <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                            {item.description || 'No long description provided.'}
                        </p>
                    </div>

                    <div className="space-y-4 bg-slate-900/50 border border-slate-800 p-6 rounded-xl h-fit">
                        <h2 className="text-lg font-bold text-slate-200">Specifications</h2>
                        <div className="divide-y divide-slate-850">
                            {item.specifications && item.specifications.length > 0 ? (
                                item.specifications.map((spec, idx) => (
                                    <div key={idx} className="py-2.5 flex justify-between text-sm gap-2">
                                        <span className="text-slate-400">{spec.label}</span>
                                        <span className="font-medium text-slate-200 text-right">{spec.value}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-slate-500 py-2">No specs listed.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailPageSkeleton() {
    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4 animate-pulse">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="h-4 bg-slate-900 rounded w-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-video bg-slate-900 rounded-2xl" />
                    <div className="space-y-6">
                        <div className="h-8 bg-slate-900 rounded w-3/4" />
                        <div className="h-4 bg-slate-900 rounded w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}