'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const isFoodHealthy = (name: string) => {
    const n = name.toLowerCase();
    return n.includes('chicken') || n.includes('rice') || n.includes('apple') ||
        n.includes('banana') || n.includes('egg') || n.includes('oatmeal') ||
        n.includes('almond') || n.includes('yogurt') || n.includes('salmon') ||
        n.includes('broccoli') || n.includes('spinach') || n.includes('salad') ||
        n.includes('water') || n.includes('milk') || n.includes('sweet potato') ||
        n.includes('bread') || n.includes('cottage cheese') || n.includes('tuna');
};

const AnalyticsDashboard = () => {
    const { userSession, foodLogs, profile } = useApp();

    const todayStr = new Date().toISOString().split('T')[0];

    // Categorize food logs or fallback to mock logs for unauthenticated preview
    const logs = userSession?.user ? foodLogs : [
        { id: '1', name: 'Chicken Breast (150g)', calories: 250, date: todayStr, healthy: true },
        { id: '2', name: 'White Rice Cooked (200g)', calories: 260, date: todayStr, healthy: true },
        { id: '3', name: 'Apple (100g)', calories: 52, date: todayStr, healthy: true },
        { id: '4', name: 'Pepsi Soda (1 serving)', calories: 150, date: todayStr, healthy: false },
        { id: '5', name: 'Double Cheeseburger', calories: 650, date: todayStr, healthy: false }
    ];

    // Group calorie intake for the last 5 days
    const last5Days = Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();

    const barData = last5Days.map(date => {
        const dayLogs = userSession?.user
            ? logs.filter(log => log.date === date)
            : (date === todayStr ? logs : [
                { name: 'Oatmeal', calories: 220, date, healthy: true },
                { name: 'Apple', calories: 55, date, healthy: true },
                { name: 'Pizza Slice', calories: 290, date, healthy: false }
            ]);

        let healthyCals = 0;
        let unhealthyCals = 0;

        dayLogs.forEach(log => {
            if ('healthy' in log && typeof log.healthy === 'boolean') {
                if (log.healthy) healthyCals += log.calories;
                else unhealthyCals += log.calories;
            } else {
                if (isFoodHealthy(log.name)) {
                    healthyCals += log.calories;
                } else {
                    unhealthyCals += log.calories;
                }
            }
        });

        const [year, month, day] = date.split('-');
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        const label = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return {
            name: label,
            Healthy: healthyCals || (userSession?.user ? 0 : 500 + Math.round(Math.random() * 150)),
            Unhealthy: unhealthyCals || (userSession?.user ? 0 : 300 + Math.round(Math.random() * 200))
        };
    });

    // Calculate today's budget split for Pie Chart
    const todayLogs = logs.filter(log => log.date === todayStr);
    const totalToday = todayLogs.reduce((sum, log) => sum + log.calories, 0);
    const target = profile.calorieTarget || 2000;

    const pieData: { name: string; value: number; color: string }[] = [];
    let remaining = 0;
    let consumed = 0;
    let extraEaten = 0;

    if (totalToday <= target) {
        consumed = totalToday;
        remaining = target - totalToday;
        extraEaten = 0;

        pieData.push({ name: 'Consumed Calories', value: consumed, color: '#0F9D77' });
        pieData.push({ name: 'Remaining Target', value: remaining, color: '#e5e7eb' });
    } else {
        consumed = target;
        remaining = 0;
        extraEaten = totalToday - target;

        pieData.push({ name: 'Consumed Target', value: consumed, color: '#0F9D77' });
        pieData.push({ name: 'Extra Eaten (Over)', value: extraEaten, color: '#ef4444' });
    }

    return (
        <div className="bg-white border border-gray-100 rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-10 md:mb-14 lg:mb-16">
            <div>
                <span className="text-brand-purple text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider bg-brand-tint-purple border border-brand-purple/20 px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 rounded-full inline-block">
                    📊 Live Metrics Overview
                </span>
                <h2 className="font-display font-black text-base sm:text-lg md:text-xl lg:text-2xl text-brand-black tracking-tight mt-2 sm:mt-2.5 md:mt-3">
                    {userSession?.user ? "Your Live Calorie & Quality Analytics" : "Preview Analytics Dashboard"}
                </h2>
                <p className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-gray-500 mt-1">
                    See your food health balance and goal budget status in real-time.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-1 sm:pt-2 md:pt-4">

                {/* Chart 1: Healthy vs Unhealthy calories (Bar Chart) */}
                <div className="border border-gray-50 bg-gray-50/20 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl space-y-2.5 sm:space-y-3 md:space-y-4">
                    <div>
                        <h3 className="font-display font-black text-xs sm:text-sm md:text-base text-gray-800">Food Intake Classification</h3>
                        <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 font-semibold">Compares calories from healthy catalog items versus custom/unprocessed additions.</p>
                    </div>

                    <div className="h-40 sm:h-52 md:h-60 lg:h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={9} tickLine={false} interval={0} />
                                <YAxis stroke="#9ca3af" fontSize={9} tickLine={false} width={30} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#151515', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="top" height={30} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                <Bar dataKey="Healthy" fill="#0F9D77" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Unhealthy" fill="#7C5CE0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Today's Budget Allocation (Pie Chart) */}
                <div className="border border-gray-50 bg-gray-50/20 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-5 md:gap-6">
                    <div className="space-y-2.5 sm:space-y-3 md:space-y-4 max-w-xs w-full">
                        <div>
                            <h3 className="font-display font-black text-xs sm:text-sm md:text-base text-gray-800">Calorie Goal Completion</h3>
                            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 font-semibold">Visualizing today's calorie targets, eaten budget, and any extra calories consumed.</p>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                            <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold text-gray-600">
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-green inline-block" /> Eaten Target:</span>
                                <span className="font-black text-brand-black">{consumed} kcal</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold text-gray-600">
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gray-200 inline-block" /> Remaining:</span>
                                <span className="font-black text-brand-black">{remaining} kcal</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold text-gray-600">
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 inline-block" /> Extra Calories:</span>
                                <span className="font-black text-red-500">{extraEaten} kcal</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-60 lg:w-60 relative flex items-center justify-center flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={38}
                                    outerRadius={62}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#151515', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-tight text-brand-black">{totalToday}</span>
                            <span className="text-[6px] sm:text-[7px] md:text-[8px] font-black text-gray-400 uppercase tracking-wider">kcal today</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AnalyticsDashboard;