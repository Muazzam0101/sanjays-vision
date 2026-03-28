import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const History = () => {
    const navigate = useNavigate();
    const [scans, setScans] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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

    const filteredScans = scans.filter(s => 
        (s.url || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-body">
            <style>{`
                .neo-shadow { box-shadow: 4px 4px 0px 0px #000000; }
                .neo-shadow-lg { box-shadow: 8px 8px 0px 0px #000000; }
                .active-press:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000000; }
            `}</style>

            {/* SideNavBar (Consistent Component) */}
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
                    <Link to="/history" className="flex items-center gap-3 p-3 font-headline font-bold text-lg bg-yellow-400 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-transform duration-75">
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

            <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden min-w-0">
                {/* TopAppBar Component */}
                <header className="flex justify-between items-center px-6 py-4 w-full bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
                    <div className="flex items-center gap-8 min-w-0">
                        <span className="font-headline font-black text-2xl text-black uppercase italic tracking-tighter truncate md:block hidden">SANJAY'S VISION</span>
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link to="/dashboard" className="font-headline font-bold uppercase tracking-tighter text-gray-600 hover:bg-yellow-400 hover:text-black transition-none px-2 py-1">Dashboard</Link>
                            <Link to="/report" className="font-headline font-bold uppercase tracking-tighter text-black underline decoration-4 underline-offset-8 px-2 py-1">Reports</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 border-2 border-black bg-white hover:bg-yellow-400 active-press">
                            <span className="material-symbols-outlined align-middle">notifications</span>
                        </button>
                        <button className="p-2 border-2 border-black bg-white hover:bg-yellow-400 active-press">
                            <span className="material-symbols-outlined align-middle">account_circle</span>
                        </button>
                    </div>
                </header>

                <main className="p-6 md:p-12 space-y-12 max-w-7xl mx-auto w-full">
                    {/* Page Header Section */}
                    <section className="relative flex justify-between items-start md:items-end">
                        <h2 className="text-6xl md:text-8xl font-black font-headline tracking-tighter uppercase leading-none -ml-1 md:-ml-2">
                            Scan <br/> <span className="text-black bg-yellow-400 px-2 italic">History</span>
                        </h2>
                        <div className="hidden lg:block border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-64 rotate-2">
                            <p className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-1">Total Audits</p>
                            <p className="text-5xl font-black font-headline">{scans.length}</p>
                        </div>
                    </section>

                    {/* Filters & Controls */}
                    <section className="flex flex-col lg:flex-row gap-6 items-end lg:items-center justify-between">
                        <div className="w-full lg:w-1/2">
                            <label className="block font-headline font-black text-sm uppercase mb-2">Search Records</label>
                            <div className="flex">
                                <input 
                                    className="w-full bg-white border-4 border-black p-4 font-bold text-lg focus:ring-0 focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                                    placeholder="URL, DOMAIN, OR PROJECT NAME..." 
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="bg-yellow-400 border-y-4 border-r-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-none active-press">
                                    <span className="material-symbols-outlined font-black">search</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 w-full lg:w-auto">
                            <div className="flex-grow lg:flex-grow-0">
                                <label className="block font-headline font-black text-sm uppercase mb-2">Sort By</label>
                                <select className="w-full bg-white border-4 border-black p-4 font-bold appearance-none cursor-pointer focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase">
                                    <option>LATEST_SCAN</option>
                                    <option>OLDEST_SCAN</option>
                                    <option>MOST_ISSUES</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Scan History Table */}
                    <section className="overflow-x-auto border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white mb-20">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black text-white border-b-4 border-black font-headline uppercase text-sm tracking-widest">
                                    <th className="p-6 border-r border-gray-800">Target URL</th>
                                    <th className="p-6 border-r border-gray-800">Scan Status</th>
                                    <th className="p-6 border-r border-gray-800 text-center">Score</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-4 divide-black">
                                {filteredScans.length > 0 ? filteredScans.map((s, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-yellow-400 transition-none group cursor-pointer" onClick={() => navigate(`/report?scan_id=${s.scan_id}`)}>
                                        <td className="p-6 font-bold">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white">
                                                    <span className="material-symbols-outlined font-bold">language</span>
                                                </div>
                                                <span className="truncate max-w-[200px] lg:max-w-md font-mono text-sm uppercase">{s.url}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 font-black uppercase text-xs">
                                            <span className={`px-3 py-1 border-2 border-black ${s.status === 'completed' ? 'bg-white' : 'bg-red-400 text-white'}`}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-center font-black text-2xl italic tracking-tighter">
                                            {s.health_score}%
                                        </td>
                                        <td className="p-6 text-right flex flex-col md:flex-row gap-2 justify-end">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); navigate(`/report?scan_id=${s.scan_id}`); }}
                                                className="bg-white border-2 border-black px-4 py-2 font-headline font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                                            >
                                                VIEW_REPORT
                                            </button>
                                            <a 
                                                href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/report/${s.scan_id}`} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="bg-yellow-400 text-black border-2 border-black px-4 py-2 font-headline font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none inline-block text-center"
                                            >
                                                DOWNLOAD_PDF
                                            </a>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="p-20 text-center text-gray-500 font-headline font-black uppercase text-2xl">
                                            {loading ? 'Decrypting Records...' : 'No Archival Data Found'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                </main>

                {/* Mobile Floating Action Button */}
                <button 
                    onClick={() => navigate('/scanning')}
                    className="md:hidden fixed bottom-6 right-6 bg-yellow-400 text-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none z-[100]"
                >
                    <span className="material-symbols-outlined text-3xl font-black">add</span>
                </button>
            </div>
        </div>
    );
};

export default History;
