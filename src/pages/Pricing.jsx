import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandName from '../components/BrandName';

const Pricing = () => {
    const navigate = useNavigate();
    const [isYearly, setIsYearly] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(localStorage.getItem("plan") || "basic");
    const [loading, setLoading] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSelectPlan = async (plan) => {
        setLoading(true);
        setSelectedPlan(plan);
        localStorage.setItem("plan", plan);

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            await fetch(`${baseUrl}/select-plan`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ plan })
            });
        } catch (err) {
            console.error("Plan selection failed to sync with backend", err);
        } finally {
            setLoading(false);
            if (plan === 'basic') {
                navigate('/');
            } else {
                const amount = plan === 'pro' ? (isYearly ? 3999 : 399) : (isYearly ? 9999 : 999);
                window.location.href = `https://razorpay.me/@sanjaysvision?amount=${amount}`;
            }
        }
    };

    return (
        <div className="font-body text-on-background selection:bg-primary/30 bg-background min-h-screen">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl">
                <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
                    <Link to="/"><BrandName size="text-xl" /></Link>
                    <div className="hidden md:flex gap-8 items-center">
                        <Link className="text-[#e4e7fb] opacity-60 hover:text-cyan-400 hover:opacity-100 transition-all font-headline text-[10px] uppercase tracking-widest" to="/#features">Features</Link>
                        <Link className="text-[#e4e7fb] opacity-60 hover:text-cyan-400 hover:opacity-100 transition-all font-headline text-[10px] uppercase tracking-widest" to="/#security">Security</Link>
                        <Link className="text-[#e4e7fb] opacity-60 hover:text-cyan-400 hover:opacity-100 transition-all font-headline text-[10px] uppercase tracking-widest" to="/#technology">Technology</Link>
                        <Link className="text-cyan-400 border-b border-cyan-400 pb-1 font-headline text-[10px] uppercase tracking-widest" to="/pricing">Pricing</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="material-symbols-outlined text-slate-400 hover:text-cyan-400 transition-colors hidden sm:block">security</button>
                        <button className="material-symbols-outlined text-slate-400 hover:text-cyan-400 transition-colors hidden sm:block">terminal</button>
                        <button className="bg-primary text-on-primary px-4 py-2 font-label text-xs font-bold uppercase tracking-widest scale-95 active:scale-90 duration-150 transition-all hidden sm:block">Initialize Access</button>
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-cyan-400"
                        >
                            <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Overlay */}
                <div className={`md:hidden fixed inset-0 z-40 bg-[#090e1b]/95 backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    {['Features', 'Technology', 'Security', 'Pricing'].map((item) => (
                        <Link 
                            key={item} 
                            to={item === 'Pricing' ? '/pricing' : `/#${item.toLowerCase()}`} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`font-headline uppercase tracking-[0.2em] text-xl font-black transition-colors ${item === 'Pricing' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'}`}
                        >
                            {item}
                        </Link>
                    ))}
                    <button className="mt-4 bg-primary text-on-primary px-12 py-4 font-headline font-bold uppercase tracking-widest text-[12px] rounded-sm shadow-[0_0_30px_rgba(161,250,255,0.3)]">
                        Initialize Access
                    </button>
                </div>
                <div className="bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent h-[1px] w-full absolute bottom-0"></div>
            </nav>

            <main className="relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Scan Line Overlay */}
                <div className="scan-line pointer-events-none absolute top-0 left-0 w-full h-[2px] opacity-10 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

                {/* Hero Header */}
                <header className="max-w-4xl mx-auto text-center mb-20 relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-primary/20 bg-primary/5 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_8px_#00f4fe]"></span>
                        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Live System Active</span>
                    </div>
                    <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-background mb-6 tracking-tight">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Security Level</span>
                    </h1>
                    <p className="text-on-surface-variant text-lg md:text-xl font-light max-w-2xl mx-auto mb-8">
                        Powerful AI-driven website analysis for every scale. Deploy autonomous QA protocols in milliseconds.
                    </p>

                    <div className="flex justify-center items-center gap-4 mt-12">
                        <span className={`font-label text-xs uppercase tracking-widest ${!isYearly ? 'text-on-background' : 'text-slate-400'}`}>Monthly</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-12 h-6 bg-surface-container-high rounded-full relative p-1 border border-outline-variant/30 transition-all"
                        >
                            <span className={`absolute top-1 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(161,250,255,0.4)] transition-all duration-300 ${isYearly ? 'right-1' : 'left-1'}`}></span>
                        </button>
                        <span className={`font-label text-xs uppercase tracking-widest ${isYearly ? 'text-on-background' : 'text-slate-400'}`}>
                            Yearly <span className="text-primary-fixed text-[10px] ml-1">-20%</span>
                        </span>
                    </div>

                    <div className="mt-16 h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                </header>

                {/* Pricing Grid */}
                <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Basic Plan */}
                    <div className={`glass-card group p-8 flex flex-col border transition-all duration-500 relative backdrop-blur-xl bg-surface-variant/40 ${selectedPlan === 'basic' ? 'border-primary shadow-[0_0_30px_rgba(161,250,255,0.15)] scale-[1.02]' : 'border-outline-variant/10 hover:border-primary/20'}`}>
                        <div className="mb-8">
                            <h3 className="font-headline text-xl font-bold mb-2">Basic</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold font-headline">Free</span>
                            </div>
                            <p className="mt-4 text-sm text-on-surface-variant">For beginners and small projects starting their QA journey.</p>
                        </div>
                        <div className="space-y-4 mb-10 flex-grow">
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                <span>Scan up to 3 pages</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                <span>Basic bug detection</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                <span>Limited reports</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                <span>Daily scan limit</span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleSelectPlan('basic')}
                            disabled={loading}
                            className={`w-full py-4 border font-label text-xs font-bold uppercase tracking-widest transition-colors ${selectedPlan === 'basic' ? 'bg-primary/20 border-primary text-primary' : 'border-outline-variant/30 hover:bg-white/5'}`}
                        >
                            {selectedPlan === 'basic' ? 'Current Plan' : 'Start Free'}
                        </button>
                    </div>

                    {/* Pro Plan (Featured) */}
                    <div className={`glass-card group p-8 flex flex-col relative transform md:-translate-y-4 z-10 overflow-hidden backdrop-blur-xl bg-surface-variant/40 border-2 transition-all duration-500 ${selectedPlan === 'pro' ? 'border-primary shadow-[0_0_50px_rgba(161,250,255,0.2)] scale-[1.03]' : 'border-primary/40 shadow-[0_0_50px_rgba(161,250,255,0.1)]'}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                        <div className="absolute top-4 right-4 px-2 py-1 bg-primary text-on-primary font-label text-[10px] font-bold uppercase tracking-wider">Most Popular</div>
                        <div className="mb-8 relative">
                            <h3 className="font-headline text-xl font-bold mb-2">Pro</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold font-headline text-primary-fixed">{isYearly ? '₹3,999' : '₹399'}</span>
                                <span className="text-on-surface-variant font-label text-xs">/{isYearly ? 'year' : 'month'}</span>
                            </div>
                            <p className="mt-4 text-sm text-on-surface-variant">Comprehensive scanning for professional developers.</p>
                        </div>
                        <div className="space-y-4 mb-10 flex-grow relative">
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                <span>Scan up to 10 pages</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                <span>Full issue detection (UI + Forms + JS)</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                <span className="text-primary-fixed">Real-time AI scanning (Live)</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                <span>Downloadable PDF reports</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                <span>Faster scan execution</span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleSelectPlan('pro')}
                            disabled={loading}
                            className={`w-full py-4 font-label text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(161,250,255,0.3)] hover:brightness-110 transition-all ${selectedPlan === 'pro' ? 'bg-primary-fixed text-on-primary' : 'bg-primary text-on-primary'}`}
                        >
                            {selectedPlan === 'pro' ? 'Active Selection' : 'Upgrade to Pro'}
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className={`glass-card group p-8 flex flex-col border transition-all duration-500 relative backdrop-blur-xl bg-surface-variant/40 ${selectedPlan === 'enterprise' ? 'border-secondary shadow-[0_0_30px_rgba(159,142,255,0.15)] scale-[1.02]' : 'border-outline-variant/10 hover:border-secondary/20'}`}>
                        <div className="mb-8">
                            <h3 className="font-headline text-xl font-bold mb-2">Enterprise</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold font-headline">{isYearly ? '₹9,999' : '₹999'}</span>
                                <span className="text-on-surface-variant font-label text-xs">/{isYearly ? 'year' : 'month'}</span>
                            </div>
                            <p className="mt-4 text-sm text-on-surface-variant">For teams and advanced users requiring deep neural analysis.</p>
                        </div>
                        <div className="space-y-4 mb-10 flex-grow">
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-secondary text-lg">shield</span>
                                <span>Unlimited scanning</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-secondary text-lg">shield</span>
                                <span>Deep analysis (SEO + Performance)</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-secondary text-lg">shield</span>
                                <span>API Access & Webhooks</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-secondary text-lg">shield</span>
                                <span>Team collaboration tools</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-on-surface">
                                <span className="material-symbols-outlined text-secondary text-lg">shield</span>
                                <span>Scheduled scans</span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleSelectPlan('enterprise')}
                            disabled={loading}
                            className={`w-full py-4 border font-label text-xs font-bold uppercase tracking-widest transition-colors ${selectedPlan === 'enterprise' ? 'bg-secondary/20 border-secondary text-secondary' : 'border-secondary/30 text-secondary hover:bg-secondary/5'}`}
                        >
                            {selectedPlan === 'enterprise' ? 'Active Selection' : 'Upgrade to Enterprise'}
                        </button>
                    </div>
                </section>

                {/* Badge Footer Section */}
                <section className="mt-32 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 p-12 bg-surface-container-low/50 border border-outline-variant/10 rounded-xl">
                    <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center border border-primary/20">
                            <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                        </div>
                        <div>
                            <h4 className="font-headline text-xl font-bold uppercase tracking-tight mb-2">AI-Powered Security Engine</h4>
                            <p className="text-on-surface-variant text-sm max-w-md">Our platform leverages Playwright for automated browser interaction and machine learning classifiers to identify vulnerabilities and performs DAST (Dynamic Application Security Testing) in real-time.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <img className="h-12 w-auto opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Hardware interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNLHOx2kSRCjYZekG_NuTgE-TFX9UdJiA0bCMiRTQ04wK6y0YzsZ-P5f5h4FcFKDV7Itj872m8m7IlYZuU8Ph50T_RgVSbyb0R-RWil3EYkBkrdinFebrtfpKrodu0cYKXjbMgzmIkk1jrCxchSSwHZeNRfrgRyThZozWI47Fz-VmBoW8csLpA62foecAJ_pKvAKkJJWEywmUzFwI1GtX7JJG4mpiLUFLVHAuzbRbjOmGm3CO4mRxHnDgGN2S8nrb_gvZJ0svBv6aA" />
                        <img className="h-12 w-auto opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" alt="Server blinkers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-B5FipIrDzAWl5r_j3Kor1y_AZuzeuyZ3HQuey1RsHtHQffVE57e-wFiesQhXQQXyUx0w6B0vn5-NMnACbRS4UGHePLyKzmH_aRUyzm2t63SCGvJB2ZMTaDrt1JPNIw0gtaC2geLRS6FTOcqbMVrFCdnc4zcnbrbFoKfEwmo_fFm4FOE4Ewap4OrSfLVOaH90zDWiGf2hhBKmLS1sg6iWE9zS2oP9ScM68kSyUf2YDGwTlgplkge63l6KJWbMroAUJJvYYrl9XEgk" />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 w-full py-12 border-t border-slate-800/50">
                <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-8 max-w-screen-2xl mx-auto">
                    <Link to="/"><BrandName size="text-xl" /></Link>
                    <div className="flex flex-wrap justify-center gap-8 font-label text-[10px] tracking-[0.2em] uppercase text-slate-500">
                        <Link className="hover:text-cyan-400 transition-colors" to="/">Home</Link>
                        <Link className="hover:text-cyan-400 transition-colors" to="/dashboard">Security</Link>
                        <Link className="hover:text-cyan-400 transition-colors" to="/scanning">Network</Link>
                        <Link className="hover:text-cyan-400 transition-colors" to="/report">Docs</Link>
                    </div>
                    <div className="font-label text-[10px] tracking-[0.2em] uppercase text-slate-500">
                        © 2024 Sanjay’s Vision // NEURAL PROTOCOL ENABLED
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Pricing;
