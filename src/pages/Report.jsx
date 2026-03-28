import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';

const Report = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const scanId = searchParams.get('scan_id');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (scanId) {
            api.get(`/results/${scanId}`)
                .then(res => {
                    setResults(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [scanId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center font-headline font-black text-4xl uppercase italic">
                Decrypting Audit Packets...
            </div>
        );
    }

    if (!results && !loading) {
        return (
            <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center font-headline space-y-8">
                <h2 className="text-6xl font-black uppercase italic">No Report Selected</h2>
                <button onClick={() => navigate('/history')} className="bg-yellow-400 border-4 border-black p-6 font-black text-2xl neo-shadow active-press uppercase">
                    Go to History
                </button>
            </div>
        );
    }

    const filteredIssues = results.issues ? results.issues.filter(issue => {
        if (filter === 'all') return true;
        return (issue.severity || '').toLowerCase() === filter.toLowerCase();
    }) : [];

    return (
        <div className="flex min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-body">
            <style>{`
                .neo-shadow { box-shadow: 4px 4px 0px 0px #000000; }
                .neo-shadow-lg { box-shadow: 8px 8px 0px 0px #000000; }
                .active-press:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000000; }
                @keyframes pulse-border {
                    0% { border-color: #000; }
                    50% { border-color: #fbbf24; }
                    100% { border-color: #000; }
                }
                .animate-pulse-border { animation: pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
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
                    <Link to="/report" className="flex items-center gap-3 p-3 font-headline font-bold text-lg bg-yellow-400 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-transform duration-75">
                        <span className="material-symbols-outlined">analytics</span>
                        Reports
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 p-3 font-headline font-bold text-lg text-black hover:bg-gray-100 hover:translate-x-1 active:scale-95 transition-transform duration-75">
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                    </Link>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                {/* TopAppBar */}
                <header className="flex justify-between items-center px-6 py-4 w-full bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-40">
                    <div className="flex items-center gap-4">
                        <span className={`px-4 py-1 border-2 border-black font-black text-xs uppercase tracking-widest bg-yellow-400 animate-pulse-border`}>
                            AUDIT_COMPLETE
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a 
                            href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/report/${scanId}`} 
                            target="_blank"
                            rel="noreferrer"
                            className="bg-black text-white px-4 py-2 font-headline font-bold text-xs uppercase tracking-widest border-2 border-black hover:bg-yellow-400 hover:text-black transition-none active-press"
                        >
                            Download PDF
                        </a>
                        <button className="material-symbols-outlined text-black p-1 hover:bg-yellow-400 transition-none">account_circle</button>
                    </div>
                </header>

                <main className="p-8 md:p-12 space-y-12 bg-white overflow-y-auto">
                    {/* Hero Info Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-4xl md:text-6xl font-headline font-black text-[#1a1c1c] tracking-tighter uppercase break-all">
                                {results.url}
                            </h2>
                            <div className="flex flex-wrap gap-8">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Scan Date</p>
                                    <p className="text-xl font-black font-headline uppercase italic">MAR 28, 2024</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pages Scanned</p>
                                    <p className="text-xl font-black font-headline italic">12 / 50</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-yellow-400 border-4 border-black p-8 neo-shadow rotate-1 flex flex-col items-center justify-center text-center">
                            <p className="font-headline font-black text-sm uppercase tracking-widest mb-2">OVERALL_HEALTH</p>
                            <span className="text-8xl font-headline font-black tracking-tighter leading-none">{results.health_score}</span>
                            <span className="text-2xl font-black font-headline mt-2">%</span>
                        </div>
                    </section>

                    {/* Detailed Metrics Bento Row */}
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white border-4 border-black p-6 neo-shadow">
                            <p className="font-headline font-bold text-[10px] uppercase text-gray-400 mb-1">Broken Links</p>
                            <p className="text-4xl font-black font-headline">{results.broken_links}</p>
                        </div>
                        <div className="bg-white border-4 border-black p-6 neo-shadow">
                            <p className="font-headline font-bold text-[10px] uppercase text-gray-400 mb-1">UI Issues</p>
                            <p className="text-4xl font-black font-headline text-red-500">{results.ui_issues}</p>
                        </div>
                        <div className="bg-white border-4 border-black p-6 neo-shadow">
                            <p className="font-headline font-bold text-[10px] uppercase text-gray-400 mb-1">Form Errors</p>
                            <p className="text-4xl font-black font-headline">{results.form_errors}</p>
                        </div>
                        <div className="bg-white border-4 border-black p-6 neo-shadow flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-black">security</span>
                        </div>
                    </section>

                    {/* Findings & Filter Section */}
                    <section className="space-y-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div className="flex items-center gap-4">
                                <h3 className="text-3xl font-headline font-black uppercase tracking-tighter">Vulnerability Feed</h3>
                                <div className="hidden sm:block h-1 w-32 bg-black"></div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {['all', 'critical', 'high', 'medium', 'low'].map((f) => (
                                    <button 
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-4 py-1 border-2 border-black font-black text-[10px] uppercase tracking-widest transition-none active-press ${filter === f ? 'bg-black text-white shadow-none' : 'bg-white text-black neo-shadow'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bug Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {filteredIssues.length > 0 ? filteredIssues.map((issue, idx) => (
                                <div key={idx} className={`bg-white border-4 border-black p-6 neo-shadow-lg relative overflow-hidden group`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">BUG_ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                                            <h4 className="text-xl font-headline font-black uppercase leading-none group-hover:text-yellow-500 transition-colors">{issue.description}</h4>
                                        </div>
                                        <span className={`px-3 py-1 border-2 border-black font-black text-[10px] uppercase italic ${issue.severity === 'critical' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'}`}>
                                            {issue.severity}
                                        </span>
                                    </div>
                                    <div className="flex gap-4 mb-6">
                                        <div className="flex-shrink-0 w-12 h-12 border-2 border-black bg-[#eeeeee] flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl">error_outline</span>
                                        </div>
                                        <div className="space-y-4 flex-grow">
                                            <p className="font-mono text-xs text-gray-600 bg-gray-100 p-2 border border-black/10 break-all">{issue.page}</p>
                                            <button className="bg-white border-2 border-black px-4 py-2 font-headline font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-none active-press">
                                                VIEW_TRACE_LOG
                                            </button>
                                        </div>
                                    </div>
                                    {/* Abstract Decoration */}
                                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="lg:col-span-2 bg-white border-4 border-black p-20 text-center neo-shadow">
                                    <span className="material-symbols-outlined text-8xl text-gray-200 mb-4">check_circle</span>
                                    <p className="text-2xl font-black font-headline uppercase text-gray-400">No matching threats identified in this quadrant.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Report;
