"use client";

import React, { useState, useRef } from 'react';

const FAQ_DATA = [
  {
    question: 'How do I create a new training course?',
    answer: 'Navigate to the <strong>Course Builder</strong> from the sidebar and click <strong>"Create New Course"</strong>. You can add modules, lessons, quizzes, and multimedia content using the drag-and-drop editor. Start by defining a course title and description, then add your content modules in the order learners should complete them. Each module can contain videos, documents, SCORM packages, and interactive assessments.'
  },
  {
    question: 'How do I assign courses to employees?',
    answer: 'Go to <strong>Enrollments → Assign Course</strong>. You can assign courses individually, in bulk via CSV upload, or by department/team. Use <strong>Smart Assignment Rules</strong> to automatically enroll new hires or employees in specific roles. You can also set due dates, send automated reminders, and track enrollment acceptance rates from the Enrollments dashboard.'
  },
  {
    question: 'What SCORM versions are supported?',
    answer: 'LXD Studio fully supports <strong>SCORM 1.2</strong> and <strong>SCORM 2004 (3rd and 4th Edition)</strong>. Simply upload your SCORM .zip package when creating a new module, and the system will automatically detect the version and configure tracking. We also support xAPI (Tin Can) and cmi5 for modern learning content interoperability.'
  },
  {
    question: 'How do I set up compliance tracking?',
    answer: 'In <strong>Settings → Compliance</strong>, you can create compliance tags (e.g., OSHA, HIPAA, SOX) and assign them to courses. Set certification expiration periods, configure auto-renewal reminders, and establish escalation paths for overdue training. The compliance dashboard provides real-time visibility into organizational compliance rates with drill-down by department, location, and individual.'
  },
  {
    question: 'Can I import existing training content?',
    answer: 'Yes! LXD Studio supports multiple import methods: <strong>CSV/Excel import</strong> for user and enrollment data, <strong>SCORM package upload</strong> for interactive e-learning modules, and <strong>document import</strong> for PDFs, PowerPoints, and Word documents which are automatically converted to web-friendly lessons. You can also import from other LMS platforms using our migration tool.'
  },
  {
    question: 'How do certificates work?',
    answer: "Certificates are <strong>auto-generated</strong> when a learner completes a course and meets the passing criteria. You can customize certificate templates with your organization's branding, include QR verification codes, and set expiration dates for recertification. Certificates are stored in each learner's profile and can be downloaded as PDF or shared via a unique verification URL."
  },
  {
    question: 'What integrations are available?',
    answer: 'LXD Studio integrates with major enterprise systems including <strong>SSO providers</strong> (Okta, Azure AD, SAML 2.0), <strong>HR/HCM systems</strong> (Workday, SAP SuccessFactors, BambooHR), <strong>communication tools</strong> (Slack, Microsoft Teams, email), and <strong>content libraries</strong> (LinkedIn Learning, Coursera for Business). Visit Settings → Integrations to configure your connections.'
  },
  {
    question: 'How do I export training reports?',
    answer: 'Go to <strong>Analytics → Export</strong> to generate comprehensive training reports. Choose from pre-built templates or create custom reports with specific metrics. Export formats include CSV, Excel, and PDF. You can also schedule <strong>automated recurring reports</strong> to be delivered via email to stakeholders on a daily, weekly, or monthly cadence.'
  }
];

const LINK_GROUPS = [
  {
    title: 'Getting Started',
    icon: 'rocket_launch',
    links: ['Quick Start Guide', 'Video Tutorials', 'First Course Walkthrough']
  },
  {
    title: 'Course Management',
    icon: 'school',
    links: ['Creating Courses', 'Managing Enrollments', 'Assessment Setup']
  },
  {
    title: 'Administration',
    icon: 'admin_panel_settings',
    links: ['User Management', 'SSO Configuration', 'Compliance Settings']
  },
  {
    title: 'API & Developers',
    icon: 'code',
    links: ['API Documentation', 'Webhooks', 'Custom Integrations']
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  const filteredFaqs = FAQ_DATA.map((faq, i) => {
    const query = searchQuery.toLowerCase().trim();
    const isVisible = !query || 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query);
    return { ...faq, originalIndex: i, isVisible };
  });

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const handleZoneClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFiles([]);
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 2000);
    }, 1500);
  };

  const handleReset = () => {
    setFiles([]);
  };

  return (
    <div className="flex flex-col gap-8">

      {/* Page Header */}
      <div>
        <p className="text-body-sm text-on-surface-variant mb-1">Resources</p>
        <h2 className="text-display-lg font-headline text-on-surface tracking-tight">Help & Support</h2>
        <p className="text-body-lg text-on-surface-variant mt-1">Get help with LXD Studio</p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Knowledge Base */}
        <div className="card p-6 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-secondary-container/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-[28px] text-secondary-container">menu_book</span>
          </div>
          <h3 className="text-headline-sm font-headline text-on-surface mb-2">Knowledge Base</h3>
          <p className="text-body-sm text-on-surface-variant mb-4 leading-relaxed">Browse our comprehensive documentation and guides</p>
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 text-label-md font-semibold text-secondary hover:text-secondary-container transition-colors mt-auto">
            Browse Articles
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </a>
        </div>

        {/* Contact Support */}
        <div className="card p-6 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300 cursor-pointer" onClick={(e) => handleScrollTo(e, 'contact-form')}>
          <div className="w-14 h-14 rounded-full bg-secondary-container/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-[28px] text-secondary-container">contact_support</span>
          </div>
          <h3 className="text-headline-sm font-headline text-on-surface mb-2">Contact Support</h3>
          <p className="text-body-sm text-on-surface-variant mb-4 leading-relaxed">Get in touch with our support team</p>
          <a href="#contact-form" onClick={(e) => handleScrollTo(e, 'contact-form')} className="inline-flex items-center gap-1 text-label-md font-semibold text-secondary hover:text-secondary-container transition-colors mt-auto">
            Submit Ticket
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </a>
        </div>

        {/* System Status */}
        <div className="card p-6 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300 cursor-pointer sm:col-span-2 lg:col-span-1">
          <div className="w-14 h-14 rounded-full bg-secondary-container/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-[28px] text-secondary-container">monitor_heart</span>
          </div>
          <h3 className="text-headline-sm font-headline text-on-surface mb-2">System Status</h3>
          <p className="text-body-sm text-on-surface-variant mb-1 leading-relaxed flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-green inline-block animate-pulse"></span>
            All systems operational
          </p>
          <p className="text-label-sm text-on-surface-variant mb-4">Uptime: 99.98%</p>
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 text-label-md font-semibold text-secondary hover:text-secondary-container transition-colors mt-auto">
            View Status
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </a>
        </div>

      </div>

      {/* Search Bar */}
      <div className="card p-6">
        <div className="relative max-w-[42rem] mx-auto">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search help articles, FAQs, and documentation..."
            className="input-field w-full pl-12 pr-4 py-3 text-body-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-secondary">quiz</span>
          <h3 className="text-headline-md font-headline text-on-surface">Frequently Asked Questions</h3>
        </div>

        <div className="card overflow-hidden divide-y divide-outline-variant" id="faq-accordion">
          {filteredFaqs.map((faq) => {
            if (!faq.isVisible) return null;
            const isOpen = openFaqIndex === faq.originalIndex;
            return (
              <div key={faq.originalIndex} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger w-full flex items-center justify-between px-6 py-5 text-left hover:bg-surface-container-low/50 transition-colors duration-200 group"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(faq.originalIndex)}
                >
                  <span className="text-body-lg font-medium text-on-surface pr-4 group-hover:text-secondary transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className="material-symbols-outlined text-on-surface-variant faq-chevron transition-transform duration-300 flex-shrink-0"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className="faq-content"
                  style={{
                    maxHeight: isOpen ? '1000px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="px-6 pb-5 pt-0">
                    <p
                      className="text-body-md text-on-surface-variant leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-secondary">mail</span>
          <h3 className="text-headline-md font-headline text-on-surface">Submit a Support Ticket</h3>
        </div>

        <div className="card p-6 lg:p-8">
          <form id="support-form" ref={formRef} className="flex flex-col gap-6" onSubmit={handleSubmit} onReset={handleReset}>

            {/* Subject */}
            <div>
              <label className="block text-label-md font-medium text-on-surface mb-2">Subject <span className="text-error">*</span></label>
              <input
                type="text"
                placeholder="Brief description of your issue"
                className="input-field w-full"
                required
              />
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-label-md font-medium text-on-surface mb-2">Category <span className="text-error">*</span></label>
                <div className="relative">
                  <select className="input-field w-full appearance-none pr-10 cursor-pointer" required defaultValue="">
                    <option value="" disabled>Select a category</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="account">Account Issue</option>
                    <option value="training">Training Help</option>
                    <option value="other">Other</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-label-md font-medium text-on-surface mb-2">Priority <span className="text-error">*</span></label>
                <div className="relative">
                  <select className="input-field w-full appearance-none pr-10 cursor-pointer" required defaultValue="">
                    <option value="" disabled>Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-label-md font-medium text-on-surface mb-2">Description <span className="text-error">*</span></label>
              <textarea
                placeholder="Please describe your issue in detail. Include steps to reproduce if reporting a bug."
                className="input-field w-full min-h-[160px] resize-y"
                rows={6}
                required
              ></textarea>
            </div>

            {/* Attachment Upload Zone */}
            <div>
              <label className="block text-label-md font-medium text-on-surface mb-2">Attachments</label>
              <div
                id="upload-zone"
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group ${
                  isDragOver ? 'border-secondary bg-secondary/5' : 'border-outline-variant hover:border-secondary hover:bg-secondary/5'
                }`}
                onClick={handleZoneClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf,.zip"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                
                {files.length === 0 ? (
                  <>
                    <span className="material-symbols-outlined text-[40px] text-on-surface-variant group-hover:text-secondary transition-colors mb-2 block">cloud_upload</span>
                    <p className="text-body-md text-on-surface-variant mb-1">
                      <span className="text-secondary font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-label-sm text-on-surface-variant">PNG, JPG, PDF, or ZIP up to 25MB</p>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[32px] text-accent-green mb-2 block">task</span>
                    <p className="text-body-md text-on-surface font-medium mb-2">{files.length} file{files.length > 1 ? 's' : ''} selected</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {files.map((file, i) => (
                        <span key={i} className="inline-flex items-center gap-1 bg-surface-container rounded-lg px-3 py-1 text-label-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px]">description</span>
                          {file.name}
                        </span>
                      ))}
                    </div>
                    <p className="text-label-sm text-on-surface-variant mt-2">Click to change files</p>
                  </>
                )}
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                className={`btn-primary w-full sm:w-auto ${isSubmitted ? '!bg-accent-green !text-white' : ''}`}
                id="submit-ticket-btn"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Submitting...
                  </>
                ) : isSubmitted ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span> Ticket Submitted!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span> Submit Ticket
                  </>
                )}
              </button>
              <button type="reset" className="btn-secondary w-full sm:w-auto" disabled={isSubmitting || isSubmitted}>
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                Reset Form
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Useful Links Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-secondary">link</span>
          <h3 className="text-headline-md font-headline text-on-surface">Useful Links</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LINK_GROUPS.map((group, i) => (
            <div key={i} className="card p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary text-[22px]">{group.icon}</span>
                <h4 className="text-label-md font-bold text-on-surface">{group.title}</h4>
              </div>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="group/link flex items-center gap-2 text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200">
                      <span className="material-symbols-outlined text-[16px] text-outline group-hover/link:text-secondary transition-colors">chevron_right</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Support Footer Info */}
      <div className="card p-6 bg-surface-container-low/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[24px]">schedule</span>
            <div>
              <p className="text-label-md font-semibold text-on-surface">Support Hours</p>
              <p className="text-body-sm text-on-surface-variant">Monday–Friday, 8:00 AM – 8:00 PM EST</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-outline-variant"></div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[24px]">avg_pace</span>
            <div>
              <p className="text-label-md font-semibold text-on-surface">Avg. Response Time</p>
              <p className="text-body-sm text-on-surface-variant">Under 2 hours for critical issues</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-outline-variant"></div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[24px]">call</span>
            <div>
              <p className="text-label-md font-semibold text-on-surface">Emergency Line</p>
              <p className="text-body-sm text-on-surface-variant">+1 (800) 555-0199</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
