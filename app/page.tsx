'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  ArrowRight,
  Flame,
  Brain,
  Sparkles,
  Dumbbell,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import AnalyticsDashboard from '@/components/home/AnalyticsDashboard';
import CoreFeatures from '@/components/home/CoreFeatures';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FitnessGoalsBanner from '@/components/home/FitnessGoalsBanner';
import StatsBadges from '@/components/home/StatsBadges';
import Testimonials from '@/components/home/Testimonials';
import FAQSection from '@/components/home/FAQSection';
import CTABanner from '@/components/home/CTABanner';



const SLIDE_INTERVAL = 5000; // 5s

const Page = () => {
  const { userSession } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(((index % totalSlides) + totalSlides) % totalSlides);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % totalSlides);
  }, []);

  // Auto-advance every 5s, resets whenever activeSlide changes (incl. manual clicks)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [activeSlide, nextSlide]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-6 sm:py-8 md:py-10">
      {/* Hero Slider Section */}
      <div className="relative rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] lg:rounded-[2.5rem] bg-brand-black text-white overflow-hidden mb-6 sm:mb-8 md:mb-10 lg:mb-12 shadow-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {/* Slide 1: Main Hero */}
          <div className="relative w-full flex-shrink-0 py-8 px-4 sm:py-12 sm:px-8 md:py-14 md:px-12 lg:py-16 lg:px-16 text-center">
            <div className="absolute top-0 right-0 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] bg-brand-green/20 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px] -mr-12 -mt-12 sm:-mr-24 sm:-mt-24 lg:-mr-36 lg:-mt-36" />
            <div className="absolute bottom-0 left-0 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] bg-brand-purple/20 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px] -ml-12 -mb-12 sm:-ml-24 sm:-mb-24 lg:-ml-36 lg:-mb-36" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-2.5 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider bg-brand-green text-white border border-brand-green/20 shadow-lg shadow-brand-green/20">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" /> Premium Healthify Assistant
              </span>
              <h1 className="font-display font-black text-xl sm:text-3xl md:text-4xl lg:text-6xl tracking-tight leading-tight sm:leading-tight md:leading-none text-white">
                Simplify your nutrition. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-[#a3e635] to-brand-purple">
                  Achieve your target.
                </span>
              </h1>
              <p className="text-gray-400 font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
                The ultimate companion to track daily calorie consumption, calculate your body metrics, and generate tailored, full-day eating plans using Gemini AI.
              </p>

              <div className="pt-2 sm:pt-4 md:pt-5 lg:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 md:gap-4">
                {userSession?.user ? (
                  <Link
                    href="/profile"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green text-white font-extrabold px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl hover:bg-brand-green/90 transition-all shadow-md active:scale-95 text-[11px] sm:text-xs md:text-sm"
                  >
                    Go to Profile Dashboard <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green text-white font-extrabold px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl hover:bg-brand-green/90 transition-all shadow-md active:scale-95 text-[11px] sm:text-xs md:text-sm"
                    >
                      Get Started Free <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                    <Link
                      href="/nutrition"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-extrabold px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl transition-all border border-white/10 active:scale-95 text-[11px] sm:text-xs md:text-sm"
                    >
                      Calorie Counter
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Slide 2: AI Diet Planner Hero */}
          <div className="relative w-full flex-shrink-0 py-8 px-4 sm:py-12 sm:px-8 md:py-14 md:px-12 lg:py-16 lg:px-16 text-center">
            <div className="absolute top-0 left-0 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] bg-brand-purple/20 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px] -ml-12 -mt-12 sm:-ml-24 sm:-mt-24 lg:-ml-36 lg:-mt-36" />
            <div className="absolute bottom-0 right-0 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] bg-brand-green/20 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px] -mr-12 -mb-12 sm:-mr-24 sm:-mb-24 lg:-mr-36 lg:-mb-36" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-2.5 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider bg-brand-purple text-white border border-brand-purple/20 shadow-lg shadow-brand-purple/20">
                <Brain className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" /> AI-Powered Meal Planning
              </span>
              <h1 className="font-display font-black text-xl sm:text-3xl md:text-4xl lg:text-6xl tracking-tight leading-tight sm:leading-tight md:leading-none text-white">
                Let AI build your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-[#a3e635] to-brand-green">
                  full-day diet plan.
                </span>
              </h1>
              <p className="text-gray-400 font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
                Powered by Gemini AI, get a personalized breakfast, lunch, snacks, and dinner plan built around your exact macros and goals.
              </p>

              <div className="pt-2 sm:pt-4 md:pt-5 lg:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <Link
                  href="/generate-diet"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-purple text-white font-extrabold px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl hover:bg-brand-purple/90 transition-all shadow-md active:scale-95 text-[11px] sm:text-xs md:text-sm"
                >
                  Generate My Diet Plan <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 3: AI Workout Routine Hero */}
          <div className="relative w-full flex-shrink-0 py-8 px-4 sm:py-12 sm:px-8 md:py-14 md:px-12 lg:py-16 lg:px-16 text-center">
            <div className="absolute top-0 right-0 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] bg-brand-purple/20 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px] -mr-12 -mt-12 sm:-mr-24 sm:-mt-24 lg:-mr-36 lg:-mt-36" />
            <div className="absolute bottom-0 left-0 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] bg-brand-green/20 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px] -ml-12 -mb-12 sm:-ml-24 sm:-mb-24 lg:-ml-36 lg:-mb-36" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-2.5 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider bg-brand-purple text-white border border-brand-purple/20 shadow-lg shadow-brand-purple/20">
                <Dumbbell className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" /> AI-Powered Workout Plans
              </span>
              <h1 className="font-display font-black text-xl sm:text-3xl md:text-4xl lg:text-6xl tracking-tight leading-tight sm:leading-tight md:leading-none text-white">
                Let AI design your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-[#a3e635] to-brand-green">
                  weekly workout routine.
                </span>
              </h1>
              <p className="text-gray-400 font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
                Answer a few quick questions and get 3 personalized weekly training routines — tailored to your goals, equipment, and schedule. Regenerate anytime.
              </p>

              <div className="pt-2 sm:pt-4 md:pt-5 lg:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <Link
                  href="/ai-routine"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-purple text-white font-extrabold px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl hover:bg-brand-purple/90 transition-all shadow-md active:scale-95 text-[11px] sm:text-xs md:text-sm"
                >
                  Build My Routine <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 4: Calorie Counter Hero */}
          <div className="relative w-full flex-shrink-0 py-8 px-4 sm:py-12 sm:px-8 md:py-14 md:px-12 lg:py-16 lg:px-16 text-center">
            <div className="absolute top-0 left-0 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] bg-brand-green/20 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px] -ml-12 -mt-12 sm:-ml-24 sm:-mt-24 lg:-ml-36 lg:-mt-36" />
            <div className="absolute bottom-0 right-0 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] bg-brand-purple/20 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px] -mr-12 -mb-12 sm:-mr-24 sm:-mb-24 lg:-mr-36 lg:-mb-36" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-2.5 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider bg-brand-green text-white border border-brand-green/20 shadow-lg shadow-brand-green/20">
                <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" /> Instant Calorie Tracking
              </span>
              <h1 className="font-display font-black text-xl sm:text-3xl md:text-4xl lg:text-6xl tracking-tight leading-tight sm:leading-tight md:leading-none text-white">
                Log every meal in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-[#a3e635] to-brand-purple">
                  seconds, not minutes.
                </span>
              </h1>
              <p className="text-gray-400 font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
                Search our 10,000+ food database, adjust portions instantly, and track your daily calorie budget with zero friction — no login required to try it.
              </p>

              <div className="pt-2 sm:pt-4 md:pt-5 lg:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <Link
                  href="/nutrition"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green text-white font-extrabold px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl hover:bg-brand-green/90 transition-all shadow-md active:scale-95 text-[11px] sm:text-xs md:text-sm"
                >
                  Count My Calories <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Prev/Next Arrows */}
        <button
          onClick={() => goToSlide(activeSlide - 1)}
          aria-label="Previous slide"
          className="absolute left-1.5 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-1 sm:p-1.5 md:p-2 rounded-full transition-all"
        >
          <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </button>
        <button
          onClick={() => goToSlide(activeSlide + 1)}
          aria-label="Next slide"
          className="absolute right-1.5 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-1 sm:p-1.5 md:p-2 rounded-full transition-all"
        >
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2.5 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${activeSlide === i ? 'w-5 sm:w-6 bg-brand-green' : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Section components */}
      <AnalyticsDashboard />
      <CoreFeatures></CoreFeatures>
      <HowItWorksSection></HowItWorksSection>
      <FitnessGoalsBanner></FitnessGoalsBanner>
      <StatsBadges></StatsBadges>
      <Testimonials></Testimonials>
      <FAQSection></FAQSection>
      <CTABanner></CTABanner>
    </div>
  );
};

export default Page;