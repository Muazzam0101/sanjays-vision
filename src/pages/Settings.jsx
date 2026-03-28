import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const [crawlDepth, setCrawlDepth] = useState(5);
    const [typingSpeed, setTypingSpeed] = useState(70);
    const [modules, setModules] = useState({
        neuralLink: true,
        ghostMode: false,
        deepStorage: true,
        cliAccess: true
    });

    const handleToggle = (key) => {
        setModules(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-[#f9f9f9] font-['Work_Sans'] text-[#1a1c1c] min-h-screen flex flex-col md:flex-row">
            <style>{`
                .neo-shadow { box-shadow: 4px 4px 0px 0px #000000; }
                .neo-shadow-lg { box-shadow: 8px 8px 0px 0px #000000; }
                .active-press:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000000; }
                .font-headline { font-family: 'Space Grotesk', sans-serif; }
            `}</style>

            {/* Sidebar */}
            <aside className="w-full md:w-64 border-b-4 md:border-b-0 md:border-r-4 border-black bg-white flex md:flex-col p-6 sticky top-0 md:h-screen z-50">
                <div className="flex-1">
                    <div className="mb-12 hidden md:block">
                        <Link to="/" className="font-headline font-black text-2xl uppercase tracking-tighter">SANJAY'S VISION</Link>
                    </div>
                    <nav className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                        <Link className="flex items-center gap-4 p-4 border-4 border-black hover:bg-white font-headline font-black uppercase text-sm hover:neo-shadow active-press transition-none" to="/dashboard">
                            <span className="material-symbols-outlined">dashboard</span> Dashboard
                        </Link>
                        <Link className="flex items-center gap-4 p-4 border-4 border-black hover:bg-white font-headline font-black uppercase text-sm hover:neo-shadow active-press transition-none" to="/scanning">
                            <span className="material-symbols-outlined">add_circle</span> New Scan
                        </Link>
                        <Link className="flex items-center gap-4 p-4 border-4 border-black hover:bg-white font-headline font-black uppercase text-sm hover:neo-shadow active-press transition-none" to="/history">
                            <span className="material-symbols-outlined">history</span> History
                        </Link>
                        <Link className="flex items-center gap-4 p-4 border-4 border-black hover:bg-white font-headline font-black uppercase text-sm hover:neo-shadow active-press transition-none" to="/report">
                            <span className="material-symbols-outlined">description</span> Reports
                        </Link>
                    </nav>
                </div>
                <div className="mt-auto hidden md:block">
                     <Link className="flex items-center gap-4 p-4 border-4 border-black bg-black text-white font-headline font-black uppercase text-sm neo-shadow active-press" to="/settings">
                        <span className="material-symbols-outlined">settings</span> Settings
                    </Link>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl">
                    {/* Header */}
                    <div className="mb-12 border-b-4 border-black pb-8">
                        <h2 className="font-headline text-5xl font-black uppercase italic tracking-tighter">Core Configuration</h2>
                        <p className="font-headline font-bold text-gray-400 uppercase tracking-widest mt-2">Modify Neural Signature // System Parameters: V1.0.4</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Section 1: Scan Parameters */}
                        <div className="space-y-12">
                            <div className="bg-white border-4 border-black p-8 neo-shadow relative overflow-hidden group">
                                <h3 className="font-headline font-black uppercase text-2xl italic tracking-tighter mb-8 border-b-4 border-black pb-2 inline-block">Neural Depth</h3>
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between font-headline font-black uppercase text-xs">
                                            <span>Max Crawl Depth</span>
                                            <span className="bg-yellow-400 px-2 border-2 border-black rotate-3">{crawlDepth} PAGES</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="1" max="20" 
                                            value={crawlDepth} 
                                            onChange={(e) => setCrawlDepth(e.target.value)}
                                            className="w-full h-8 bg-gray-200 border-4 border-black appearance-none cursor-pointer accent-black" 
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between font-headline font-black uppercase text-xs">
                                            <span>Typing Speed (Simulated)</span>
                                            <span className="bg-blue-400 text-white px-2 border-2 border-black -rotate-3">{typingSpeed} WPM</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="30" max="150" 
                                            value={typingSpeed} 
                                            onChange={(e) => setTypingSpeed(e.target.value)}
                                            className="w-full h-8 bg-gray-200 border-4 border-black appearance-none cursor-pointer accent-primary" 
                                        />
                                    </div>
                                </div>
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform">
                                    <span className="material-symbols-outlined text-[120px]">psychology</span>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Module Toggles */}
                        <div className="space-y-6">
                            <h3 className="font-headline font-black uppercase text-2xl italic tracking-tighter mb-4">Module Access</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { id: 'neuralLink', label: 'Neural Link Bridge', desc: 'Direct browser control via AI core.' },
                                    { id: 'ghostMode', label: 'Ghost Mode', desc: 'Bypass basic WAF and rate limiters.' },
                                    { id: 'deepStorage', label: 'Deep Storage', desc: 'Persist scan data for 90+ days.' },
                                    { id: 'cliAccess', label: 'CLI Remote Access', desc: 'Enable terminal-based scan triggers.' }
                                ].map(m => (
                                    <div key={m.id} className="bg-white border-4 border-black p-6 flex items-center justify-between gap-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex-1">
                                            <h4 className="font-headline font-black uppercase text-sm">{m.label}</h4>
                                            <p className="text-[10px] font-bold uppercase opacity-40">{m.desc}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleToggle(m.id)}
                                            className={`w-16 h-8 border-4 border-black relative transition-colors ${modules[m.id] ? 'bg-green-400' : 'bg-red-400'}`}
                                        >
                                            <div className={`absolute top-0 w-6 h-full bg-white border-r-4 border-black transition-all ${modules[m.id] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-16 flex justify-end gap-6 border-t-4 border-black pt-12">
                        <button className="bg-white border-4 border-black px-10 py-4 font-headline font-black uppercase tracking-widest text-lg hover:bg-gray-100 active-press transition-none">
                            Discard
                        </button>
                        <button className="bg-yellow-400 border-4 border-black px-10 py-4 font-headline font-black uppercase tracking-widest text-lg neo-shadow active-press transition-none">
                            Commit Changes
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
