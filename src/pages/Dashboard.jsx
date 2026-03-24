import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-background w-full overflow-x-hidden">
      <div className="scan-line pointer-events-none"></div>
      
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl shadow-[0px_20px_40px_rgba(161,250,255,0.08)]">
        <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/" className="text-lg md:text-xl font-bold tracking-tighter text-[#a1faff] uppercase font-headline">
              Sanjay’s Vision
            </Link>
            <nav className="hidden md:flex gap-4 lg:gap-6">
              <Link to="/report" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[10px] lg:text-sm uppercase tracking-[0.1em]">Features</Link>
              <Link to="/scanning" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[10px] lg:text-sm uppercase tracking-[0.1em]">Technology</Link>
              <Link to="/dashboard" className="text-[#a1faff] border-b-2 border-[#a1faff] pb-1 font-label text-[10px] lg:text-sm uppercase tracking-[0.1em]">Security</Link>
              <Link to="#" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-label text-[10px] lg:text-sm uppercase tracking-[0.1em]">Pricing</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden lg:flex items-center bg-surface-container px-3 py-1.5 rounded-sm border border-outline-variant/20 gap-3">
              <span className="text-[10px] font-label uppercase tracking-widest text-primary-fixed">Quick Scan:</span>
              <span className="text-[10px] font-label text-on-surface/80">Last 24h: 1,402 assets checked</span>
            </div>
            <button className="hidden sm:block bg-primary text-on-primary px-3 lg:px-4 py-2 text-[10px] lg:text-sm font-medium hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest">
              Scan Website
            </button>
            <span className="hidden sm:block material-symbols-outlined text-[#a1faff] cursor-pointer" data-icon="account_circle">account_circle</span>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden material-symbols-outlined text-primary p-2">menu</button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-surface-container-high border-b border-t border-outline-variant/20 p-4 flex flex-col gap-4 shadow-xl z-50">
            <Link to="/report" className="text-[#a1faff] font-headline text-sm tracking-widest uppercase py-2">Features</Link>
            <Link to="/scanning" className="text-[#e4e7fb] font-headline text-sm tracking-widest uppercase py-2">Technology</Link>
            <Link to="/dashboard" className="text-[#e4e7fb] font-headline text-sm tracking-widest uppercase py-2">Security</Link>
            <Link to="#" className="text-[#e4e7fb] font-headline text-sm tracking-widest uppercase py-2">Pricing</Link>
            <div className="h-px w-full bg-outline-variant/30 my-2"></div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[10px] font-label uppercase text-on-surface/80">Last 24h: 1,402 assets</span>
              <button className="bg-primary text-on-primary font-headline font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-sm active:scale-95 transition-all duration-200">
                Scan Website
              </button>
            </div>
          </div>
        )}
      </header>
      
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto space-y-8 w-full">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tighter">Security Dashboard</h1>
            <p className="text-on-surface-variant font-body text-sm md:text-base">Autonomous vulnerability assessment for <span className="text-primary break-all">sanjay-vision.ai</span></p>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none justify-center items-center gap-2 border border-outline-variant/30 px-4 py-2 font-label text-[10px] md:text-xs uppercase tracking-wider hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-sm" data-icon="download">download</span>
              Download Report
            </button>
            <button className="flex-1 md:flex-none justify-center items-center gap-2 bg-primary text-on-primary px-4 py-2 font-label text-[10px] md:text-xs uppercase tracking-wider hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-sm" data-icon="refresh">refresh</span>
              Re-scan
            </button>
          </div>
        </div>

        {/* Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Broken Links */}
          <div className="glass-card p-5 md:p-6 group hover:shadow-[0_0_30px_rgba(255,113,108,0.15)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-tertiary" data-icon="link_off">link_off</span>
              <span className="text-[10px] font-label uppercase tracking-widest text-tertiary">Critical</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-headline font-bold text-on-surface">42</div>
              <div className="text-[10px] md:text-xs font-label uppercase tracking-widest text-on-surface-variant">Broken Links</div>
            </div>
            <div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="bg-tertiary h-full w-2/3 shadow-[0_0_10px_#ff7168]"></div>
            </div>
          </div>
          
          {/* UI Issues */}
          <div className="glass-card p-5 md:p-6 group hover:shadow-[0_0_30px_rgba(159,142,255,0.15)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-secondary" data-icon="palette">palette</span>
              <span className="text-[10px] font-label uppercase tracking-widest text-secondary">Major</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-headline font-bold text-on-surface">128</div>
              <div className="text-[10px] md:text-xs font-label uppercase tracking-widest text-on-surface-variant">UI Issues</div>
            </div>
            <div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-1/2 shadow-[0_0_10px_#9f8eff]"></div>
            </div>
          </div>

          {/* Form Errors */}
          <div className="glass-card p-5 md:p-6 group hover:shadow-[0_0_30px_rgba(161,250,255,0.15)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-primary" data-icon="input">input</span>
              <span className="text-[10px] font-label uppercase tracking-widest text-primary">Minor</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-headline font-bold text-on-surface">14</div>
              <div className="text-[10px] md:text-xs font-label uppercase tracking-widest text-on-surface-variant">Form Errors</div>
            </div>
            <div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="bg-primary h-full w-1/4 shadow-[0_0_10px_#a1faff]"></div>
            </div>
          </div>

          {/* Health Score */}
          <div className="glass-card p-5 md:p-6 flex flex-col items-center justify-center relative overflow-hidden hidden sm:flex">
            <svg className="w-20 h-20 md:w-24 md:h-24 transform -rotate-90">
              <circle className="text-surface-container-high" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="4"></circle>
              <circle className="text-primary-fixed drop-shadow-[0_0_8px_rgba(0,244,254,0.6)]" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="30.1" strokeWidth="6"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="text-xl md:text-2xl font-headline font-bold text-on-surface">88%</span>
              <span className="text-[8px] font-label uppercase tracking-tighter text-on-surface-variant">Health</span>
            </div>
            <div className="mt-4 text-center">
              <span className="text-[8px] md:text-[10px] font-label uppercase tracking-widest text-primary-fixed">Stable Condition</span>
            </div>
          </div>
        </div>

        {/* Middle Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Bug List */}
          <div className="lg:col-span-2 glass-card overflow-hidden">
            <div className="p-4 md:p-6 border-b border-outline-variant/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <h2 className="font-headline font-semibold text-base md:text-lg uppercase tracking-wider">Detection Logs</h2>
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                <select className="bg-transparent border-none text-[10px] font-label uppercase tracking-widest focus:ring-0 text-on-surface-variant">
                  <option>Severity: All</option>
                  <option>Critical</option>
                  <option>Major</option>
                </select>
                <select className="bg-transparent border-none text-[10px] font-label uppercase tracking-widest focus:ring-0 text-on-surface-variant">
                  <option>Type: All</option>
                  <option>Broken Links</option>
                  <option>Security</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap md:whitespace-normal">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant">Page URL</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant">Issue Type</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant">Severity</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  <tr className="hover:bg-surface-container-high/40 transition-colors group">
                    <td className="px-4 md:px-6 py-3 md:py-4 font-body text-xs md:text-sm text-on-surface-variant group-hover:text-primary transition-colors">/auth/login.php</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 font-body text-xs md:text-sm">Expired SSL Certificate</td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="flex items-center gap-1.5 md:gap-2 text-tertiary text-[9px] md:text-[10px] font-label uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                        Critical
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="material-symbols-outlined text-base md:text-lg text-tertiary" data-icon="warning">warning</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-high/40 transition-colors group">
                    <td className="px-4 md:px-6 py-3 md:py-4 font-body text-xs md:text-sm text-on-surface-variant group-hover:text-primary transition-colors">/dashboard/analytics</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 font-body text-xs md:text-sm">Contrast Accessibility</td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="flex items-center gap-1.5 md:gap-2 text-secondary text-[9px] md:text-[10px] font-label uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Major
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="material-symbols-outlined text-base md:text-lg text-secondary" data-icon="error_outline">error_outline</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-high/40 transition-colors group">
                    <td className="px-4 md:px-6 py-3 md:py-4 font-body text-xs md:text-sm text-on-surface-variant group-hover:text-primary transition-colors">/pricing</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 font-body text-xs md:text-sm">404 Asset: hero-bg.png</td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="flex items-center gap-1.5 md:gap-2 text-primary text-[9px] md:text-[10px] font-label uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Minor
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="material-symbols-outlined text-base md:text-lg text-primary" data-icon="info">info</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-high/40 transition-colors group">
                    <td className="px-4 md:px-6 py-3 md:py-4 font-body text-xs md:text-sm text-on-surface-variant group-hover:text-primary transition-colors">/contact-us</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 font-body text-xs md:text-sm">Unlabeled Input Fields</td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="flex items-center gap-1.5 md:gap-2 text-secondary text-[9px] md:text-[10px] font-label uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Major
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                      <span className="material-symbols-outlined text-base md:text-lg text-secondary" data-icon="error_outline">error_outline</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Screenshot Panel */}
          <div className="space-y-4 md:space-y-6">
            <div className="glass-card p-4 md:p-6">
              <h2 className="font-headline font-semibold text-base md:text-lg uppercase tracking-wider mb-4 md:mb-6">Visual Proof</h2>
              <div className="space-y-4 md:space-y-6 flex flex-row sm:flex-col gap-4 sm:gap-0 overflow-x-auto sm:overflow-visible hide-scrollbar pb-2 sm:pb-0">
                <div className="relative group cursor-pointer shrink-0 w-64 sm:w-auto">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-tertiary/50 to-secondary/50 rounded-sm opacity-20 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                  <div className="relative bg-surface-container overflow-hidden">
                    <img alt="Security visual" className="w-full h-32 md:h-40 object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" data-alt="Modern dark mode web interface dashboard with glowing red warning indicators and digital artifacts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlKLq--WTJmjQ8sIfcXm4C4FiSlU_sSr4hwIyNE1Cmraed2o7_nWX8sZz94BMcsA4AgV1ygyRwqwGPg-qqaT_i9pN8h0zDR5BQEFMw7sei3WjTEZ3dtsd7GUHQ_PXhWA-Ta2gujZsTsqdPBJH7PoX_w0iiGfQPdRudQbF1pTe8QZSBdOB872MRfbDIetHkFv00s-sQkBrusyntcI_7dk1rlL7Er7gEmzAPuZAA8fanGusMJ-72ZLIuOiILa0wE9apfFdAwlN1vLonC"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80"></div>
                    <div className="absolute bottom-3 left-3 flex flex-col">
                      <span className="text-[10px] font-label uppercase tracking-widest text-on-surface">Login Page Error</span>
                      <span className="text-[8px] font-label uppercase text-tertiary">Critical Vulnerability</span>
                    </div>
                  </div>
                </div>

                <div className="relative group cursor-pointer shrink-0 w-64 sm:w-auto">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/50 to-primary/50 rounded-sm opacity-20 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                  <div className="relative bg-surface-container overflow-hidden">
                    <img alt="Data architecture" className="w-full h-32 md:h-40 object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" data-alt="Abstract visualization of network servers and data nodes in deep blue and neon purple lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGHNrnrjAHcNPLJ-KwnrPNTOQRuS63e_IwsxZMGAa1qK5wtnKiphY1G3764_xSrMY-5UjfcPORHMQ15PLeEfocVdCVp8vyURjklPteJAKzRrqNWcUbMs41d4KMPxAtxKJ6dau85U71fJNTugqext_jAjXO4cS_E8ucuG-Zuk1kfngaA1GwQNzusX83z2V1xdO4c5QakkdGXRkeglhimNBRoNlyTuWpNFox-DCy0ehtULDlSZplYeXTsJVDdtOoWjhcDYfMIWY1CzJM"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80"></div>
                    <div className="absolute bottom-3 left-3 flex flex-col">
                      <span className="text-[10px] font-label uppercase tracking-widest text-on-surface">Resource Failure</span>
                      <span className="text-[8px] font-label uppercase text-secondary">Major UI Inconsistency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 md:p-6 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <span className="material-symbols-outlined text-primary-fixed" data-icon="bolt">bolt</span>
                <h3 className="font-headline text-xs md:text-sm font-bold uppercase tracking-widest">AI Suggestion</h3>
              </div>
              <p className="text-[10px] md:text-xs text-on-surface/80 leading-relaxed font-body">
                "Detected pattern of SSL expirations across subdomains. Recommend enabling Auto-Renewal via the API gateway."
              </p>
              <button className="mt-4 w-full text-[10px] font-label uppercase tracking-[0.2em] py-2.5 border border-primary/40 hover:bg-primary/20 transition-colors">Initialize Patch</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#434857]/15 bg-[#0d1321] mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto gap-4 md:gap-0">
          <div className="flex flex-col gap-2 mb-4 md:mb-0 text-center md:text-left">
            <span className="text-base md:text-lg font-black text-[#a1faff] font-headline uppercase tracking-tighter">Sanjay’s Vision</span>
            <p className="text-[8px] md:text-[10px] font-label uppercase tracking-[0.1em] text-[#e4e7fb]/60">© 2024 Sanjay’s Vision. Autonomous QA Systems.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="#" className="text-[8px] md:text-[10px] font-label uppercase tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-[8px] md:text-[10px] font-label uppercase tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">Terms of Service</Link>
            <Link to="#" className="text-[8px] md:text-[10px] font-label uppercase tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">API Documentation</Link>
            <Link to="#" className="text-[8px] md:text-[10px] font-label uppercase tracking-[0.1em] text-[#e4e7fb]/60 hover:text-[#00f4fe] transition-colors">System Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
