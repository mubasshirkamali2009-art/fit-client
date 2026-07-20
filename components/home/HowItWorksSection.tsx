'use client';

import React from 'react';
import { Activity, Brain, TrendingUp } from 'lucide-react';

const HowItWorksSection = () => {
    return (
        <div className="bg-white border border-gray-100 rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm mb-8 sm:mb-10 md:mb-14 lg:mb-16 space-y-4 sm:space-y-6 md:space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 md:space-y-3">
                <span className="text-brand-green text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider bg-brand-tint-green border border-brand-green/20 px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full inline-block">
                    ⚡ Simple Process
                </span>
                <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-brand-black">
                    How Healthify Transforms Your Routine
                </h2>
                <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-500">
                    A seamless three-step pathway designed to optimize your health journey effortlessly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 relative">
                <div className="bg-gray-50/50 border border-gray-100 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl relative space-y-2.5 sm:space-y-3 hover:border-brand-green/30 transition-all">
                    <div className="flex items-center justify-between">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-brand-green text-white font-black text-[10px] sm:text-xs md:text-sm flex items-center justify-center">
                            01
                        </span>
                        <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-brand-green" />
                    </div>
                    <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-brand-black">Input Your Metrics</h3>
                    <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-500 font-semibold leading-relaxed">
                        Set up your physical baseline using real metabolic equations for individualized target calculations.
                    </p>
                </div>

                <div className="bg-gray-50/50 border border-gray-100 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl relative space-y-2.5 sm:space-y-3 hover:border-brand-purple/30 transition-all">
                    <div className="flex items-center justify-between">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-brand-purple text-white font-black text-[10px] sm:text-xs md:text-sm flex items-center justify-center">
                            02
                        </span>
                        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-brand-purple" />
                    </div>
                    <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-brand-black">AI Menu Generation</h3>
                    <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-500 font-semibold leading-relaxed">
                        Gemini AI analyzes your dietary profile to instantly create macro-balanced daily meal schedules.
                    </p>
                </div>

                <div className="bg-gray-50/50 border border-gray-100 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl relative space-y-2.5 sm:space-y-3 hover:border-brand-black/30 transition-all">
                    <div className="flex items-center justify-between">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-brand-black text-white font-black text-[10px] sm:text-xs md:text-sm flex items-center justify-center">
                            03
                        </span>
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-brand-black" />
                    </div>
                    <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-brand-black">Track & Improve</h3>
                    <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-500 font-semibold leading-relaxed">
                        Log daily items, view intake quality trends, and stay accountable to your fitness vision long-term.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;