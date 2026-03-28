import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/scans')
            .then(res => {
                setScans(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const totalBugs = scans.reduce((acc, s) => acc + (s.broken_links || 0) + (s.ui_issues || 0) + (s.form_errors || 0), 0);
    const avgHealth = scans.length > 0 
        ? Math.round(scans.reduce((acc, s) => acc + (s.health_score || 0), 0) / scans.length) 
        : '--';

    return (
        <div className="flex min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-body">
            <style>{`
                .neo-shadow { box-shadow: 4px 4px 0px 0px #000000; }
                .neo-shadow-lg { box-shadow: 8px 8px 0px 0px #000000; }
                .active-press:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000000; }
            `}</style>

            {/* SideNavBar Component */}
            <aside className="hidden md:flex flex-col gap-4 p-4 h-screen w-64 border-r-4 border-black bg-white sticky top-0 z-50">
                <div className="mb-8">
                    <h1 className="font-headline font-black text-black text-2xl tracking-tighter italic">INSPECTOR</h1>
                    <p className="font-headline font-bold text-xs text-gray-500 uppercase">V1.0.4-AUTONOMOUS</p>
                </div>
                <nav className="flex flex-col gap-3 flex-grow">
                    <Link to="/dashboard" className="flex items-center gap-3 p-3 font-headline font-bold text-lg bg-yellow-400 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-transform duration-75">
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
                    <Link to="/settings" className="flex items-center gap-3 p-3 font-headline font-bold text-lg text-black hover:bg-gray-100 hover:translate-x-1 active:scale-95 transition-transform duration-75">
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                    </Link>
                </nav>
                <button onClick={() => navigate('/scanning')} className="mt-auto bg-black text-white p-4 font-headline font-bold text-sm tracking-widest border-2 border-black hover:bg-yellow-400 hover:text-black transition-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    START SCAN
                </button>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                {/* TopAppBar Component */}
                <header className="flex justify-between items-center px-6 py-4 w-full bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-40">
                    <div className="md:hidden">
                        <h1 className="text-2xl font-black text-black uppercase italic font-headline tracking-tighter">SANJAY'S VISION</h1>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/dashboard" className="font-headline font-bold uppercase tracking-tighter text-black underline decoration-4 underline-offset-8">Dashboard</Link>
                        <Link to="/report" className="font-headline font-bold uppercase tracking-tighter text-gray-600 hover:bg-yellow-400 hover:text-black transition-none px-2">Reports</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <input className="bg-[#eeeeee] border-4 border-black px-4 py-1 font-headline font-bold focus:ring-0 focus:outline-none focus:bg-white w-64" placeholder="SEARCH..." type="text"/>
                        </div>
                        <button className="material-symbols-outlined text-black p-1 hover:bg-yellow-400 transition-none">notifications</button>
                        <button className="material-symbols-outlined text-black p-1 hover:bg-yellow-400 transition-none">account_circle</button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="p-8 md:p-12 space-y-12 bg-white overflow-y-auto">
                    {/* Hero Title */}
                    <div className="relative">
                        <h2 className="text-6xl md:text-8xl font-headline font-black text-[#1a1c1c] tracking-tighter uppercase -ml-1 md:-ml-2">
                            Dashboard
                        </h2>
                        <div className="h-4 w-48 bg-yellow-400 absolute -bottom-2 left-0 -z-10"></div>
                    </div>

                    {/* Bento Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Stat Card 1 */}
                        <div className="bg-white border-4 border-black p-6 neo-shadow -rotate-1 hover:rotate-0 transition-transform cursor-pointer group">
                            <p className="font-headline font-bold text-sm uppercase text-gray-500 mb-2">Total Scans</p>
                            <div className="flex justify-between items-end">
                                <span className="text-6xl font-headline font-black tracking-tighter">{scans.length}</span>
                                <span className="material-symbols-outlined text-yellow-400 text-4xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>dataset</span>
                            </div>
                        </div>
                        {/* Stat Card 2 */}
                        <div className="bg-yellow-400 border-4 border-black p-6 neo-shadow rotate-1 hover:rotate-0 transition-transform cursor-pointer group">
                            <p className="font-headline font-bold text-sm uppercase text-black mb-2">Bugs Found</p>
                            <div className="flex justify-between items-end">
                                <span className="text-6xl font-headline font-black tracking-tighter">{totalBugs}</span>
                                <span className="material-symbols-outlined text-black text-4xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>pest_control</span>
                            </div>
                        </div>
                        {/* Stat Card 3 */}
                        <div className="bg-white border-4 border-black p-6 neo-shadow -rotate-1 md:rotate-2 hover:rotate-0 transition-transform cursor-pointer group">
                            <p className="font-headline font-bold text-sm uppercase text-gray-500 mb-2">Health Score</p>
                            <div className="flex justify-between items-end">
                                <span className="text-6xl font-headline font-black tracking-tighter">{avgHealth}%</span>
                                <span className="material-symbols-outlined text-red-500 text-4xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            </div>
                        </div>
                    </div>

                    {/* Data Table Section */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h3 className="text-3xl font-headline font-black uppercase tracking-tighter">Recent Scans</h3>
                            <div className="flex-grow h-1 bg-black"></div>
                        </div>
                        <div className="overflow-x-auto border-4 border-black bg-white neo-shadow-lg">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black text-white font-headline uppercase text-sm tracking-widest">
                                        <th className="p-4 border-r border-gray-800">URL / Endpoint</th>
                                        <th className="p-4 border-r border-gray-800 text-center">Status</th>
                                        <th className="p-4 border-r border-gray-800 text-center">Score</th>
                                        <th className="p-4 text-center whitespace-nowrap">Report</th>
                                    </tr>
                                </thead>
                                <tbody className="font-semibold">
                                    {scans.length > 0 ? scans.map((s, idx) => (
                                        <tr key={idx} className="border-b-4 border-black hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/report?scan_id=${s.scan_id}`)}>
                                            <td className="p-4 border-r-4 border-black font-mono text-sm truncate max-w-xs">{s.url || 'N/A'}</td>
                                            <td className="p-4 border-r-4 border-black text-center">
                                                <span className={`px-3 py-1 border-2 border-black font-black uppercase text-[10px] ${s.status === 'completed' ? 'bg-yellow-400' : 'bg-red-400 text-white'}`}>
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td className="p-4 border-r-4 border-black font-black text-xl text-center">{s.health_score}%</td>
                                            <td className="p-4 text-center">
                                                <a 
                                                    href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/report/${s.scan_id}`} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="bg-black text-white px-4 py-2 font-headline font-black text-[10px] uppercase hover:bg-yellow-400 hover:text-black transition-none active-press border-2 border-black inline-block whitespace-nowrap"
                                                >
                                                    DOWNLOAD_PDF
                                                </a>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="p-12 text-center text-gray-500 font-headline font-black uppercase text-xl">
                                                {loading ? 'Decrypting Records...' : 'No Scan Packets Detected'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <div className="pt-8 flex justify-center md:justify-end">
                        <button onClick={() => navigate('/scanning')} className="group relative inline-block px-12 py-6 bg-yellow-400 border-4 border-black neo-shadow-lg active-press transition-all transition-none">
                            <span className="relative font-headline font-black text-3xl md:text-4xl uppercase tracking-tighter flex items-center gap-4">
                                Start New Scan
                                <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                            </span>
                        </button>
                    </div>

                    {/* Extra Decorative Image Section */}
                    <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 pb-12">
                        <div className="border-4 border-black neo-shadow overflow-hidden bg-black h-64">
                            <img className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500" alt="Cyber background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfjnz5wIyT0DtgtZXLpQ5Y5P5oMPXtv5FnanJtonq92ZVNcOBUR77MUz8MjnJrV17Ixg3UHNQRuAm-oo8YOnzbYeXYbd4RX_dP7RBMqnOUExIYAi9q1Irbf9HxMxT4LjS8oGmzWAaoTgyF-K0x-lXTUgRo-LLfn_T0ac9CjReKRPqIEwAjoV-tFKEeqmxFIgDUn7QSmg6wIMylkUryFpmqhoxXkxs0_ZyXfo8i9jZ_7DVMU_bygPY87Pv4VVov3gBbQIKlMDNMEFbc" />
                        </div>
                        <div className="flex flex-col justify-center p-8 bg-white border-4 border-black neo-shadow relative -top-6 md:-top-0 md:-left-6">
                            <h4 className="text-3xl font-headline font-black mb-4 uppercase">AUTONOMOUS AGENT ACTIVE</h4>
                            <p className="font-body font-medium text-lg leading-tight uppercase tracking-tight">
                                Our AI-driven inspector is currently traversing active deployments. Real-time bug detection and healing protocols are engaged.
                            </p>
                            <div className="mt-6 flex gap-2">
                                <div className="w-3 h-3 bg-yellow-400 border border-black animate-pulse"></div>
                                <div className="w-3 h-3 bg-yellow-400 border border-black animate-pulse delay-75"></div>
                                <div className="w-3 h-3 bg-black"></div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* BottomNavBar (Mobile only) */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black flex justify-around p-4 z-50">
                    <Link to="/dashboard" className="material-symbols-outlined text-black bg-yellow-400 p-2 border-2 border-black" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</Link>
                    <Link to="/scanning" className="material-symbols-outlined text-black p-2">biotech</Link>
                    <Link to="/history" className="material-symbols-outlined text-black p-2">history</Link>
                    <Link to="/report" className="material-symbols-outlined text-black p-2">analytics</Link>
                    <Link to="/settings" className="material-symbols-outlined text-black p-2">settings</Link>
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;
