'use client';

import React from 'react';

const Testimonials = () => {
    return (
        <div className="bg-white border border-gray-100 rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm mb-8 sm:mb-10 md:mb-14 lg:mb-16 space-y-4 sm:space-y-6 md:space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 md:space-y-3">
                <span className="text-brand-purple text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider bg-brand-tint-purple border border-brand-purple/20 px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full inline-block">
                    💬 Real Results
                </span>
                <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-brand-black">
                    Loved by Health Enthusiasts
                </h2>
                <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-500">
                    See how our smart calorie counter and AI diet planner fit into daily lives.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div className="bg-gray-50/40 border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 flex flex-col justify-between">
                    <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-600 leading-relaxed italic">
                        "The Gemini AI plan generation is ridiculously fast. It builds realistic whole-day meal plans matching my macros perfectly."
                    </p>
                    <div className="pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-green text-white font-black text-[10px] sm:text-xs flex items-center justify-center">
                            AK
                        </div>
                        <div>
                            <p className="text-[11px] sm:text-xs font-black text-brand-black">Alex K.</p>
                            <p className="text-[8px] sm:text-[9px] font-bold text-gray-400">Fitness Coach</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50/40 border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 flex flex-col justify-between">
                    <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-600 leading-relaxed italic">
                        "Finally a calorie counter that doesn't feel cluttered with useless ads. Clean interface, fast search, and great visual charts."
                    </p>
                    <div className="pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-purple text-white font-black text-[10px] sm:text-xs flex items-center justify-center">
                            SL
                        </div>
                        <div>
                            <p className="text-[11px] sm:text-xs font-black text-brand-black">Sarah L.</p>
                            <p className="text-[8px] sm:text-[9px] font-bold text-gray-400">Marathon Runner</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50/40 border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 flex flex-col justify-between">
                    <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-600 leading-relaxed italic">
                        "Knowing my exact Mifflin-St Jeor target budget keeps me accountable every single day without guessing my daily intake."
                    </p>
                    <div className="pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-black text-white font-black text-[10px] sm:text-xs flex items-center justify-center">
                            MD
                        </div>
                        <div>
                            <p className="text-[11px] sm:text-xs font-black text-brand-black">Marcus D.</p>
                            <p className="text-[8px] sm:text-[9px] font-bold text-gray-400">Weightlifting Enthusiast</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;