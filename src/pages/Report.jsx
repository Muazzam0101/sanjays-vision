import React from 'react';
import { Link } from 'react-router-dom';

const Report = () => {
  return (
    <div className="font-body text-on-background selection:bg-primary selection:text-on-primary min-h-screen">
      {/* TopNavBar */}
      <nav className="bg-[#090e1b]/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-[#434857]/15 shadow-[0px_20px_40px_rgba(161,250,255,0.08)] flex justify-between items-center px-8 h-16 w-full max-w-none">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tighter text-[#a1faff] uppercase font-['Space_Grotesk']">ORACLE_QA</Link>
          <div className="hidden md:flex gap-6 font-['Space_Grotesk'] tracking-tight antialiased">
            <Link to="/report" className="text-[#00f4fe] border-b-2 border-[#00f4fe] pb-1">Reports</Link>
            <Link to="/scanning" className="text-[#e4e7fb]/60 hover:text-[#e4e7fb] transition-all duration-300">Vulnerabilities</Link>
            <Link to="/dashboard" className="text-[#e4e7fb]/60 hover:text-[#e4e7fb] transition-all duration-300">Assets</Link>
            <Link to="#" className="text-[#e4e7fb]/60 hover:text-[#e4e7fb] transition-all duration-300">Settings</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-on-primary px-4 py-1.5 font-label text-sm font-bold uppercase tracking-wider hover:bg-primary-fixed transition-all duration-200 active:scale-95">
            Export PDF
          </button>
          <div className="flex gap-2">
            <span className="material-symbols-outlined p-2 text-[#e4e7fb]/60 hover:bg-[#1e2538]/40 transition-all rounded cursor-pointer">notifications</span>
            <span className="material-symbols-outlined p-2 text-[#e4e7fb]/60 hover:bg-[#1e2538]/40 transition-all rounded cursor-pointer">account_circle</span>
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-[#434857]/15 bg-[#0d1321] hidden lg:flex flex-col">
        <div className="p-6 border-b border-[#434857]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-surface-container-high border border-outline-variant/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
            </div>
            <div>
              <p className="font-headline text-xs font-bold text-primary tracking-widest uppercase">System_Root</p>
              <p className="text-[10px] text-on-surface-variant font-label tracking-tighter uppercase opacity-60">Level 4 Clearance</p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-1 py-6">
          <Link to="/dashboard" className="flex items-center gap-4 px-6 py-3 text-[#e4e7fb]/50 hover:bg-[#1e2538]/20 hover:text-[#a1faff] hover:translate-x-1 transition-transform font-['Space_Grotesk'] uppercase tracking-[0.1em] text-[10px]">
            <span className="material-symbols-outlined text-lg">dashboard</span> Dashboard
          </Link>
          <Link to="/scanning" className="flex items-center gap-4 px-6 py-3 bg-[#1e2538]/40 text-[#a1faff] border-r-4 border-[#00f4fe] font-['Space_Grotesk'] uppercase tracking-[0.1em] text-[10px]">
            <span className="material-symbols-outlined text-lg">radar</span> Active Scans
          </Link>
          <Link to="#" className="flex items-center gap-4 px-6 py-3 text-[#e4e7fb]/50 hover:bg-[#1e2538]/20 hover:text-[#a1faff] hover:translate-x-1 transition-transform font-['Space_Grotesk'] uppercase tracking-[0.1em] text-[10px]">
            <span className="material-symbols-outlined text-lg">terminal</span> Payloads
          </Link>
          <Link to="#" className="flex items-center gap-4 px-6 py-3 text-[#e4e7fb]/50 hover:bg-[#1e2538]/20 hover:text-[#a1faff] hover:translate-x-1 transition-transform font-['Space_Grotesk'] uppercase tracking-[0.1em] text-[10px]">
            <span className="material-symbols-outlined text-lg">group</span> Team Access
          </Link>
          <Link to="#" className="flex items-center gap-4 px-6 py-3 text-[#e4e7fb]/50 hover:bg-[#1e2538]/20 hover:text-[#a1faff] hover:translate-x-1 transition-transform font-['Space_Grotesk'] uppercase tracking-[0.1em] text-[10px]">
            <span className="material-symbols-outlined text-lg">history</span> Audit Logs
          </Link>
        </div>
        <div className="p-6 mt-auto border-t border-[#434857]/10 space-y-4">
          <button className="w-full py-3 bg-surface-container-highest border border-outline-variant/20 text-primary font-headline text-[10px] tracking-widest uppercase hover:bg-surface-bright transition-colors">
            New Security Scan
          </button>
          <div className="space-y-2">
            <Link to="#" className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined text-sm">menu_book</span> Documentation
            </Link>
            <Link to="#" className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined text-sm">support_agent</span> Support
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 pt-24 pb-12 px-8 max-w-7xl mx-auto">
        {/* Report Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary-fixed">Automated Vulnerability Report</p>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-background">
              scan_result_<span className="text-primary-dim">0x8F2A</span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-primary opacity-70">link</span>
                <span className="font-medium">https://api.vision-core.sanjay.io</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-primary opacity-70">calendar_today</span>
                <span>Oct 24, 2023 · 14:32 UTC</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-primary opacity-70">timer</span>
                <span>Duration: 4m 12s</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="glass-card px-6 py-3 flex items-center gap-3 text-on-surface hover:bg-surface-container-highest transition-all">
              <span className="material-symbols-outlined">print</span>
              <span className="font-headline text-xs uppercase tracking-widest font-bold">Print Format</span>
            </button>
            <button className="bg-primary px-6 py-3 flex items-center gap-3 text-on-primary hover:shadow-[0_0_20px_rgba(161,250,255,0.3)] transition-all">
              <span className="material-symbols-outlined">download</span>
              <span className="font-headline text-xs uppercase tracking-widest font-bold">Export PDF</span>
            </button>
          </div>
        </header>

        {/* Bento Grid Summary */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Health Score */}
          <div className="md:col-span-2 glass-card p-8 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-8xl">verified_user</span>
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-6">Security Health Score</p>
                <div className="flex items-baseline gap-4">
                  <span className="font-headline text-7xl font-bold text-primary">84</span>
                  <span className="text-on-surface-variant text-xl">/ 100</span>
                </div>
              </div>
              <div className="mt-8">
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-primary w-[84%]"></div>
                </div>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
                  Your system security is <span className="text-primary font-bold">High</span>. 4 critical vulnerabilities were mitigated since last scan. High priority items remain in the payload queue.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="glass-card p-6 flex flex-col justify-between scan-line">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Total Findings</p>
            <h3 className="font-headline text-5xl font-bold text-on-background mt-4">124</h3>
            <div className="flex items-center gap-2 mt-2 text-error text-xs font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +12% from last scan
            </div>
          </div>
          <div className="glass-card p-6 flex flex-col justify-between">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Critical Assets</p>
            <h3 className="font-headline text-5xl font-bold text-on-background mt-4">18</h3>
            <p className="text-on-surface-variant text-xs mt-2 uppercase tracking-tighter">Verified & Protected</p>
          </div>

          {/* Critical List Small */}
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card border-l-4 border-error p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-label uppercase tracking-widest text-error/80">Critical Risk</p>
                <p className="font-headline text-2xl font-bold">04</p>
              </div>
              <span className="material-symbols-outlined text-error text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>gpp_maybe</span>
            </div>
            
            <div className="glass-card border-l-4 border-tertiary p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-label uppercase tracking-widest text-tertiary/80">Medium Risk</p>
                <p className="font-headline text-2xl font-bold">29</p>
              </div>
              <span className="material-symbols-outlined text-tertiary text-3xl">warning</span>
            </div>
            
            <div className="glass-card border-l-4 border-primary p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-label uppercase tracking-widest text-primary/80">Low Risk</p>
                <p className="font-headline text-2xl font-bold">91</p>
              </div>
              <span className="material-symbols-outlined text-primary text-3xl">info</span>
            </div>
          </div>
        </section>

        {/* Bug List Table Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-xl font-bold uppercase tracking-widest">Active Vulnerabilities</h2>
            <div className="flex gap-2">
              <button className="text-xs font-label uppercase text-on-surface-variant hover:text-primary transition-colors px-3 py-1">Filter</button>
              <button className="text-xs font-label uppercase text-on-surface-variant hover:text-primary transition-colors px-3 py-1">Sort By Severity</button>
            </div>
          </div>
          <div className="glass-card rounded-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-highest/50 border-b border-outline-variant/10">
                  <th className="px-6 py-4 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Vulnerability ID</th>
                  <th className="px-6 py-4 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Issue Description</th>
                  <th className="px-6 py-4 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Severity</th>
                  <th className="px-6 py-4 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Status</th>
                  <th className="px-6 py-4 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="px-6 py-5 font-headline text-xs font-medium text-primary tracking-tight">CVE-2023-4412</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium">SQL Injection via 'search' parameter</p>
                    <p className="text-xs text-on-surface-variant mt-1">Found in: /v1/api/query-handler.php</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2 py-1 rounded-sm bg-error/10 text-error text-[10px] font-bold uppercase border border-error/20">Critical</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                      <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span> Open
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-primary hover:underline text-xs font-bold uppercase tracking-tighter">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="px-6 py-5 font-headline text-xs font-medium text-primary tracking-tight">CVE-2023-1109</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium">Broken Access Control on User Settings</p>
                    <p className="text-xs text-on-surface-variant mt-1">Found in: /profile/admin/patch</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2 py-1 rounded-sm bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase border border-tertiary/20">High</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> In Review
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-primary hover:underline text-xs font-bold uppercase tracking-tighter">View Details</button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="px-6 py-5 font-headline text-xs font-medium text-primary tracking-tight">CVE-2023-9901</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium">Outdated SSL/TLS Cipher Suites</p>
                    <p className="text-xs text-on-surface-variant mt-1">Network Config: Port 443</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-bold uppercase border border-primary/20">Medium</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span> Monitored
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-primary hover:underline text-xs font-bold uppercase tracking-tighter">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline-variant/10 text-center">
              <button className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors">Load Remaining 121 Findings</button>
            </div>
          </div>
        </section>

        {/* Screenshot Previews Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-xl font-bold uppercase tracking-widest">Visual Evidence</h2>
            <span className="text-xs text-on-surface-variant uppercase tracking-widest">4 Attachments</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group relative glass-card rounded-sm aspect-video overflow-hidden">
              <img alt="Code snippet injection evidence" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" data-alt="Technical code snippet showing a SQL injection vulnerability in a terminal with green and red highlighting on dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJsV5rjBF5DHuQqAEHFtU4qqZWDzmyVq4NuUj9fgr0Yk6VeQPSeRaWkpQJ1jbknteKUYUuNowXbri85ONgJp1jEPo60ZNUNRk5uxytLPSKN5i1ZGZeEY-kkjxkjsEFFVoeGwXYQF2yJ44dkuxRO2ZgUxgXeqWeqLMSL3MbS8nvJmkI3ntK_yMhCsCbobP02_v6__1OpOSQzC318Y_R3sl1xPzitSfRmUrpM04IZw5b1SwFN4wBVFkr255Z8004ZpRTmUO0FSaWlByn"/>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-3 left-3">
                <p className="text-[10px] font-label uppercase tracking-wider text-primary">Injection Point A</p>
              </div>
            </div>
            
            <div className="group relative glass-card rounded-sm aspect-video overflow-hidden">
              <img alt="Network node visualization" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" data-alt="Digital representation of complex network server infrastructure with glowing blue lines and data points in a dark environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrZkt3aYl3uA5butMCo0dCOyzo49eRUHxuTxc6lJ5CNJV-RD1fG22W9yo2ty6t79EwQhUd-IxG560nnUFlHqsxVTzhsIDbwckuR7iiby9I3Edh9F2AioOdXNUPeFIZFiO5WIlO7U1Z4475QPelbIxxht54sbvWVKbFJ44aWOdYhtemWXSFudyCWciKZ6AC_ECQGvIu9lWCeYY0sFSbdnfS9QtGVJiLu_UTbn5dM3K0F-oJhCKjQ0R0xjv9iER6n9KFM1qjmENgeo4L"/>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-3 left-3">
                <p className="text-[10px] font-label uppercase tracking-wider text-primary">Hop Analysis</p>
              </div>
            </div>
            
            <div className="group relative glass-card rounded-sm aspect-video overflow-hidden">
              <img alt="Hardware level scan" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" data-alt="Close up of high tech computer circuit board with microscopic glowing components and neon light traces in deep blue and teal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfE_KWTV9ab-Q0Qfv5iDeFtlyj38O8fwMWqFlXRp3s3C_MPrWho6Ath5c1rFi0MCWB8qBW8Lcborvw4oraRDWKDavzFGvwQBcjrud-E2LpsLPvYWs9tua1rMJjiKpQ8zmmVw0x89wFs3aYCUmF-QDzQR2w0W2VQs1y4AbGqjUo3K5Qx_EgARf5vasTBCzSwzGt9J30CqdLC_Oc8P20ilzcTx9AypPrqQhratFyGFOT40m3kjCH0qAR7A0M9mpS7IcvIpknvsNnCy75"/>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-3 left-3">
                <p className="text-[10px] font-label uppercase tracking-wider text-primary">Firmware Check</p>
              </div>
            </div>

            <div className="group relative glass-card rounded-sm aspect-video overflow-hidden border-2 border-dashed border-outline-variant/20 flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer">
              <div className="text-center">
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">add_a_photo</span>
                <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mt-2">Append Manual</p>
              </div>
            </div>
          </div>
        </section>

        {/* Page Footer (Report Meta) */}
        <footer className="mt-20 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-md">
            <h4 className="font-headline font-bold text-primary text-sm uppercase tracking-widest mb-4">Oracle Security Assurance</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              This report is cryptographically signed and verified by Sanjay's Vision automated scanning engine. 
              Confidentiality Level: <span className="text-secondary font-bold">ALPHA-RESTRICTED</span>. 
              Any unauthorized reproduction or distribution is tracked via embedded metadata.
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-4 mb-4">
              <div className="text-right">
                <p className="text-[10px] font-label uppercase text-on-surface-variant">Report ID</p>
                <p className="font-headline text-xs font-bold uppercase">QA-241023-F02</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-label uppercase text-on-surface-variant">Signature</p>
                <p className="font-headline text-xs font-bold uppercase text-primary">0x...4F9E</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
              <span className="text-[10px] font-label uppercase font-bold tracking-widest">System Authenticated</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Feedback/Support Action */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary flex items-center justify-center shadow-[0_0_30px_rgba(161,250,255,0.4)] hover:scale-110 active:scale-90 transition-all z-40">
        <span className="material-symbols-outlined">auto_fix_high</span>
      </button>

    </div>
  );
};

export default Report;
