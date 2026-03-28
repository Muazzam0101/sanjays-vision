import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const [depth, setDepth] = useState(3);
    const [speed, setSpeed] = useState(1);
    const [modules, setModules] = useState({
        visual: true,
        sql: true,
        access: false,
        perf: true
    });

    const toggleModule = (m) => setModules(prev => ({ ...prev, [m]: !prev[m] }));

    return (
        <div className="flex min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-body">
            <style>{`
                .neo-shadow { box-shadow: 4px 4px 0px 0px #000000; }
                .neo-shadow-lg { box-shadow: 8px 8px 0px 0px #000000; }
                .active-press:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000000; }
                input[type=range] { -webkit-appearance: none; background: transparent; }
                input[type=range]:focus { outline: none; }
                input[type=range]::-webkit-slider-runnable-track { background: #000; height: 12px; border: 2px solid #000; }
                input[type=range]::-webkit-slider-thumb { border: 4px solid #000; height: 32px; width: 16px; background: #fbbf24; -webkit-appearance: none; margin-top: -12px; cursor: pointer; }
            `}</style>

            {/* SideNavBar (Consistent) */}
            <aside className="hidden md:flex flex-col gap-4 p-4 h-screen w-64 border-r-4 border-black bg-white sticky top-0 z-50">
                <div className="mb-8">
                    <h1 className="font-headline font-black text-black text-2xl tracking-tighter italic">INSPECTOR</h1>
                    <p className="font-headline font-bold text-xs text-gray-500 uppercase">V1.0.4-AUTONOMOUS</p>
                </div>
                <nav className="flex flex-col gap-3 flex-grow">
                    <Link to="/dashboard" className="flex items-center gap-3 p-3 font-headline font-bold text-lg text-black hover:bg-gray-100 hover:translate-x-1 active:scale-95 transition-transform duration-75">
                        <span className="material-symbols-outlined">dashboard</span>
                        Dashboard
                    </Link>
                    <Link to="/scanning" className="flex items-center gap-3 p-3 font-headline font-bold text-lg text-black hover:bg-gray-100 hover:translate-x-1 active:scale-95 transition-transform duration-75">
                        <span className="material-symbols-outlined">biotech</span>
                        New Scan
                    </Link>
                    <Link to="/history" className="flex items-center gap-3 p-3 font-headline font-bold text-lg text-black hover:bg-gray-100 hover:translate-x-1 active:scale-95 transition-transform duration-75">
                        <span className="material-symbols-outlined">history</span>
                        History
                    </Link>
                    <Link to="/report" className="flex items-center gap-3 p-3 font-headline font-bold text-lg text-black hover:bg-gray-100 hover:translate-x-1 active:scale-95 transition-transform duration-75">
                        <span className="material-symbols-outlined">analytics</span>
                        Reports
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 p-3 font-headline font-bold text-lg bg-yellow-400 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-transform duration-75">
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                    </Link>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                {/* TopAppBar */}
                <header className="flex justify-between items-center px-6 py-4 w-full bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-40">
                    <div className="md:hidden">
                        <h1 className="text-2xl font-black text-black uppercase italic font-headline tracking-tighter">SANJAY'S VISION</h1>
                    </div>
                    <div className="flex items-center gap-8 min-w-0">
                        <span className="font-headline font-black text-2xl text-black uppercase italic tracking-tighter truncate md:block hidden">SYSTEM_CONFIG</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="material-symbols-outlined text-black p-1 hover:bg-yellow-400 transition-none">help_outline</button>
                        <button className="material-symbols-outlined text-black p-1 hover:bg-yellow-400 transition-none">account_circle</button>
                    </div>
                </header>

                <main className="p-8 md:p-12 space-y-12 bg-white overflow-y-auto max-w-5xl mx-auto w-full">
                    {/* Hero Section */}
                    <div className="relative">
                        <h2 className="text-6xl md:text-8xl font-headline font-black text-black tracking-tighter uppercase p-2 bg-yellow-400 inline-block -rotate-1">
                            Settings
                        </h2>
                    </div>

                    {/* Configuration Sliders Section */}
                    <section className="space-y-12">
                        <div className="flex items-center gap-4">
                            <h3 className="text-3xl font-headline font-black uppercase tracking-tighter italic">Global Params</h3>
                            <div className="flex-grow h-1 bg-black"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <label className="font-headline font-black text-lg uppercase">Crawl Depth</label>
                                    <span className="text-4xl font-black italic">{depth}</span>
                                </div>
                                <input 
                                    className="w-full" 
                                    max="10" 
                                    min="1" 
                                    type="range"
                                    value={depth}
                                    onChange={(e) => setDepth(e.target.value)}
                                />
                                <p className="text-[10px] font-black uppercase text-gray-400">Determines the recursion depth for autonomous traversal of the link hierarchy.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <label className="font-headline font-black text-lg uppercase">Typing Speed</label>
                                    <span className="text-4xl font-black italic">{speed}x</span>
                                </div>
                                <input 
                                    className="w-full" 
                                    max="5" 
                                    min="0.5" 
                                    step="0.5" 
                                    type="range"
                                    value={speed}
                                    onChange={(e) => setSpeed(e.target.value)}
                                />
                                <p className="text-[10px] font-black uppercase text-gray-400">Simulation velocity for form interactions and interactive element testing.</p>
                            </div>
                        </div>
                    </section>

                    {/* Module Toggles Section */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h3 className="text-3xl font-headline font-black uppercase tracking-tighter italic">Machine Modules</h3>
                            <div className="flex-grow h-1 bg-black"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { id: 'visual', label: 'VISUAL_REGRESSION', desc: 'Screnshot comparison logic' },
                                { id: 'sql', label: 'SQL_INJECTION', desc: 'Parameterized payload testing' },
                                { id: 'access', label: 'ACCESSIBILITY', desc: 'WCAG compliance auditing' },
                                { id: 'perf', label: 'PERFORMANCE', desc: 'Core web vitals monitoring' }
                            ].map((m) => (
                                <button 
                                    key={m.id}
                                    onClick={() => toggleModule(m.id)}
                                    className={`p-6 border-4 border-black text-left neo-shadow-lg transition-none active-press flex flex-col justify-between h-48 ${modules[m.id] ? 'bg-black text-white' : 'bg-white text-black'}`}
                                >
                                    <div className="space-y-2">
                                        <p className="font-headline font-black text-sm uppercase leading-tight">{m.label}</p>
                                        <p className={`text-[10px] font-black uppercase ${modules[m.id] ? 'text-gray-400' : 'text-gray-500'}`}>{m.desc}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className={`text-xs font-black uppercase italic ${modules[m.id] ? 'text-yellow-400' : 'text-black'}`}>{modules[m.id] ? 'ACTIVE_EYE' : 'INACTIVE'}</span>
                                        <div className={`w-8 h-8 border-2 flex items-center justify-center ${modules[m.id] ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-black bg-white text-black'}`}>
                                            <span className="material-symbols-outlined font-black">{modules[m.id] ? 'check_circle' : 'radio_button_unchecked'}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Danger Zone Section */}
                    <section className="pt-12">
                        <div className="border-4 border-black bg-white p-8 neo-shadow relative">
                            <div className="absolute top-0 right-0 bg-red-400 border-l-4 border-b-4 border-black px-4 py-1 text-xs font-black uppercase tracking-widest text-white italic">
                                Danger_Zone
                            </div>
                            <h4 className="text-2xl font-headline font-black uppercase mb-6 flex items-center gap-4">
                                <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                                System Deletion Protocols
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button className="bg-white border-4 border-black p-4 font-headline font-black text-xs uppercase hover:bg-black hover:text-white transition-none active-press">
                                    Purge All Records
                                </button>
                                <button className="bg-white border-4 border-black p-4 font-headline font-black text-xs uppercase hover:bg-black hover:text-white transition-none active-press">
                                    Factory Reset Machine
                                </button>
                                <button className="bg-red-500 text-white border-4 border-black p-4 font-headline font-black text-xs uppercase hover:bg-black hover:text-white transition-none active-press">
                                    DEACTIVATE LICENSE
                                </button>
                            </div>
                        </div>
                    </section>

                    <footer className="pt-20 pb-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t-4 border-black">
                        <div className="flex flex-col gap-2">
                            <span className="font-headline font-black text-xl italic tracking-tighter">SANJAY'S VISION</span>
                            <span className="font-black text-[10px] uppercase text-gray-400 italic">V1.0.4 - LICENSE: SV-99427-X</span>
                        </div>
                        <div className="flex gap-8">
                            <Link className="font-black text-xs uppercase underline decoration-2 underline-offset-4" to="#">Privacy</Link>
                            <Link className="font-black text-xs uppercase underline decoration-2 underline-offset-4" to="#">Terms</Link>
                            <Link className="font-black text-xs uppercase underline decoration-2 underline-offset-4" to="#">Support</Link>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Settings;
