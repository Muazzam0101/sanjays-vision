import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded credentials: admin / 123456
        if ((email === 'admin' || email === 'admin@vision.com') && password === '123456') {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/landing');
        } else {
            alert('IDENTIFICATION FAILED: ACCESS DENIED.');
        }
    };

    return (
        <div className="bg-[#f9f9f9] font-['Work_Sans'] text-[#1a1c1c] m-0 p-0 overflow-x-hidden min-h-screen">
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
                .neo-shadow-hover:hover {
                    box-shadow: 2px 2px 0px 0px #000000;
                    transform: translate(2px, 2px);
                }
                .active-scale:active {
                    transform: scale(0.95);
                }
                .font-headline { font-family: 'Space Grotesk', sans-serif; }
            `}</style>

            <main className="min-h-screen flex flex-col md:flex-row">
                {/* Left Section: Branding & Identity */}
                <section className="w-full md:w-1/2 bg-[#ffde03] flex flex-col justify-center items-start p-10 md:p-20 relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-[#1a1c1c]">
                    {/* Playful Geometric Elements */}
                    <div className="absolute top-10 right-10 w-32 h-32 border-4 border-[#1a1c1c] rotate-12 bg-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-[#1a1c1c]">arrow_outward</span>
                    </div>
                    <div className="absolute bottom-20 left-10 w-24 h-24 bg-[#b81d27] border-4 border-[#1a1c1c] -rotate-12"></div>
                    <div className="absolute top-1/2 right-0 w-16 h-40 bg-[#1a1c1c] opacity-10"></div>
                    <div className="absolute bottom-0 right-20 w-48 h-4 bg-[#b81d27] border-x-4 border-t-4 border-[#1a1c1c]"></div>
                    
                    <div className="z-10">
                        <div className="mb-6 inline-block bg-[#1a1c1c] text-[#ffde03] px-4 py-2 font-headline font-black text-xl neo-shadow">
                            EST. 2024
                        </div>
                        <h1 className="font-headline font-black text-6xl md:text-8xl leading-none tracking-tighter text-[#1a1c1c] mb-8">
                            SANJAY'S<br/>VISION
                        </h1>
                        <p className="font-headline font-bold text-xl md:text-2xl max-w-md text-[#1a1c1c]/80 uppercase tracking-tight">
                            THE ARCHIVE OF RAW CREATIVITY. NO PERMISSION REQUIRED. ACCESS THE MANIFESTO.
                        </p>
                    </div>

                    {/* Visual Asset */}
                    <div className="mt-12 w-full max-w-xs neo-shadow-lg border-4 border-[#1a1c1c] bg-[#e2e2e2] aspect-square overflow-hidden relative">
                        <img alt="Brutalist poster art" className="w-full h-full object-cover grayscale contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0-FkfrL_4gF6Ai32Febw4_UdiQOq-ZBcdHowMOPIt4aQOmCY7V2b5nZq3eXXoD1LtsiPy_IvDSqzXUAhX_9PJELnEzCZWBPqE_gw9P-J_2z39PTRfsNbOd7FUaO00eVjHEilU-QgYfW_WUgXJy_1tUUSKKFyiNYlLf3NIeqktFKe3V2Miwj0jGWN3QSzc6OSLawJjcdVDXX1j98ofMupbtRJYL0BcEi6C5xaakkt1z8TQ6W617M3OAkql89-47B08G67p0fOGcZVc"/>
                        <div className="absolute inset-0 bg-[#ffde03] mix-blend-multiply opacity-40"></div>
                    </div>
                </section>

                {/* Right Section: Login Form */}
                <section className="w-full md:w-1/2 bg-[#f9f9f9] flex flex-col justify-center items-center p-8 md:p-24 relative">
                    <div className="w-full max-w-md">
                        <div className="mb-12">
                            <h2 className="font-headline font-black text-5xl text-[#1a1c1c] uppercase mb-2">IDENTIFY</h2>
                            <div className="h-2 w-24 bg-[#ffde03] border-2 border-[#1a1c1c] mb-8"></div>
                        </div>
                        <form className="space-y-8" onSubmit={handleLogin}>
                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <label className="font-headline font-extrabold text-sm uppercase tracking-widest text-[#1a1c1c]" htmlFor="email">Electronic Mail</label>
                                <input 
                                    className="w-full bg-[#f9f9f9] border-4 border-[#1a1c1c] p-4 text-lg font-bold placeholder:text-[#1a1c1c]/30 focus:outline-none focus:neo-shadow-lg transition-all duration-75" 
                                    id="email" 
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="USER@IDENTITY.COM"
                                    required
                                />
                            </div>
                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-end">
                                    <label className="font-headline font-extrabold text-sm uppercase tracking-widest text-[#1a1c1c]" htmlFor="password">Access Code</label>
                                    <a className="text-xs font-bold underline hover:text-[#b81d27] transition-colors uppercase" href="#">Lost Access?</a>
                                </div>
                                <input 
                                    className="w-full bg-[#f9f9f9] border-4 border-[#1a1c1c] p-4 text-lg font-bold placeholder:text-[#1a1c1c]/30 focus:outline-none focus:neo-shadow-lg transition-all duration-75" 
                                    id="password" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {/* Login Button */}
                            <div className="pt-4">
                                <button className="w-full bg-[#1a1c1c] text-[#ffde03] font-headline font-black text-2xl py-5 px-8 neo-shadow neo-shadow-hover active-scale transition-all duration-75 uppercase flex items-center justify-between group" type="submit">
                                    <span>ENTER NOW</span>
                                    <span className="material-symbols-outlined font-black text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                            {/* Alternate Auth */}
                            <div className="relative py-4 flex items-center">
                                <div className="flex-grow border-t-4 border-[#1a1c1c]"></div>
                                <span className="flex-shrink mx-4 font-black text-xs uppercase tracking-tighter">OR USE NETWORK</span>
                                <div className="flex-grow border-t-4 border-[#1a1c1c]"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="bg-[#f9f9f9] border-4 border-[#1a1c1c] py-3 px-4 font-bold text-sm neo-shadow neo-shadow-hover active-scale flex items-center justify-center gap-2 transition-all duration-75" type="button">
                                    <span className="material-symbols-outlined text-lg">public</span> GOOGLE
                                </button>
                                <button className="bg-[#f9f9f9] border-4 border-[#1a1c1c] py-3 px-4 font-bold text-sm neo-shadow neo-shadow-hover active-scale flex items-center justify-center gap-2 transition-all duration-75" type="button">
                                    <span className="material-symbols-outlined text-lg">terminal</span> GITHUB
                                </button>
                            </div>
                        </form>
                        <div className="mt-16 text-center">
                            <p className="font-bold uppercase tracking-tight text-[#1a1c1c]">
                                NEW TO THE VISION? 
                                <Link className="ml-2 inline-block bg-[#ffde03] px-2 border-2 border-[#1a1c1c] hover:bg-[#1a1c1c] hover:text-[#ffde03] transition-colors duration-100" to="/signup">CREATE ACCOUNT</Link>
                            </p>
                        </div>
                    </div>
                    {/* Info text at the bottom */}
                    <div className="absolute bottom-8 left-0 w-full px-8 md:px-24 flex justify-between items-center opacity-30 text-[10px] font-black uppercase tracking-[0.2em]">
                        <span>S.V. CORE-01</span>
                        <span>SYSTEM STATUS: OPERATIONAL</span>
                        <span>REF: 992-X-LOGIN</span>
                    </div>
                </section>
            </main>

            {/* Global Footer */}
            <footer className="w-full py-8 px-10 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1A1C1C] border-t-4 border-black font-headline font-semibold text-sm uppercase tracking-widest text-[#FFDE03]">
                <div className="font-black text-[#FFDE03]">SANJAY'S VISION</div>
                <div className="flex gap-8 text-white">
                    <a className="hover:text-[#FFDE03] underline transition-colors duration-100" href="#">Privacy</a>
                    <a className="hover:text-[#FFDE03] underline transition-colors duration-100" href="#">Terms</a>
                    <a className="hover:text-[#FFDE03] underline transition-colors duration-100" href="#">Contact</a>
                </div>
                <div className="text-[#FFDE03]">© 2024 SANJAY'S VISION. NO PERMISSION REQUIRED.</div>
            </footer>
        </div>
    );
};

export default Login;
