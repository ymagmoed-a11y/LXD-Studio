"use client";

import React from 'react';

export default function Dashboard() {
  const bars = [
    { pct: 30, color: 'bg-surface-dim' },
    { pct: 45, color: 'bg-secondary-fixed-dim' },
    { pct: 60, color: 'bg-secondary-fixed-dim' },
    { pct: 85, color: 'bg-secondary' },
    { pct: 70, color: 'bg-secondary' },
    { pct: 90, color: 'bg-secondary-fixed-dim' },
    { pct: 95, color: 'bg-secondary' },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-body-sm text-on-surface-variant mb-1">Overview</p>
          <h2 className="text-display-lg font-headline text-on-surface tracking-tight">Operations Center</h2>
        </div>
        <div className="hidden sm:flex gap-2">
          <button className="btn-secondary">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            This Month
          </button>
          <button className="btn-primary">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Completion Rate */}
        <div className="card p-6 relative overflow-hidden group">
          <div className="kpi-bar bg-accent-sky"></div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-body-sm text-on-surface-variant font-medium">Completion Rate</p>
            <span className="material-symbols-outlined text-secondary-container">done_all</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-headline-lg font-headline text-on-surface">84.2%</h3>
            <span className="text-label-sm text-accent-teal flex items-center">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span> 2.1%
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-2">Across all active modules</p>
        </div>

        {/* Active Learners */}
        <div className="card p-6 relative overflow-hidden">
          <div className="kpi-bar bg-secondary"></div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-body-sm text-on-surface-variant font-medium">Active Learners</p>
            <span className="material-symbols-outlined text-secondary">groups</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-headline-lg font-headline text-on-surface">1,248</h3>
            <span className="text-label-sm text-on-surface-variant flex items-center">Stable</span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-2">Currently enrolled staff</p>
        </div>

        {/* Compliance Status */}
        <div className="card p-6 relative overflow-hidden">
          <div className="kpi-bar bg-error"></div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-body-sm text-on-surface-variant font-medium">Compliance Status</p>
            <span className="material-symbols-outlined text-error">warning</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-headline-lg font-headline text-on-surface">91.5%</h3>
            <span className="text-label-sm text-error flex items-center">
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span> 0.5%
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-2">42 critical gaps identified</p>
        </div>

        {/* Avg Assessment Score */}
        <div className="card p-6 relative overflow-hidden">
          <div className="kpi-bar bg-accent-green"></div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-body-sm text-on-surface-variant font-medium">Avg. Assessment Score</p>
            <span className="material-symbols-outlined text-accent-green">score</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-headline-lg font-headline text-on-surface">88/100</h3>
            <span className="text-label-sm text-accent-teal flex items-center">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span> 1pt
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-2">Last 30 days rolling average</p>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Chart & Active Learners */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Chart Widget */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-headline-sm font-headline text-on-surface">Course Completion Progress</h3>
                <p className="text-body-sm text-on-surface-variant">Q3 Mandatory Safety Training Pipeline</p>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>

            {/* Bar Chart */}
            <div className="h-64 w-full flex items-end justify-between gap-1 border-b border-outline-variant pb-1 relative">
              {/* Y Axis Lines */}
              <div className="absolute w-full border-b border-outline-variant border-dashed top-0"></div>
              <div className="absolute w-full border-b border-outline-variant border-dashed top-1/4"></div>
              <div className="absolute w-full border-b border-outline-variant border-dashed top-2/4"></div>
              <div className="absolute w-full border-b border-outline-variant border-dashed top-3/4"></div>

              {/* Bars */}
              {bars.map((bar, index) => (
                <div
                  key={index}
                  className={`w-full ${bar.color} rounded-t-sm relative group z-10 transition-all duration-300 hover:opacity-80 cursor-pointer`}
                  style={{ height: `${bar.pct}%` }}
                >
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-inverse-surface text-on-primary text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                    {bar.pct}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-label-sm text-on-surface-variant">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Active Learners Table */}
          <div className="card p-6">
            <h3 className="text-headline-sm font-headline text-on-surface mb-4">Active Learners</h3>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Current Module</th>
                    <th>Progress</th>
                    <th className="text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-label-sm font-bold text-on-secondary-container">SJ</div>
                      <span className="font-medium text-on-surface">Sarah Jenkins</span>
                    </td>
                    <td className="text-on-surface-variant">Advanced Lockout/Tagout</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar"><div className="progress-bar-fill bg-accent-sky" style={{ width: '75%' }}></div></div>
                        <span className="text-label-sm text-on-surface-variant">75%</span>
                      </div>
                    </td>
                    <td className="text-right"><span className="badge badge-progress">In Progress</span></td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-surface-tint flex items-center justify-center text-label-sm font-bold text-on-primary">MR</div>
                      <span className="font-medium text-on-surface">Marcus Reed</span>
                    </td>
                    <td className="text-on-surface-variant">Hazard Communication Standard</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar"><div className="progress-bar-fill bg-accent-green" style={{ width: '100%' }}></div></div>
                        <span className="text-label-sm text-on-surface-variant">100%</span>
                      </div>
                    </td>
                    <td className="text-right"><span className="badge badge-complete">Completed</span></td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-label-sm font-bold text-on-primary-fixed">DC</div>
                      <span className="font-medium text-on-surface">David Chen</span>
                    </td>
                    <td className="text-on-surface-variant">Forklift Operator Refresher</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar"><div className="progress-bar-fill bg-error" style={{ width: '10%' }}></div></div>
                        <span className="text-label-sm text-on-surface-variant">10%</span>
                      </div>
                    </td>
                    <td className="text-right"><span className="badge badge-overdue">Overdue</span></td>
                  </tr>
                  <tr>
                    <td className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-label-sm font-bold text-on-tertiary-fixed">ER</div>
                      <span className="font-medium text-on-surface">Elena Rodriguez</span>
                    </td>
                    <td className="text-on-surface-variant">Onboarding Sequence</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar"><div className="progress-bar-fill bg-secondary" style={{ width: '55%' }}></div></div>
                        <span className="text-label-sm text-on-surface-variant">55%</span>
                      </div>
                    </td>
                    <td className="text-right"><span className="badge badge-progress">In Progress</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Alerts & Activity Feed */}
        <div className="flex flex-col gap-6">

          {/* Alerts Widget */}
          <div className="bg-error-container/20 rounded-xl border border-error/20 p-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-error mt-0.5">notifications_active</span>
              <div>
                <h4 className="text-label-md font-bold text-on-error-container">Action Required</h4>
                <p className="text-body-sm text-on-surface mt-1 mb-2">12 employees are overdue for mandatory OSHA compliance training. Certification expires in 48 hours.</p>
                <button className="text-label-sm font-semibold text-error hover:underline">View Overdue List</button>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card p-6 flex-1">
            <h3 className="text-headline-sm font-headline text-on-surface mb-6">Recent Activity</h3>
            <div className="relative border-l-2 border-surface-dim ml-1.5 pl-4 flex flex-col gap-6">

              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-3 h-3 bg-accent-green rounded-full border-2 border-surface-container-lowest"></span>
                <p className="text-label-sm text-on-surface-variant mb-1">10 mins ago</p>
                <p className="text-body-sm text-on-surface"><span className="font-semibold">Facility Team A</span> completed &apos;Emergency Evacuation Protocol&apos;.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-3 h-3 bg-secondary rounded-full border-2 border-surface-container-lowest"></span>
                <p className="text-label-sm text-on-surface-variant mb-1">1 hour ago</p>
                <p className="text-body-sm text-on-surface"><span className="font-semibold">Admin</span> published new course: &apos;Cybersecurity Basics 2024&apos;.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-3 h-3 bg-error rounded-full border-2 border-surface-container-lowest"></span>
                <p className="text-label-sm text-on-surface-variant mb-1">3 hours ago</p>
                <p className="text-body-sm text-on-surface">System alert: &apos;Warehouse Safety V2&apos; assessment failure rate exceeded 20% threshold.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-1 w-3 h-3 bg-surface-tint rounded-full border-2 border-surface-container-lowest"></span>
                <p className="text-label-sm text-on-surface-variant mb-1">Yesterday</p>
                <p className="text-body-sm text-on-surface"><span className="font-semibold">Elena R.</span> enrolled 45 new hires into &apos;Onboarding Sequence&apos;.</p>
              </div>

            </div>
            <button className="w-full mt-6 py-2 text-label-sm text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
              View Full Log
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
