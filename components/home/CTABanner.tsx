'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const CTABanner = () => {
    const { userSession } = useApp();

    return (
        <>
            {/* Call to Action (CTA) Banner */}
            <div className="rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] lg:rounded-[2.5rem] bg-brand-black text-white p-5 sm:p-7 md:p-10 lg:p-12 mb-8 sm:mb-10 md:mb-14 lg:mb-16 text-center relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] bg-brand-green/20 rounded-full blur-[80px] md:blur-[100px] -mr-16 -mt-16 md:-mr-20 md:-mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] bg-brand-purple/20 rounded-full blur-[80px] md:blur-[100px] -ml-16 -mb-16 md:-ml-20 md:-mb-20 pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider bg-brand-green text-white">
                        <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" /> Start Transformation Today
                    </span>
                    <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                        Ready to Take Control of Your Nutrition?
                    </h2>
                    <p className="text-gray-400 font-semibold text-[10px] sm:text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
                        Join thousands of users organizing their daily intake, creating custom AI meal plans, and hitting their body composition targets.
                    </p>

                    <div className="pt-1.5 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
                        <Link
                            href={userSession?.user ? "/generate-diet" : "/register"}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green text-white font-extrabold px-5 py-3 sm:px-6 sm:py-3.5 rounded-lg sm:rounded-xl md:rounded-2xl hover:bg-brand-green/90 transition-all shadow-md active:scale-95 text-[11px] sm:text-xs md:text-sm"
                        >
                            {userSession?.user ? "Generate Meal Plan Now" : "Create Free Account"}{" "}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Trust Elements */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-[2rem] p-4 sm:p-5 md:p-8 flex flex-col md:flex-row items-center justify-around gap-2.5 sm:gap-3 md:gap-6 text-center md:text-left">
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-brand-green flex-shrink-0" />
                    <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-gray-700">Seeded MongoDB Food Logs</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-brand-green flex-shrink-0" />
                    <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-gray-700">No hardcoded caloric targets</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-brand-green flex-shrink-0" />
                    <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-gray-700">Advanced Gemini 2.5 Diet Models</span>
                </div>
            </div>
        </>
    );
};

export default CTABanner;