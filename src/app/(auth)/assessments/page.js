"use client";

import React, { useState, useMemo } from 'react';

const assessmentsData = [
  { id: 1, name: 'Forklift Safety Final Exam', course: 'Forklift Safety Certification', type: 'Mixed', duration: 45, passRate: 78, submissions: 1248, status: 'Active' },
  { id: 2, name: 'Hazard Communication Quiz', course: 'Hazard Communication Standard', type: 'Multiple Choice', duration: 20, passRate: 91, submissions: 892, status: 'Active' },
  { id: 3, name: 'Emergency Response Test', course: 'Emergency Evacuation Protocol', type: 'Mixed', duration: 30, passRate: 85, submissions: 2100, status: 'Active' },
  { id: 4, name: 'Lockout/Tagout Assessment', course: 'Lockout/Tagout Procedures', type: 'Practical', duration: 60, passRate: 72, submissions: 1100, status: 'Active' },
  { id: 5, name: 'Cybersecurity Awareness Quiz', course: 'Cybersecurity Basics 2024', type: 'Multiple Choice', duration: 15, passRate: null, submissions: 0, status: 'Draft' },
  { id: 6, name: 'Warehouse Safety Check', course: 'Warehouse Operations Manual', type: 'Mixed', duration: 25, passRate: 68, submissions: 456, status: 'Active' },
  { id: 7, name: 'New Hire Orientation Quiz', course: 'New Employee Onboarding', type: 'True/False', duration: 10, passRate: 95, submissions: 320, status: 'Active' },
  { id: 8, name: 'Quality Standards Test', course: 'Quality Control Standards', type: 'Multiple Choice', duration: 35, passRate: 82, submissions: 780, status: 'Archived' },
  { id: 9, name: 'Equipment Operation Exam', course: 'Forklift Safety Certification', type: 'Practical', duration: 45, passRate: 74, submissions: 890, status: 'Active' },
  { id: 10, name: 'Leadership Skills Assessment', course: 'Leadership Development', type: 'Mixed', duration: 30, passRate: null, submissions: 0, status: 'Draft' },
];

const recentSubmissions = [
  { student: 'Sarah Jenkins', initials: 'SJ', assessment: 'Forklift Safety Final Exam', score: 92, result: 'Pass', time: '5 min ago', color: 'bg-secondary-container' },
  { student: 'Marcus Reed', initials: 'MR', assessment: 'Emergency Response Test', score: 67, result: 'Fail', time: '12 min ago', color: 'bg-surface-tint' },
  { student: 'David Chen', initials: 'DC', assessment: 'Hazard Communication Quiz', score: 88, result: 'Pass', time: '28 min ago', color: 'bg-primary-fixed' },
  { student: 'Elena Rodriguez', initials: 'ER', assessment: 'Lockout/Tagout Assessment', score: 74, result: 'Pass', time: '1 hour ago', color: 'bg-tertiary-fixed' },
  { student: 'James Kim', initials: 'JK', assessment: 'Warehouse Safety Check', score: 55, result: 'Fail', time: '2 hours ago', color: 'bg-secondary' },
];

function getTypeIcon(type) {
  switch (type) {
    case 'Multiple Choice': return 'checklist';
    case 'True/False': return 'toggle_on';
    case 'Mixed': return 'dashboard_customize';
    case 'Practical': return 'construction';
    default: return 'quiz';
  }
}

function getPassRateColor(rate) {
  if (rate === null) return 'bg-outline-variant';
  if (rate > 85) return 'bg-accent-green';
  if (rate >= 70) return 'bg-accent-sky';
  return 'bg-amber-500';
}

function getPassRateTextColor(rate) {
  if (rate === null) return 'text-on-surface-variant';
  if (rate > 85) return 'text-accent-green';
  if (rate >= 70) return 'text-accent-sky';
  return 'text-amber-500';
}

function StatusBadge({ status }) {
  switch (status) {
    case 'Active': return <span className="badge badge-published">Active</span>;
    case 'Draft': return <span className="badge badge-draft">Draft</span>;
    case 'Archived': return <span className="badge" style={{ background: '#f0f0f0', color: '#666' }}>Archived</span>;
    default: return <span className="badge">{status}</span>;
  }
}

export default function AssessmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredAssessments = useMemo(() => {
    return assessmentsData.filter(a => {
      const matchSearch = !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.course.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCourse = !courseFilter || a.course.toLowerCase() === courseFilter;
      const matchType = !typeFilter || a.type === typeFilter;
      const matchStatus = !statusFilter || a.status === statusFilter;
      return matchSearch && matchCourse && matchType && matchStatus;
    });
  }, [searchQuery, courseFilter, typeFilter, statusFilter]);

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <p className="text-body-sm text-on-surface-variant mb-1">Manage & Review</p>
          <h2 className="text-display-lg font-headline text-on-surface tracking-tight">Assessments</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Create, manage, and review training assessments</p>
        </div>
        <button className="btn-primary shrink-0">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Create Assessment
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Assessments */}
        <div className="card p-5 relative overflow-hidden group hover:shadow-md transition-shadow duration-200">
          <div className="kpi-bar bg-secondary"></div>
          <div className="flex justify-between items-start mb-3">
            <p className="text-body-sm text-on-surface-variant font-medium">Total Assessments</p>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
              <span className="material-symbols-outlined text-secondary">quiz</span>
            </div>
          </div>
          <h3 className="text-headline-lg font-headline text-on-surface">24</h3>
          <p className="text-label-sm text-on-surface-variant mt-1">Across all courses</p>
        </div>

        {/* Avg Pass Rate */}
        <div className="card p-5 relative overflow-hidden group hover:shadow-md transition-shadow duration-200">
          <div className="kpi-bar bg-accent-green"></div>
          <div className="flex justify-between items-start mb-3">
            <p className="text-body-sm text-on-surface-variant font-medium">Avg Pass Rate</p>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center group-hover:bg-accent-green/10 transition-colors">
              <span className="material-symbols-outlined text-accent-green">check_circle</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-headline-lg font-headline text-on-surface">82.5%</h3>
            <span className="text-label-sm text-accent-green flex items-center">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>3.2%
            </span>
          </div>
          <p className="text-label-sm text-on-surface-variant mt-1">Last 30 days</p>
        </div>

        {/* Pending Reviews */}
        <div className="card p-5 relative overflow-hidden group hover:shadow-md transition-shadow duration-200">
          <div className="kpi-bar bg-amber-500"></div>
          <div className="flex justify-between items-start mb-3">
            <p className="text-body-sm text-on-surface-variant font-medium">Pending Reviews</p>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
              <span className="material-symbols-outlined text-amber-500">pending</span>
            </div>
          </div>
          <h3 className="text-headline-lg font-headline text-on-surface">18</h3>
          <p className="text-label-sm text-on-surface-variant mt-1">Awaiting manual grading</p>
        </div>

        {/* Failed Attempts */}
        <div className="card p-5 relative overflow-hidden group hover:shadow-md transition-shadow duration-200">
          <div className="kpi-bar bg-error"></div>
          <div className="flex justify-between items-start mb-3">
            <p className="text-body-sm text-on-surface-variant font-medium">Failed Attempts</p>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center group-hover:bg-error/10 transition-colors">
              <span className="material-symbols-outlined text-error">cancel</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-headline-lg font-headline text-on-surface">156</h3>
            <span className="text-label-sm text-error flex items-center">
              <span className="material-symbols-outlined text-[14px]">arrow_downward</span>12
            </span>
          </div>
          <p className="text-label-sm text-on-surface-variant mt-1">This month</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Search assessments..." 
              className="input-field input-with-icon w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Course Filter */}
          <div className="relative">
            <select 
              className="input-field appearance-none pr-9 min-w-[180px] cursor-pointer"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="">All Courses</option>
              <option value="forklift safety certification">Forklift Safety Certification</option>
              <option value="hazard communication standard">Hazard Communication Standard</option>
              <option value="emergency evacuation protocol">Emergency Evacuation Protocol</option>
              <option value="lockout/tagout procedures">Lockout/Tagout Procedures</option>
              <option value="cybersecurity basics 2024">Cybersecurity Basics 2024</option>
              <option value="warehouse operations manual">Warehouse Operations Manual</option>
              <option value="new employee onboarding">New Employee Onboarding</option>
              <option value="quality control standards">Quality Control Standards</option>
              <option value="leadership development">Leadership Development</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select 
              className="input-field appearance-none pr-9 min-w-[160px] cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True/False">True/False</option>
              <option value="Mixed">Mixed</option>
              <option value="Practical">Practical</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select 
              className="input-field appearance-none pr-9 min-w-[130px] cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>

      {/* Assessments Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">assignment</span>
            <h3 className="text-headline-sm font-headline text-on-surface">All Assessments</h3>
          </div>
          <span className="text-label-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
            {filteredAssessments.length} assessment{filteredAssessments.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="min-w-[220px]">Assessment Name</th>
                <th className="min-w-[180px]">Associated Course</th>
                <th className="min-w-[140px]">Type</th>
                <th className="min-w-[90px]">Duration</th>
                <th className="min-w-[150px]">Pass Rate</th>
                <th className="min-w-[100px]">Submissions</th>
                <th className="min-w-[90px]">Status</th>
                <th className="min-w-[110px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessments.map(a => {
                const passDisplay = a.passRate !== null ? `${a.passRate}%` : 'N/A';
                const barWidth = a.passRate !== null ? a.passRate : 0;
                const barColor = getPassRateColor(a.passRate);
                const textColor = getPassRateTextColor(a.passRate);

                return (
                  <tr key={a.id} className="group hover:bg-surface-container-low/60 transition-colors duration-150 cursor-pointer">
                    <td>
                      <div className="flex flex-col">
                        <span className="font-medium text-on-surface group-hover:text-secondary transition-colors">{a.name}</span>
                        <span className="text-label-sm text-on-surface-variant mt-0.5">{a.duration} min · {a.submissions.toLocaleString()} submissions</span>
                      </div>
                    </td>
                    <td className="text-on-surface-variant text-body-sm">{a.course}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined outlined text-[18px] text-on-surface-variant">{getTypeIcon(a.type)}</span>
                        <span className="text-body-sm text-on-surface">{a.type}</span>
                      </div>
                    </td>
                    <td className="text-body-sm text-on-surface-variant">{a.duration} min</td>
                    <td>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="progress-bar flex-1">
                          <div className={`progress-bar-fill ${barColor} transition-all duration-500`} style={{ width: `${barWidth}%` }}></div>
                        </div>
                        <span className={`text-label-sm font-semibold ${textColor} w-10 text-right`}>{passDisplay}</span>
                      </div>
                    </td>
                    <td className="text-body-sm text-on-surface-variant font-medium">{a.submissions.toLocaleString()}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button className="btn-icon w-8 h-8 text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors" title="View">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button className="btn-icon w-8 h-8 text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors" title="Edit">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="btn-icon w-8 h-8 text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors" title="Duplicate">
                          <span className="material-symbols-outlined text-[18px]">content_copy</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredAssessments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-[48px] text-outline-variant mb-3">search_off</span>
            <p className="text-headline-sm font-headline text-on-surface-variant">No assessments found</p>
            <p className="text-body-sm text-on-surface-variant mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Table footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-outline-variant/50 bg-surface-container-low/30">
          <span className="text-label-sm text-on-surface-variant">Showing <span>{filteredAssessments.length}</span> of 24 assessments</span>
          <div className="flex items-center gap-1">
            <button className="btn-icon w-8 h-8 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-on-primary text-label-sm font-semibold">1</button>
            <button className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container text-label-sm transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container text-label-sm transition-colors">3</button>
            <button className="btn-icon w-8 h-8 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Submissions Panel */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">history</span>
            <h3 className="text-headline-sm font-headline text-on-surface">Recent Submissions</h3>
          </div>
          <span className="text-label-sm text-on-surface-variant">Updated just now</span>
        </div>
        <div className="px-6 py-2">
          {recentSubmissions.map((s, idx) => {
            const scoreColor = s.score >= 80 ? 'text-accent-green' : s.score >= 70 ? 'text-accent-sky' : 'text-error';
            const resultBadge = s.result === 'Pass'
              ? <span className="badge badge-complete">Pass</span>
              : <span className="badge badge-overdue">Fail</span>;
            return (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-outline-variant/50 last:border-b-0 hover:bg-surface-container-low/40 -mx-2 px-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-full ${s.color} flex items-center justify-center text-label-sm font-bold text-on-secondary-container shrink-0`}>{s.initials}</div>
                  <div className="min-w-0">
                    <p className="text-body-sm font-medium text-on-surface truncate">{s.student}</p>
                    <p className="text-label-sm text-on-surface-variant truncate">{s.assessment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className={`text-body-sm font-semibold ${scoreColor} w-10 text-right`}>{s.score}%</span>
                  {resultBadge}
                  <span className="text-label-sm text-on-surface-variant hidden sm:inline w-20 text-right">{s.time}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-6 py-4 border-t border-outline-variant/50">
          <button className="w-full py-2.5 text-label-md font-medium text-on-surface-variant border border-outline-variant rounded-xl hover:bg-surface-container-low hover:text-secondary transition-all duration-200 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            View All Submissions
          </button>
        </div>
      </div>
    </div>
  );
}
