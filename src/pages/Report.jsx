import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Report = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const scanId = searchParams.get('scan_id');
    
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!scanId) {
            setLoading(false);
            return;
        }

        const fetchReport = async () => {
            try {
                const response = await api.get(`/results/${scanId}`);
                setReportData(response.data);
            } catch (error) {
                console.error("Error fetching report:", error);
                // Fallback demo data if ID is not found
                setReportData({
                    id: scanId,
                    url: 'PROTOCOL_UNKNOWN',
                    health_score: 0,
                    status: 'error',
                    metrics: { broken_links: 0, ui_issues: 0, form_errors: 0, js_errors: 0 },
                    bugs: [],
                    issues: []
                });
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [scanId]);

    const handleExportPDF = () => {
        if (!scanId) return;
        window.open(`http://localhost:8000/report/${scanId}`, '_blank');
    };

    if (loading) return (
        <div className="bg-[#f9f9f9] min-h-screen flex items-center justify-center font-headline">
             <div className="text-center animate-pulse">
                <h2 className="text-4xl font-black uppercase italic">Extracting Manifesto...</h2>
                <div className="mt-4 h-2 bg-black border-2 border-black w-64 mx-auto overflow-hidden">
                    <div className="h-full bg-yellow-400 animate-slide-infinite"></div>
                </div>
             </div>
             <style>{`
                @keyframes slide-infinite {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-slide-infinite { animation: slide-infinite 1.5s infinite linear; }
             `}</style>
        </div>
    );

    if (!reportData) return (
        <div className="p-20 text-center font-headline">
            <h2 className="text-4xl font-black uppercase">No Data Found</h2>
            <Link to="/scanning" className="mt-8 inline-block underline font-bold">Initiate New Scan</Link>
        </div>
    );

    // Map backend 'issues' to frontend display if needed
    const allBugs = reportData.issues || [];

    return (
        <div className="bg-[#f9f9f9] font-['Work_Sans'] text-[#1a1c1c] min-h-screen flex flex-col md:flex-row">
            <style>{`
                .neo-shadow { box-shadow: 4px 4px 0px 0px #000000; }
                .neo-shadow-lg { box-shadow: 8px 8px 0px 0px #000000; }
                .active-press:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000000; }
                .font-headline { font-family: 'Space Grotesk', sans-serif; }
            `}</style>

            {/* Sidebar */}
            <aside className="w-full md:w-64 border-b-4 md:border-b-0 md:border-r-4 border-black bg-white flex md:flex-col p-6 sticky top-0 md:h-screen z-40">
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
                        <Link className="flex items-center gap-4 p-4 border-4 border-black bg-yellow-400 font-headline font-black uppercase text-sm neo-shadow active-press" to="/report">
                            <span className="material-symbols-outlined">description</span> Reports
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b-4 border-black pb-8">
                        <div>
                            <div className="bg-black text-white px-2 py-1 font-headline font-black text-[10px] inline-block mb-2 uppercase tracking-widest">
                                Audit Result Node: {scanId?.substring(0, 8)}
                            </div>
                            <h2 className="font-headline text-5xl font-black uppercase italic tracking-tighter">Inspection Manifesto</h2>
                            <p className="font-headline font-bold text-gray-500 uppercase tracking-widest overflow-hidden text-ellipsis">Target Link: <span className="text-black">{reportData.url}</span></p>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={handleExportPDF}
                                className="bg-white border-4 border-black py-4 px-8 font-headline font-black uppercase neo-shadow active-press flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">download</span> Export PDF
                            </button>
                            <button className="bg-yellow-400 border-4 border-black py-4 px-8 font-headline font-black uppercase neo-shadow active-press flex items-center gap-2">
                                <span className="material-symbols-outlined">share</span> Publish
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {/* Health Score Shield */}
                        <div className="md:col-span-1 bg-white border-4 border-black p-8 neo-shadow flex flex-col items-center justify-center relative group overflow-hidden">
                            <div className={`absolute top-0 left-0 w-full h-2 ${reportData.health_score > 80 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="material-symbols-outlined text-4xl opacity-20 mb-2">shield</span>
                            <div className="text-6xl font-black italic">{reportData.health_score}</div>
                            <h4 className="font-headline font-black uppercase text-[10px] tracking-widest text-center">Neural Health Score</h4>
                        </div>

                        {/* Bento Stats */}
                        <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Links', val: reportData.broken_links, color: 'bg-blue-400' },
                                { label: 'UI_Threats', val: reportData.ui_issues, color: 'bg-red-400' },
                                { label: 'Form_Vuln', val: reportData.form_errors, color: 'bg-green-400' },
                                { label: 'JS_Leaks', val: reportData.js_errors, color: 'bg-yellow-400' }
                            ].map(m => (
                                <div key={m.label} className="bg-white border-4 border-black p-6 neo-shadow relative group">
                                    <h4 className="font-headline font-black uppercase text-[10px] opacity-40 mb-1">{m.label}</h4>
                                    <div className="text-3xl font-black">{m.val < 10 ? `0${m.val}` : m.val}</div>
                                    <div className={`absolute bottom-0 left-0 h-2 w-full ${m.color}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bug Manifesto Inventory */}
                    <div className="bg-white border-4 border-black p-8 neo-shadow">
                        <h3 className="font-headline font-black uppercase text-2xl italic tracking-tighter mb-8 border-b-4 border-black border-dotted pb-4 inline-block">Bug Inventory</h3>
                        
                        <div className="space-y-6">
                            {allBugs.length > 0 ? allBugs.map((bug, i) => (
                                <div key={i} className="border-4 border-black p-6 hover:bg-gray-50 transition-colors relative flex flex-col md:flex-row gap-6 items-start md:items-center group">
                                    <div className="bg-black text-white w-12 h-12 flex flex-col items-center justify-center font-headline font-black text-xs leading-none shrink-0 group-hover:bg-yellow-400 group-hover:text-black">
                                        <span>NOD</span>
                                        <span>#{i + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`px-2 py-0.5 border-2 border-black font-headline font-black text-[10px] uppercase ${bug.severity === 'critical' || bug.severity === 'high' ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200'}`}>
                                                {bug.severity}
                                            </span>
                                            <span className="font-headline font-bold text-xs uppercase opacity-40">{bug.type}</span>
                                        </div>
                                        <p className="font-bold text-lg uppercase tracking-tight">{bug.description}</p>
                                    </div>
                                    {bug.screenshot && (
                                        <button 
                                            onClick={() => window.open(`http://localhost:8000/${bug.screenshot}`, '_blank')}
                                            className="bg-white border-2 border-black p-2 hover:bg-yellow-400 active-press shrink-0"
                                        >
                                            <span className="material-symbols-outlined">image</span>
                                        </button>
                                    )}
                                </div>
                            )) : (
                                <div className="p-8 text-center bg-gray-50 border-4 border-black border-dotted opacity-50">
                                    <p className="font-headline font-black uppercase italic">Neural Core detected zero functional anomalies.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 text-center opacity-40">
                         <p className="text-[10px] font-headline font-black uppercase tracking-widest">Manifesto Sealed // SANJAY'S VISION V1.0.4-AUTONOMOUS</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Report;
