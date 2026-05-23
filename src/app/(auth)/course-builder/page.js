"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock Data
const MODULES = [
  {
    id: 'm1',
    title: 'Equipment Overview',
    expanded: true,
    items: [
      { id: '1.1', title: 'Introduction Video', type: 'video', icon: 'play_circle', status: 'complete' },
      { id: '1.2', title: 'Safety Standards', type: 'doc', icon: 'description', status: 'complete' },
      { id: '1.3', title: 'Knowledge Check', type: 'quiz', icon: 'quiz', status: 'warning' },
    ],
  },
  {
    id: 'm2',
    title: 'Operating Procedures',
    expanded: false,
    items: [
      { id: '2.1', title: 'Pre-Op Inspection', type: 'video', icon: 'play_circle', status: 'complete' },
      { id: '2.2', title: 'Hands-On Simulation', type: 'interactive', icon: 'touch_app', status: 'complete' },
      { id: '2.3', title: 'External Compliance', type: 'scorm', icon: 'package_2', status: 'error' },
    ],
  },
  {
    id: 'm3',
    title: 'Assessment & Certification',
    expanded: false,
    items: [
      { id: '3.1', title: 'Final Exam', type: 'quiz', icon: 'quiz', status: 'warning' },
      { id: '3.2', title: 'Certificate of Completion', type: 'doc', icon: 'description', status: 'complete' },
    ],
  },
];

const STATUS_COLORS = {
  complete: 'bg-accent-green',
  warning: 'bg-amber-400',
  error: 'bg-error',
};

const TYPE_LABELS = {
  video: 'Video Lesson',
  doc: 'Document',
  quiz: 'Quiz',
  scorm: 'SCORM Package',
  interactive: 'Interactive',
};

export default function CourseBuilderPage() {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState('1.1');
  const [activeTab, setActiveTab] = useState('details');
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  
  const [moduleState, setModuleState] = useState(() => {
    const initialState = {};
    MODULES.forEach((m) => {
      initialState[m.id] = m.expanded;
    });
    return initialState;
  });

  const getSelected = () => {
    for (const m of MODULES) {
      const item = m.items.find((i) => i.id === selectedItem);
      if (item) return { module: m, item };
    }
    return { module: MODULES[0], item: MODULES[0].items[0] };
  };

  const sel = getSelected();
  const allExpanded = Object.values(moduleState).every((v) => v);

  const handleToggleModule = (id) => {
    setModuleState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleAll = () => {
    const newExpanded = !allExpanded;
    setModuleState((prev) => {
      const nextState = { ...prev };
      MODULES.forEach((m) => {
        nextState[m.id] = newExpanded;
      });
      return nextState;
    });
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item.id);
    // Make sure parent module is expanded
    const parentModule = MODULES.find((m) =>
      m.items.some((i) => i.id === item.id)
    );
    if (parentModule && !moduleState[parentModule.id]) {
      setModuleState((prev) => ({ ...prev, [parentModule.id]: true }));
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-margin-mobile md:-m-margin-desktop overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-surface-container-lowest border-b border-outline-variant shrink-0 gap-4 flex-wrap">
        {/* Breadcrumb + status */}
        <div className="flex items-center gap-3 min-w-0">
          <nav className="flex items-center gap-1 text-body-sm text-on-surface-variant truncate">
            <Link href="#" className="hover:text-secondary transition-colors">Courses</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <Link href="#" className="hover:text-secondary transition-colors truncate">Forklift Safety Certification</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface font-medium">Edit</span>
          </nav>
          <span className="badge bg-amber-100 text-amber-800 border border-amber-300 shrink-0">Draft</span>
        </div>

        {/* Save indicator + actions */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:flex items-center gap-1 text-body-sm text-accent-teal mr-2">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            All changes saved
          </span>
          <button className="btn-secondary text-body-sm !py-1.5 !px-3">
            <span className="material-symbols-outlined text-[16px] outlined">visibility</span>
            Preview
          </button>
          <button className="btn-secondary text-body-sm !py-1.5 !px-3">
            <span className="material-symbols-outlined text-[16px] outlined">save</span>
            Save Draft
          </button>
          <button className="btn-primary text-body-sm !py-1.5 !px-3">
            <span className="material-symbols-outlined text-[16px]">publish</span>
            Publish
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <aside className="w-[280px] shrink-0 border-r border-outline-variant bg-surface-container-lowest flex flex-col overflow-hidden hidden lg:flex">
          {/* Header */}
          <div className="p-4 border-b border-outline-variant">
            <input 
              type="text" 
              defaultValue="Forklift Safety Certification"
              className="w-full text-headline-sm font-headline text-on-surface bg-transparent border-none focus:outline-none focus:ring-0 p-0 truncate"
              title="Edit course title" 
            />
            <div className="flex items-center justify-between mt-3">
              <button id="btn-add-module" className="flex items-center gap-1 text-label-md font-semibold text-secondary hover:text-on-secondary-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Add Module
              </button>
              <button id="btn-toggle-all" onClick={handleToggleAll} className="text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
                {allExpanded ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
          </div>

          {/* Tree */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {MODULES.map((m, mi) => (
              <div key={m.id} className="mb-1">
                {/* Module header */}
                <button onClick={() => handleToggleModule(m.id)} className="module-toggle w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left hover:bg-surface-container-low transition-colors group">
                  <span className={`material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200 ${moduleState[m.id] ? 'rotate-0' : '-rotate-90'}`}>expand_more</span>
                  <span className="text-label-md font-semibold text-on-surface truncate flex-1">Module {mi + 1}: {m.title}</span>
                  <span className="text-label-sm text-on-surface-variant">{m.items.length}</span>
                </button>
                {/* Items */}
                <div className={`module-items overflow-hidden transition-all duration-200 ${moduleState[m.id] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  {m.items.map(item => (
                    <button key={item.id} onClick={() => handleSelectItem(item)} className={`tree-item w-full flex items-center gap-2 pl-8 pr-2 py-[7px] rounded-lg text-left transition-all duration-150 group
                      ${selectedItem === item.id ? 'bg-secondary-container/15 text-on-secondary-container font-medium' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
                      <span className={`material-symbols-outlined text-[18px] ${selectedItem === item.id ? 'text-secondary' : 'text-on-surface-variant'} outlined`}>{item.icon}</span>
                      <span className="flex-1 text-body-sm truncate">{item.title}</span>
                      <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[item.status]} shrink-0`}></span>
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab outlined">drag_indicator</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER PANEL */}
        <section className="flex-1 flex flex-col overflow-hidden bg-surface">
          {/* Lesson Header */}
          <div className="px-6 pt-6 pb-4 bg-surface-container-lowest border-b border-outline-variant shrink-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <h1 className="text-headline-md font-headline text-on-surface mb-2">{sel.item.title}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="badge bg-secondary-container/20 text-secondary text-[11px]">{TYPE_LABELS[sel.item.type]}</span>
                  <div className="flex items-center gap-1 text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] outlined">schedule</span>
                    <span>15 min</span>
                  </div>
                  <div className="flex items-center gap-1 text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] outlined">person</span>
                    <span>All Operators</span>
                  </div>
                </div>
              </div>
              <button id="btn-toggle-right" onClick={() => setRightPanelOpen(!rightPanelOpen)} className="btn-icon shrink-0" title={rightPanelOpen ? 'Hide properties' : 'Show properties'}>
                <span className="material-symbols-outlined text-[20px] outlined">{rightPanelOpen ? 'right_panel_close' : 'right_panel_open'}</span>
              </button>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-5">
            <div className="max-w-[48rem] mx-auto flex flex-col gap-5">
              
              {/* Block 1: Rich Text */}
              <div className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-secondary-container/60 transition-all duration-150">
                <div className="absolute -left-3 top-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50 cursor-grab">drag_indicator</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant outlined">article</span>
                  <span className="text-label-sm text-on-surface-variant font-medium uppercase tracking-wider">Rich Text</span>
                </div>
                <div className="text-body-md text-on-surface leading-relaxed" contentEditable={true} suppressContentEditableWarning>
                  <p className="mb-3">Welcome to the <strong>Forklift Safety Certification</strong> program. This comprehensive course is designed to provide all warehouse and facility operators with the foundational knowledge required to safely operate powered industrial trucks in compliance with <em>OSHA Standard 1910.178</em>.</p>
                  <p>Before proceeding, ensure you have reviewed the pre-requisite materials and have your employee ID ready for verification at each checkpoint throughout the training modules.</p>
                </div>
              </div>

              {/* Block 2: Video Upload */}
              <div className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-secondary-container/60 transition-all duration-150">
                <div className="absolute -left-3 top-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50 cursor-grab">drag_indicator</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant outlined">play_circle</span>
                  <span className="text-label-sm text-on-surface-variant font-medium uppercase tracking-wider">Video</span>
                </div>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-secondary-container hover:bg-secondary-container/5 transition-all duration-200 cursor-pointer">
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-3 outlined">play_circle</span>
                  <p className="text-body-md text-on-surface font-medium mb-1">Drop video file or click to upload</p>
                  <p className="text-body-sm text-on-surface-variant">MP4, MOV, or WebM — max 2 GB</p>
                </div>
                <div className="mt-3">
                  <input type="text" placeholder="Add a caption for this video…" className="input-field text-body-sm !py-1.5" />
                </div>
              </div>

              {/* Block 3: Callout / Alert */}
              <div className="group relative bg-amber-50 border border-amber-200 rounded-xl p-5 hover:border-amber-400 transition-all duration-150">
                <div className="absolute -left-3 top-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50 cursor-grab">drag_indicator</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[16px] text-amber-700 outlined">warning</span>
                  <span className="text-label-sm text-amber-700 font-medium uppercase tracking-wider">Safety Warning</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[28px] text-amber-600 shrink-0 mt-0.5">warning</span>
                  <div className="text-body-md text-amber-900 leading-relaxed">
                    <strong>ANSI/ITSDF B56.1 Compliance Notice:</strong> All operators must wear high-visibility vests, steel-toed footwear, and hard hats when operating in designated forklift zones. Failure to comply may result in immediate suspension of operating privileges and mandatory retraining.
                  </div>
                </div>
              </div>

              {/* Block 4: Checklist */}
              <div className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-secondary-container/60 transition-all duration-150">
                <div className="absolute -left-3 top-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50 cursor-grab">drag_indicator</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant outlined">checklist</span>
                  <span className="text-label-sm text-on-surface-variant font-medium uppercase tracking-wider">Pre-Operation Safety Checklist</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { text: 'Verify hydraulic fluid levels and check for leaks', checked: true },
                    { text: 'Inspect tires, forks, and overhead guard for damage', checked: true },
                    { text: 'Test horn, lights, and backup alarm functionality', checked: false },
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-start gap-3 cursor-pointer group/check">
                      <input type="checkbox" defaultChecked={item.checked}
                        className="mt-0.5 w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary-container accent-secondary" />
                      <span className={`text-body-md text-on-surface ${item.checked ? 'line-through text-on-surface-variant' : ''}`}>{item.text}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Floating Action Bar */}
          <div className="shrink-0 px-6 py-2.5 bg-surface-container-lowest border-t border-outline-variant">
            <div className="max-w-[48rem] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button className="btn-secondary !py-1.5 !px-3 text-body-sm">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Add Block
                </button>
                <div className="w-px h-5 bg-outline-variant mx-2"></div>
                <button className="btn-icon !p-1.5" title="Undo">
                  <span className="material-symbols-outlined text-[18px] outlined">undo</span>
                </button>
                <button className="btn-icon !p-1.5" title="Redo">
                  <span className="material-symbols-outlined text-[18px] outlined">redo</span>
                </button>
              </div>
              <span className="text-body-sm text-on-surface-variant">Word count: 247</span>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        {rightPanelOpen && (
          <aside className="w-[320px] shrink-0 border-l border-outline-variant bg-surface-container-lowest flex flex-col overflow-hidden hidden xl:flex">
            {/* Tabs */}
            <div className="flex border-b border-outline-variant shrink-0">
              {[
                { key: 'details', label: 'Details', icon: 'info' },
                { key: 'settings', label: 'Settings', icon: 'settings' },
                { key: 'access', label: 'Access', icon: 'lock' },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)} className={`prop-tab flex-1 flex items-center justify-center gap-1.5 py-3 text-label-md font-medium transition-all duration-150 border-b-2
                  ${activeTab === t.key
                    ? 'border-secondary text-secondary'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'}`}>
                  <span className="material-symbols-outlined text-[16px] outlined">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              {activeTab === 'details' && (
                <div className="flex flex-col gap-5 animate-fade-in">
                  {/* Title */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Lesson Title</label>
                    <input type="text" defaultValue={sel.item.title} className="input-field" />
                  </div>

                  {/* Content Type */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Content Type</label>
                    <select className="input-field" defaultValue={TYPE_LABELS[sel.item.type]}>
                      <option value="Video Lesson">Video Lesson</option>
                      <option value="Document">Document</option>
                      <option value="Quiz">Quiz</option>
                      <option value="Interactive">Interactive</option>
                      <option value="SCORM Package">SCORM Package</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Duration</label>
                    <div className="relative">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-2.5 top-1/2 -translate-y-1/2 outlined">schedule</span>
                      <input type="text" defaultValue="15 min" className="input-field input-with-icon" />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Description</label>
                    <textarea rows={3} className="input-field resize-none" placeholder="Describe this lesson…" defaultValue="Introductory video covering forklift types, key components, and basic operational safety principles for warehouse operators."></textarea>
                  </div>

                  {/* Thumbnail preview */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Thumbnail</label>
                    <div className="border border-dashed border-outline-variant rounded-xl h-28 flex items-center justify-center bg-surface-container-low hover:bg-surface-container hover:border-secondary-container transition-all cursor-pointer">
                      <div className="flex flex-col items-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-[24px] mb-1 outlined">image</span>
                        <span className="text-label-sm">Upload thumbnail</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Tags</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {['Safety', 'Forklift', 'OSHA'].map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-body-sm text-on-surface font-medium">
                          {tag}
                          <button className="text-on-surface-variant hover:text-error transition-colors">
                            <span className="material-symbols-outlined text-[14px]">close</span>
                          </button>
                        </span>
                      ))}
                    </div>
                    <input type="text" placeholder="Add tag…" className="input-field text-body-sm !py-1.5" />
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="flex flex-col gap-5 animate-fade-in">
                  {/* Completion Criteria */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Completion Criteria</label>
                    <select className="input-field" defaultValue="View entire content">
                      <option value="View entire content">View entire content</option>
                      <option value="Pass assessment (70%+)">Pass assessment (70%+)</option>
                      <option value="Manual instructor sign-off">Manual instructor sign-off</option>
                      <option value="Time-based (minimum duration)">Time-based (minimum duration)</option>
                    </select>
                  </div>

                  {/* Mandatory Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-sm text-on-surface font-medium">Mandatory Lesson</p>
                      <p className="text-label-sm text-on-surface-variant">Learners must complete this to proceed</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-outline-variant rounded-full peer peer-checked:bg-secondary peer-focus:ring-2 peer-focus:ring-secondary-container transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>

                  {/* Allow Download Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-sm text-on-surface font-medium">Allow Download</p>
                      <p className="text-label-sm text-on-surface-variant">Let learners save content offline</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-9 h-5 bg-outline-variant rounded-full peer peer-checked:bg-secondary peer-focus:ring-2 peer-focus:ring-secondary-container transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>

                  {/* Passing Score */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Passing Score (%)</label>
                    <input type="number" defaultValue="70" min="0" max="100" className="input-field" />
                  </div>

                  {/* Retake Policy */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Retake Policy</label>
                    <select className="input-field" defaultValue="Unlimited retakes">
                      <option value="Unlimited retakes">Unlimited retakes</option>
                      <option value="3 attempts max">3 attempts max</option>
                      <option value="1 attempt only">1 attempt only</option>
                      <option value="Retake after cooldown (24h)">Retake after cooldown (24h)</option>
                    </select>
                  </div>

                  {/* Instructor Notes */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Instructor Notes</label>
                    <textarea rows={4} className="input-field resize-none" placeholder="Internal notes visible only to instructors…" defaultValue="Remind learners to have their PPE ready before starting the hands-on simulation in Module 2. Check regional compliance requirements before deploying."></textarea>
                  </div>
                </div>
              )}

              {activeTab === 'access' && (
                <div className="flex flex-col gap-5 animate-fade-in">
                  {/* Visibility */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Visibility</label>
                    <select className="input-field" defaultValue="Restricted — assigned only">
                      <option value="Restricted — assigned only">Restricted — assigned only</option>
                      <option value="Public — all employees">Public — all employees</option>
                      <option value="Hidden — admins only">Hidden — admins only</option>
                    </select>
                  </div>

                  {/* Department Assignment */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-2">Department Assignment</label>
                    <div className="flex flex-col gap-2">
                      {[
                        { name: 'Warehouse Operations', checked: true },
                        { name: 'Logistics & Shipping', checked: true },
                        { name: 'Maintenance', checked: false },
                        { name: 'Quality Assurance', checked: false },
                        { name: 'Facility Management', checked: true },
                        { name: 'New Hire Onboarding', checked: false },
                      ].map((dept, idx) => (
                        <label key={idx} className="flex items-center gap-2.5 cursor-pointer group/dept">
                          <input type="checkbox" defaultChecked={dept.checked}
                            className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary-container accent-secondary" />
                          <span className="text-body-sm text-on-surface group-hover/dept:text-secondary transition-colors">{dept.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Enrollment cap */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Enrollment Cap</label>
                    <input type="number" defaultValue="500" className="input-field" />
                    <p className="text-label-sm text-on-surface-variant mt-1">Leave empty for unlimited enrollment</p>
                  </div>

                  {/* Prerequisite */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Prerequisite Course</label>
                    <select className="input-field" defaultValue="None">
                      <option value="None">None</option>
                      <option value="General Warehouse Safety">General Warehouse Safety</option>
                      <option value="Equipment Basics 101">Equipment Basics 101</option>
                      <option value="OSHA Orientation">OSHA Orientation</option>
                    </select>
                  </div>

                  {/* Access period */}
                  <div>
                    <label className="block text-label-sm font-medium text-on-surface-variant mb-1.5">Access Period</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-label-sm text-on-surface-variant">Start Date</label>
                        <input type="date" defaultValue="2026-06-01" className="input-field text-body-sm !py-1.5 mt-1" />
                      </div>
                      <div>
                        <label className="text-label-sm text-on-surface-variant">End Date</label>
                        <input type="date" defaultValue="2026-12-31" className="input-field text-body-sm !py-1.5 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* BOTTOM VALIDATION BAR */}
      <div className="shrink-0 px-5 py-2.5 bg-surface-container-lowest border-t border-outline-variant">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Progress */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-body-sm text-on-surface font-medium whitespace-nowrap">Course Setup:</span>
            <div className="progress-bar !w-32">
              <div className="progress-bar-fill bg-secondary" style={{ width: '70%' }}></div>
            </div>
            <span className="text-label-sm text-on-surface-variant whitespace-nowrap">7 of 10 items</span>
          </div>

          {/* Validation chips */}
          <div className="flex items-center gap-3 flex-wrap text-body-sm">
            <span className="flex items-center gap-1 text-accent-green">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Course title
            </span>
            <span className="flex items-center gap-1 text-accent-green">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              At least 1 module
            </span>
            <span className="flex items-center gap-1 text-accent-green">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Thumbnail
            </span>
            <span className="flex items-center gap-1 text-amber-600">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Quiz needs questions
            </span>
            <span className="flex items-center gap-1 text-error">
              <span className="material-symbols-outlined text-[14px]">cancel</span>
              SCORM missing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
