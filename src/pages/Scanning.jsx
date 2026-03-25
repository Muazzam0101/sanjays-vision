import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Scanning = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const scanId = searchParams.get('scan_id');

    const [logs, setLogs] = useState([]);
    const [browserUrl, setBrowserUrl] = useState("Initializing Oracle Runtime...");
    const [browserImage, setBrowserImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [metrics, setMetrics] = useState({ broken_links: 0, ui_issues: 0, form_errors: 0, js_errors: 0 });
    const logContainerRef = useRef(null);

    useEffect(() => {
        if (!scanId) return;

        const connectWebSocket = () => {
            const wsUrl = `ws://localhost:8000/scan-stream/${scanId}`;
            const ws = new WebSocket(wsUrl);

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                
                if (data.type === 'log') {
                    setLogs(prev => {
                        const newLogs = [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg: data.message, type: 'info' }];
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
                        const newLogs = [...prev, { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg: `[ALERT] ${data.severity.toUpperCase()} Issue Detected: ${data.message}`, type: 'alert' }];
                        if (newLogs.length > 50) return newLogs.slice(newLogs.length - 50);
                        return newLogs;
                    });
                } else if (data.type === 'finished') {
                    ws.close();
                    setTimeout(() => navigate(`/dashboard?scan_id=${scanId}`), 1000);
                } else if (data.type === 'failed') {
                    ws.close();
                    alert("Scan failed: " + data.message);
                    navigate('/');
                }
            };

            return ws;
        };

        const ws = connectWebSocket();

        // Fallback polling for safe navigation
        const interval = setInterval(async () => {
            try {
                const response = await api.get(`/results/${scanId}`);
                if (response.data && response.data.status === 'completed') {
                    navigate(`/dashboard?scan_id=${scanId}`);
                }
            } catch (e) {
                // Background error suppression
            }
        }, 3000);

        return () => {
            ws.close();
            clearInterval(interval);
        };
    }, [scanId, navigate]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="bg-surface overflow-hidden h-screen flex flex-col font-body text-on-surface">
            <style>{`
                .font-headline { font-family: 'Space Grotesk', sans-serif; }
                .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
                
                .grid-bg {
                    background-image: radial-gradient(rgba(67, 72, 87, 0.15) 1px, transparent 1px);
                    background-size: 32px 32px;
                }

                .scan-line {
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #a1faff, transparent);
                    position: absolute;
                    top: 0;
                    left: 0;
                    animation: scan 4s linear infinite;
                    opacity: 0.1;
                    z-index: 10;
                }

                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }

                .typing-cursor {
                    border-right: 2px solid #a1faff;
                    animation: blink 1s step-end infinite;
                }

                @keyframes blink {
                    from, to { border-color: transparent }
                    50% { border-color: #a1faff }
                }

                .glow-cyan { text-shadow: 0 0 10px rgba(161, 250, 255, 0.6); }
                .glass-panel { backdrop-filter: blur(20px); background: rgba(30, 37, 56, 0.4); }
            `}</style>
            
            <nav className="flex justify-between items-center w-full px-6 h-16 sticky top-0 z-50 bg-[#090e1b]/80 backdrop-blur-xl border-b border-[#434857]/15 shadow-[0_20px_40px_rgba(161,250,255,0.08)]">
                <div className="flex items-center gap-8">
                    <span className="text-xl font-bold tracking-tighter text-[#a1faff] drop-shadow-[0_0_8px_rgba(161,250,255,0.4)] font-headline">CYBER_ORACLE</span>
                    <div className="hidden md:flex gap-6 items-center">
                        <Link className="font-headline tracking-[-0.02em] uppercase text-sm text-[#e4e7fb]/60 hover:text-[#e4e7fb] transition-colors" to="#">THREATS</Link>
                        <Link className="font-headline tracking-[-0.02em] uppercase text-sm text-[#e4e7fb]/60 hover:text-[#e4e7fb] transition-colors" to="#">NETWORK</Link>
                        <Link className="font-headline tracking-[-0.02em] uppercase text-sm text-[#00f4fe] border-b-2 border-[#00f4fe] pb-1" to="#">NODES</Link>
                        <Link className="font-headline tracking-[-0.02em] uppercase text-sm text-[#e4e7fb]/60 hover:text-[#e4e7fb] transition-colors" to="#">VAULT</Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-[#1e2538]/40 transition-all duration-300 rounded-lg">
                        <span className="material-symbols-outlined text-[#a1faff]">notifications_active</span>
                    </button>
                    <button className="p-2 hover:bg-[#1e2538]/40 transition-all duration-300 rounded-lg">
                        <span className="material-symbols-outlined text-[#a1faff]">settings</span>
                    </button>
                    <div className="w-8 h-8 rounded-full border border-primary overflow-hidden">
                        <img alt="Operator Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEUJEVw_sVM-Qf2-nkVXbzssfKf3ROXhNzwTA4ef39HC6Shjvljtxqc92dw0yqY-axC-smidgC45lTKMkGvgKRoIfpR97pwOhleOPN76eMCR7FlGxUYBdw5e-01KPf4rExbGtt6h_DBOgpZTODh_0Kkp75B8TKB4nDyvS_ui-zgiqbJLuAqQ8INqdsOGNFfEs3lL-Y-4ZMQk0Rg4ipvlAnbvgkAQnaepuojD4xNdnhx5Px854QuEkTDY6x_Mpt38jYEJsvhP_Pwajj" />
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex overflow-hidden grid-bg relative">
                <div className="scan-line"></div>
                
                <aside className="fixed left-0 top-0 h-full flex flex-col pt-20 bg-[#0d1321] w-64 border-r border-[#434857]/15 z-40 hidden lg:flex">
                    <div className="px-6 mb-8">
                        <h2 className="text-[#a1faff] font-black font-headline text-lg">ORACLE_OS</h2>
                        <p className="font-headline font-medium text-[10px] tracking-widest text-[#e4e7fb]/40">v4.0.2-STABLE</p>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <Link className="flex items-center gap-4 text-[#e4e7fb]/40 py-3 px-6 hover:bg-[#1e2538]/20 hover:text-[#00f4fe] transition-all font-headline text-xs tracking-widest" to="/">
                            <span className="material-symbols-outlined">grid_view</span> DASHBOARD
                        </Link>
                        <Link className="flex items-center gap-4 bg-[#1e2538]/40 border-l-4 border-[#a1faff] text-[#a1faff] py-3 px-6 font-headline text-xs tracking-widest" to="#">
                            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>radar</span> SCANNER
                        </Link>
                        <Link className="flex items-center gap-4 text-[#e4e7fb]/40 py-3 px-6 hover:bg-[#1e2538]/20 hover:text-[#00f4fe] transition-all font-headline text-xs tracking-widest" to="#">
                            <span className="material-symbols-outlined">terminal</span> LOGS
                        </Link>
                        <Link className="flex items-center gap-4 text-[#e4e7fb]/40 py-3 px-6 hover:bg-[#1e2538]/20 hover:text-[#00f4fe] transition-all font-headline text-xs tracking-widest" to="#">
                            <span className="material-symbols-outlined">sensors</span> SENSORS
                        </Link>
                        <Link className="flex items-center gap-4 text-[#e4e7fb]/40 py-3 px-6 hover:bg-[#1e2538]/20 hover:text-[#00f4fe] transition-all font-headline text-xs tracking-widest" to="#">
                            <span className="material-symbols-outlined">settings_input_component</span> CONFIG
                        </Link>
                    </nav>
                    <div className="mt-auto p-6">
                        <button className="w-full bg-primary py-3 rounded-sm text-on-primary font-headline font-bold text-xs tracking-widest shadow-[0_0_20px_rgba(161,250,255,0.2)] active:scale-95 transition-transform">
                            INITIATE_SCAN
                        </button>
                    </div>
                </aside>

                <div className="flex-1 lg:ml-64 flex flex-col md:flex-row p-6 gap-6 z-10">
                    {/* LEFT SIDE: Browser Preview */}
                    <div className="w-full md:w-[60%] flex flex-col">
                        <div className="flex-1 glass-panel border border-outline-variant/15 rounded-xl flex flex-col shadow-2xl overflow-hidden relative">
                            <div className="h-12 bg-surface-container-high border-b border-outline-variant/15 flex items-center px-4 gap-4">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-error-dim"></div>
                                    <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                                    <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                                </div>
                                <div className="flex-1 bg-surface-container-low h-8 rounded flex items-center px-4 border border-outline-variant/10 overflow-hidden">
                                    <span className="material-symbols-outlined text-xs text-outline mr-2 shrink-0">lock</span>
                                    <span className="text-xs font-mono text-primary/80 typing-cursor truncate">{browserUrl}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="material-symbols-outlined text-outline text-sm">refresh</span>
                                    <span className="material-symbols-outlined text-outline text-sm">more_vert</span>
                                </div>
                            </div>
                            
                            {/* Live Browser Image View */}
                            <div className="flex-1 relative bg-[#090e1b] flex items-center justify-center p-2">
                                {browserImage ? (
                                    <img src={browserImage} alt="Live view" className="max-w-full max-h-full object-contain rounded drop-shadow-lg" />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-primary/40">
                                        <span className="material-symbols-outlined text-6xl animate-pulse">public</span>
                                        <p className="font-headline tracking-widest text-xs uppercase">Awaiting Visual Stream...</p>
                                    </div>
                                )}
                                
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <div className="bg-primary/20 text-primary text-[10px] font-bold font-headline px-2 py-1 border border-primary/30 rounded flex items-center gap-1.5 backdrop-blur-md">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                                        LIVE SCAN MODE
                                    </div>
                                    <div className="bg-secondary/20 text-secondary text-[10px] font-bold font-headline px-2 py-1 border border-secondary/30 rounded flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(159,142,255,0.3)]">
                                        <span className="material-symbols-outlined text-xs" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                                        AI AGENT ACTIVE
                                    </div>
                                </div>
                                
                                {/* Simulated Fake Cursor */}
                                {browserImage && progress < 100 && (
                                    <div className="absolute bottom-1/4 right-1/3 pointer-events-none animate-bounce">
                                        <span className="material-symbols-outlined text-primary text-3xl opacity-80 drop-shadow-[0_0_8px_rgba(161,250,255,0.8)]">near_me</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* RIGHT SIDE: Status & Metrics */}
                    <div className="w-full md:w-[40%] flex flex-col gap-6">
                        <div className="surface-container-high glass-panel p-5 rounded-xl border border-outline-variant/15 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div className="max-w-[70%]">
                                    <p className="text-[10px] font-headline tracking-widest text-outline uppercase mb-1">Target</p>
                                    <h3 className="text-primary font-headline font-bold text-sm lg:text-md glow-cyan truncate">{browserUrl}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-headline tracking-widest text-outline uppercase mb-1">Status</p>
                                    <span className="text-primary-container font-headline font-black text-xs sm:text-sm">{progress >= 100 ? "COMPLETED" : "ANALYZING"}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-headline text-on-surface-variant">
                                    <span>PROGRESS</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full h-1 bg-surface-container-lowest overflow-hidden">
                                    <div className="h-full bg-primary-container shadow-[0_0_8px_#00f4fe] transition-all duration-500 ease-out" style={{width: `${progress}%`}}></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-6">
                                <div className="flex flex-col gap-2">
                                    <div className={`h-1 ${progress > 0 ? 'bg-primary' : 'bg-outline-variant/30'}`}></div>
                                    <span className={`text-[9px] font-headline ${progress > 0 ? 'text-primary' : 'text-outline'}`}>CRAWLING</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className={`h-1 ${progress >= 30 ? 'bg-primary relative overflow-hidden' : 'bg-outline-variant/30'}`}>
                                        {progress >= 30 && progress < 90 && <div className="absolute inset-0 bg-white/40 animate-pulse"></div>}
                                    </div>
                                    <span className={`text-[9px] font-headline ${progress >= 30 ? 'text-primary-container glow-cyan' : 'text-outline'}`}>TESTING</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className={`h-1 ${progress >= 90 ? 'bg-primary' : 'bg-outline-variant/30'}`}></div>
                                    <span className={`text-[9px] font-headline ${progress >= 90 ? 'text-primary' : 'text-outline'}`}>REPORTING</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="surface-container-high p-4 rounded-xl border border-outline-variant/10">
                                <p className="text-[9px] font-headline tracking-widest text-outline uppercase">Broken Links</p>
                                <p className="text-2xl font-headline font-bold text-on-surface">{metrics.broken_links < 10 ? '0'+metrics.broken_links : metrics.broken_links}</p>
                            </div>
                            <div className="surface-container-high p-4 rounded-xl border border-outline-variant/10">
                                <p className="text-[9px] font-headline tracking-widest text-outline uppercase">UI Issues</p>
                                <p className="text-2xl font-headline font-bold text-error glow-cyan">{metrics.ui_issues < 10 ? '0'+metrics.ui_issues : metrics.ui_issues}</p>
                            </div>
                            <div className="surface-container-high p-4 rounded-xl border border-outline-variant/10">
                                <p className="text-[9px] font-headline tracking-widest text-outline uppercase">Form Errors</p>
                                <p className="text-2xl font-headline font-bold text-tertiary">{metrics.form_errors < 10 ? '0'+metrics.form_errors : metrics.form_errors}</p>
                            </div>
                            <div className="surface-container-high p-4 rounded-xl border border-outline-variant/10">
                                <p className="text-[9px] font-headline tracking-widest text-outline uppercase">JS Errors</p>
                                <p className="text-2xl font-headline font-bold text-primary">{metrics.js_errors < 10 ? '0'+metrics.js_errors : metrics.js_errors}</p>
                            </div>
                        </div>
                        
                        <div className="flex-1 surface-container-low border border-outline-variant/15 rounded-xl flex flex-col overflow-hidden shadow-inner max-h-64 md:max-h-full">
                            <div className="h-8 bg-surface-container-high px-4 flex items-center justify-between border-b border-outline-variant/10">
                                <span className="text-[10px] font-headline text-outline tracking-widest">LIVE_ACTIVITY_LOG</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-outline/40"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-outline/40"></div>
                                </div>
                            </div>
                            <div ref={logContainerRef} className="flex-1 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto space-y-1 custom-scrollbar">
                                {logs.map((log, index) => (
                                    <p key={index} className={log.type === 'alert' ? 'text-error font-bold' : 'text-primary/60'}>
                                        <span className="text-outline">[{log.time}]</span> {log.msg}
                                    </p>
                                ))}
                                {progress < 100 && (
                                    <div className="inline-block w-2 h-4 bg-primary-container animate-pulse align-middle"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full blur-sm"></div>
                <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-secondary rounded-full blur-sm"></div>
                <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-primary-container rounded-full blur-sm"></div>
                <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-tertiary rounded-full blur-sm"></div>
            </div>
        </div>
    );
};

export default Scanning;
