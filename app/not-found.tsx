'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center overflow-hidden relative">
            {/* Background accent blobs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-brand-purple/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-brand-green/5 rounded-full blur-3xl" />

            {/* Animated Dumbbell */}
            <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
                <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full animate-dumbbell-swing"
                >
                    {/* Left weight plates */}
                    <rect x="10" y="70" width="16" height="60" rx="6" fill="#1a1a1a" />
                    <rect x="30" y="80" width="14" height="40" rx="5" fill="#1a1a1a" />

                    {/* Bar */}
                    <rect x="44" y="94" width="112" height="12" rx="6" fill="#7c3aed" className="animate-dumbbell-shimmer" />

                    {/* Right weight plates */}
                    <rect x="156" y="80" width="14" height="40" rx="5" fill="#1a1a1a" />
                    <rect x="174" y="70" width="16" height="60" rx="6" fill="#1a1a1a" />
                </svg>

                {/* Bounce shadow */}
                <div className="absolute -bottom-2 w-24 h-3 bg-black/10 rounded-full blur-sm animate-dumbbell-shadow" />
            </div>

            {/* 404 Text */}
            <h1 className="font-display font-black text-7xl sm:text-8xl text-brand-black tracking-tight">
                4<span className="text-brand-purple">0</span>4
            </h1>
            <h2 className="font-display font-black text-xl sm:text-2xl text-brand-black mt-2">
                This page skipped leg day
            </h2>
            <p className="text-sm font-semibold text-gray-400 mt-3 max-w-sm leading-relaxed">
                We looked everywhere but couldn't find what you're after. Let's get you back on track.
            </p>

            <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-purple hover:bg-brand-purple/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-95 shadow-lg shadow-brand-purple/20 cursor-pointer"
            >
                <Home className="h-4 w-4" />
                Back to Home
            </Link>

            <style jsx>{`
                @keyframes dumbbell-swing {
                    0%, 100% {
                        transform: rotate(-8deg) translateY(0px);
                    }
                    50% {
                        transform: rotate(8deg) translateY(-10px);
                    }
                }
                .animate-dumbbell-swing {
                    animation: dumbbell-swing 2.2s ease-in-out infinite;
                    transform-origin: center;
                }

                @keyframes dumbbell-shadow {
                    0%, 100% {
                        transform: scaleX(1);
                        opacity: 0.15;
                    }
                    50% {
                        transform: scaleX(0.7);
                        opacity: 0.08;
                    }
                }
                .animate-dumbbell-shadow {
                    animation: dumbbell-shadow 2.2s ease-in-out infinite;
                }

                @keyframes dumbbell-shimmer {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
                .animate-dumbbell-shimmer {
                    animation: dumbbell-shimmer 2.2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}