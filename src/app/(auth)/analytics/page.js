"use client";

import { useState, useEffect } from 'react';

// Static Data
const kpis = [
  { label: 'Total Training Hours', value: '14,256', unit: 'hrs', change: '↑ 12%', changeType: 'up', icon: 'schedule', color: 'bg-secondary', iconColor: 'text-secondary' },
  { label: 'Courses Completed', value: '3,847', unit: '', change: '↑ 8%', changeType: 'up', icon: 'school', color: 'bg-accent-sky', iconColor: 'text-accent-sky' },
  { label: 'Active Enrollments', value: '2,156', unit: '', change: 'Stable', changeType: 'stable', icon: 'group', color: 'bg-secondary-container', iconColor: 'text-secondary-container' },
  { label: 'Avg Score', value: '88', unit: '/100', change: '↑ 1pt', changeType: 'up', icon: 'emoji_events', color: 'bg-accent-green', iconColor: 'text-accent-green' },
  { label: 'Certification Rate', value: '94.2', unit: '%', change: '↑ 3.1%', changeType: 'up', icon: 'verified', color: 'bg-accent-teal', iconColor: 'text-accent-teal' },
];

const completionData = [
  { month: 'Jan', value: 420, pct: 67.7 },
  { month: 'Feb', value: 380, pct: 61.3 },
  { month: 'Mar', value: 510, pct: 82.3 },
  { month: 'Apr', value: 490, pct: 79.0 },
  { month: 'May', value: 620, pct: 100 },
  { month: 'Jun', value: 580, pct: 93.5 },
];

const departments = [
  { name: 'Executive', pct: 97 },
  { name: 'Engineering', pct: 94 },
  { name: 'HR', pct: 91 },
  { name: 'Manufacturing', pct: 84 },
  { name: 'Warehouse', pct: 78 },
];

const scoreDistribution = [
  { range: '0-20', pct: 2 },
  { range: '21-40', pct: 5 },
  { range: '41-60', pct: 12 },
  { range: '61-80', pct: 35 },
  { range: '81-100', pct: 46 },
];

const topCourses = [
  { name: 'Advanced Safety Protocols', enrollments: 842, avgScore: 94, completion: 98, satisfaction: 4.9 },
  { name: 'Leadership Essentials', enrollments: 614, avgScore: 91, completion: 96, satisfaction: 4.8 },
  { name: 'Cybersecurity Fundamentals', enrollments: 578, avgScore: 89, completion: 94, satisfaction: 4.7 },
  { name: 'Data Privacy & Compliance', enrollments: 503, avgScore: 87, completion: 92, satisfaction: 4.6 },
  { name: 'First Aid & Emergency Response', enrollments: 467, avgScore: 92, completion: 97, satisfaction: 4.8 },
];

/* ── SVG helpers ─────────────────────────────────── */
const svgW = 520, svgH = 200, padX = 0, padY = 20;
const chartW = svgW - padX * 2;
const chartH = svgH - padY * 2;
const maxVal = 620;
const points = completionData.map((d, i) => {
  const x = padX + (i / (completionData.length - 1)) * chartW;
  const y = padY + chartH - (d.value / maxVal) * chartH;
  return `${x},${y}`;
});
const polyline = points.join(' ');
// Area polygon: go along top, then back along bottom
const areaPoints = `${padX},${padY + chartH} ${polyline} ${padX + chartW},${padY + chartH}`;

/* ── Donut CSS ──────────────────────────────────── */
const donutCompliant = 87.3;
const donutNonCompliant = 8.5;
const donutOverdue = 4.2;
const donutGradient = `conic-gradient(#10B981 0% ${donutCompliant}%, #f59e0b ${donutCompliant}% ${donutCompliant + donutNonCompliant}%, #ba1a1a ${donutCompliant + donutNonCompliant}% 100%)`;

/* ── Dept bar color helper ──────────────────────── */
function deptBarColor(pct) {
  if (pct >= 90) return 'bg-accent-green';
  if (pct >= 80) return 'bg-accent-sky';
  return 'bg-[#f59e0b]';
}

/* ── Score bar color ────────────────────────────── */
const scoreColors = ['bg-error', 'bg-[#f97316]', 'bg-[#f59e0b]', 'bg-accent-sky', 'bg-accent-green'];

/* ── Star helper ────────────────────────────────── */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;
  const empty = 5 - full - (half ? 1 : 0);
  
  const stars = [];
  for (let i = 0; i < full; i++) {
    stars.push(<span key={`f-${i}`} className="material-symbols-outlined text-[16px] text-[#f59e0b]">star</span>);
  }
  if (half) {
    stars.push(<span key="h" className="material-symbols-outlined text-[16px] text-[#f59e0b]">star_half</span>);
  }
  for (let i = 0; i < empty; i++) {
    stars.push(<span key={`e-${i}`} className="material-symbols-outlined outlined text-[16px] text-outline-variant">star</span>);
  }
  return stars;
}

export default function Analytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Slight delay to ensure the DOM is ready for the CSS transition
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6 page-enter">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <p className="text-body-sm text-on-surface-variant mb-1">Insights across all training programs</p>
          <h2 className="text-display-lg font-headline text-on-surface tracking-tight">Training Analytics</h2>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Last 30 Days
          </button>
          <button className="btn-primary">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k, idx) => (
          <div key={idx} className="card p-5 relative overflow-hidden group hover:shadow-md transition-shadow duration-200" style={{ animationDelay: `${idx * 60}ms` }}>
            <div className={`kpi-bar ${k.color}`}></div>
            <div className="flex justify-between items-start mb-3">
              <p className="text-body-sm text-on-surface-variant font-medium leading-tight">{k.label}</p>
              <span className={`material-symbols-outlined ${k.iconColor} text-[20px]`}>{k.icon}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-headline-lg font-headline text-on-surface">{k.value}</h3>
              <span className="text-body-sm text-on-surface-variant">{k.unit}</span>
            </div>
            <span className={`inline-flex items-center mt-2 text-label-sm ${k.changeType === 'up' ? 'text-accent-teal' : 'text-on-surface-variant'}`}>
              {k.changeType === 'up' && <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>}
              {k.change}
            </span>
          </div>
        ))}
      </div>

      {/* Charts 2×2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. Completion Trend */}
        <div className="card p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-headline-sm font-headline text-on-surface">Completion Trend</h3>
              <p className="text-body-sm text-on-surface-variant mt-0.5">Monthly completions over 6 months</p>
            </div>
            <button className="btn-icon"><span className="material-symbols-outlined text-[20px]">more_horiz</span></button>
          </div>
          <div className="w-full overflow-hidden">
            <svg viewBox={`0 0 ${svgW} ${svgH + 30}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
                const y = padY + chartH - f * chartH;
                return (
                  <line 
                    key={`gl-${i}`} 
                    x1={padX} 
                    y1={y} 
                    x2={padX + chartW} 
                    y2={y} 
                    stroke="#c6c6cd" 
                    strokeWidth="0.5" 
                    strokeDasharray={f === 0 ? '0' : '4 3'} 
                  />
                );
              })}

              {/* Y-axis labels */}
              {[0, 155, 310, 465, 620].map((v, i) => {
                const y = padY + chartH - (i / 4) * chartH;
                return (
                  <text key={`yl-${i}`} x={padX} y={y - 5} fill="#76777d" fontSize="10" fontFamily="Inter">
                    {v}
                  </text>
                );
              })}

              {/* Area fill */}
              <polygon points={areaPoints} fill="url(#areaGrad)" opacity="0.25" />

              {/* Line */}
              <polyline points={polyline} fill="none" stroke="#00668a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Dots */}
              {completionData.map((d, i) => {
                const x = padX + (i / (completionData.length - 1)) * chartW;
                const y = padY + chartH - (d.value / maxVal) * chartH;
                return (
                  <g key={`d-${i}`}>
                    <circle cx={x} cy={y} r="4" fill="#00668a" stroke="#fff" strokeWidth="2" className="analytics-dot" />
                    <text x={x} y={y - 12} textAnchor="middle" fill="#0b1c30" fontSize="11" fontWeight="600" fontFamily="Inter">
                      {d.value}
                    </text>
                  </g>
                );
              })}

              {/* X axis labels */}
              {completionData.map((d, i) => {
                const x = padX + (i / (completionData.length - 1)) * chartW;
                return (
                  <text key={`xl-${i}`} x={x} y={svgH + 18} textAnchor="middle" fill="#76777d" fontSize="11" fontFamily="Inter">
                    {d.month}
                  </text>
                );
              })}

              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#40c2fd" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#40c2fd" stopOpacity="0.02" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* 2. Department Comparison */}
        <div className="card p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-headline-sm font-headline text-on-surface">Department Comparison</h3>
              <p className="text-body-sm text-on-surface-variant mt-0.5">Average completion rate by department</p>
            </div>
            <button className="btn-icon"><span className="material-symbols-outlined text-[20px]">more_horiz</span></button>
          </div>
          <div className="flex flex-col gap-4">
            {departments.map((d, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-body-sm font-medium text-on-surface">{d.name}</span>
                  <span className="text-label-md font-bold text-on-surface">{d.pct}%</span>
                </div>
                <div className="w-full bg-surface-dim rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${deptBarColor(d.pct)} transition-all duration-500 group-hover:opacity-80`} 
                    style={{ width: mounted ? `${d.pct}%` : '0%', transitionDelay: `${100 + i * 80}ms` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5 mt-5 pt-4 border-t border-outline-variant/50">
            <div className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green inline-block"></span> ≥ 90%
            </div>
            <div className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-sky inline-block"></span> 80–89%
            </div>
            <div className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] inline-block"></span> &lt; 80%
            </div>
          </div>
        </div>

        {/* 3. Score Distribution */}
        <div className="card p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-headline-sm font-headline text-on-surface">Score Distribution</h3>
              <p className="text-body-sm text-on-surface-variant mt-0.5">Assessment score ranges</p>
            </div>
            <button className="btn-icon"><span className="material-symbols-outlined text-[20px]">more_horiz</span></button>
          </div>
          <div className="flex items-end justify-between gap-3 h-52 border-b border-outline-variant pb-1 relative">
            {/* Grid lines */}
            <div className="absolute w-full border-b border-outline-variant/40 border-dashed top-0"></div>
            <div className="absolute w-full border-b border-outline-variant/40 border-dashed top-1/4"></div>
            <div className="absolute w-full border-b border-outline-variant/40 border-dashed top-2/4"></div>
            <div className="absolute w-full border-b border-outline-variant/40 border-dashed top-3/4"></div>

            {scoreDistribution.map((s, i) => {
              const heightPct = (s.pct / 46) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end z-10 group cursor-pointer">
                  <span className="text-label-sm font-bold text-on-surface opacity-0 group-hover:opacity-100 transition-opacity">
                    {s.pct}%
                  </span>
                  <div 
                    className={`${scoreColors[i]} rounded-t-lg w-full transition-all duration-300 group-hover:opacity-80 relative`} 
                    style={{ height: mounted ? `${heightPct}%` : '0%', transitionDelay: `${200 + i * 100}ms` }}
                  >
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-label-sm font-semibold text-on-surface whitespace-nowrap">
                      {s.pct}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-label-sm text-on-surface-variant">
            {scoreDistribution.map((s, i) => (
              <span key={i} className="flex-1 text-center">{s.range}</span>
            ))}
          </div>
        </div>

        {/* 4. Compliance Donut */}
        <div className="card p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-headline-sm font-headline text-on-surface">Compliance Status</h3>
              <p className="text-body-sm text-on-surface-variant mt-0.5">Current workforce compliance</p>
            </div>
            <button className="btn-icon"><span className="material-symbols-outlined text-[20px]">more_horiz</span></button>
          </div>
          <div className="flex flex-col items-center">
            {/* Donut */}
            <div className="relative w-48 h-48 rounded-full flex items-center justify-center" style={{ background: donutGradient }}>
              <div className="w-32 h-32 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-headline-lg font-headline text-on-surface leading-none">{donutCompliant}%</span>
                <span className="text-label-sm text-on-surface-variant mt-1">Compliant</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent-green inline-block"></span>
                <div>
                  <p className="text-label-sm font-semibold text-on-surface">87.3%</p>
                  <p className="text-[10px] text-on-surface-variant">Compliant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block"></span>
                <div>
                  <p className="text-label-sm font-semibold text-on-surface">8.5%</p>
                  <p className="text-[10px] text-on-surface-variant">Non-Compliant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error inline-block"></span>
                <div>
                  <p className="text-label-sm font-semibold text-on-surface">4.2%</p>
                  <p className="text-[10px] text-on-surface-variant">Overdue</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom: Top Performing Courses */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h3 className="text-headline-sm font-headline text-on-surface">Top Performing Courses</h3>
            <p className="text-body-sm text-on-surface-variant mt-0.5">Highest rated courses across the platform</p>
          </div>
          <button className="btn-secondary text-body-sm">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Enrollments</th>
                <th>Avg Score</th>
                <th>Completion Rate</th>
                <th>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {topCourses.map((c, i) => (
                <tr key={i} className="group hover:bg-surface-container-low transition-colors">
                  <td className="text-on-surface-variant font-medium">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[20px]">menu_book</span>
                      <span className="font-medium text-on-surface">{c.name}</span>
                    </div>
                  </td>
                  <td className="text-on-surface-variant">{c.enrollments.toLocaleString()}</td>
                  <td>
                    <span className="inline-flex items-center gap-1">
                      <span className="font-semibold text-on-surface">{c.avgScore}</span>
                      <span className="text-on-surface-variant text-label-sm">/100</span>
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar w-20">
                        <div className="progress-bar-fill bg-accent-green" style={{ width: `${c.completion}%` }}></div>
                      </div>
                      <span className="text-label-sm font-medium text-on-surface">{c.completion}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <div className="flex">{renderStars(c.satisfaction)}</div>
                      <span className="text-label-sm text-on-surface-variant">{c.satisfaction}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
