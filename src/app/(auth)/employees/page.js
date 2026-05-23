"use client";

import React, { useState, useEffect, useRef } from 'react';

const EMPLOYEES = [
  { id: 1,  name: 'Sarah Jenkins',   initials: 'SJ', email: 'sjenkins@company.com',    department: 'Manufacturing', courses: 5, completion: 75,  compliance: 'Compliant',     lastActive: '2h ago',  avatarBg: 'bg-secondary-container text-on-secondary-container' },
  { id: 2,  name: 'Marcus Reed',     initials: 'MR', email: 'mreed@company.com',       department: 'Warehouse',     courses: 4, completion: 100, compliance: 'Compliant',     lastActive: '1h ago',  avatarBg: 'bg-inverse-surface text-on-primary' },
  { id: 3,  name: 'David Chen',      initials: 'DC', email: 'dchen@company.com',       department: 'Manufacturing', courses: 3, completion: 10,  compliance: 'Overdue',       lastActive: '5d ago',  avatarBg: 'bg-primary-fixed text-on-surface' },
  { id: 4,  name: 'Elena Rodriguez', initials: 'ER', email: 'erodriguez@company.com',  department: 'HR',            courses: 6, completion: 55,  compliance: 'Compliant',     lastActive: '3h ago',  avatarBg: 'bg-tertiary-fixed text-on-surface' },
  { id: 5,  name: 'James Wilson',    initials: 'JW', email: 'jwilson@company.com',     department: 'Engineering',   courses: 4, completion: 92,  compliance: 'Compliant',     lastActive: '30m ago', avatarBg: 'bg-accent-sky/20 text-secondary' },
  { id: 6,  name: 'Priya Patel',     initials: 'PP', email: 'ppatel@company.com',      department: 'Manufacturing', courses: 5, completion: 88,  compliance: 'Compliant',     lastActive: '1h ago',  avatarBg: 'bg-accent-green/15 text-accent-teal' },
  { id: 7,  name: 'Robert Kim',      initials: 'RK', email: 'rkim@company.com',        department: 'Warehouse',     courses: 3, completion: 45,  compliance: 'Non-Compliant', lastActive: '2d ago',  avatarBg: 'bg-error-container text-on-error-container' },
  { id: 8,  name: 'Lisa Thompson',   initials: 'LT', email: 'lthompson@company.com',   department: 'Engineering',   courses: 7, completion: 96,  compliance: 'Compliant',     lastActive: '15m ago', avatarBg: 'bg-secondary/15 text-secondary' },
  { id: 9,  name: 'Ahmed Hassan',    initials: 'AH', email: 'ahassan@company.com',     department: 'Manufacturing', courses: 4, completion: 30,  compliance: 'Overdue',       lastActive: '7d ago',  avatarBg: 'bg-surface-dim text-on-surface' },
  { id: 10, name: 'Maria Santos',    initials: 'MS', email: 'msantos@company.com',     department: 'HR',            courses: 5, completion: 82,  compliance: 'Compliant',     lastActive: '4h ago',  avatarBg: 'bg-secondary-container text-on-secondary-container' },
  { id: 11, name: 'Tom Anderson',    initials: 'TA', email: 'tanderson@company.com',   department: 'Warehouse',     courses: 3, completion: 67,  compliance: 'Non-Compliant', lastActive: '1d ago',  avatarBg: 'bg-inverse-surface text-on-primary' },
  { id: 12, name: 'Nina Williams',   initials: 'NW', email: 'nwilliams@company.com',   department: 'Executive',     courses: 2, completion: 100, compliance: 'Compliant',     lastActive: '6h ago',  avatarBg: 'bg-primary-fixed text-on-surface' },
  { id: 13, name: 'Chris Baker',     initials: 'CB', email: 'cbaker@company.com',      department: 'Engineering',   courses: 5, completion: 78,  compliance: 'Compliant',     lastActive: '2h ago',  avatarBg: 'bg-tertiary-fixed text-on-surface' },
  { id: 14, name: 'Yuki Tanaka',     initials: 'YT', email: 'ytanaka@company.com',     department: 'Manufacturing', courses: 4, completion: 60,  compliance: 'Non-Compliant', lastActive: '3d ago',  avatarBg: 'bg-accent-sky/20 text-secondary' },
  { id: 15, name: 'Omar Farouk',     initials: 'OF', email: 'ofarouk@company.com',     department: 'Warehouse',     courses: 3, completion: 15,  compliance: 'Overdue',       lastActive: '10d ago', avatarBg: 'bg-accent-green/15 text-accent-teal' },
];

function getComplianceBadge(compliance) {
  switch (compliance) {
    case 'Compliant':     return <span className="badge badge-complete">Compliant</span>;
    case 'Non-Compliant': return <span className="badge badge-progress" style={{ background: 'rgba(245,158,11,0.12)', color: '#b45309' }}>Non-Compliant</span>;
    case 'Overdue':       return <span className="badge badge-overdue">Overdue</span>;
    default:              return null;
  }
}

function getProgressColor(pct) {
  if (pct >= 90) return 'bg-accent-green';
  if (pct >= 60) return 'bg-accent-sky';
  if (pct >= 40) return 'bg-secondary-container';
  return 'bg-error';
}

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [complianceFilter, setComplianceFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState(new Set());
  
  const filteredEmployees = EMPLOYEES.filter(emp => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch     = !query || emp.name.toLowerCase().includes(query) || emp.email.toLowerCase().includes(query) || emp.department.toLowerCase().includes(query);
    const matchesDept       = deptFilter === 'All' || emp.department === deptFilter;
    const matchesCompliance = complianceFilter === 'All' || emp.compliance === complianceFilter;
    return matchesSearch && matchesDept && matchesCompliance;
  });

  const allSelected = filteredEmployees.length > 0 && selectedIds.size === filteredEmployees.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < filteredEmployees.length;
  
  const selectAllRef = useRef(null);
  
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredEmployees.map(emp => emp.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id, checked) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  // Reset selected when filters change to mimic original behavior
  useEffect(() => {
    setSelectedIds(new Set());
  }, [searchQuery, deptFilter, complianceFilter]);

  return (
    <div className="flex flex-col gap-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <p className="text-body-sm text-on-surface-variant mb-1">People</p>
          <h2 className="text-display-lg font-headline text-on-surface tracking-tight">Employee Directory</h2>
          <p className="text-body-md text-on-surface-variant mt-1">1,248 active employees across 5 departments</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="btn-secondary">
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            Import CSV
          </button>
          <button className="btn-primary">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Employees */}
        <div className="card p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="kpi-bar bg-secondary"></div>
          <div className="flex justify-between items-start mb-3">
            <p className="text-body-sm text-on-surface-variant font-medium">Total Employees</p>
            <span className="material-symbols-outlined text-secondary text-[22px]">groups</span>
          </div>
          <h3 className="text-headline-lg font-headline text-on-surface">1,248</h3>
          <p className="text-label-sm text-on-surface-variant mt-1">Across 5 departments</p>
        </div>

        {/* Fully Compliant */}
        <div className="card p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="kpi-bar bg-accent-green"></div>
          <div className="flex justify-between items-start mb-3">
            <p className="text-body-sm text-on-surface-variant font-medium">Fully Compliant</p>
            <span className="material-symbols-outlined text-accent-green text-[22px]">verified</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-headline-lg font-headline text-on-surface">1,089</h3>
            <span className="text-label-sm text-accent-green font-semibold">87.3%</span>
          </div>
          <p className="text-label-sm text-on-surface-variant mt-1">Meeting all requirements</p>
        </div>

        {/* Training Overdue */}
        <div className="card p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="kpi-bar bg-error"></div>
          <div className="flex justify-between items-start mb-3">
            <p className="text-body-sm text-on-surface-variant font-medium">Training Overdue</p>
            <span className="material-symbols-outlined text-error text-[22px]">warning</span>
          </div>
          <h3 className="text-headline-lg font-headline text-on-surface">42</h3>
          <p className="text-label-sm text-error mt-1">Requires immediate action</p>
        </div>

        {/* Avg Completion */}
        <div className="card p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="kpi-bar bg-accent-sky"></div>
          <div className="flex justify-between items-start mb-3">
            <p className="text-body-sm text-on-surface-variant font-medium">Avg Completion</p>
            <span className="material-symbols-outlined text-accent-sky text-[22px]">trending_up</span>
          </div>
          <h3 className="text-headline-lg font-headline text-on-surface">84.2%</h3>
          <p className="text-label-sm text-on-surface-variant mt-1">Across all enrolled courses</p>
        </div>

      </div>

      {/* Filter Bar */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">

          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input 
              id="emp-search" 
              type="text" 
              placeholder="Search employees..." 
              className="input-field input-with-icon !py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Department */}
          <div className="relative">
            <select 
              id="emp-dept-filter" 
              className="input-field !py-2 pr-8 appearance-none cursor-pointer min-w-[160px]"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Executive">Executive</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
          </div>

          {/* Compliance */}
          <div className="relative">
            <select 
              id="emp-compliance-filter" 
              className="input-field !py-2 pr-8 appearance-none cursor-pointer min-w-[160px]"
              value={complianceFilter}
              onChange={(e) => setComplianceFilter(e.target.value)}
            >
              <option value="All">All Compliance</option>
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
              <option value="Overdue">Overdue</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
          </div>

          {/* Bulk Actions */}
          <div className="relative">
            <select id="emp-bulk-actions" className="input-field !py-2 pr-8 appearance-none cursor-pointer min-w-[150px]" defaultValue="">
              <option value="" disabled>Bulk Actions</option>
              <option value="assign">Assign Course</option>
              <option value="remind">Send Reminder</option>
              <option value="export">Export</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
          </div>

        </div>
      </div>

      {/* Employee Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table" id="emp-table">
            <thead>
              <tr>
                <th className="!pl-4" style={{ width: '30%' }}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="emp-select-all" 
                      className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary-container cursor-pointer"
                      ref={selectAllRef}
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                    Employee
                  </div>
                </th>
                <th>Department</th>
                <th>Enrolled Courses</th>
                <th>Completion %</th>
                <th>Compliance</th>
                <th>Last Active</th>
                <th className="!pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="emp-table-body">
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="row-checkbox w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary-container cursor-pointer" 
                          data-id={emp.id}
                          checked={selectedIds.has(emp.id)}
                          onChange={(e) => handleSelectOne(emp.id, e.target.checked)}
                        />
                      </label>
                      <div className={`w-9 h-9 rounded-full ${emp.avatarBg} flex items-center justify-center text-label-sm font-bold shrink-0`}>{emp.initials}</div>
                      <div className="min-w-0">
                        <p className="font-medium text-on-surface truncate">{emp.name}</p>
                        <p className="text-label-sm text-on-surface-variant truncate">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-on-surface-variant">{emp.department}</td>
                  <td className="text-on-surface-variant">{emp.courses} courses</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar !w-20">
                        <div className={`progress-bar-fill ${getProgressColor(emp.completion)}`} style={{ width: `${emp.completion}%` }}></div>
                      </div>
                      <span className="text-label-sm font-medium text-on-surface">{emp.completion}%</span>
                    </div>
                  </td>
                  <td>{getComplianceBadge(emp.compliance)}</td>
                  <td className="text-on-surface-variant">{emp.lastActive}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="btn-icon !p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" title="View Profile">
                        <span className="material-symbols-outlined outlined text-[18px]">visibility</span>
                      </button>
                      <button className="btn-icon !p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" title="Send Message">
                        <span className="material-symbols-outlined outlined text-[18px]">mail</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredEmployees.length === 0 && (
          <div id="emp-empty-state" className="py-16 text-center">
            <span className="material-symbols-outlined text-surface-dim text-[48px] mb-3">person_search</span>
            <p className="text-body-lg text-on-surface-variant font-medium">No employees found</p>
            <p className="text-body-sm text-on-surface-variant mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        {filteredEmployees.length > 0 && (
          <div id="emp-pagination" className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-outline-variant/50">
            <p className="text-body-sm text-on-surface-variant" id="emp-pagination-info">Showing 1–{filteredEmployees.length} of {filteredEmployees.length} employees</p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-label-sm font-medium text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors disabled:opacity-40 disabled:cursor-not-allowed" disabled>Previous</button>
              <button className="px-3 py-1.5 text-label-sm font-medium text-on-primary bg-primary rounded-lg hover:bg-on-surface-variant transition-colors">1</button>
              <button className="px-3 py-1.5 text-label-sm font-medium text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">2</button>
              <button className="px-3 py-1.5 text-label-sm font-medium text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">3</button>
              <span className="px-2 text-label-sm text-on-surface-variant">…</span>
              <button className="px-3 py-1.5 text-label-sm font-medium text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">84</button>
              <button className="px-3 py-1.5 text-label-sm font-medium text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
