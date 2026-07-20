'use client';

import React from 'react';
import { Apple, Brain, Users, Award } from 'lucide-react';

const StatsBadges = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-14 lg:mb-16">
            <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 text-center space-y-1 sm:space-y-1.5 md:space-y-2 shadow-sm">
                <div className="mx-auto w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-brand-tint-green text-brand-green flex items-center justify-center mb-1">
                    <Apple className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </div>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-display font-black text-brand-black tracking-tight">10,000+</p>
                <p className="text-[8px] sm:text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">Foods Database</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 text-center space-y-1 sm:space-y-1.5 md:space-y-2 shadow-sm">
                <div className="mx-auto w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-brand-tint-purple text-brand-purple flex items-center justify-center mb-1">
                    <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </div>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-display font-black text-brand-black tracking-tight">98.4%</p>
                <p className="text-[8px] sm:text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">AI Accuracy Rate</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 text-center space-y-1 sm:space-y-1.5 md:space-y-2 shadow-sm">
                <div className="mx-auto w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-gray-100 text-brand-black flex items-center justify-center mb-1">
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </div>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-display font-black text-brand-black tracking-tight">50,000+</p>
                <p className="text-[8px] sm:text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">Diets Generated</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 text-center space-y-1 sm:space-y-1.5 md:space-y-2 shadow-sm">
                <div className="mx-auto w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-brand-tint-green text-brand-green flex items-center justify-center mb-1">
                    <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </div>
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-display font-black text-brand-black tracking-tight">100%</p>
                <p className="text-[8px] sm:text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider">Science-Backed</p>
            </div>
        </div>
    );
};

export default StatsBadges;