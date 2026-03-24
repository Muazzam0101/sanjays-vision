import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api';

const Scanning = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scanId = searchParams.get('scan_id');
  const [stats, setStats] = useState({ broken_links: 0, ui_issues: 0, form_errors: 0 });

  useEffect(() => {
    if (!scanId) return;

    const interval = setInterval(async () => {
      try {
        const response = await api.get(`/results/${scanId}`);
        const data = response.data;
        setStats({
          broken_links: data.broken_links,
          ui_issues: data.ui_issues,
          form_errors: data.form_errors
        });
        
        if (data.status === 'completed') {
          clearInterval(interval);
          navigate(`/dashboard?scan_id=${scanId}`);
        } else if (data.status === 'failed') {
          clearInterval(interval);
          alert("Scan failed on backend: \n" + (data.error_details || "Unknown error"));
          console.error(data.error_details);
          navigate('/');
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [scanId, navigate]);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen relative w-full overflow-x-hidden">
      {/* Grid Background & Decor */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="scan-line" style={{ top: '20%', opacity: 0.05 }}></div>
        <div className="scan-line" style={{ top: '60%', opacity: 0.03 }}></div>
      </div>

      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl shadow-[0px_20px_40px_rgba(161,250,255,0.08)]">
        <nav className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-lg md:text-xl font-bold tracking-tighter text-[#a1faff] uppercase font-headline">
            Sanjay’s Vision
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link to="/report" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[10px] lg:text-[12px] tracking-[0.1em] uppercase">Features</Link>
            <Link to="/scanning" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[10px] lg:text-[12px] tracking-[0.1em] uppercase">Technology</Link>
            <Link to="/dashboard" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[10px] lg:text-[12px] tracking-[0.1em] uppercase">Security</Link>
            <Link to="#" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[10px] lg:text-[12px] tracking-[0.1em] uppercase">Pricing</Link>
          </div>
          <div className="flex items-center gap-3 lg:gap-4">
            <button className="hidden sm:block px-4 lg:px-6 py-2 bg-primary text-on-primary font-label text-[10px] lg:text-[12px] tracking-[0.1em] uppercase font-bold hover:shadow-[0_0_15px_rgba(161,250,255,0.4)] active:scale-95 transition-all duration-200">
              Scan Website
            </button>
            <span className="hidden sm:block material-symbols-outlined text-[#a1faff] cursor-pointer">account_circle</span>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden material-symbols-outlined text-primary p-2">menu</button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-surface-container-high border-b border-t border-outline-variant/20 p-4 flex flex-col gap-4 shadow-xl z-50">
            <Link to="/report" onClick={() => setIsMobileMenuOpen(false)} className="text-[#a1faff] font-headline text-sm tracking-widest uppercase py-2">Features</Link>
            <Link to="/scanning" onClick={() => setIsMobileMenuOpen(false)} className="text-[#e4e7fb] font-headline text-sm tracking-widest uppercase py-2">Technology</Link>
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-[#e4e7fb] font-headline text-sm tracking-widest uppercase py-2">Security</Link>
            <Link to="#" onClick={() => setIsMobileMenuOpen(false)} className="text-[#e4e7fb] font-headline text-sm tracking-widest uppercase py-2">Pricing</Link>
            <div className="h-px w-full bg-outline-variant/30 my-2"></div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-on-primary font-headline font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm active:scale-95 transition-all duration-200 text-center w-full">
              Scan Website
            </button>
          </div>
        )}
      </header>

      <main className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 max-w-6xl mx-auto w-full">
        {/* Title Section */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] text-[#a1faff] drop-shadow-[0_0_12px_rgba(161,250,255,0.6)] mb-3 md:mb-4 px-2">
            SCANNING IN PROGRESS...
          </h1>
          <p className="text-on-surface-variant font-body text-base sm:text-lg max-w-2xl mx-auto px-4">
            Detecting UI breaks and functional errors using spectral vision analysis.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
          {/* Step Indicators */}
          <div className="w-full lg:col-span-3 space-y-4 md:space-y-8 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-4 sm:gap-6 lg:gap-0">
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-sm bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div>
                <p className="font-label text-[8px] md:text-[10px] tracking-[0.2em] text-primary/60 uppercase">Step 01</p>
                <p className="font-headline font-medium text-primary text-xs md:text-sm uppercase">Crawling Pages</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="w-8 h-8 shrink-0 rounded-sm bg-primary-container/20 flex items-center justify-center border border-primary-container animate-pulse">
                <span className="material-symbols-outlined text-primary-fixed text-sm animate-spin">progress_activity</span>
              </div>
              <div>
                <p className="font-label text-[8px] md:text-[10px] tracking-[0.2em] text-primary-fixed uppercase">Step 02</p>
                <p className="font-headline font-medium text-on-surface text-xs md:text-sm uppercase">Checking Links</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 opacity-40">
              <div className="w-8 h-8 shrink-0 rounded-sm bg-outline-variant/20 flex items-center justify-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">radio_button_unchecked</span>
              </div>
              <div>
                <p className="font-label text-[8px] md:text-[10px] tracking-[0.2em] uppercase">Step 03</p>
                <p className="font-headline font-medium text-on-surface-variant text-xs md:text-sm uppercase">Analyzing UI</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 opacity-40">
              <div className="w-8 h-8 shrink-0 rounded-sm bg-outline-variant/20 flex items-center justify-center border border-outline-variant/30">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">radio_button_unchecked</span>
              </div>
              <div>
                <p className="font-label text-[8px] md:text-[10px] tracking-[0.2em] uppercase">Step 04</p>
                <p className="font-headline font-medium text-on-surface-variant text-xs md:text-sm uppercase">Testing Forms</p>
              </div>
            </div>
          </div>

          {/* Main Visual: Concentric Rings Loader */}
          <div className="w-full lg:col-span-6 flex justify-center py-6 md:py-12">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center overflow-hidden md:overflow-visible">
              {/* Outer Ring (Clockwise) */}
              <div className="absolute inset-0 md:inset-[-10px] border-[2px] md:border-[3px] border-dashed border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              {/* Middle Ring (Counter) */}
              <div className="absolute inset-4 md:inset-4 border-[2px] border-primary-container/40 rounded-full animate-[spin_6s_linear_infinite_reverse] border-t-primary-fixed"></div>
              {/* Inner Ring (Clockwise) */}
              <div className="absolute inset-8 md:inset-10 border-[3px] md:border-[5px] border-secondary/10 rounded-full animate-[spin_4s_linear_infinite] border-r-secondary"></div>
              
              {/* Pulsing Glow Core */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-primary/10 rounded-full flex items-center justify-center relative shadow-[0_0_80px_rgba(161,250,255,0.2)]">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <span className="material-symbols-outlined text-primary text-3xl sm:text-4xl md:text-5xl z-10" style={{fontVariationSettings: "'FILL' 1"}}>art_track</span>
              </div>
              
              {/* Geometric Decors */}
              <div className="absolute top-[-10px] md:top-0 left-1/2 -translate-x-1/2 w-1 h-6 md:h-8 bg-primary-fixed shadow-[0_0_10px_#00f4fe]"></div>
              <div className="absolute bottom-[-10px] md:bottom-0 left-1/2 -translate-x-1/2 w-1 h-6 md:h-8 bg-primary-fixed/30"></div>
            </div>
          </div>

          {/* Stats/Metrics (Asymmetric Layout) */}
          <div className="w-full lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4 md:gap-6">
            <div className="bg-surface-container-high p-3 md:p-4 border-l-2 border-primary">
              <p className="font-label text-[8px] md:text-[10px] tracking-[0.2em] text-primary uppercase mb-1 truncate">Links Checked</p>
              <p className="font-headline text-lg sm:text-xl md:text-2xl font-bold text-on-surface">Live</p>
            </div>
            <div className="bg-surface-container-high p-3 md:p-4 border-l-2 border-secondary">
              <p className="font-label text-[8px] md:text-[10px] tracking-[0.2em] text-secondary uppercase mb-1 truncate">UI Issues</p>
              <p className="font-headline text-lg sm:text-xl md:text-2xl font-bold text-on-surface">{stats.ui_issues}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 lg:col-span-1 bg-surface-container-high p-3 md:p-4 border-l-2 border-error">
              <p className="font-label text-[8px] md:text-[10px] tracking-[0.2em] text-error uppercase mb-1 truncate">Errors Found</p>
              <p className="font-headline text-lg sm:text-xl md:text-2xl font-bold text-on-surface">{stats.broken_links + stats.form_errors}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="max-w-3xl mx-auto mb-10 md:mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 mb-3">
            <span className="font-label text-[9px] md:text-[11px] tracking-[0.15em] text-on-surface-variant uppercase">Engine Stability: Nominal</span>
            <span className="font-headline text-lg md:text-xl font-bold text-primary">42% COMPLETE</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest overflow-hidden rounded-full">
            <div className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary w-[42%] relative">
              <div className="absolute inset-0 bg-[length:20px_20px] opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)'}}></div>
            </div>
          </div>
        </div>

        {/* Terminal Log Panel */}
        <div className="bg-surface-container-low/60 backdrop-blur-2xl border border-primary/20 rounded-sm overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] md:mx-4 lg:mx-0">
          {/* Terminal Header */}
          <div className="bg-surface-container-high px-3 md:px-4 py-3 flex items-center justify-between border-b border-outline-variant/15">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-error/40"></div>
                <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-tertiary/40"></div>
                <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-primary/40"></div>
              </div>
              <span className="font-label text-[8px] md:text-[10px] tracking-[0.1em] text-on-surface-variant uppercase ml-2 md:ml-4 truncate">System_Diagnostics_Console</span>
            </div>
            <div className="hidden sm:block text-[8px] md:text-[10px] text-primary/60 font-label">UTF-8 // spectral_v2.0</div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-4 md:p-6 font-mono text-[11px] md:text-[13px] leading-relaxed max-h-48 md:max-h-64 overflow-y-auto custom-scrollbar overflow-x-auto whitespace-nowrap sm:whitespace-normal">
            <div className="flex gap-2 md:gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:11</span>
              <span className="text-primary uppercase font-bold shrink-0">[INFO]</span>
              <span className="text-on-surface-variant">Crawler initialized. Targeting: https://internal.nexus-portal.io</span>
            </div>
            <div className="flex gap-2 md:gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:14</span>
              <span className="text-primary uppercase font-bold shrink-0">[INFO]</span>
              <span className="text-on-surface-variant">Parsing DOM tree... 1,402 elements mapped to neural graph.</span>
            </div>
            <div className="flex gap-2 md:gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:28</span>
              <span className="text-error uppercase font-bold shrink-0">[ALERT]</span>
              <span className="text-error-dim">4 broken links detected in /api/v1/auth/callback_legacy...</span>
            </div>
            <div className="flex gap-2 md:gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:35</span>
              <span className="text-primary uppercase font-bold shrink-0">[SYSTEM]</span>
              <span className="text-on-surface-variant">Spectral engine at 85% capacity. Adjusting frequency shift...</span>
            </div>
            <div className="flex gap-2 md:gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:40</span>
              <span className="text-primary uppercase font-bold shrink-0">[INFO]</span>
              <span className="text-on-surface-variant">Checking Link: /dashboard/settings ... <span className="text-primary">OK</span></span>
            </div>
            <div className="flex gap-2 md:gap-4 mb-2">
              <span className="text-primary/40 shrink-0">14:02:42</span>
              <span className="text-primary uppercase font-bold shrink-0">[INFO]</span>
              <span className="text-on-surface-variant">Checking Link: /profile/edit ... <span className="text-primary animate-pulse">PENDING</span></span>
            </div>
            <div className="flex gap-2 md:gap-4 mt-2">
              <span className="text-primary shrink-0 animate-pulse hidden sm:inline">_</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#434857]/15 bg-[#0d1321]">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto gap-4 md:gap-0">
          <div className="text-base md:text-lg font-black text-[#a1faff] font-headline">
            Sanjay’s Vision
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="#" className="font-label uppercase text-[8px] md:text-[10px] tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">Privacy Policy</Link>
            <Link to="#" className="font-label uppercase text-[8px] md:text-[10px] tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">Terms of Service</Link>
            <Link to="#" className="font-label uppercase text-[8px] md:text-[10px] tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">API Documentation</Link>
            <Link to="#" className="font-label uppercase text-[8px] md:text-[10px] tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">System Status</Link>
          </div>
          <p className="font-label uppercase text-[8px] md:text-[10px] tracking-[0.1em] text-[#e4e7fb]/60">
            © 2024 Sanjay’s Vision. Autonomous QA Systems.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Scanning;
