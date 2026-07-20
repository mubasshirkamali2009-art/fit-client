'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Brain, Dumbbell, Scale, ChevronRight } from 'lucide-react';

const CoreFeatures = () => {
    return (
        <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-8 sm:mb-10 md:mb-14 lg:mb-16">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 md:space-y-3 px-2">
                <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-brand-black">
                    Everything you need. Nothing you don't.
                </h2>
                <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-500">
                    We removed the clutter to focus on what actually drives results: calorie tracking, AI meal planning, and AI workout routines.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-2 sm:pt-3 md:pt-6">
                {/* Feature 1 */}
                <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                        <div className="bg-brand-tint-green text-brand-green p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl w-fit">
                            <Flame className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="font-display font-black text-sm sm:text-base md:text-lg lg:text-xl text-brand-black">Calorie Counter</h3>
                        <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-500 leading-relaxed">
                            Search our preset MongoDB food database, adjust portion sizes, and calculate your daily budget. Add logs to your calendar history on the go.
                        </p>
                    </div>
                    <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] sm:text-[11px] md:text-xs font-extrabold text-brand-green">
                        <span>Try without login</span>
                        <Link href="/nutrition" className="hover:underline flex items-center gap-1">
                            Explore <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Link>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                        <div className="bg-brand-tint-purple text-brand-purple p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl w-fit">
                            <Brain className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="font-display font-black text-sm sm:text-base md:text-lg lg:text-xl text-brand-black">AI Full-Day Diet Planner</h3>
                        <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-500 leading-relaxed">
                            Generate tailored eating plans powered by Gemini AI. Input your metrics to receive breakfast, lunch, snacks, and dinner lists with precise macro ratios.
                        </p>
                    </div>
                    <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] sm:text-[11px] md:text-xs font-extrabold text-brand-purple">
                        <span>Requires onboarding</span>
                        <Link href="/generate-diet" className="hover:underline flex items-center gap-1">
                            Generate Plan <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Link>
                    </div>
                </div>

                {/* Feature 3: AI Workout Routine */}
                <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                        <div className="bg-brand-tint-purple text-brand-purple p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl w-fit">
                            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="font-display font-black text-sm sm:text-base md:text-lg lg:text-xl text-brand-black">AI Workout Routine</h3>
                        <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-500 leading-relaxed">
                            The AI asks a few personal questions, then builds 3 weekly workout routines matched to your goals, injuries, and available equipment.
                        </p>
                    </div>
                    <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] sm:text-[11px] md:text-xs font-extrabold text-brand-purple">
                        <span>Regenerate anytime</span>
                        <Link href="/ai-routine" className="hover:underline flex items-center gap-1">
                            Get Routine <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Link>
                    </div>
                </div>

                {/* Feature 4 */}
                <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                        <div className="bg-gray-100 text-brand-black p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl w-fit">
                            <Scale className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="font-display font-black text-sm sm:text-base md:text-lg lg:text-xl text-brand-black">Physiological Metrics</h3>
                        <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-500 leading-relaxed">
                            Calculate your BMI and exact daily caloric intake target using the Mifflin-St Jeor equation. Choose between Bulking, Cutting, or Maintenance budgets.
                        </p>
                    </div>
                    <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] sm:text-[11px] md:text-xs font-extrabold text-brand-black">
                        <span>Interactive dashboard</span>
                        <Link href="/profile" className="hover:underline flex items-center gap-1">
                            View Stats <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoreFeatures;