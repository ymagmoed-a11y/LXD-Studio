"use client";

import { useState } from 'react';

const Toggle = ({ id, defaultChecked }) => (
  <label htmlFor={id} className="relative inline-flex items-center cursor-pointer shrink-0">
    <input type="checkbox" id={id} className="sr-only peer" defaultChecked={defaultChecked} />
    <div className="w-11 h-6 bg-surface-dim rounded-full peer peer-checked:bg-secondary-container peer-focus:ring-2 peer-focus:ring-secondary-container/40 transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-outline-variant after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-secondary"></div>
  </label>
);

const tabs = [
  { id: 'general',       label: 'General',        icon: 'tune' },
  { id: 'users',         label: 'Users & Roles',  icon: 'group' },
  { id: 'notifications', label: 'Notifications',  icon: 'notifications' },
  { id: 'integrations',  label: 'Integrations',   icon: 'extension' },
  { id: 'branding',      label: 'Branding',       icon: 'palette' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-body-sm text-on-surface-variant mb-1">Administration</p>
          <h2 className="text-display-lg font-headline text-on-surface tracking-tight">Company Settings</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Manage your organization and platform preferences</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <button className="btn-secondary">
            <span className="material-symbols-outlined text-[18px]">history</span>
            Audit Log
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-outline-variant -mb-2 overflow-x-auto">
        <nav id="settings-tabs" className="flex gap-0 min-w-max" role="tablist">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={activeTab === t.id} onClick={() => setActiveTab(t.id)}
              className={`settings-tab group relative flex items-center gap-2 px-5 py-3 text-label-md font-medium transition-colors duration-150 ${activeTab === t.id ? 'text-on-surface font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}>
              <span className="material-symbols-outlined outlined text-[20px]">{t.icon}</span>
              {t.label}
              <span className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full transition-all duration-200 ${activeTab === t.id ? 'bg-secondary-container' : 'bg-transparent group-hover:bg-surface-dim'}`}></span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div id="settings-tab-content">
        {activeTab === 'general' && <GeneralTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'integrations' && <IntegrationsTab />}
        {activeTab === 'branding' && <BrandingTab />}
      </div>
    </div>
  );
}

function GeneralTab() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Company Profile */}
      <div className="card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary">apartment</span>
          </div>
          <div>
            <h3 className="text-headline-sm font-headline text-on-surface">Company Profile</h3>
            <p className="text-body-sm text-on-surface-variant">Basic information about your organization</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-label-md font-medium text-on-surface mb-1.5">Company Name</label>
            <input type="text" className="input-field" defaultValue="Acme Manufacturing Corp" />
          </div>
          <div>
            <label className="block text-label-md font-medium text-on-surface mb-1.5">Industry</label>
            <select className="input-field" defaultValue="Manufacturing">
              <option>Manufacturing</option>
              <option>Healthcare</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Education</option>
            </select>
          </div>
          <div>
            <label className="block text-label-md font-medium text-on-surface mb-1.5">Company Size</label>
            <select className="input-field" defaultValue="1000-5000 employees">
              <option>1-50 employees</option>
              <option>51-200 employees</option>
              <option>201-1000 employees</option>
              <option>1000-5000 employees</option>
              <option>5000+ employees</option>
            </select>
          </div>
          <div>
            <label className="block text-label-md font-medium text-on-surface mb-1.5">Timezone</label>
            <select className="input-field" defaultValue="UTC-5 Eastern Time">
              <option>UTC-8 Pacific Time</option>
              <option>UTC-7 Mountain Time</option>
              <option>UTC-6 Central Time</option>
              <option>UTC-5 Eastern Time</option>
              <option>UTC+0 GMT</option>
              <option>UTC+1 Central European</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-label-md font-medium text-on-surface mb-1.5">Primary Contact Email</label>
            <input type="email" className="input-field" defaultValue="admin@acmemfg.com" />
          </div>
        </div>
      </div>

      {/* Platform Settings */}
      <div className="card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-accent-teal">settings</span>
          </div>
          <div>
            <h3 className="text-headline-sm font-headline text-on-surface">Platform Settings</h3>
            <p className="text-body-sm text-on-surface-variant">Configure authentication and system behavior</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-label-md font-medium text-on-surface mb-1.5">Default Language</label>
            <select className="input-field" defaultValue="English">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Mandarin</option>
            </select>
          </div>
          <div>
            <label className="block text-label-md font-medium text-on-surface mb-1.5">Session Timeout (minutes)</label>
            <input type="number" className="input-field" defaultValue="30" min="5" max="120" />
          </div>
        </div>

        <div className="divide-y divide-outline-variant/50">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-body-md font-medium text-on-surface">Enable Single Sign-On (SSO)</p>
              <p className="text-body-sm text-on-surface-variant">Allow users to log in via your identity provider</p>
            </div>
            <Toggle id="sso-toggle" defaultChecked={true} />
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-body-md font-medium text-on-surface">Enforce Two-Factor Authentication</p>
              <p className="text-body-sm text-on-surface-variant">Require 2FA for all user accounts</p>
            </div>
            <Toggle id="2fa-toggle" defaultChecked={true} />
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-body-md font-medium text-on-surface">Auto-Enrollment</p>
              <p className="text-body-sm text-on-surface-variant">Automatically enroll new users in onboarding courses</p>
            </div>
            <Toggle id="auto-enroll-toggle" defaultChecked={false} />
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button className="btn-primary px-8">
          <span className="material-symbols-outlined text-[18px]">save</span>
          Save Changes
        </button>
      </div>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Seat Usage */}
      <div className="card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">badge</span>
            </div>
            <div>
              <h3 className="text-headline-sm font-headline text-on-surface">License & Seats</h3>
              <p className="text-body-sm text-on-surface-variant">Manage your organization&apos;s user capacity</p>
            </div>
          </div>
          <span className="badge bg-secondary-container/20 text-secondary text-label-sm px-3 py-1.5 font-semibold">Enterprise — 2,000 seats</span>
        </div>

        <div className="mb-2 flex items-baseline justify-between">
          <p className="text-body-md text-on-surface"><span className="font-bold">1,248</span> of <span className="font-bold">2,000</span> seats used</p>
          <span className="text-label-sm text-on-surface-variant">62.4%</span>
        </div>
        <div className="w-full bg-surface-dim h-3 rounded-full overflow-hidden">
          <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: '62.4%' }}></div>
        </div>
        <p className="text-body-sm text-on-surface-variant mt-2">752 seats remaining. <button className="text-secondary font-semibold hover:underline">Upgrade plan</button></p>
      </div>

      {/* Roles Table */}
      <div className="card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-headline-sm font-headline text-on-surface">Roles & Permissions</h3>
            <p className="text-body-sm text-on-surface-variant">Define what each role can access</p>
          </div>
          <button className="btn-primary">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Invite Users
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Users</th>
                <th>Permissions</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-error-container/40 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-error">shield_person</span>
                    </div>
                    <span className="font-medium text-on-surface">Admin</span>
                  </div>
                </td>
                <td className="text-on-surface-variant">3 users</td>
                <td className="text-on-surface-variant">Full access — manage users, courses, settings, billing</td>
                <td className="text-right">
                  <button className="btn-secondary text-label-sm py-1 px-3">
                    <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-secondary-container/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-secondary">supervisor_account</span>
                    </div>
                    <span className="font-medium text-on-surface">Manager</span>
                  </div>
                </td>
                <td className="text-on-surface-variant">12 users</td>
                <td className="text-on-surface-variant">View reports, manage team enrollments, assign courses</td>
                <td className="text-right">
                  <button className="btn-secondary text-label-sm py-1 px-3">
                    <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-teal/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-accent-teal">school</span>
                    </div>
                    <span className="font-medium text-on-surface">Instructor</span>
                  </div>
                </td>
                <td className="text-on-surface-variant">8 users</td>
                <td className="text-on-surface-variant">Create & edit courses, view learner progress, grade assessments</td>
                <td className="text-right">
                  <button className="btn-secondary text-label-sm py-1 px-3">
                    <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">person</span>
                    </div>
                    <span className="font-medium text-on-surface">Learner</span>
                  </div>
                </td>
                <td className="text-on-surface-variant">1,225 users</td>
                <td className="text-on-surface-variant">Access assigned courses, take assessments, view certificates</td>
                <td className="text-right">
                  <button className="btn-secondary text-label-sm py-1 px-3">
                    <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const notifs = [
    { id: 'notif-completion',  label: 'Course Completion Notifications',  desc: 'Notify managers when learners complete assigned courses',          on: true },
    { id: 'notif-overdue',     label: 'Overdue Training Reminders',       desc: 'Send reminders to learners with overdue assignments',              on: true },
    { id: 'notif-published',   label: 'New Course Published Alerts',      desc: 'Alert relevant users when new courses are published',              on: true },
    { id: 'notif-assessment',  label: 'Assessment Results Notifications', desc: 'Notify learners and managers of assessment scores',                on: true },
    { id: 'notif-digest',      label: 'Weekly Digest Email',              desc: 'Send a weekly summary of platform activity to admins',             on: false },
    { id: 'notif-compliance',  label: 'Compliance Deadline Warnings',     desc: 'Alert when compliance certifications are approaching expiration',  on: true },
    { id: 'notif-maintenance', label: 'System Maintenance Alerts',        desc: 'Notify admins of scheduled maintenance and system updates',        on: true },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary">mail</span>
          </div>
          <div>
            <h3 className="text-headline-sm font-headline text-on-surface">Email Notifications</h3>
            <p className="text-body-sm text-on-surface-variant">Control which notifications are sent to users</p>
          </div>
        </div>

        <div className="divide-y divide-outline-variant/50">
          {notifs.map(n => (
            <div key={n.id} className="flex items-center justify-between py-4 gap-4">
              <div className="min-w-0">
                <p className="text-body-md font-medium text-on-surface">{n.label}</p>
                <p className="text-body-sm text-on-surface-variant">{n.desc}</p>
              </div>
              <Toggle id={n.id} defaultChecked={n.on} />
            </div>
          ))}
        </div>
      </div>

      {/* Email Frequency */}
      <div className="card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-accent-teal">schedule</span>
          </div>
          <div>
            <h3 className="text-headline-sm font-headline text-on-surface">Email Frequency</h3>
            <p className="text-body-sm text-on-surface-variant">How often should non-critical notifications be batched</p>
          </div>
        </div>

        <div className="max-w-[24rem]">
          <label className="block text-label-md font-medium text-on-surface mb-1.5">Delivery Preference</label>
          <select className="input-field" defaultValue="Immediate">
            <option>Immediate</option>
            <option>Daily Digest</option>
            <option>Weekly</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary px-8">
          <span className="material-symbols-outlined text-[18px]">save</span>
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function IntegrationsTab() {
  const integrations = [
    { name: 'Microsoft Azure AD', icon: 'shield',          desc: 'Sync users and groups from Azure Active Directory',        connected: true },
    { name: 'Google Workspace',   icon: 'cloud',           desc: 'Import users and integrate with Google Classroom',          connected: true },
    { name: 'Slack',              icon: 'chat',            desc: 'Send training notifications and reminders to Slack channels', connected: false },
    { name: 'SAP SuccessFactors', icon: 'integration_instructions', desc: 'Sync employee data and training records with SAP',   connected: false },
    { name: 'Zoom',              icon: 'videocam',         desc: 'Enable live virtual classroom sessions via Zoom',           connected: true },
    { name: 'SCORM Cloud',       icon: 'cloud_upload',     desc: 'Host and deliver SCORM-compliant training content',          connected: true },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-headline-sm font-headline text-on-surface">Connected Services</h3>
          <p className="text-body-sm text-on-surface-variant">Manage third-party integrations and data sync</p>
        </div>
        <button className="btn-secondary">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Browse Marketplace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map(intg => (
          <div key={intg.name} className="card p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200 group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${intg.connected ? 'bg-secondary-container/20' : 'bg-surface-dim'} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                  <span className={`material-symbols-outlined ${intg.connected ? 'text-secondary' : 'text-on-surface-variant'}`}>{intg.icon}</span>
                </div>
                <div>
                  <p className="text-body-md font-semibold text-on-surface">{intg.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-2 h-2 rounded-full ${intg.connected ? 'bg-accent-green animate-pulse-dot' : 'bg-outline-variant'}`}></span>
                    <span className={`text-label-sm ${intg.connected ? 'text-accent-green' : 'text-on-surface-variant'}`}>{intg.connected ? 'Connected' : 'Not Connected'}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-body-sm text-on-surface-variant flex-1">{intg.desc}</p>
            <div>
              {intg.connected
                ? <button className="btn-secondary w-full">
                     <span className="material-symbols-outlined text-[18px]">settings</span> Configure
                   </button>
                : <button className="btn-primary w-full">
                     <span className="material-symbols-outlined text-[18px]">power</span> Connect
                   </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandingTab() {
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [accentColor, setAccentColor] = useState('#40c2fd');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadText, setUploadText] = useState('Drag & drop your logo here');

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Brand Controls */}
        <div className="flex flex-col gap-6">
          {/* Logo Upload */}
          <div className="card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">image</span>
              </div>
              <div>
                <h3 className="text-headline-sm font-headline text-on-surface">Company Logo</h3>
                <p className="text-body-sm text-on-surface-variant">Recommended: SVG or PNG, 400×100px</p>
              </div>
            </div>

            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer group ${isDragging ? 'border-secondary-container bg-secondary-container/10' : 'border-outline-variant hover:border-secondary-container hover:bg-secondary-container/5'}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                setUploadText('Logo uploaded successfully!');
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-secondary-container/20 transition-colors">
                  <span className="material-symbols-outlined text-[28px] text-on-surface-variant group-hover:text-secondary transition-colors">cloud_upload</span>
                </div>
                <div>
                  <p className="text-body-md font-medium text-on-surface">{uploadText}</p>
                  <p className="text-body-sm text-on-surface-variant mt-1">or <span className="text-secondary font-semibold cursor-pointer hover:underline">browse files</span></p>
                </div>
                <p className="text-label-sm text-outline">SVG, PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>

          {/* Colors & Fonts */}
          <div className="card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent-teal">palette</span>
              </div>
              <div>
                <h3 className="text-headline-sm font-headline text-on-surface">Colors & Typography</h3>
                <p className="text-body-sm text-on-surface-variant">Customize the platform&apos;s appearance</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1.5">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-lg border border-outline-variant cursor-pointer p-0.5" />
                  <input type="text" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="input-field flex-1 font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1.5">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-10 h-10 rounded-lg border border-outline-variant cursor-pointer p-0.5" />
                  <input type="text" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="input-field flex-1 font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-label-md font-medium text-on-surface mb-1.5">Font Family</label>
                <select className="input-field" value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Lato</option>
                  <option>Nunito</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="card p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant">preview</span>
            </div>
            <div>
              <h3 className="text-headline-sm font-headline text-on-surface">Login Page Preview</h3>
              <p className="text-body-sm text-on-surface-variant">See how your branding looks to users</p>
            </div>
          </div>

          <div className="flex-1 rounded-xl overflow-hidden border border-outline-variant shadow-inner bg-surface-container-low">
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, #0b1c30 0%, #00668a 100%)' }}>
              {/* Mock login card */}
              <div className="w-full max-w-[280px] bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                    <span className="material-symbols-outlined text-white text-[18px]">school</span>
                  </div>
                  <span className="text-body-lg font-bold text-on-surface" style={{ fontFamily: `${fontFamily}, sans-serif` }}>LXD Studio</span>
                </div>
                <div className="mb-3">
                  <div className="h-3 bg-surface-dim rounded w-16 mb-1.5"></div>
                  <div className="h-8 bg-surface-container-low rounded border border-outline-variant"></div>
                </div>
                <div className="mb-4">
                  <div className="h-3 bg-surface-dim rounded w-14 mb-1.5"></div>
                  <div className="h-8 bg-surface-container-low rounded border border-outline-variant"></div>
                </div>
                <div className="h-9 rounded flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                  <span className="text-label-sm font-semibold text-white">Sign In</span>
                </div>
                <div className="mt-3 flex justify-center">
                  <div className="text-[11px] font-medium cursor-pointer" style={{ color: accentColor }}>Forgot password?</div>
                </div>
              </div>
              <p className="text-[10px] text-white/40 mt-4">Powered by LXD Studio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary px-8">
          <span className="material-symbols-outlined text-[18px]">save</span>
          Save Branding
        </button>
      </div>
    </div>
  );
}
