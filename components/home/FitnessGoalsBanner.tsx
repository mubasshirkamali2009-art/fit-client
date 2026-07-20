'use client';

import React from 'react';
import { Dumbbell, Flame, Target } from 'lucide-react';

const FitnessGoalsBanner = () => {
    return (
        <div className="bg-gradient-to-br from-brand-black via-gray-900 to-brand-black rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] lg:rounded-[2.5rem] p-5 sm:p-7 md:p-10 lg:p-12 text-white shadow-xl mb-8 sm:mb-10 md:mb-14 lg:mb-16 space-y-4 sm:space-y-6 md:space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 md:space-y-3 relative z-10">
                <span className="text-brand-green text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider bg-brand-green/10 border border-brand-green/20 px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full inline-block">
                    🎯 Tailored Strategies
                </span>
                <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-white">
                    Optimized for Every Body & Goal
                </h2>
                <p className="text-gray-400 font-semibold text-[10px] sm:text-[11px] md:text-xs">
                    Whether building strength, losing body fat, or maintaining high energy levels.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 relative z-10">
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3 backdrop-blur-sm hover:bg-white/10 transition-all">
                    <div className="p-2.5 sm:p-3 bg-brand-green/20 text-brand-green rounded-lg sm:rounded-xl w-fit">
                        <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-white">Muscle Gain (Bulking)</h3>
                    <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-400 font-semibold leading-relaxed">
                        Structured surplus calorie allocations aimed at fueling hypertrophic growth and max recovery.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3 backdrop-blur-sm hover:bg-white/10 transition-all">
                    <div className="p-2.5 sm:p-3 bg-brand-purple/20 text-brand-purple rounded-lg sm:rounded-xl w-fit">
                        <Flame className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-white">Fat Loss (Cutting)</h3>
                    <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-400 font-semibold leading-relaxed">
                        Precise deficit budgets protecting lean body mass while burning fat effectively.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3 backdrop-blur-sm hover:bg-white/10 transition-all">
                    <div className="p-2.5 sm:p-3 bg-white/20 text-white rounded-lg sm:rounded-xl w-fit">
                        <Target className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-white">Weight Maintenance</h3>
                    <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-400 font-semibold leading-relaxed">
                        Equilibrated energy balance tailored to sustain vitality, athletic performance, and body weight.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FitnessGoalsBanner;