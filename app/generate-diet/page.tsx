'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Sparkles, Utensils, AlertCircle, Apple, Flame, Info, CheckCircle, RefreshCw, X } from 'lucide-react';

interface Meal {
  name: string;
  description: string;
  calories: number;
}

interface DietPlan {
  meals: Meal[];
  totalCalories: number;
  macros: { carbs: number; protein: number; fat: number };
  dietitianTips: string[];
}

interface RegenQuestion {
  id: string;
  question: string;
}

const AI_API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai`;

const GenerateDietPage = () => {
  const { userSession, isLoading, profile } = useApp();
  const router = useRouter();

  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingPlan, setIsLoadingPlan] = useState(true);
  const [error, setError] = useState('');

  // --- Regenerate flow state ---
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);
  const [regenQuestions, setRegenQuestions] = useState<RegenQuestion[] | null>(null);
  const [regenAnswers, setRegenAnswers] = useState<Record<string, string>>({});
  const [showRegenModal, setShowRegenModal] = useState(false);

  useEffect(() => {
    if (!isLoading && (!userSession || !userSession.user)) {
      router.push('/login');
    }
  }, [userSession, isLoading, router]);

  const getToken = async () => {
    const session = await import('@/lib/auth-client').then(m => m.authClient.getSession()) as any;
    return session?.data?.session?.token || '';
  };

  // Load the plan for THIS logged-in user from MongoDB (via the backend),
  // not localStorage — so it never leaks across accounts on a shared browser.
  useEffect(() => {
    const loadPlan = async () => {
      if (!userSession?.user) return;
      setIsLoadingPlan(true);
      try {
        const token = await getToken();
        const res = await fetch(`${AI_API_URL}/diet-plan`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setDietPlan(data.plan || null);
        }
      } catch (err) {
        console.error('Failed to load saved diet plan:', err);
      } finally {
        setIsLoadingPlan(false);
      }
    };
    if (!isLoading && userSession?.user) {
      loadPlan();
    }
  }, [isLoading, userSession]);

  if (isLoading || !userSession?.user || isLoadingPlan) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  // First-time generation — no prior plan, no extra questions
  const handleGenerateDiet = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const token = await getToken();

      const res = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          action: 'generate-diet',
          height: profile.height,
          weight: profile.weight,
          age: profile.age,
          gender: profile.gender || 'male',
          goal: profile.goal,
          activityLevel: profile.activityLevel
        })
      });

      if (res.ok) {
        const plan = await res.json();
        setDietPlan(plan); // backend already persisted it to MongoDB for this user
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to generate diet plan. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Could not contact the AI service.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Step 1 of regenerate: ask the AI to produce 1-2 clarifying questions
  // based on the current plan. Nothing here is hardcoded — the AI decides
  // what to ask depending on context (e.g. "did the meals feel too heavy?",
  // "want more variety in protein sources?", etc).
  const handleRequestRegenerate = async () => {
    setIsFetchingQuestions(true);
    setError('');
    try {
      const token = await getToken();

      const res = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          action: 'regenerate-diet-questions',
          currentPlan: dietPlan,
          height: profile.height,
          weight: profile.weight,
          age: profile.age,
          gender: profile.gender || 'male',
          goal: profile.goal,
          activityLevel: profile.activityLevel
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Expected shape: { questions: [{ id: string, question: string }, ...] }
        setRegenQuestions(data.questions || []);
        setRegenAnswers({});
        setShowRegenModal(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Could not prepare regenerate questions. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Could not contact the AI service.');
    } finally {
      setIsFetchingQuestions(false);
    }
  };

  // Step 2 of regenerate: send the user's answers along with the old plan
  // so the AI can produce a new, adjusted plan.
  const handleSubmitRegenerate = async () => {
    setShowRegenModal(false);
    setIsGenerating(true);
    setError('');
    try {
      const token = await getToken();

      const res = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          action: 'generate-diet',
          height: profile.height,
          weight: profile.weight,
          age: profile.age,
          gender: profile.gender || 'male',
          goal: profile.goal,
          activityLevel: profile.activityLevel,
          previousPlan: dietPlan,
          regenerateAnswers: regenAnswers
        })
      });

      if (res.ok) {
        const plan = await res.json();
        setDietPlan(plan); // backend already persisted it to MongoDB for this user
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to regenerate diet plan. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Could not contact the AI service.');
    } finally {
      setIsGenerating(false);
      setRegenQuestions(null);
      setRegenAnswers({});
    }
  };

  const busy = isGenerating || isFetchingQuestions;

  return (
    <DashboardLayout>
      <div className="space-y-10">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display font-black text-3xl text-brand-black tracking-tight flex items-center gap-2">
              AI Diet Planner
            </h1>
            <p className="text-sm font-semibold text-gray-400 mt-1">
              Generate a custom full day eating plan based on your current biometrics and goals.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {dietPlan && (
              <button
                onClick={handleRequestRegenerate}
                disabled={busy}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-brand-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`h-4 w-4 ${isFetchingQuestions ? 'animate-spin' : ''}`} />
                {isFetchingQuestions ? 'Preparing Questions...' : 'Regenerate'}
              </button>
            )}

            <button
              onClick={handleGenerateDiet}
              disabled={busy}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-purple hover:bg-brand-purple/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg shadow-brand-purple/10"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? 'Analyzing Metrics...' : dietPlan ? 'Generate New' : 'Generate Diet Plan'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
            <AlertCircle className="h-4.5 w-4.5 text-red-500" />
            {error}
          </div>
        )}

        {isGenerating && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-brand-purple/20" />
              <div className="absolute inset-0 rounded-full border-4 border-brand-purple border-t-transparent animate-spin" />
            </div>
            <p className="text-sm font-black text-gray-700 animate-pulse">Running dietary logic models...</p>
            <p className="text-xs text-gray-400 font-semibold max-w-xs text-center leading-relaxed">
              Analyzing Height ({profile.height}cm), Weight ({profile.weight}kg), and Goal ({profile.goal}) to generate your custom macro split.
            </p>
          </div>
        )}

        {!isGenerating && !dietPlan && (
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 text-center space-y-6 max-w-xl mx-auto shadow-sm">
            <div className="bg-brand-tint-purple p-4 rounded-2xl w-fit mx-auto text-brand-purple">
              <Apple className="h-8 w-8" />
            </div>
            <h3 className="font-display font-black text-xl text-brand-black">No Plan Generated Yet</h3>
            <p className="text-xs font-semibold text-gray-500 leading-relaxed">
              Click the "Generate Diet Plan" button in the top right to analyze your biometrics and receive a personalized 5-meal eating plan designed specifically for you.
            </p>
          </div>
        )}

        {!isGenerating && dietPlan && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-in fade-in duration-300">

            {/* Left/Middle: Meal cards (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-display font-black text-xl text-brand-black flex items-center gap-2 border-b border-gray-50 pb-4">
                <Utensils className="h-5 w-5 text-brand-green" /> Your Eating Schedule
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {dietPlan.meals.map((meal, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-all">
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-black uppercase tracking-wider text-brand-purple bg-brand-tint-purple border border-brand-purple/20 px-2.5 py-1 rounded-full">
                        {meal.name}
                      </span>
                      <p className="text-sm font-semibold text-gray-700 pt-2 leading-relaxed">
                        {meal.description}
                      </p>
                    </div>
                    <div className="bg-brand-tint-green text-brand-green border border-brand-green/10 rounded-2xl px-4 py-3 flex flex-col items-center justify-center flex-shrink-0 w-24">
                      <span className="text-xs font-black">{meal.calories}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-0.5">kcal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Macros Split & Dietitian Tips (1/3 width) */}
            <div className="space-y-6">

              {/* Macros split card */}
              <div className="bg-brand-black text-white rounded-[2rem] p-7 space-y-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-brand-purple/10 rounded-full blur-3xl -z-10" />
                <h3 className="font-display font-black text-lg border-b border-white/10 pb-4 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-brand-purple" /> Macro Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">DAILY CALORIE BUDGET</div>
                      <div className="text-3xl font-black text-white mt-0.5">{dietPlan.totalCalories} kcal</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {/* Carbs */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-gray-300">
                        <span>Carbohydrates</span>
                        <span className="text-white font-black">{dietPlan.macros.carbs}g</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-brand-green h-full" style={{ width: '45%' }} />
                      </div>
                    </div>

                    {/* Protein */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-gray-300">
                        <span>Protein</span>
                        <span className="text-white font-black">{dietPlan.macros.protein}g</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-brand-purple h-full" style={{ width: '35%' }} />
                      </div>
                    </div>

                    {/* Fat */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-gray-300">
                        <span>Dietary Fat</span>
                        <span className="text-white font-black">{dietPlan.macros.fat}g</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-yellow-400 h-full" style={{ width: '20%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dietitian Tips Card */}
              <div className="bg-white border border-gray-100 rounded-[2rem] p-7 space-y-6 shadow-sm">
                <h3 className="font-display font-black text-lg text-brand-black border-b border-gray-50 pb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-brand-purple" /> Dietitian Advice
                </h3>

                <ul className="space-y-4">
                  {dietPlan.dietitianTips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <CheckCircle className="h-4.5 w-4.5 text-brand-green flex-shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-gray-600 leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Regenerate Questions Modal */}
      {showRegenModal && regenQuestions && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full space-y-6 shadow-xl relative">
            <button
              onClick={() => { setShowRegenModal(false); setRegenQuestions(null); }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="font-display font-black text-xl text-brand-black flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-purple" /> Quick Question{regenQuestions.length > 1 ? 's' : ''}
              </h3>
              <p className="text-xs font-semibold text-gray-400 mt-1">
                Help the AI adjust your next plan.
              </p>
            </div>

            <div className="space-y-4">
              {regenQuestions.length === 0 && (
                <p className="text-xs font-semibold text-gray-500">
                  No extra input needed — the AI will regenerate based on your existing plan and goals.
                </p>
              )}

              {regenQuestions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">{q.question}</label>
                  <input
                    type="text"
                    value={regenAnswers[q.id] || ''}
                    onChange={(e) => setRegenAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder="Your answer..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-purple"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmitRegenerate}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-purple hover:bg-brand-purple/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" /> Regenerate Plan
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default GenerateDietPage;