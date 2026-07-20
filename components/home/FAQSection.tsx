'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

const FAQSection = () => {
    return (
        <div className="bg-white border border-gray-100 rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm mb-8 sm:mb-10 md:mb-14 lg:mb-16 space-y-4 sm:space-y-6 md:space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 md:space-y-3">
                <span className="text-brand-black text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider bg-gray-100 border border-gray-200 px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full inline-block">
                    ❓ Common Questions
                </span>
                <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-brand-black">
                    Frequently Asked Questions
                </h2>
                <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-500">
                    Got questions about how our calorie calculator and AI diet model operate?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
                <div className="bg-gray-50/50 border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-1.5 sm:space-y-2">
                    <h3 className="font-display font-black text-[11px] sm:text-xs md:text-sm text-brand-black flex items-center gap-2">
                        <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-green flex-shrink-0" />
                        How is my daily calorie target calculated?
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-semibold leading-relaxed pl-5 sm:pl-6">
                        We compute your BMR using the Mifflin-St Jeor equation combined with your activity multiplier to derive your customized maintenance, deficit, or surplus daily goals.
                    </p>
                </div>

                <div className="bg-gray-50/50 border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-1.5 sm:space-y-2">
                    <h3 className="font-display font-black text-[11px] sm:text-xs md:text-sm text-brand-black flex items-center gap-2">
                        <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-purple flex-shrink-0" />
                        Can I use Healthify without creating an account?
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-semibold leading-relaxed pl-5 sm:pl-6">
                        Yes! You can explore the Calorie Counter and preview analytics right away. Logging in unlocks persistent cloud logs, full AI meal plan generation, and AI workout routines.
                    </p>
                </div>

                <div className="bg-gray-50/50 border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-1.5 sm:space-y-2">
                    <h3 className="font-display font-black text-[11px] sm:text-xs md:text-sm text-brand-black flex items-center gap-2">
                        <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-green flex-shrink-0" />
                        How does the AI Meal Generator craft my diets?
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-semibold leading-relaxed pl-5 sm:pl-6">
                        Gemini AI evaluates your weight goal, dietary preferences, and target macros to generate structured breakfast, lunch, snack, and dinner meal options.
                    </p>
                </div>

                <div className="bg-gray-50/50 border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-1.5 sm:space-y-2">
                    <h3 className="font-display font-black text-[11px] sm:text-xs md:text-sm text-brand-black flex items-center gap-2">
                        <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-purple flex-shrink-0" />
                        Is my personal health data securely stored?
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-semibold leading-relaxed pl-5 sm:pl-6">
                        Absolutely. Your physical data is tied safely to your personal account on MongoDB with industry-standard security and strict data privacy practices.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;