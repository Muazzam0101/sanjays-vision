import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Landing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!url) return;
    setIsScanning(true);
    try {
      const response = await api.post('/scan', { url });
      navigate(`/scanning?scan_id=${response.data.scan_id}`);
    } catch (error) {
      console.error("Scan initialization failed", error);
      alert("Failed to start scan. Is the backend running?");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-background text-on-background selection:bg-primary/30 w-full overflow-x-hidden min-h-screen">
      {/* Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl shadow-[0px_20px_40px_rgba(161,250,255,0.08)]">
        <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-lg md:text-xl font-bold tracking-tighter text-[#a1faff] uppercase font-headline shrink-0">
              Sanjay’s Vision
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link to="/report" className="text-[#a1faff] border-b-2 border-[#a1faff] pb-1 font-headline text-[11px] lg:text-[13px] tracking-[0.1em] uppercase transition-all duration-300">Features</Link>
            <Link to="/scanning" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-headline text-[11px] lg:text-[13px] tracking-[0.1em] uppercase">Technology</Link>
            <Link to="/dashboard" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-headline text-[11px] lg:text-[13px] tracking-[0.1em] uppercase">Security</Link>
            <Link to="#" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-headline text-[11px] lg:text-[13px] tracking-[0.1em] uppercase">Pricing</Link>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-6">
            <button className="hidden md:block material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">account_circle</button>
            <button className="hidden md:block bg-primary text-on-primary font-headline font-bold text-[10px] lg:text-xs uppercase tracking-widest px-4 lg:px-6 py-2.5 rounded-sm active:scale-95 transition-all duration-200">
              Scan Website
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden material-symbols-outlined text-primary p-2">menu</button>
          </div>
        </div>

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
      </nav>

      {/* Main Content Canvas */}
      <main className="relative pt-24 overflow-hidden w-full">
        {/* Background Elements */}
        <div className="fixed inset-0 dot-grid pointer-events-none"></div>
        <div className="scan-line pointer-events-none"></div>
        <div className="absolute top-[-10%] left-[-5%] w-full md:w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-full md:w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0"></span>
            <span className="font-headline text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-primary uppercase truncate">v2.4 Engine Active</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-on-background tracking-tighter mb-4 md:mb-6">
            Sanjay’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">Vision</span>
          </h1>
          <p className="font-body text-on-surface-variant text-base sm:text-lg md:text-xl max-w-2xl px-4 md:px-0 mb-8 md:mb-12 leading-relaxed">
            Autonomous QA Inspector for Modern Websites. Detecting UI breaks and functional errors using spectral vision analysis.
          </p>

          {/* Futuristic URL Input */}
          <div className="w-full max-w-xl md:max-w-2xl relative group px-2 md:px-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <div className="relative flex flex-col sm:flex-row items-center bg-surface-container-low border border-outline-variant/30 p-2 rounded-lg gap-2 sm:gap-0">
              <span className="hidden sm:block material-symbols-outlined pl-4 text-outline-variant">language</span>
              <input 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                className="w-full bg-transparent border-none text-on-background placeholder:text-outline-variant focus:ring-0 px-4 py-3 font-body text-sm sm:text-base outline-none" placeholder="Enter website URL..." type="text"/>
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className="w-full sm:w-auto bg-primary text-on-primary px-6 sm:px-8 py-3 font-headline font-bold uppercase tracking-widest text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(161,250,255,0.4)] transition-all duration-300 active:scale-95 shrink-0 rounded sm:rounded-none disabled:opacity-50">
                {isScanning ? 'Initiating...' : 'Scan'}
              </button>
            </div>
          </div>

          <div className="mt-12 md:mt-16 w-full flex justify-center px-4 md:px-0">
            <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-outline-variant/20 shadow-2xl">
              <img className="w-full h-full object-cover opacity-60" data-alt="Futuristic cybersecurity command center with floating holographic data screens and digital network interface in a dark room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmlmXWz9aDfobgUQVpKk6-PHG0FT8kGd95_ZEW1kh7IeKYFkCjisPy2IXtc3VqRv6Vn-IF9NlO48hRRWHvvnt0iVLrv0bGCRHBak-_zk2q77X-0XeUM_i4Zpansf2l6PBbyuUFHgwsOqcOQq2YG8wMpAZx-WUv9xDZwxXr5gfDug3K6S0_iiKDRVd8FMhTe656O1fNaowzKHupmX1Is2mwmCUYng9E4epyyfxVonmSVywLSA8Ga5x_JVzfKnyl-P8E_XNRkRLUFRVS"/>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              {/* UI Overlay Elements */}
              <div className="hidden sm:block absolute top-4 md:top-8 left-4 md:left-8 p-3 md:p-4 bg-surface-container-highest/60 backdrop-blur-md rounded border border-primary/20">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-xs md:text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                  <span className="font-headline text-[8px] md:text-[10px] tracking-widest uppercase text-primary">System Secure</span>
                </div>
                <div className="h-1 w-24 md:w-32 bg-outline-variant/30 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="mb-10 md:mb-16 text-center md:text-left">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-on-background mb-4">Core Inspection Layers</h2>
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-primary to-transparent mx-auto md:mx-0"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-high/40 backdrop-blur-xl rounded-xl border border-outline-variant/15 p-6 md:p-8 hover:border-primary/30 transition-all duration-500">
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
                <div className="flex-1">
                  <div className="mb-4 md:mb-6 inline-flex p-3 bg-primary/10 rounded">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bug_report</span>
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-on-background mb-3 md:mb-4">Automated Bug Detection</h3>
                  <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">Scan for UI breaks, broken links, and functional console errors instantly across multiple viewport resolutions simultaneously.</p>
                </div>
                <div className="w-full sm:w-48 md:w-64 aspect-square rounded-lg bg-surface-container-highest/50 border border-outline-variant/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-4xl md:text-6xl opacity-20 animate-pulse">radar</span>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-high/40 backdrop-blur-xl rounded-xl border border-outline-variant/15 p-6 md:p-8 hover:border-secondary/30 transition-all duration-500">
              <div className="mb-4 md:mb-6 inline-flex p-3 bg-secondary/10 rounded">
                <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>camera</span>
              </div>
              <h3 className="font-headline text-xl md:text-2xl font-bold text-on-background mb-3 md:mb-4">Visual Reports</h3>
              <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">Pixel-perfect regression testing with AI-powered diffing technology.</p>
              <div className="mt-6 md:mt-8 flex gap-2">
                <div className="h-8 md:h-12 w-1/2 bg-surface-container-highest/80 rounded border border-outline-variant/20"></div>
                <div className="h-8 md:h-12 w-1/2 bg-surface-container-highest/80 rounded border border-secondary/20"></div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="md:col-span-12 group relative overflow-hidden bg-surface-container-high/40 backdrop-blur-xl rounded-xl border border-outline-variant/15 p-6 md:p-8 hover:border-primary/30 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
                <div className="flex-1">
                  <h3 className="font-headline text-2xl md:text-3xl font-bold text-on-background mb-3 md:mb-4">AI-Powered Insights</h3>
                  <p className="font-body text-sm md:text-lg text-on-surface-variant mb-6 md:mb-8 leading-relaxed">Root cause analysis powered by advanced machine learning models trained on millions of web architectures. Don't just find the bug—understand the fracture.</p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <span className="px-3 md:px-4 py-1.5 rounded-full bg-primary/10 text-primary font-headline text-[8px] md:text-[10px] tracking-widest font-bold uppercase border border-primary/20">Predictive Analysis</span>
                    <span className="px-3 md:px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-headline text-[8px] md:text-[10px] tracking-widest font-bold uppercase border border-secondary/20">Neural Mapping</span>
                  </div>
                </div>
                <div className="w-full lg:w-1/3">
                  <img className="rounded-lg object-cover w-full aspect-video grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="Abstract neural network visualization with neon glowing points and connecting lines against a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0i7QE1X8EivjPwBVIT1XRMq7SoNFlFNJCRySXrZhbktZSlPVnMKKpF6w-oskFbf2YsGt_w_nzDZpCsG2b8rM1mfRtVQVvay2tqEIexB1XyrorlVaCCKnKOI69ae1MoUs3xrQXZMMISFhXH3cIubpD5Aj3Mgu3OIsplIIPCgJNf_I9mKtHqx93oJimFwkW2PiTm5b3a_c-LRDtJRsX5bnebhMWTSsXSLkI1xBx7u5J7jOChQim7PyLOzq72U8JH1nQOG9qdmd4nY8c"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Status Section */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 mb-12">
          <div className="bg-surface-container-low/50 border border-outline-variant/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 md:p-8 hidden sm:block">
              <span className="font-headline text-[60px] md:text-[120px] font-black text-on-background/5 absolute right-[-10px] md:right-[-20px] top-[-10px] md:top-[-20px] leading-none">SYSTEM</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
              <div>
                <div className="text-primary-fixed text-3xl md:text-4xl font-headline font-bold mb-1 md:mb-2">99.9%</div>
                <div className="font-headline text-[10px] md:text-xs tracking-widest uppercase text-on-surface-variant">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-primary-fixed text-3xl md:text-4xl font-headline font-bold mb-1 md:mb-2">12ms</div>
                <div className="font-headline text-[10px] md:text-xs tracking-widest uppercase text-on-surface-variant">Response Latency</div>
              </div>
              <div>
                <div className="text-primary-fixed text-3xl md:text-4xl font-headline font-bold mb-1 md:mb-2">2M+</div>
                <div className="font-headline text-[10px] md:text-xs tracking-widest uppercase text-on-surface-variant">Scans Completed</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Shell */}
      <footer className="w-full border-t border-[#434857]/15 bg-[#0d1321] mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto gap-6 md:gap-0">
          <div className="flex flex-col gap-2 md:gap-4 text-center md:text-left">
            <div className="text-base md:text-lg font-black text-[#a1faff] font-headline uppercase">Sanjay’s Vision</div>
            <p className="text-[#e4e7fb]/60 text-[10px] md:text-xs font-headline uppercase tracking-wider">© 2024 Sanjay’s Vision. Autonomous QA Systems.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
            <Link to="#" className="text-[#e4e7fb]/60 hover:text-[#00f4fe] hover:translate-x-1 transition-all font-headline uppercase text-[8px] md:text-[10px] tracking-[0.1em]">Privacy Policy</Link>
            <Link to="#" className="text-[#e4e7fb]/60 hover:text-[#00f4fe] hover:translate-x-1 transition-all font-headline uppercase text-[8px] md:text-[10px] tracking-[0.1em]">Terms of Service</Link>
            <Link to="#" className="text-[#e4e7fb]/60 hover:text-[#00f4fe] hover:translate-x-1 transition-all font-headline uppercase text-[8px] md:text-[10px] tracking-[0.1em]">API Documentation</Link>
            <Link to="#" className="text-[#e4e7fb]/60 hover:text-[#00f4fe] hover:translate-x-1 transition-all font-headline uppercase text-[8px] md:text-[10px] tracking-[0.1em]">System Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
