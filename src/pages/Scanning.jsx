import React from 'react';
import { Link } from 'react-router-dom';

const Scanning = () => {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen relative overflow-x-hidden">
      {/* Grid Background & Decor */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="scan-line" style={{ top: '20%', opacity: 0.05 }}></div>
        <div className="scan-line" style={{ top: '60%', opacity: 0.03 }}></div>
      </div>

      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl shadow-[0px_20px_40px_rgba(161,250,255,0.08)]">
        <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tighter text-[#a1faff] uppercase font-headline">
            Sanjay’s Vision
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/report" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[12px] tracking-[0.1em] uppercase">Features</Link>
            <Link to="/scanning" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[12px] tracking-[0.1em] uppercase">Technology</Link>
            <Link to="/dashboard" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[12px] tracking-[0.1em] uppercase">Security</Link>
            <Link to="#" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[12px] tracking-[0.1em] uppercase">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-primary text-on-primary font-label text-[12px] tracking-[0.1em] uppercase font-bold hover:shadow-[0_0_15px_rgba(161,250,255,0.4)] active:scale-95 transition-all duration-200">
              Scan Website
            </button>
            <span className="material-symbols-outlined text-[#a1faff] cursor-pointer">account_circle</span>
          </div>
        </nav>
      </header>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] text-[#a1faff] drop-shadow-[0_0_12px_rgba(161,250,255,0.6)] mb-4">
            SCANNING IN PROGRESS...
          </h1>
          <p className="text-on-surface-variant font-body text-lg max-w-2xl mx-auto">
            Detecting UI breaks and functional errors using spectral vision analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Step Indicators */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-sm bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div>
                <p className="font-label text-[10px] tracking-[0.2em] text-primary/60 uppercase">Step 01</p>
                <p className="font-headline font-medium text-primary text-sm uppercase">Crawling Pages</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-sm bg-primary-container/20 flex items-center justify-center border border-primary-container animate-pulse">
                <span className="material-symbols-outlined text-primary-fixed text-sm animate-spin">progress_activity</span>
              </div>
              <div>
                <p className="font-label text-[10px] tracking-[0.2em] text-primary-fixed uppercase">Step 02</p>
                <p className="font-headline font-medium text-on-surface text-sm uppercase">Checking Links</p>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-40">
              <div className="w-8 h-8 rounded-sm bg-outline-variant/20 flex items-center justify-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">radio_button_unchecked</span>
              </div>
              <div>
                <p className="font-label text-[10px] tracking-[0.2em] uppercase">Step 03</p>
                <p className="font-headline font-medium text-on-surface-variant text-sm uppercase">Analyzing UI</p>
              </div>
            </div>

            <div className="flex items-center gap-4 opacity-40">
              <div className="w-8 h-8 rounded-sm bg-outline-variant/20 flex items-center justify-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">radio_button_unchecked</span>
              </div>
              <div>
                <p className="font-label text-[10px] tracking-[0.2em] uppercase">Step 04</p>
                <p className="font-headline font-medium text-on-surface-variant text-sm uppercase">Testing Forms</p>
              </div>
            </div>
          </div>

          {/* Main Visual: Concentric Rings Loader */}
          <div className="lg:col-span-6 flex justify-center py-12">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Outer Ring (Clockwise) */}
              <div className="absolute inset-0 border-[3px] border-dashed border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              {/* Middle Ring (Counter) */}
              <div className="absolute inset-4 border-[2px] border-primary-container/40 rounded-full animate-[spin_6s_linear_infinite_reverse] border-t-primary-fixed"></div>
              {/* Inner Ring (Clockwise) */}
              <div className="absolute inset-10 border-[5px] border-secondary/10 rounded-full animate-[spin_4s_linear_infinite] border-r-secondary"></div>
              
              {/* Pulsing Glow Core */}
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center relative shadow-[0_0_80px_rgba(161,250,255,0.2)]">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <span className="material-symbols-outlined text-primary text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>art_track</span>
              </div>
              
              {/* Geometric Decors */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-primary-fixed shadow-[0_0_10px_#00f4fe]"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-primary-fixed/30"></div>
            </div>
          </div>

          {/* Stats/Metrics (Asymmetric Layout) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-surface-container-high p-4 border-l-2 border-primary">
              <p className="font-label text-[10px] tracking-[0.2em] text-primary uppercase mb-1">Threads Active</p>
              <p className="font-headline text-2xl font-bold text-on-surface">128</p>
            </div>
            <div className="bg-surface-container-high p-4 border-l-2 border-secondary">
              <p className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase mb-1">Spectral Depth</p>
              <p className="font-headline text-2xl font-bold text-on-surface">4.2 TB/s</p>
            </div>
            <div className="bg-surface-container-high p-4 border-l-2 border-error">
              <p className="font-label text-[10px] tracking-[0.2em] text-error uppercase mb-1">Errors Found</p>
              <p className="font-headline text-2xl font-bold text-on-surface">04</p>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="flex justify-between items-end mb-3">
            <span className="font-label text-[11px] tracking-[0.15em] text-on-surface-variant uppercase">Engine Stability: Nominal</span>
            <span className="font-headline text-xl font-bold text-primary">42% COMPLETE</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary w-[42%] relative">
              <div className="absolute inset-0 bg-[length:20px_20px] opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)'}}></div>
            </div>
          </div>
        </div>

        {/* Terminal Log Panel */}
        <div className="bg-surface-container-low/60 backdrop-blur-2xl border border-primary/20 rounded-sm overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
          {/* Terminal Header */}
          <div className="bg-surface-container-high px-4 py-3 flex items-center justify-between border-b border-outline-variant/15">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-error/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-primary/40"></div>
              </div>
              <span className="font-label text-[10px] tracking-[0.1em] text-on-surface-variant uppercase ml-4">System_Diagnostics_Console</span>
            </div>
            <div className="text-[10px] text-primary/60 font-label">UTF-8 // spectral_v2.0</div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 font-mono text-[13px] leading-relaxed max-h-64 overflow-y-auto custom-scrollbar">
            <div className="flex gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:11</span>
              <span className="text-primary uppercase font-bold">[INFO]</span>
              <span className="text-on-surface-variant">Crawler initialized. Targeting: https://internal.nexus-portal.io</span>
            </div>
            <div className="flex gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:14</span>
              <span className="text-primary uppercase font-bold">[INFO]</span>
              <span className="text-on-surface-variant">Parsing DOM tree... 1,402 elements mapped to neural graph.</span>
            </div>
            <div className="flex gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:28</span>
              <span className="text-error uppercase font-bold">[ALERT]</span>
              <span className="text-error-dim">4 broken links detected in /api/v1/auth/callback_legacy...</span>
            </div>
            <div className="flex gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:35</span>
              <span className="text-primary uppercase font-bold">[SYSTEM]</span>
              <span className="text-on-surface-variant">Spectral engine at 85% capacity. Adjusting frequency shift...</span>
            </div>
            <div className="flex gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:40</span>
              <span className="text-primary uppercase font-bold">[INFO]</span>
              <span className="text-on-surface-variant">Checking Link: /dashboard/settings ... <span className="text-primary">OK</span></span>
            </div>
            <div className="flex gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:42</span>
              <span className="text-primary uppercase font-bold">[INFO]</span>
              <span className="text-on-surface-variant">Checking Link: /profile/edit ... <span className="text-primary animate-pulse">PENDING</span></span>
            </div>
            <div className="flex gap-4">
              <span className="text-primary shrink-0 animate-pulse">_</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#434857]/15 bg-[#0d1321]">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-7xl mx-auto">
          <div className="text-lg font-black text-[#a1faff] font-headline mb-6 md:mb-0">
            Sanjay’s Vision
          </div>
          <div className="flex gap-8 mb-6 md:mb-0">
            <Link to="#" className="font-label uppercase text-[10px] tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">Privacy Policy</Link>
            <Link to="#" className="font-label uppercase text-[10px] tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">Terms of Service</Link>
            <Link to="#" className="font-label uppercase text-[10px] tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">API Documentation</Link>
            <Link to="#" className="font-label uppercase text-[10px] tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">System Status</Link>
          </div>
          <p className="font-label uppercase text-[10px] tracking-[0.1em] text-[#e4e7fb]/60">
            © 2024 Sanjay’s Vision. Autonomous QA Systems.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Scanning;
