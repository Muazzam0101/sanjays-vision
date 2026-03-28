import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const History = () => {
    const navigate = useNavigate();
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/history');
                setScans(response.data);
            } catch (error) {
                console.error(error);
                // Demo data
                setScans([
                    { id: '#8821', url: 'https://vision-hq.com', status: 'COMPLETED', bugs: '12', date: '2024-03-20', score: 92 },
                    { id: '#8820', url: 'https://alpha-test.io', status: 'FAILED', bugs: '00', date: '2024-03-19', score: '--' },
                    { id: '#8819', url: 'https://neural-link.net', status: 'COMPLETED', bugs: '45', date: '2024-03-18', score: 74 },
                    { id: '#8818', url: 'https://beta-labs.org', status: 'COMPLETED', bugs: '08', date: '2024-03-15', score: 98 }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

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
                        <Link className="flex items-center gap-4 p-4 border-4 border-black bg-yellow-400 font-headline font-black uppercase text-sm neo-shadow active-press" to="/history">
                            <span className="material-symbols-outlined">history</span> History
                        </Link>
                        <Link className="flex items-center gap-4 p-4 border-4 border-black hover:bg-white font-headline font-black uppercase text-sm hover:neo-shadow active-press transition-none" to="/report">
                            <span className="material-symbols-outlined">description</span> Reports
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="font-headline text-5xl font-black uppercase italic tracking-tighter">Neural Archive</h2>
                            <p className="font-headline font-bold text-gray-400 uppercase tracking-widest">Global Scan History // V1.0.4-AUTONOMOUS</p>
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex-1 min-w-[300px] relative">
                            <input className="w-full bg-white border-4 border-black p-4 font-bold uppercase text-xs focus:outline-none neo-shadow" placeholder="Search Target Neural Signature..." />
                            <span className="absolute right-4 top-4 material-symbols-outlined opacity-30">search</span>
                        </div>
                        <select className="bg-white border-4 border-black px-6 font-bold uppercase text-xs focus:outline-none neo-shadow">
                            <option>Sort By: Newest</option>
                            <option>Sort By: Health</option>
                        </select>
                        <button className="bg-white border-4 border-black px-6 py-4 font-bold uppercase text-xs neo-shadow active-press flex items-center gap-2">
                             <span className="material-symbols-outlined text-sm">filter_list</span> Filter
                        </button>
                    </div>

                    {/* History Table */}
                    <div className="bg-white border-4 border-black neo-shadow-lg overflow-hidden">
                        <table className="w-full text-left font-['Work_Sans'] font-bold uppercase text-xs">
                            <thead>
                                <tr className="border-b-4 border-black bg-gray-100">
                                    <th className="p-6 border-r-4 border-black">ID</th>
                                    <th className="p-6 border-r-4 border-black">TARGET_URL</th>
                                    <th className="p-6 border-r-4 border-black">STATS</th>
                                    <th className="p-6 border-r-4 border-black">HEALTH</th>
                                    <th className="p-6 border-r-4 border-black">STATUS</th>
                                    <th className="p-6">COMMAND</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scans.map(scan => (
                                    <tr key={scan.id} className="border-b-4 border-black hover:bg-yellow-50 transition-colors group">
                                        <td className="p-6 border-r-4 border-black font-headline font-black text-lg underline decoration-4 underline-offset-4 group-hover:bg-yellow-400 group-hover:text-black">{scan.id}</td>
                                        <td className="p-6 border-r-4 border-black">
                                            <div className="flex flex-col">
                                                <span className="truncate max-w-[200px] text-sm">{scan.url}</span>
                                                <span className="text-[10px] opacity-40">{scan.date}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 border-r-4 border-black">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-between items-center bg-red-100 border border-black px-1 text-[9px]">
                                                    <span>BUGS:</span> <span>{scan.bugs}</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-blue-100 border border-black px-1 text-[9px]">
                                                    <span>LINKS:</span> <span>04</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 border-r-4 border-black font-headline font-black text-2xl italic text-center text-red-500">{scan.score}</td>
                                        <td className="p-6 border-r-4 border-black">
                                            <div className="flex flex-col gap-2">
                                                <span className={`px-2 py-1 border-2 border-black text-center ${scan.status === 'COMPLETED' ? 'bg-green-400' : 'bg-red-400'}`}>
                                                    {scan.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <button 
                                                onClick={() => navigate(`/report?scan_id=${scan.id}`)}
                                                className="w-full bg-black text-white border-2 border-black p-2 font-headline font-black hover:bg-yellow-400 hover:text-black active-press transition-none"
                                            >
                                                VIEW MANIFESTO
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="mt-8 flex justify-center gap-4">
                        <button className="bg-white border-4 border-black p-4 neo-shadow active-press">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <div className="bg-black text-white border-4 border-black p-4 neo-shadow font-headline font-black">01 / 12</div>
                        <button className="bg-white border-4 border-black p-4 neo-shadow active-press">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default History;
