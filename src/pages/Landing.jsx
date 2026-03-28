import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const [rotationIndex, setRotationIndex] = useState(0);
    const rotationLabels = ["Autonomous QA", "Visual Testing", "Link Auditing", "Neural Scan"];

    useEffect(() => {
        const interval = setInterval(() => {
            setRotationIndex((prev) => (prev + 1) % rotationLabels.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#f9f9f9] font-body text-[#1a1c1c] selection:bg-[#ffde03] min-h-screen">
            <style>{`
                .neo-shadow { box-shadow: 4px 4px 0px 0px #000000; }
                .neo-shadow-lg { box-shadow: 8px 8px 0px 0px #000000; }
                .active-press:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000000; }
                .font-headline { font-family: 'Space Grotesk', sans-serif; }
                @keyframes slide-up {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
            `}</style>

            {/* TopAppBar */}
            <header className="bg-white w-full border-b-4 border-black sticky top-0 z-50">
                <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-2xl font-black text-black uppercase italic font-headline tracking-tighter">SANJAY'S VISION</Link>
                    </div>
                    <nav className="hidden md:flex gap-8 items-center">
                        <Link className="font-headline font-bold uppercase tracking-tighter text-black underline decoration-4 underline-offset-8" to="/dashboard">Dashboard</Link>
                        <Link className="font-headline font-bold uppercase tracking-tighter text-gray-600 hover:bg-yellow-400 hover:text-black transition-none px-2" to="/report">Reports</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/login')} className="bg-[#ffde03] text-black border-4 border-black px-6 py-2 font-headline font-black uppercase tracking-wider text-sm neo-shadow active-press">Secure Access</button>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative px-6 py-20 md:py-32 overflow-hidden border-b-4 border-black bg-white">
                    <div className="max-w-7xl mx-auto flex flex-col items-start gap-8">
                        <div className="bg-[#ffde03] inline-block border-4 border-black p-2 neo-shadow mb-4 rotate-[-2deg]">
                            <span className="font-headline font-black text-black uppercase tracking-widest text-sm key-feature-label animate-slide-up" key={rotationIndex}>
                                {rotationLabels[rotationIndex]}
                            </span>
                        </div>
                        <h1 className="font-headline text-6xl md:text-9xl font-black text-black leading-none tracking-tighter uppercase mb-2">
                            SANJAY'S<br/>VISION
                        </h1>
                        <p className="max-w-2xl text-xl md:text-2xl font-bold text-black border-l-8 border-[#ffde03] pl-6 py-2 uppercase italic tracking-tighter">
                            Autonomous neural inspection for modern deployments. Stop manual testing. Engage AI.
                        </p>
                        <div className="flex flex-wrap gap-6 mt-8">
                            <button onClick={() => navigate('/scanning')} className="bg-[#ffde03] text-black border-4 border-black py-4 px-10 font-headline font-black text-xl uppercase tracking-wider neo-shadow-lg active-press transition-none">
                                Start Scanning
                            </button>
                            <button className="bg-white text-black border-4 border-black py-4 px-10 font-headline font-black text-xl uppercase tracking-wider neo-shadow-lg active-press transition-none">
                                View History
                            </button>
                        </div>
                    </div>
                    {/* Absolute decorative elements */}
                    <div className="absolute top-20 right-10 md:right-40 hidden lg:block rotate-12 scale-150">
                        <span className="material-symbols-outlined text-[#ffde03] text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <div className="absolute bottom-10 right-20 hidden lg:block -rotate-12 translate-y-12">
                        <span className="material-symbols-outlined text-black opacity-10 text-[240px]">security</span>
                    </div>
                </section>

                {/* Video / Action Section */}
                <section className="bg-[#eeeeee] px-6 py-24 border-b-4 border-black">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-12 flex items-center gap-4">
                            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">See the AI in Action</h2>
                            <div className="flex-grow h-1 bg-black"></div>
                        </div>
                        <div className="relative group">
                            <div className="w-full aspect-video bg-black border-4 border-black neo-shadow-lg overflow-hidden flex items-center justify-center relative">
                                <video 
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                                    src="/landing-video.mp4" 
                                    controls 
                                    autoPlay 
                                    muted 
                                    loop
                                    poster="https://lh3.googleusercontent.com/aida-public/AB6AXuAOATWyF2tgVWw6uxuQgIOSKI74m3z2YDIG68skfP9tpieGfS2iQjG0iFt0VF4AM72zD_AhIX_pUmImRxsgBr-gR2TJCI03mOV_I1o4qUNv9IZ0MKUdndXMiFDGmf2WldpJTNvFLbSLErzpb50-NFPY6b7_OJA2mjXVC-OXoaylzUQ_aNoL5y0bb6Ulwo5Hr_R3T4doLan_CmamjHMajqyJl8tY0QpD2lIVoBwUg9UxvxYiQDXhVzgg7YqyctFbFLgPb9yUu74UBFhL"
                                ></video>
                            </div>
                            {/* Quirky Label */}
                            <div className="absolute -top-6 -right-6 bg-black text-white border-4 border-[#ffde03] py-2 px-6 font-headline font-bold uppercase rotate-3 neo-shadow">
                                Live Analysis Feed
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Bento Grid */}
                <section className="px-6 py-24 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center italic">Elite Inspection Tools</h2>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Feature 1 */}
                            <div className="md:col-span-8 bg-[#ffde03] border-4 border-black p-10 neo-shadow relative group overflow-hidden h-80 flex flex-col justify-end">
                                <div className="absolute top-6 left-6 flex items-center justify-center w-16 h-16 border-4 border-black bg-white rotate-6">
                                    <span className="material-symbols-outlined text-4xl font-black">link_off</span>
                                </div>
                                <div>
                                    <h3 className="font-headline text-4xl font-black uppercase mb-2">Neural Traversal</h3>
                                    <p className="text-xl font-bold max-w-md uppercase tracking-tighter italic">Deep-crawling technology to identify broken links and headless 404s before they impact your UX.</p>
                                </div>
                                <div className="absolute right-[-20px] bottom-[-40px] opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-[300px]">language</span>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="md:col-span-4 bg-black border-4 border-black p-10 neo-shadow text-white relative group overflow-hidden h-80 flex flex-col justify-end">
                                <div className="absolute top-6 left-6">
                                    <span className="material-symbols-outlined text-6xl text-[#ffde03]" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
                                </div>
                                <div>
                                    <h3 className="font-headline text-4xl font-black uppercase mb-2">Visual Regression</h3>
                                    <p className="text-xl font-medium uppercase tracking-tighter italic text-gray-400">Computer vision protocols to detect UI breakage across 50+ viewports.</p>
                                </div>
                            </div>
                            {/* Feature 3 */}
                            <div className="md:col-span-4 bg-white border-4 border-black p-10 neo-shadow relative group h-80 flex flex-col justify-end">
                                <div className="absolute top-6 left-6">
                                    <span className="material-symbols-outlined text-6xl text-black">security</span>
                                </div>
                                <div>
                                    <h3 className="font-headline text-4xl font-black uppercase mb-2">Pen-Test Module</h3>
                                    <p className="text-xl font-bold uppercase tracking-tighter italic">Autonomous payload delivery to verify SQL and XSS defenses in milliseconds.</p>
                                </div>
                            </div>
                            {/* Feature 4 */}
                            <div className="md:col-span-8 bg-[#eeeeee] border-4 border-black p-10 neo-shadow flex flex-col md:flex-row gap-8 items-center h-auto md:h-80 relative overflow-hidden">
                                <div className="flex-1">
                                    <span className="material-symbols-outlined text-6xl mb-4 text-black">psychology</span>
                                    <h3 className="font-headline text-4xl font-black uppercase mb-2">AI Severity Engine</h3>
                                    <p className="text-xl font-bold uppercase tracking-tighter italic">Bugs are automatically ranked by catastrophic potential using our proprietary Vision Model.</p>
                                </div>
                                <div className="w-full md:w-56 h-56 border-4 border-black bg-white flex flex-col items-center justify-center rotate-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-yellow-400">
                                    <span className="font-headline font-black text-6xl leading-none">99.8%</span>
                                    <span className="font-headline font-black text-xl uppercase italic">ACCURACY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Workflow Section */}
                <section className="bg-black px-6 py-24 border-y-4 border-black text-white overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-headline text-4xl md:text-8xl font-black uppercase tracking-tighter mb-20 italic">The Workflow</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                            {/* Steps */}
                            {[
                                { step: '01', title: 'Target', desc: 'Securely input your deployment URL.', icon: 'target' },
                                { step: '02', title: 'Deploy', desc: 'Autonomous crawlers engage architecture.', icon: 'rocket_launch' },
                                { step: '03', title: 'Analyze', desc: 'AI classifies visual and functional defects.', icon: 'radar' },
                                { step: '04', title: 'Manifest', desc: 'Receive a prioritized bug manifesto.', icon: 'description' }
                            ].map((s) => (
                                <div key={s.step} className="relative z-10 bg-white border-4 border-[#ffde03] p-8 neo-shadow flex flex-col items-center text-center text-black -rotate-1 hover:rotate-0 transition-transform cursor-pointer">
                                    <div className="w-16 h-16 bg-black text-[#ffde03] flex items-center justify-center font-headline font-black text-3xl mb-6 border-2 border-[#ffde03]">{s.step}</div>
                                    <h4 className="font-headline font-black uppercase text-2xl mb-2 italic tracking-tighter">{s.title}</h4>
                                    <p className="font-bold text-sm uppercase tracking-tight leading-tight">{s.desc}</p>
                                    <span className="material-symbols-outlined mt-6 text-5xl text-gray-300">{s.icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#1a1c1c] text-white px-6 py-20 border-t-8 border-yellow-400">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-6">
                        <h3 className="font-headline font-black text-5xl uppercase italic mb-4 tracking-tighter">SANJAY'S VISION</h3>
                        <p className="text-gray-400 max-w-sm font-medium uppercase tracking-tighter text-lg leading-tight">
                            The elite autonomous quality assurance engine for world-class deployments.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/scanning" className="bg-[#ffde03] text-black border-2 border-black px-6 py-2 font-black uppercase italic text-sm hover:translate-y-[-2px] transition-transform">Get Started</Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-20">
                        <div className="flex flex-col gap-4">
                            <span className="font-headline font-black uppercase text-[#ffde03] text-xl">Operational</span>
                            <Link className="font-bold uppercase tracking-widest text-sm hover:text-yellow-400" to="/dashboard">Dashboard</Link>
                            <Link className="font-bold uppercase tracking-widest text-sm hover:text-yellow-400" to="/scanning">New Scan</Link>
                            <Link className="font-bold uppercase tracking-widest text-sm hover:text-yellow-400" to="/history">History</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="font-headline font-black uppercase text-[#ffde03] text-xl">Legal</span>
                            <a className="font-bold uppercase tracking-widest text-sm hover:text-yellow-400" href="#">Privacy</a>
                            <a className="font-bold uppercase tracking-widest text-sm hover:text-yellow-400" href="#">Terms</a>
                            <a className="font-bold uppercase tracking-widest text-sm hover:text-yellow-400" href="#">API Docs</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-24 pt-8 border-t-2 border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 font-black uppercase tracking-[0.2em]">© 2024 SANJAY'S VISION SYSTEM. ALL RIGHTS RESERVED.</p>
                    <p className="text-xs text-[#ffde03] font-black uppercase italic">V1.0.4 - AUTONOMOUS_ACTIVE</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
