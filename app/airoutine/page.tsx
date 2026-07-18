'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import {
    Sparkles,
    Dumbbell,
    AlertCircle,
    RefreshCw,
    X,
    MessageSquareText,
    Calendar,
    CheckCircle2,
} from 'lucide-react';

interface Exercise {
    name: string;
    sets: string;
    reps: string;
}

interface RoutineDay {
    day: string;
    focus: string;
    exercises: Exercise[];
}

interface Routine {
    name: string;
    description: string;
    days: RoutineDay[];
}

interface AIQuestion {
    id: string;
    question: string;
}

const AI_API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ai`;

const AiRoutinePage = () => {
    const { userSession, isLoading, profile } = useApp();
    const router = useRouter();

    const [routines, setRoutines] = useState<Routine[] | null>(null);
    const [selectedRoutineIdx, setSelectedRoutineIdx] = useState(0);
    const [expandedDay, setExpandedDay] = useState<number | null>(0);

    const [freeText, setFreeText] = useState('');
    const [error, setError] = useState('');

    const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const [questions, setQuestions] = useState<AIQuestion[] | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [modalMode, setModalMode] = useState<'initial' | 'regenerate'>('initial');

    const getToken = async () => {
        const session = (await import('@/lib/auth-client').then((m) => m.authClient.getSession())) as any;
        return session?.data?.session?.token || '';
    };

    useEffect(() => {
        if (!isLoading && (!userSession || !userSession.user)) {
            router.push('/login');
        }
    }, [userSession, isLoading, router]);

    useEffect(() => {
        if (!userSession?.user?.id) return;
        (async () => {
            try {
                const token = await getToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/routines`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.routines && data.routines.length > 0) {
                        setRoutines(data.routines);
                    }
                }
            } catch {
                // Silently ignore — user just won't see a cached routine.
            }
        })();
    }, [userSession?.user?.id]);

    if (isLoading || !userSession?.user) {
        return (
            <div className="flex-1 flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-green"></div>
            </div>
        );
    }

    const callAI = async (body: Record<string, unknown>) => {
        const token = await getToken();
        const res = await fetch(AI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || `Request failed: ${res.status}`);
        }
        return res.json();
    };

    // Persists the latest 3 routines to MongoDB (via the Express backend) so
    // they're tied to this user's account, not just this browser.
    const saveRoutinesToDB = async (newRoutines: Routine[]) => {
        try {
            const token = await getToken();
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/routines`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ routines: newRoutines }),
            });
        } catch {
            // Non-fatal — the routines are still shown in the UI even if the save fails.
        }
    };

    // Step 1 (first time / "Get My Routines"): ask the AI to generate a few
    // lifestyle / hobby / hypothetical questions. Nothing hardcoded — the AI
    // decides what's worth asking based on the goal and any free text already
    // provided.
    const handleStart = async () => {
        setError('');
        setIsFetchingQuestions(true);
        try {
            const data = await callAI({
                action: 'routine-questions',
                goal: profile.goal,
                activityLevel: profile.activityLevel,
                freeText,
            });
            setQuestions(data.questions || []);
            setAnswers({});
            setModalMode('initial');
            setShowQuestionModal(true);
        } catch (err: any) {
            setError(err.message || 'Connection error. Could not contact the AI service.');
        } finally {
            setIsFetchingQuestions(false);
        }
    };

    // Step 2: submit lifestyle answers + free text -> generate 3 routines
    const handleGenerateRoutines = async () => {
        setShowQuestionModal(false);
        setIsGenerating(true);
        setError('');
        try {
            const data = await callAI({
                action: 'generate-routines',
                height: profile.height,
                weight: profile.weight,
                age: profile.age,
                gender: profile.gender || 'male',
                goal: profile.goal,
                activityLevel: profile.activityLevel,
                answers,
                freeText,
            });
            const newRoutines: Routine[] = data.routines || [];
            setRoutines(newRoutines);
            setSelectedRoutineIdx(0);
            setExpandedDay(0);
            await saveRoutinesToDB(newRoutines);
        } catch (err: any) {
            setError(err.message || 'Connection error. Could not contact the AI service.');
        } finally {
            setIsGenerating(false);
            setQuestions(null);
            setAnswers({});
        }
    };

    // Regenerate flow: ask what the user didn't like about current routines
    const handleRequestRegenerate = async () => {
        setError('');
        setIsFetchingQuestions(true);
        try {
            const data = await callAI({
                action: 'regenerate-routine-questions',
                previousRoutines: routines,
                goal: profile.goal,
            });
            setQuestions(data.questions || []);
            setAnswers({});
            setModalMode('regenerate');
            setShowQuestionModal(true);
        } catch (err: any) {
            setError(err.message || 'Connection error. Could not contact the AI service.');
        } finally {
            setIsFetchingQuestions(false);
        }
    };

    const handleSubmitRegenerate = async () => {
        setShowQuestionModal(false);
        setIsGenerating(true);
        setError('');
        try {
            const data = await callAI({
                action: 'generate-routines',
                height: profile.height,
                weight: profile.weight,
                age: profile.age,
                gender: profile.gender || 'male',
                goal: profile.goal,
                activityLevel: profile.activityLevel,
                freeText,
                previousRoutines: routines,
                regenerateAnswers: answers,
            });
            const newRoutines: Routine[] = data.routines || [];
            setRoutines(newRoutines);
            setSelectedRoutineIdx(0);
            setExpandedDay(0);
            await saveRoutinesToDB(newRoutines);
        } catch (err: any) {
            setError(err.message || 'Connection error. Could not contact the AI service.');
        } finally {
            setIsGenerating(false);
            setQuestions(null);
            setAnswers({});
        }
    };

    const handleModalSubmit = () => {
        if (modalMode === 'initial') {
            handleGenerateRoutines();
        } else {
            handleSubmitRegenerate();
        }
    };

    const busy = isFetchingQuestions || isGenerating;
    const activeRoutine = routines?.[selectedRoutineIdx];

    return (
        <DashboardLayout>
            <div className="space-y-10">

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="font-display font-black text-3xl text-brand-black tracking-tight flex items-center gap-2">
                            AI Workout Routine
                        </h1>
                        <p className="text-sm font-semibold text-gray-400 mt-1">
                            The AI asks a few personal questions, then builds 3 weekly routines tailored to you.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {routines && (
                            <button
                                onClick={handleRequestRegenerate}
                                disabled={busy}
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-brand-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                            >
                                <RefreshCw className={`h-4 w-4 ${isFetchingQuestions ? 'animate-spin' : ''}`} />
                                {isFetchingQuestions ? 'Preparing...' : 'Regenerate'}
                            </button>
                        )}

                        <button
                            onClick={handleStart}
                            disabled={busy}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-purple hover:bg-brand-purple/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-lg shadow-brand-purple/10"
                        >
                            <Sparkles className="h-4 w-4" />
                            {isFetchingQuestions && modalMode === 'initial'
                                ? 'Thinking...'
                                : routines
                                    ? 'Start Over'
                                    : 'Get My Routines'}
                        </button>
                    </div>
                </div>

                {/* Free-text input — like a normal chat box, always available */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-3 shadow-sm">
                    <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-500">
                        <MessageSquareText className="h-4 w-4 text-brand-purple" />
                        Tell the AI about your condition or needs (optional)
                    </label>
                    <textarea
                        value={freeText}
                        onChange={(e) => setFreeText(e.target.value)}
                        placeholder="e.g. I have a knee injury, I only have dumbbells at home, I can only train 3 days a week..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-purple resize-none"
                    />
                    <p className="text-[11px] text-gray-400 font-semibold">
                        This is used alongside the AI's questions whenever routines are generated or regenerated.
                    </p>
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
                        <p className="text-sm font-black text-gray-700 animate-pulse">Designing your weekly routines...</p>
                    </div>
                )}

                {!isGenerating && !routines && (
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 text-center space-y-6 max-w-xl mx-auto shadow-sm">
                        <div className="bg-brand-tint-purple p-4 rounded-2xl w-fit mx-auto text-brand-purple">
                            <Dumbbell className="h-8 w-8" />
                        </div>
                        <h3 className="font-display font-black text-xl text-brand-black">No Routines Yet</h3>
                        <p className="text-xs font-semibold text-gray-500 leading-relaxed">
                            Click "Get My Routines" — the AI will ask a few quick questions about your lifestyle, then build 3 personalized weekly workout options.
                        </p>
                    </div>
                )}

                {!isGenerating && routines && routines.length > 0 && (
                    <div className="space-y-6 animate-in fade-in duration-300">

                        {/* Routine selector tabs */}
                        <div className="flex flex-wrap gap-3">
                            {routines.map((r, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setSelectedRoutineIdx(idx); setExpandedDay(0); }}
                                    className={`px-5 py-3 rounded-2xl text-left transition-all cursor-pointer border ${selectedRoutineIdx === idx
                                            ? 'bg-brand-black text-white border-brand-black shadow-md'
                                            : 'bg-white text-brand-black border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <div className="text-xs font-black">{r.name}</div>
                                </button>
                            ))}
                        </div>

                        {activeRoutine && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                                <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                                    <h2 className="font-display font-black text-xl text-brand-black">{activeRoutine.name}</h2>
                                    <p className="text-xs font-semibold text-gray-500 mt-1 leading-relaxed">{activeRoutine.description}</p>
                                </div>

                                <div className="lg:col-span-3 space-y-3">
                                    {activeRoutine.days.map((d, idx) => (
                                        <div key={idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                            <button
                                                onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
                                                className="w-full flex items-center justify-between px-6 py-4 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="h-4 w-4 text-brand-purple" />
                                                    <span className="text-xs font-black text-brand-black">{d.day}</span>
                                                    <span
                                                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${d.focus === 'Rest'
                                                                ? 'bg-gray-100 text-gray-500'
                                                                : 'bg-brand-tint-green text-brand-green'
                                                            }`}
                                                    >
                                                        {d.focus}
                                                    </span>
                                                </div>
                                                <span className="text-gray-300 text-xs">{expandedDay === idx ? '−' : '+'}</span>
                                            </button>

                                            {expandedDay === idx && (
                                                <div className="px-6 pb-5 space-y-2 border-t border-gray-50 pt-4">
                                                    {d.exercises.length === 0 ? (
                                                        <p className="text-xs font-semibold text-gray-400">Rest day — recovery and light stretching recommended.</p>
                                                    ) : (
                                                        d.exercises.map((ex, exIdx) => (
                                                            <div key={exIdx} className="flex items-center justify-between text-xs font-semibold text-gray-700 py-1.5">
                                                                <span className="flex items-center gap-2">
                                                                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-green flex-shrink-0" />
                                                                    {ex.name}
                                                                </span>
                                                                <span className="text-gray-400 font-bold">{ex.sets} × {ex.reps}</span>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Questions Modal — shared for both initial and regenerate flows */}
            {showQuestionModal && questions && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] p-8 max-w-md w-full space-y-6 shadow-xl relative max-h-[85vh] overflow-y-auto">
                        <button
                            onClick={() => { setShowQuestionModal(false); setQuestions(null); }}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div>
                            <h3 className="font-display font-black text-xl text-brand-black flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-brand-purple" />
                                {modalMode === 'initial' ? 'A Few Quick Questions' : 'What Would You Change?'}
                            </h3>
                            <p className="text-xs font-semibold text-gray-400 mt-1">
                                {modalMode === 'initial'
                                    ? 'Help the AI understand you before building your routines.'
                                    : 'Let the AI know what to fix in your next routines.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {questions.length === 0 && (
                                <p className="text-xs font-semibold text-gray-500">
                                    No extra input needed — the AI will proceed based on what you've already shared.
                                </p>
                            )}

                            {questions.map((q) => (
                                <div key={q.id} className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700">{q.question}</label>
                                    <input
                                        type="text"
                                        value={answers[q.id] || ''}
                                        onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                                        placeholder="Your answer..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-purple"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleModalSubmit}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-purple hover:bg-brand-purple/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-95 cursor-pointer"
                        >
                            {modalMode === 'initial' ? (
                                <>
                                    <Sparkles className="h-4 w-4" /> Generate My Routines
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="h-4 w-4" /> Regenerate Routines
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default AiRoutinePage;