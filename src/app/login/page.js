"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate auth delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="bg-tech-pattern min-h-screen flex items-center justify-center p-4 md:p-10 font-body text-on-surface antialiased">
      <main className="w-full max-w-[28rem] relative z-10 animate-slide-up">
        {/* Main Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] border border-outline-variant/30 overflow-hidden">
          
          {/* Header Section */}
          <div className="p-6 md:p-8 pb-4 md:pb-6 flex flex-col items-center border-b border-surface-container">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-headline-md">school</span>
              </div>
              <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline tracking-tight text-primary">LXD Studio</h1>
            </div>
            <h2 className="text-headline-sm font-headline text-on-surface text-center mb-1">Enterprise Portal Access</h2>
            <p className="text-body-sm text-on-surface-variant text-center">Please authenticate to continue to your dashboard.</p>
          </div>

          {/* Form Section */}
          <div className="p-6 md:p-8 pt-4 md:pt-6 bg-surface-container-lowest">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-label-md font-medium text-on-surface" htmlFor="email">Corporate Email</label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none transition-colors duration-150 ${emailFocus ? 'text-secondary-container' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input
                    className="input-field input-with-icon"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="employee@company.com"
                    required
                    autoComplete="email"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-label-md font-medium text-on-surface" htmlFor="password">Password</label>
                  <a className="text-label-sm text-secondary hover:text-primary transition-colors duration-150 cursor-pointer" href="#">Forgot credentials?</a>
                </div>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none transition-colors duration-150 ${passwordFocus ? 'text-secondary-container' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    className="input-field input-with-icon"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center pt-1">
                <input className="h-4 w-4 text-primary focus:ring-secondary-container border-outline-variant rounded-sm transition-colors duration-150 bg-surface-container-lowest" id="remember-me" name="remember-me" type="checkbox" />
                <label className="ml-2 block text-body-sm text-on-surface-variant" htmlFor="remember-me">Keep me signed in</label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-on-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px] mr-2">login</span>
                      Secure Login
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-6 relative">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/50"></div>
              </div>
              <div className="relative flex justify-center text-label-sm">
                <span className="px-2 bg-surface-container-lowest text-on-surface-variant">Or continue with</span>
              </div>
            </div>

            {/* SSO Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" className="btn-secondary">
                <svg aria-hidden="true" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                Google
              </button>
              <button type="button" className="btn-secondary">
                <svg aria-hidden="true" className="h-5 w-5 mr-1" fill="#0078D4" viewBox="0 0 24 24">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"></path>
                </svg>
                Microsoft
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-surface-container-low border-t border-outline-variant/30 px-6 py-2 flex justify-between items-center text-label-sm text-on-surface-variant">
            <span>© 2024 LXD Studio</span>
            <div className="flex gap-2">
              <a className="hover:text-primary transition-colors duration-150" href="#">Privacy</a>
              <a className="hover:text-primary transition-colors duration-150" href="#">Terms</a>
            </div>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="ambient-glow"></div>
      </main>
    </div>
  );
}
