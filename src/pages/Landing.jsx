import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-background text-on-background selection:bg-primary/30">
      {/* Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl shadow-[0px_20px_40px_rgba(161,250,255,0.08)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tighter text-[#a1faff] uppercase font-headline">
            Sanjay’s Vision
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link to="/report" className="text-[#a1faff] border-b-2 border-[#a1faff] pb-1 font-headline text-[13px] tracking-[0.1em] uppercase transition-all duration-300">Features</Link>
            <Link to="/scanning" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-headline text-[13px] tracking-[0.1em] uppercase">Technology</Link>
            <Link to="/dashboard" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-headline text-[13px] tracking-[0.1em] uppercase">Security</Link>
            <Link to="#" className="text-[#e4e7fb] opacity-70 hover:text-[#a1faff] hover:opacity-100 transition-all duration-300 font-headline text-[13px] tracking-[0.1em] uppercase">Pricing</Link>
          </div>
          <div className="flex items-center gap-6">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">account_circle</button>
            <button className="bg-primary text-on-primary font-headline font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-sm active:scale-95 transition-all duration-200">
              Scan Website
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="relative min-h-screen pt-24 overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 dot-grid pointer-events-none"></div>
        <div className="scan-line pointer-events-none"></div>
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-8 py-20 lg:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-headline text-[10px] font-bold tracking-[0.2em] text-primary uppercase">v2.4 Engine Active</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black text-on-background tracking-tighter mb-6">
            Sanjay’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">Vision</span>
          </h1>
          <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            Autonomous QA Inspector for Modern Websites. Detecting UI breaks and functional errors using spectral vision analysis.
          </p>

          {/* Futuristic URL Input */}
          <div className="w-full max-w-2xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-surface-container-low border border-outline-variant/30 p-2 rounded-lg">
              <span className="material-symbols-outlined pl-4 text-outline-variant">language</span>
              <input className="w-full bg-transparent border-none text-on-background placeholder:text-outline-variant focus:ring-0 px-4 py-3 font-body" placeholder="Enter website URL for inspection..." type="text"/>
              <button className="bg-primary text-on-primary px-8 py-3 font-headline font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(161,250,255,0.4)] transition-all duration-300 active:scale-95">
                Initiate Scan
              </button>
            </div>
          </div>

          <div className="mt-16 w-full flex justify-center">
            <div className="relative max-w-5xl w-full aspect-video rounded-xl overflow-hidden border border-outline-variant/20 shadow-2xl">
              <img className="w-full h-full object-cover opacity-60" data-alt="Futuristic cybersecurity command center with floating holographic data screens and digital network interface in a dark room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmlmXWz9aDfobgUQVpKk6-PHG0FT8kGd95_ZEW1kh7IeKYFkCjisPy2IXtc3VqRv6Vn-IF9NlO48hRRWHvvnt0iVLrv0bGCRHBak-_zk2q77X-0XeUM_i4Zpansf2l6PBbyuUFHgwsOqcOQq2YG8wMpAZx-WUv9xDZwxXr5gfDug3K6S0_iiKDRVd8FMhTe656O1fNaowzKHupmX1Is2mwmCUYng9E4epyyfxVonmSVywLSA8Ga5x_JVzfKnyl-P8E_XNRkRLUFRVS"/>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              {/* UI Overlay Elements */}
              <div className="absolute top-8 left-8 p-4 bg-surface-container-highest/60 backdrop-blur-md rounded border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                  <span className="font-headline text-[10px] tracking-widest uppercase text-primary">System Secure</span>
                </div>
                <div className="h-1 w-32 bg-outline-variant/30 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
          <div className="mb-16">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-background mb-4">Core Inspection Layers</h2>
            <div className="h-px w-24 bg-gradient-to-r from-primary to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Card 1 */}
            <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-high/40 backdrop-blur-xl rounded-xl border border-outline-variant/15 p-8 hover:border-primary/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="mb-6 inline-flex p-3 bg-primary/10 rounded">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bug_report</span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-on-background mb-4">Automated Bug Detection</h3>
                  <p className="font-body text-on-surface-variant leading-relaxed">Scan for UI breaks, broken links, and functional console errors instantly across multiple viewport resolutions simultaneously.</p>
                </div>
                <div className="w-full md:w-64 aspect-square rounded-lg bg-surface-container-highest/50 border border-outline-variant/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-6xl opacity-20 animate-pulse">radar</span>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-high/40 backdrop-blur-xl rounded-xl border border-outline-variant/15 p-8 hover:border-secondary/30 transition-all duration-500">
              <div className="mb-6 inline-flex p-3 bg-secondary/10 rounded">
                <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>camera</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-background mb-4">Visual Reports</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">Pixel-perfect regression testing with AI-powered diffing technology.</p>
              <div className="mt-8 flex gap-2">
                <div className="h-12 w-1/2 bg-surface-container-highest/80 rounded border border-outline-variant/20"></div>
                <div className="h-12 w-1/2 bg-surface-container-highest/80 rounded border border-secondary/20"></div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="md:col-span-12 group relative overflow-hidden bg-surface-container-high/40 backdrop-blur-xl rounded-xl border border-outline-variant/15 p-8 hover:border-primary/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="font-headline text-3xl font-bold text-on-background mb-4">AI-Powered Insights</h3>
                  <p className="font-body text-on-surface-variant text-lg mb-8 leading-relaxed">Root cause analysis powered by advanced machine learning models trained on millions of web architectures. Don't just find the bug—understand the fracture.</p>
                  <div className="flex gap-4">
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-headline text-[10px] tracking-widest font-bold uppercase border border-primary/20">Predictive Analysis</span>
                    <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-headline text-[10px] tracking-widest font-bold uppercase border border-secondary/20">Neural Mapping</span>
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <img className="rounded-lg object-cover w-full aspect-video grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="Abstract neural network visualization with neon glowing points and connecting lines against a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0i7QE1X8EivjPwBVIT1XRMq7SoNFlFNJCRySXrZhbktZSlPVnMKKpF6w-oskFbf2YsGt_w_nzDZpCsG2b8rM1mfRtVQVvay2tqEIexB1XyrorlVaCCKnKOI69ae1MoUs3xrQXZMMISFhXH3cIubpD5Aj3Mgu3OIsplIIPCgJNf_I9mKtHqx93oJimFwkW2PiTm5b3a_c-LRDtJRsX5bnebhMWTSsXSLkI1xBx7u5J7jOChQim7PyLOzq72U8JH1nQOG9qdmd4nY8c"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Status Section */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="bg-surface-container-low/50 border border-outline-variant/20 rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className="font-headline text-[120px] font-black text-on-background/5 absolute right-[-20px] top-[-20px] leading-none">SYSTEM</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <div>
                <div className="text-primary-fixed text-4xl font-headline font-bold mb-2">99.9%</div>
                <div className="font-headline text-xs tracking-widest uppercase text-on-surface-variant">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-primary-fixed text-4xl font-headline font-bold mb-2">12ms</div>
                <div className="font-headline text-xs tracking-widest uppercase text-on-surface-variant">Response Latency</div>
              </div>
              <div>
                <div className="text-primary-fixed text-4xl font-headline font-bold mb-2">2M+</div>
                <div className="font-headline text-xs tracking-widest uppercase text-on-surface-variant">Scans Completed</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Shell */}
      <footer className="w-full border-t border-[#434857]/15 bg-[#0d1321]">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-8 md:mb-0">
            <div className="text-lg font-black text-[#a1faff] font-headline uppercase">Sanjay’s Vision</div>
            <p className="text-[#e4e7fb]/60 text-xs font-headline uppercase tracking-wider">© 2024 Sanjay’s Vision. Autonomous QA Systems.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-[#e4e7fb]/60 hover:text-[#00f4fe] hover:translate-x-1 transition-all font-headline uppercase text-[10px] tracking-[0.1em]" href="#">Privacy Policy</a>
            <a className="text-[#e4e7fb]/60 hover:text-[#00f4fe] hover:translate-x-1 transition-all font-headline uppercase text-[10px] tracking-[0.1em]" href="#">Terms of Service</a>
            <a className="text-[#e4e7fb]/60 hover:text-[#00f4fe] hover:translate-x-1 transition-all font-headline uppercase text-[10px] tracking-[0.1em]" href="#">API Documentation</a>
            <a className="text-[#e4e7fb]/60 hover:text-[#00f4fe] hover:translate-x-1 transition-all font-headline uppercase text-[10px] tracking-[0.1em]" href="#">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
