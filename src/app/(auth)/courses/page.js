"use client";

import { useState, useMemo } from 'react';

/* ── Mock Data ────────────────────────────────────────────── */
const COURSES = [
  { id: 1, title: 'Forklift Safety Certification',   category: 'Safety',     status: 'Published', department: 'Manufacturing', enrolled: 1248, completion: 84,  modules: 12 },
  { id: 2, title: 'Hazard Communication Standard',   category: 'Compliance', status: 'Published', department: 'Manufacturing', enrolled: 892,  completion: 91,  modules: 8  },
  { id: 3, title: 'Emergency Evacuation Protocol',    category: 'Safety',     status: 'Published', department: 'Warehouse',     enrolled: 2100, completion: 76,  modules: 6  },
  { id: 4, title: 'Cybersecurity Basics 2024',        category: 'Compliance', status: 'Draft',     department: 'Engineering',   enrolled: 0,    completion: 0,   modules: 10 },
  { id: 5, title: 'Warehouse Operations Manual',      category: 'Operations', status: 'Published', department: 'Warehouse',     enrolled: 456,  completion: 68,  modules: 15 },
  { id: 6, title: 'New Employee Onboarding',          category: 'Onboarding', status: 'Published', department: 'HR',            enrolled: 320,  completion: 95,  modules: 5  },
  { id: 7, title: 'Lockout/Tagout Procedures',        category: 'Safety',     status: 'Published', department: 'Manufacturing', enrolled: 1100, completion: 88,  modules: 9  },
  { id: 8, title: 'Quality Control Standards',        category: 'Operations', status: 'Archived',  department: 'Engineering',   enrolled: 780,  completion: 82,  modules: 11 },
  { id: 9, title: 'Leadership Development',           category: 'Onboarding', status: 'Draft',     department: 'HR',            enrolled: 0,    completion: 0,   modules: 7  },
];

const CATEGORY_COLORS = {
  Safety:     { accent: 'bg-accent-sky',   text: 'text-accent-sky',   bg: 'bg-accent-sky/10'   },
  Compliance: { accent: 'bg-error',        text: 'text-error',        bg: 'bg-error/10'        },
  Operations: { accent: 'bg-secondary',    text: 'text-secondary',    bg: 'bg-secondary/10'    },
  Onboarding: { accent: 'bg-accent-green', text: 'text-accent-green', bg: 'bg-accent-green/10' },
  Equipment:  { accent: 'bg-accent-teal',  text: 'text-accent-teal',  bg: 'bg-accent-teal/10'  },
};

const STATUS_BADGE = {
  Published: 'badge-published',
  Draft:     'badge-draft',
  Archived:  'badge-overdue',
};

/* ── Helpers ──────────────────────────────────────────────── */
function fmt(n) { return n.toLocaleString(); }

function progressColor(pct) {
  if (pct >= 80) return 'bg-accent-green';
  if (pct >= 50) return 'bg-secondary';
  if (pct > 0)   return 'bg-accent-sky';
  return 'bg-surface-dim';
}

/* ── Components ───────────────────────────────────────────── */
function CourseCard({ course: c, idx }) {
  const cat  = CATEGORY_COLORS[c.category] || CATEGORY_COLORS.Equipment;
  const bdg  = STATUS_BADGE[c.status] || 'badge-draft';
  const pCol = progressColor(c.completion);
  const delay = idx * 40;

  return (
    <div 
      className="card group relative overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer animate-slide-up" 
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }} 
      data-id={c.id}
    >
      {/* Accent bar */}
      <div className={`h-1 w-full ${cat.accent}`}></div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Top row: category + status */}
        <div className="flex items-center justify-between">
          <span className={`badge ${cat.bg} ${cat.text}`}>{c.category}</span>
          <span className={`badge ${bdg}`}>{c.status}</span>
        </div>

        {/* Title */}
        <h3 className="text-headline-sm font-headline text-on-surface leading-snug line-clamp-2">{c.title}</h3>

        {/* Meta chips */}
        <div className="flex flex-wrap items-center gap-3 text-body-sm text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined outlined text-[16px]">menu_book</span>
            {c.modules} modules
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined outlined text-[16px]">group</span>
            {fmt(c.enrolled)} enrolled
          </span>
        </div>

        {/* Progress */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-label-sm text-on-surface-variant">Completion</span>
            <span className="text-label-sm font-semibold text-on-surface">{c.completion}%</span>
          </div>
          <div className="w-full bg-surface-dim h-1.5 rounded-full overflow-hidden">
            <div className={`${pCol} h-full rounded-full transition-all duration-500`} style={{ width: `${c.completion}%` }}></div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-outline-variant/50" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-label-md font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit
          </button>
          <div className="w-px h-5 bg-outline-variant/50"></div>
          <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-label-md font-medium text-secondary hover:bg-secondary/5 transition-colors">
            <span className="material-symbols-outlined text-[16px]">bar_chart</span>
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseRow({ course: c, idx }) {
  const cat  = CATEGORY_COLORS[c.category] || CATEGORY_COLORS.Equipment;
  const bdg  = STATUS_BADGE[c.status] || 'badge-draft';
  const pCol = progressColor(c.completion);
  const delay = idx * 30;

  return (
    <tr className="group animate-slide-up" style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }} data-id={c.id}>
      <td>
        <div className="flex items-center gap-3">
          <div className={`w-2 h-8 rounded-full ${cat.accent} flex-shrink-0`}></div>
          <div>
            <p className="font-medium text-on-surface">{c.title}</p>
            <p className="text-label-sm text-on-surface-variant">{c.modules} modules</p>
          </div>
        </div>
      </td>
      <td><span className={`badge ${cat.bg} ${cat.text}`}>{c.category}</span></td>
      <td><span className={`badge ${bdg}`}>{c.status}</span></td>
      <td className="text-on-surface-variant">{fmt(c.enrolled)}</td>
      <td>
        <div className="flex items-center gap-2">
          <div className="progress-bar"><div className={`progress-bar-fill ${pCol}`} style={{ width: `${c.completion}%` }}></div></div>
          <span className="text-label-sm text-on-surface-variant">{c.completion}%</span>
        </div>
      </td>
      <td className="text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="btn-icon !p-1"><span className="material-symbols-outlined text-[18px]">edit</span></button>
          <button className="btn-icon !p-1"><span className="material-symbols-outlined text-[18px]">bar_chart</span></button>
        </div>
      </td>
    </tr>
  );
}

/* ── Page Component ───────────────────────────────────────── */
export default function CoursesLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');
  const [sortBy, setSortBy] = useState('enrolled');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const filteredCourses = useMemo(() => {
    let results = COURSES.filter(c => {
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase().trim())) return false;
      if (category && c.category !== category) return false;
      if (status && c.status !== status) return false;
      if (department && c.department !== department) return false;
      return true;
    });

    results.sort((a, b) => {
      if (sortBy === 'enrolled')   return b.enrolled   - a.enrolled;
      if (sortBy === 'completion') return b.completion  - a.completion;
      if (sortBy === 'modules')    return b.modules     - a.modules;
      return a.title.localeCompare(b.title);
    });

    return results;
  }, [searchQuery, category, status, department, sortBy]);

  const selectClassName = "input-field py-2 px-3 pr-8 text-body-sm min-w-[150px] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2376777d%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4.646%205.646a.5.5%200%200%201%20.708%200L8%208.293l2.646-2.647a.5.5%200%200%201%20.708.708l-3%203a.5.5%200%200%201-.708%200l-3-3a.5.5%200%200%201%200-.708z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_0.5rem] cursor-pointer";

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-body-sm text-on-surface-variant mb-1">Manage and organize your training programs</p>
          <h2 className="text-display-lg font-headline text-on-surface tracking-tight">Course Library</h2>
        </div>
        <button className="btn-primary whitespace-nowrap self-start sm:self-auto">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Course
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">search</span>
            <input 
              type="text" 
              placeholder="Search courses…" 
              className="input-field input-with-icon py-2 text-body-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            <select className={selectClassName} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Safety">Safety</option>
              <option value="Compliance">Compliance</option>
              <option value="Operations">Operations</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Equipment">Equipment</option>
            </select>
            
            <select className={selectClassName} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>

            <select className={selectClassName} value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">All Departments</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden flex-shrink-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-surface-container text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
              title="Grid view"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-surface-container text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
              title="List view"
            >
              <span className="material-symbols-outlined text-[18px]">view_list</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between">
        <p className="text-body-sm text-on-surface-variant font-medium">
          <span className="text-on-surface font-semibold">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''} found
        </p>
        <div className="flex items-center gap-2">
          <select className={selectClassName} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="enrolled">Sort by: Most Enrolled</option>
            <option value="completion">Sort by: Completion %</option>
            <option value="title">Sort by: Title A–Z</option>
            <option value="modules">Sort by: Module Count</option>
          </select>
        </div>
      </div>

      {/* Course Grid / List */}
      {filteredCourses.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((c, i) => (
                <CourseCard key={c.id} course={c} idx={i} />
              ))}
            </div>
          ) : (
            <div>
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Enrolled</th>
                        <th>Completion</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map((c, i) => (
                        <CourseRow key={c.id} course={c} idx={i} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="card p-12 text-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-3">search_off</span>
          <h3 className="text-headline-sm font-headline text-on-surface mb-1">No courses found</h3>
          <p className="text-body-sm text-on-surface-variant">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
