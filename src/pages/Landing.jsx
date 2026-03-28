import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#f9f9f9] font-body text-[#1a1c1c] selection:bg-[#ffde03] min-h-screen">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
                .neo-shadow {
                    box-shadow: 4px 4px 0px 0px #000000;
                }
                .neo-shadow-lg {
                    box-shadow: 8px 8px 0px 0px #000000;
                }
                .active-press:active {
                    transform: translate(2px, 2px);
                    box-shadow: 2px 2px 0px 0px #000000;
                }
                .font-headline { font-family: 'Space Grotesk', sans-serif; }
            `}</style>

            {/* TopAppBar */}
            <header className="bg-white dark:bg-black w-full border-b-4 border-black dark:border-white sticky top-0 z-50">
                <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-2xl font-black text-black dark:text-white uppercase italic font-headline tracking-tighter">SANJAY'S VISION</Link>
                    </div>
                    <nav className="hidden md:flex gap-8 items-center">
                        <Link className="font-headline font-bold uppercase tracking-tighter text-black dark:text-white underline decoration-4 underline-offset-8" to="/dashboard">Dashboard</Link>
                        <Link className="font-headline font-bold uppercase tracking-tighter text-gray-600 dark:text-gray-400 hover:bg-yellow-400 hover:text-black transition-none px-2" to="/report">Reports</Link>
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
                            <span className="font-headline font-black text-black uppercase tracking-widest text-sm">V1.0.4-AUTONOMOUS</span>
                        </div>
                        <h1 className="font-headline text-6xl md:text-9xl font-black text-black leading-none tracking-tighter uppercase mb-2">
                            SANJAY'S<br/>VISION
                        </h1>
                        <p className="max-w-2xl text-xl md:text-2xl font-bold text-black border-l-8 border-[#ffde03] pl-6 py-2">
                            AI-powered website testing with real-time bug detection. 
                            Stop manual testing. Start autonomous inspection.
                        </p>
                        <div className="flex flex-wrap gap-6 mt-8">
                            <button onClick={() => navigate('/scanning')} className="bg-[#ffde03] text-black border-4 border-black py-4 px-10 font-headline font-black text-xl uppercase tracking-wider neo-shadow-lg active-press transition-none">
                                Start Scanning
                            </button>
                            <button className="bg-white text-black border-4 border-black py-4 px-10 font-headline font-black text-xl uppercase tracking-wider neo-shadow-lg active-press transition-none">
                                View Demo
                            </button>
                        </div>
                    </div>
                    {/* Absolute decorative elements */}
                    <div className="absolute top-20 right-10 md:right-40 hidden lg:block rotate-12 scale-150">
                        <span className="material-symbols-outlined text-[#ffde03] text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <div className="absolute bottom-10 right-20 hidden lg:block -rotate-12">
                        <span className="material-symbols-outlined text-[#b81d27] text-[80px]">biotech</span>
                    </div>
                </section>

                {/* Video Section */}
                <section className="bg-[#eeeeee] px-6 py-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-12 text-center md:text-left">
                            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">See the AI in Action</h2>
                        </div>
                        <div className="relative group">
                            <div className="w-full aspect-video bg-black border-4 border-black neo-shadow-lg overflow-hidden flex items-center justify-center relative">
                                <video 
                                    className="w-full h-full object-cover" 
                                    src="/landing-video.mp4" 
                                    controls 
                                    autoPlay 
                                    muted 
                                    loop
                                    poster="https://lh3.googleusercontent.com/aida-public/AB6AXuAOATWyF2tgVWw6uxuQgIOSKI74m3z2YDIG68skfP9tpieGfS2iQjG0iFt0VF4AM72zD_AhIX_pUmImRxsgBr-gR2TJCI03mOV_I1o4qUNv9IZ0MKUdndXMiFDGmf2WldpJTNvFLbSLErzpb50-NFPY6b7_OJA2mjXVC-OXoaylzUQ_aNoL5y0bb6Ulwo5Hr_R3T4doLan_CmamjHMajqyJl8tY0QpD2lIVoBwUg9UxvxYiQDXhVzgg7YqyctFbFLgPb9yUu74UBFhL"
                                ></video>
                            </div>
                            {/* Quirky Label */}
                            <div className="absolute -bottom-6 -right-6 bg-[#b81d27] text-white border-4 border-black py-2 px-6 font-headline font-bold uppercase rotate-3 neo-shadow">
                                Live Analysis Feed
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Bento Grid */}
                <section className="px-6 py-24 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center">Elite Inspection Tools</h2>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Feature 1 */}
                            <div className="md:col-span-8 bg-[#ffde03] border-4 border-black p-8 neo-shadow relative group overflow-hidden">
                                <span className="material-symbols-outlined text-6xl mb-4">link_off</span>
                                <h3 className="font-headline text-3xl font-black uppercase mb-4">Broken Link Detection</h3>
                                <p className="text-lg font-bold max-w-md">Our neural engine crawls every corner of your architecture to find 404s before your users do.</p>
                                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-[200px]">search</span>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="md:col-span-4 bg-[#b81d27] border-4 border-black p-8 neo-shadow text-white relative">
                                <span className="material-symbols-outlined text-6xl mb-4">grid_view</span>
                                <h3 className="font-headline text-3xl font-black uppercase mb-4">UI Bug Detection</h3>
                                <p className="text-lg font-medium">Pixel-perfect verification across 50+ device viewports simultaneously.</p>
                            </div>
                            {/* Feature 3 */}
                            <div className="md:col-span-4 bg-white border-4 border-black p-8 neo-shadow relative">
                                <span className="material-symbols-outlined text-6xl mb-4 text-[#b81d27]">edit_note</span>
                                <h3 className="font-headline text-3xl font-black uppercase mb-4">Form Validation</h3>
                                <p className="text-lg font-bold">Stress-test every input, checkout flow, and signup gate with automated payloads.</p>
                            </div>
                            {/* Feature 4 */}
                            <div className="md:col-span-8 bg-[#e8e8e8] border-4 border-black p-8 neo-shadow flex flex-col md:flex-row gap-8 items-center">
                                <div>
                                    <span className="material-symbols-outlined text-6xl mb-4 text-[#6d5e00]">psychology</span>
                                    <h3 className="font-headline text-3xl font-black uppercase mb-4">AI Bug Classification</h3>
                                    <p className="text-lg font-bold">We don't just find bugs; we rank them by severity using our proprietary Vision Model.</p>
                                </div>
                                <div className="w-full md:w-48 h-48 border-4 border-black bg-white flex items-center justify-center rotate-3">
                                    <span className="font-headline font-black text-4xl text-center px-4">99.8%<br/>ACCURACY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Workflow Section */}
                <section className="bg-[#ffde03] px-6 py-24 border-y-4 border-black">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">The Workflow</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            {/* Connector Arrow */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-black -translate-y-1/2 z-0"></div>
                            {/* Steps */}
                            {[
                                { step: '01', title: 'Enter URL', desc: 'Input your production or staging domain.', icon: 'language' },
                                { step: '02', title: 'Scan', desc: 'Autonomous crawlers deploy in the cloud.', icon: 'rocket_launch' },
                                { step: '03', title: 'Detect', desc: 'AI identifies visual and functional defects.', icon: 'radar' },
                                { step: '04', title: 'Report', desc: 'Receive a categorized bug manifesto.', icon: 'assignment_turned_in' }
                            ].map((s) => (
                                <div key={s.step} className="relative z-10 bg-white border-4 border-black p-6 neo-shadow flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-headline font-black text-3xl mb-4">{s.step}</div>
                                    <h4 className="font-headline font-black uppercase text-xl mb-2">{s.title}</h4>
                                    <p className="font-bold text-sm">{s.desc}</p>
                                    <span className="material-symbols-outlined mt-4 text-4xl">{s.icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white px-6 py-12 border-t-4 border-[#ffde03]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div>
                        <h3 className="font-headline font-black text-3xl uppercase italic mb-4 tracking-tighter">SANJAY'S VISION</h3>
                        <p className="text-gray-400 max-w-xs font-medium">The world's first truly autonomous quality assurance engine for the modern web.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-2">
                            <span className="font-headline font-bold uppercase text-[#ffde03]">Product</span>
                            <Link className="hover:underline" to="/dashboard">Dashboard</Link>
                            <Link className="hover:underline" to="/scanning">New Scan</Link>
                            <Link className="hover:underline" to="/history">History</Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-headline font-bold uppercase text-[#ffde03]">Company</span>
                            <a className="hover:underline" href="#">About Us</a>
                            <a className="hover:underline" href="#">Privacy</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">© 2024 SANJAY'S VISION SYSTEM. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
