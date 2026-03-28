import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Scanning = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const scanId = searchParams.get('scan_id');

    const [targetUrl, setTargetUrl] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);

    const [logs, setLogs] = useState([]);
    const [browserUrl, setBrowserUrl] = useState("AWAITING TARGET...");
    const [browserImage, setBrowserImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [metrics, setMetrics] = useState({ broken_links: 0, ui_issues: 0, form_errors: 0, js_errors: 0 });
    const logContainerRef = useRef(null);

    useEffect(() => {
        if (!scanId) return;

        const connectWebSocket = () => {
            const wsBaseUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';
            const wsUrl = `${wsBaseUrl}/ws/${scanId}`;
            const ws = new WebSocket(wsUrl);

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === 'log') {
                    setLogs(prev => {
                        const newLogs = [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg: data.message.toUpperCase(), type: 'info' }];
                        if (newLogs.length > 50) return newLogs.slice(newLogs.length - 50);
                        return newLogs;
                    });
                } else if (data.type === 'navigation') {
                    setBrowserUrl(data.url);
                } else if (data.type === 'screenshot') {
                    setBrowserImage(data.image);
                } else if (data.type === 'progress') {
                    setProgress(data.value);
                } else if (data.type === 'metrics') {
                    setMetrics(data.data);
                } else if (data.type === 'issue_detected') {
                    setLogs(prev => {
                        const sev = data.issue?.severity || 'unknown';
                        const msg = data.issue?.message || 'Details unavailable';
                        const newLogs = [...prev, {
                            time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                            msg: `!! ALERT: ${sev.toUpperCase()} - ${msg.toUpperCase()}`,
                            type: 'alert'
                        }];
                        if (newLogs.length > 50) return newLogs.slice(newLogs.length - 50);
                        return newLogs;
                    });
                } else if (data.type === 'complete') {
                    ws.close();
                    setTimeout(() => navigate(`/report?scan_id=${scanId}`), 2000);
                } else if (data.type === 'failed') {
                    ws.close();
                    alert("SCAN SYSTEM FAILURE: " + data.message.toUpperCase());
                    navigate('/scanning');
                }
            };

            return ws;
        };

        const ws = connectWebSocket();

        const interval = setInterval(async () => {
            try {
                const response = await api.get(`/results/${scanId}`);
                if (response.data && response.data.status === 'completed') {
                    navigate(`/report?scan_id=${scanId}`);
                }
            } catch (e) {
            }
        }, 3000);

        return () => {
            ws.close();
            clearInterval(interval);
        };
    }, [scanId, navigate]);

    const handleStartScan = async (e) => {
        if (e) e.preventDefault();
        if (!targetUrl) return;

        setIsConnecting(true);
        try {
            const response = await api.post('/scan', { url: targetUrl });
            if (response.data.scan_id) {
                navigate(`/scanning?scan_id=${response.data.scan_id}`);
            }
        } catch (error) {
            console.error(error);
            alert("SYSTEM COLLISION: INITIALIZATION REJECTED.");
            setIsConnecting(false);
        }
    };

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const renderConfig = () => (
        <div className="p-8 md:p-16 max-w-6xl mx-auto flex-1 h-fit">
            <div className="mb-12 relative text-on-background">
                <h2 className="text-6xl md:text-8xl font-black font-headline tracking-tighter uppercase leading-none transform -rotate-1 origin-left">
                    SCAN <span className="bg-primary-container px-4">CONFIG</span>
                </h2>
                <div className="absolute -top-4 -right-4 w-32 h-32 hidden md:block border-4 border-black opacity-20"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Main Form Section */}
                <div className="lg:col-span-8 bg-white border-4 border-black neo-shadow p-8 md:p-12 relative h-fit">
                    <div className="absolute -top-6 -left-6 bg-tertiary text-white font-black px-6 py-2 border-4 border-black z-10 transform rotate-2">
                        NEW TASK
                    </div>

                    <form className="space-y-10" onSubmit={handleStartScan}>
                        {/* URL Input */}
                        <div className="space-y-4">
                            <label className="block text-2xl font-black font-headline uppercase tracking-tight">Website URL</label>
                            <div className="relative">
                                <input
                                    className="w-full bg-[#f9f9f9] border-4 border-black p-6 text-2xl font-bold font-body focus:ring-0 focus:outline-none focus:bg-primary-container transition-colors duration-100 placeholder:opacity-30"
                                    placeholder="https://example.com"
                                    type="url"
                                    value={targetUrl}
                                    onChange={(e) => setTargetUrl(e.target.value)}
                                    required
                                    disabled={isConnecting}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-4xl">language</span>
                            </div>
                            <p className="text-sm font-bold font-body uppercase text-on-surface-variant tracking-wider">The target domain for deep autonomous inspection</p>
                        </div>

                        {/* Grid Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Crawl Depth */}
                            <div className="space-y-4">
                                <label className="block text-xl font-black font-headline uppercase tracking-tight">Crawl Depth</label>
                                <div className="relative">
                                    <select className="w-full bg-surface border-4 border-black p-4 font-black font-body appearance-none focus:ring-0 focus:outline-none cursor-pointer">
                                        <option>5 PAGES</option>
                                        <option>10 PAGES</option>
                                        <option defaultValue>15 PAGES</option>
                                        <option>20 PAGES</option>
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none">expand_more</span>
                                </div>
                                <p className="text-xs font-bold font-body uppercase text-on-surface-variant">Max link depth traversal limit</p>
                            </div>
                            {/* Image Placeholder */}
                            <div className="hidden md:block">
                                <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center p-4">
                                    <img alt="Cybersecurity aesthetic" className="w-full h-full object-cover grayscale contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnR4LLASq3Ytr_O_oZXltc5KrfwTN3fX9CayvU6UjYi2bc9rwt6tKXKkw9bDRjnzKMO_30ySUonkq1yGspOmP-kCsrT6fQNvzfJZ8CgRveR06dRoeIuwmBQ34UglH6Aiuz9tKdqbS8LpeqriuhpZFBQqnKCJIUueD1_3-lN91-62I3UPj7TKhFy_eAjLdYBJf_5DeKVQzRNk0FzjomgHnF839tJ5ELrcFSCngNhpPS9dEhzWdCCQMmYFjYrLJwinY93cbXbF6nnUhl" />
                                </div>
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="space-y-6 pt-6 border-t-4 border-black border-dotted">
                            {[
                                { title: 'Form Testing', desc: 'Detect and fuzz input fields automatically', active: true },
                                { title: 'Screenshot Capture', desc: 'Visual snapshots of all discovered routes', active: false },
                                { title: 'AI Classification', desc: 'BETA: Autonomous content scoring', active: true, alert: true }
                            ].map((f, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border-4 border-black hover:bg-primary-container/10 transition-colors">
                                    <div>
                                        <h4 className="font-black font-headline uppercase">{f.title}</h4>
                                        <p className={`text-xs font-bold opacity-70 ${f.alert ? 'text-tertiary' : ''}`}>{f.desc}</p>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <div className={`w-14 h-8 bg-white border-4 border-black ${f.active ? 'bg-primary-container' : 'bg-white'} transition-all`}></div>
                                        <div className={`absolute top-1 w-6 h-6 bg-black transition-all ${f.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action */}
                        <button
                            type="submit"
                            disabled={isConnecting}
                            className="w-full bg-primary-container text-on-background border-4 border-black p-8 text-4xl font-black font-headline tracking-widest neo-shadow neo-shadow-hover uppercase italic transition-all active-press"
                        >
                            {isConnecting ? "LINKING..." : "START SCAN NOW"}
                        </button>
                    </form>
                </div>

                {/* Sidebar Info Cards */}
                <div className="lg:col-span-4 space-y-8 lg:mt-12 h-fit">
                    <div className="bg-black text-white p-6 border-4 border-black neo-shadow transform rotate-1">
                        <span className="material-symbols-outlined text-4xl text-primary-container mb-4">bolt</span>
                        <h3 className="text-2xl font-black font-headline uppercase mb-2">QUICK TIP</h3>
                        <p className="font-bold text-sm leading-relaxed opacity-80 uppercase italic">
                            Deep scans take longer but find hidden subdomains. Use AI Classification to prioritize vulnerability reports.
                        </p>
                    </div>
                    <div className="bg-surface-container-highest border-4 border-black p-6 neo-shadow transform -rotate-1">
                        <h3 className="text-xl font-black font-headline uppercase mb-4 border-b-2 border-black pb-2">SCAN QUOTA</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between font-black text-sm uppercase">
                                <span>REMAINING</span>
                                <span>14 / 20</span>
                            </div>
                            <div className="w-full bg-white border-2 border-black h-8 p-1">
                                <div className="bg-primary-container h-full w-[70%] border-r-2 border-black"></div>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-tighter text-on-surface-variant">Reset in 4 days, 12 hours</p>
                        </div>
                    </div>
                    {/* Decorative Graphic */}
                    <div className="border-4 border-black p-1 bg-primary-container neo-shadow h-fit">
                        <div className="border-2 border-black p-4 bg-white text-center">
                            <span className="material-symbols-outlined text-6xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                            <div className="text-2xl font-black font-headline leading-none">TRUSTED BY 500+ TEAMS</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLive = () => (
        <div className="p-8 md:p-12 max-w-7xl mx-auto flex-1 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 overflow-hidden">
                <div className="flex-1 min-w-0">
                    <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-background uppercase leading-none transform -rotate-1 origin-left mb-4">
                        SYSTEM <span className="bg-primary-container px-4">FLOW</span>
                    </h2>
                    <p className="font-headline font-bold text-sm uppercase tracking-widest truncate max-w-2xl px-2 border-l-8 border-primary-container">
                        SYNC_ORACLE: <span className="bg-[#eeeeee] px-2 border-2 border-black underline italic decoration-4">{browserUrl}</span>
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-tertiary text-white border-4 border-black p-4 neo-shadow rotate-2">
                    <span className="material-symbols-outlined text-4xl animate-pulse">record_voice_over</span>
                    <span className="font-black uppercase tracking-widest">LIVE HUD</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
                <div className="lg:col-span-3 flex flex-col gap-8">
                    {/* Visual stream block */}
                    <div className="flex-1 bg-white border-4 border-black neo-shadow relative group overflow-hidden flex items-center justify-center min-h-[400px]">
                        {browserImage ? (
                            <img className="w-full h-full object-contain" src={browserImage} alt="Visual stream" />
                        ) : (
                            <div className="text-center opacity-30 flex flex-col items-center">
                                <span className="material-symbols-outlined text-[120px] mb-4">videocam_off</span>
                                <p className="font-black text-xl uppercase tracking-widest">Awaiting Neural packets...</p>
                            </div>
                        )}
                        <div className="absolute top-6 left-6 flex gap-3">
                            <div className="bg-red-500 text-white border-4 border-black px-4 py-2 font-black text-xs flex items-center gap-3 neo-shadow">
                                <span className="w-3 h-3 rounded-full bg-white animate-ping"></span> HUB_01
                            </div>
                        </div>
                    </div>

                    {/* Progress HUD */}
                    <div className="bg-white border-4 border-black p-8 neo-shadow relative">
                        <div className="absolute -top-6 right-6 bg-primary-container border-4 border-black px-4 py-1 font-black italic transform rotate-[-1deg]">
                            {progress}% COMPLETE
                        </div>
                        <h4 className="font-headline font-black uppercase text-sm mb-4 tracking-widest">Neural link progression</h4>
                        <div className="h-12 border-4 border-black bg-[#eeeeee] p-1 flex">
                            <div className="h-full bg-black transition-all duration-500 border-r-4 border-black" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="grid grid-cols-3 mt-6 font-black uppercase text-[10px] tracking-widest gap-2">
                            <div className={`p-2 border-2 border-black text-center ${progress > 20 ? 'bg-primary-container' : 'bg-[#eeeeee]'}`}>Discovery</div>
                            <div className={`p-2 border-2 border-black text-center ${progress > 50 ? 'bg-primary-container' : 'bg-[#eeeeee]'}`}>Analysis</div>
                            <div className={`p-2 border-2 border-black text-center ${progress > 80 ? 'bg-primary-container' : 'bg-[#eeeeee]'}`}>Archival</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 h-full">
                    {/* Metrics HUD */}
                    <div className="bg-white border-4 border-black p-6 neo-shadow flex flex-col gap-4">
                        <h4 className="font-black font-headline uppercase text-center border-b-4 border-black pb-2">TELEMETRY</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { label: 'Links', val: metrics.broken_links, color: 'bg-blue-400' },
                                { label: 'Threats', val: metrics.ui_issues, color: 'bg-red-400' },
                                { label: 'Forms', val: metrics.form_errors, color: 'bg-green-400' }
                            ].map(m => (
                                <div key={m.label} className="flex justify-between items-center border-4 border-black p-4 hover:translate-x-1 transition-transform bg-white relative">
                                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${m.color}`}></div>
                                    <span className="font-headline font-black uppercase text-xs pl-2">{m.label}</span>
                                    <span className="text-2xl font-black italic underline decoration-4">{m.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live Terminal */}
                    <div className="flex-none bg-black text-yellow-400 border-4 border-black p-6 neo-shadow flex flex-col gap-4 relative overflow-hidden group h-[300px]">
                        <div className="absolute -top-1 -right-1 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-[100px] animate-spin-slow">radar</span>
                        </div>
                        <h4 className="font-black uppercase text-xs tracking-widest text-[#eeeeee]">Datastream_alpha</h4>
                        <div ref={logContainerRef} className="flex-1 overflow-y-auto space-y-3 font-mono text-[11px] leading-tight custom-scrollbar list-none pb-4">
                            {logs.map((log, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-white/40">[{log.time}]</span>
                                    <span className={log.type === 'alert' ? 'text-red-500 font-bold bg-white px-1' : 'text-yellow-400'}>
                                        {log.msg}
                                    </span>
                                </li>
                            ))}
                            <div className="w-2 h-4 bg-yellow-400 animate-pulse inline-block"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-surface text-on-background min-h-screen flex flex-row font-body selection:bg-primary-container overflow-x-hidden relative h-screen">
            {/* Sidebar Navigation */}
            <aside className="hidden md:flex flex-col gap-4 p-4 h-screen w-64 border-r-4 border-black bg-white sticky top-0 z-50 shrink-0">
                <div className="mb-8">
                    <h1 className="font-black text-black text-2xl font-headline uppercase italic">INSPECTOR</h1>
                    <p className="text-xs font-bold opacity-60">V1.0.4-AUTONOMOUS</p>
                </div>
                <nav className="flex flex-col gap-4">
                    <Link className="flex items-center gap-3 p-3 text-black hover:bg-gray-100 font-headline font-bold text-lg hover:translate-x-1 transition-transform duration-75 active:scale-95" to="/dashboard">
                        <span className="material-symbols-outlined">dashboard</span> Dashboard
                    </Link>
                    <Link className="flex items-center gap-3 p-3 bg-yellow-400 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-headline font-bold text-lg hover:translate-x-1 transition-transform duration-75 active-press" to="/scanning">
                        <span className="material-symbols-outlined">biotech</span> New Scan
                    </Link>
                    <Link className="flex items-center gap-3 p-3 text-black hover:bg-gray-100 font-headline font-bold text-lg hover:translate-x-1 transition-transform duration-75 active:scale-95" to="/history">
                        <span className="material-symbols-outlined">history</span> History
                    </Link>
                    <Link className="flex items-center gap-3 p-3 text-black hover:bg-gray-100 font-headline font-bold text-lg hover:translate-x-1 transition-transform duration-75 active:scale-95" to="/report">
                        <span className="material-symbols-outlined">analytics</span> Reports
                    </Link>
                </nav>
                <div className="mt-auto">
                    <button
                        onClick={() => navigate('/scanning')}
                        className="w-full bg-black text-white p-4 font-black tracking-widest text-sm neo-shadow neo-shadow-hover uppercase italic active-press"
                    >
                        START SCAN
                    </button>
                </div>
            </aside>

            <main className="flex-1 min-h-screen flex flex-col relative bg-surface overflow-y-auto overflow-x-hidden">
                {/* Top App Bar Shell */}
                <header className="flex justify-between items-center px-6 py-4 w-full bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-40 sticky top-0 shrink-0">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-2xl font-black text-black uppercase italic font-headline tracking-tighter">SANJAY'S VISION</Link>
                        <nav className="hidden lg:flex gap-6">
                            <Link className="text-gray-600 font-headline font-bold uppercase tracking-tighter hover:bg-yellow-400 hover:text-black transition-none px-2 py-1" to="/dashboard">Dashboard</Link>
                            <Link className="text-black underline decoration-4 underline-offset-8 font-headline font-bold uppercase tracking-tighter hover:bg-yellow-400 hover:text-black transition-none px-2 py-1" to="/report">Reports</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-yellow-400 transition-none border-2 border-transparent active:border-black">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
                        </button>
                        <button className="p-2 hover:bg-yellow-400 transition-none border-2 border-transparent active:border-black">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                        </button>
                    </div>
                </header>

                {/* Content Area Rendering */}
                <div className="flex-1 flex flex-col relative">
                    {scanId ? renderLive() : renderConfig()}
                </div>

                {/* Bottom Nav Mobile */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black flex justify-around p-4 z-50">
                    <Link className="text-black flex flex-col items-center gap-1" to="/dashboard">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-[10px] font-black uppercase">Home</span>
                    </Link>
                    <Link className="bg-primary-container p-2 border-2 border-black -mt-8 flex flex-col items-center gap-1 neo-shadow active-press" to="/scanning">
                        <span className="material-symbols-outlined font-black">biotech</span>
                    </Link>
                    <Link className="text-black/40 flex flex-col items-center gap-1" to="/history">
                        <span className="material-symbols-outlined">history</span>
                        <span className="text-[10px] font-black uppercase">History</span>
                    </Link>
                </nav>
            </main>
        </div>
    );
};

export default Scanning;