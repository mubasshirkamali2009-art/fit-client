'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KnowItem {
    slug: string;
    type: 'tool' | 'exercise' | 'muscle';
    title: string;
    image: string;
    shortDescription: string;
    meta: {
        price: string;
        category: string;
        rating: number;
        date: string;
        location: string;
    };
}

export default function KnowPage() {
    const router = useRouter();
    const [tools, setTools] = useState<KnowItem[]>([]);
    const [exercises, setExercises] = useState<KnowItem[]>([]);
    const [muscles, setMuscles] = useState<KnowItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [toolsRes, exercisesRes, musclesRes] = await Promise.all([
                    fetch('/api/know?type=tool&limit=16'),
                    fetch('/api/know?type=exercise&limit=16'),
                    fetch('/api/know?type=muscle&limit=16')
                ]);

                const toolsData = await toolsRes.json();
                const exercisesData = await exercisesRes.json();
                const musclesData = await musclesRes.json();

                setTools(toolsData.items || []);
                setExercises(exercisesData.items || []);
                setMuscles(musclesData.items || []);
            } catch (error) {
                console.error("Error loading Know data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleDetailsNavigation = (slug: string) => {
        router.push(`/know/${slug}`);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Page Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-emerald-400">
                        Fitness Knowledge Base
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        Explore training tools, exercises, and muscle anatomy definitions.
                    </p>
                </div>

                {/* Section 1: Tools */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-800 pb-3 mb-6">
                        Equipment & Tools
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => <SkeletonCard key={`tool-skel-${i}`} />)
                        ) : (
                            tools.map((item) => (
                                <Card key={item.slug} item={item} onNavigate={handleDetailsNavigation} />
                            ))
                        )}
                    </div>
                </section>

                {/* Section 2: Exercises */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-800 pb-3 mb-6">
                        Exercises & Movements
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => <SkeletonCard key={`ex-skel-${i}`} />)
                        ) : (
                            exercises.map((item) => (
                                <Card key={item.slug} item={item} onNavigate={handleDetailsNavigation} />
                            ))
                        )}
                    </div>
                </section>

                {/* Section 3: Muscle Groups */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-800 pb-3 mb-6">
                        Human Muscle Anatomy
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => <SkeletonCard key={`muscle-skel-${i}`} />)
                        ) : (
                            muscles.map((item) => (
                                <Card key={item.slug} item={item} onNavigate={handleDetailsNavigation} />
                            ))
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
}

interface CardProps {
    item: KnowItem;
    onNavigate: (slug: string) => void;
}

function Card({ item, onNavigate }: CardProps) {
    return (
        <div
            onClick={() => onNavigate(item.slug)}
            className="group flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition duration-300 cursor-pointer"
        >
            <div className="relative aspect-video w-full bg-slate-800 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 bg-emerald-500 text-slate-950 font-semibold text-xs px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {item.type}
                </span>
            </div>

            <div className="flex flex-col flex-grow p-5 justify-between">
                <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-1">
                        {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2 min-h-[40px]">
                        {item.shortDescription}
                    </p>
                    <div className="pt-2 text-xs text-slate-400 border-t border-slate-800 space-y-1">
                        <div className="flex justify-between">
                            <span>Category:</span>
                            <span className="font-semibold text-slate-200">{item.meta.category}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Rating:</span>
                            <span className="font-semibold text-emerald-400">★ {item.meta.rating}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(item.slug);
                    }}
                    className="mt-5 w-full bg-slate-800 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 font-medium py-2 px-4 rounded-lg transition duration-200 text-sm"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-video w-full bg-slate-800" />
            <div className="p-5 flex flex-col justify-between space-y-4 flex-grow">
                <div className="space-y-3">
                    <div className="h-4 bg-slate-800 rounded w-2/3" />
                    <div className="h-3 bg-slate-800 rounded w-full" />
                </div>
                <div className="h-9 bg-slate-800 rounded-lg w-full" />
            </div>
        </div>
    );
}