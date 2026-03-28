import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Mock signup and redirect to login
        alert('REGISTRATION SUCCESSFUL: Access Code Granted.');
        navigate('/login');
    };

    return (
        <div className="bg-[#f9f9f9] font-['Work_Sans'] text-[#1a1c1c] m-0 p-0 overflow-x-hidden min-h-screen">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
                .neobrutal-shadow {
                    box-shadow: 4px 4px 0px 0px #000000;
                }
                .neobrutal-shadow-hover:hover {
                    box-shadow: 2px 2px 0px 0px #000000;
                    transform: translate(2px, 2px);
                }
                .neobrutal-shadow-large {
                    box-shadow: 8px 8px 0px 0px #000000;
                }
                input:focus {
                    outline: none !important;
                    box-shadow: 6px 6px 0px 0px #000000 !important;
                }
                .font-headline { font-family: 'Space Grotesk', sans-serif; }
            `}</style>

            <main className="min-h-screen flex flex-col md:flex-row">
                {/* Left Section: Branding & Graphics */}
                <section className="w-full md:w-1/2 bg-[#ffde03] border-r-0 md:border-r-4 border-black relative overflow-hidden flex items-center justify-center p-8 min-h-[409px] md:min-h-screen">
                    {/* Decorative Elements */}
                    <div className="absolute top-10 left-10 w-24 h-24 bg-[#b81d27] border-4 border-black rotate-12 z-0"></div>
                    <div className="absolute bottom-20 right-10 w-32 h-12 bg-white border-4 border-black -rotate-6 z-0"></div>
                    <div className="absolute top-1/4 right-1/4 text-black z-0 opacity-20">
                        <span className="material-symbols-outlined text-[12rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            visibility
                        </span>
                    </div>
                    <div className="absolute top-2/3 left-1/4 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[80px] border-b-white z-0 rotate-45"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center md:text-left">
                        <div className="inline-block bg-[#1a1c1c] text-[#ffde03] px-6 py-2 border-4 border-black mb-6 neobrutal-shadow transform -rotate-2">
                            <span className="font-headline font-black text-xl tracking-widest uppercase">The Manifesto</span>
                        </div>
                        <h1 className="font-headline font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-[#1a1c1c] uppercase tracking-tighter">
                            SANJAY'S<br/>VISION
                        </h1>
                        <p className="mt-8 font-headline font-bold text-2xl md:text-3xl max-w-md bg-white border-4 border-black p-4 neobrutal-shadow-large">
                            REJECT THE ORDINARY. <br/>
                            EMBRACE THE IMPACT.
                        </p>
                        <div className="mt-12 flex gap-4">
                            <span className="material-symbols-outlined text-6xl text-[#b81d27] animate-bounce">south_east</span>
                            <span className="material-symbols-outlined text-6xl text-[#1a1c1c]">arrow_right_alt</span>
                        </div>
                    </div>
                </section>

                {/* Right Section: Signup Form */}
                <section className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16 lg:p-24 min-h-screen">
                    <div className="w-full max-w-md">
                        <header className="mb-12">
                            <h2 className="font-headline font-black text-5xl uppercase tracking-tight text-[#1a1c1c] mb-2">Create Account</h2>
                            <div className="h-2 w-24 bg-[#ffde03] border-2 border-black"></div>
                        </header>
                        <form className="space-y-8" onSubmit={handleSignup}>
                            {/* Full Name */}
                            <div className="flex flex-col gap-2">
                                <label className="font-headline font-black text-sm uppercase tracking-wider text-[#1a1c1c]" htmlFor="name">Your Name</label>
                                <input 
                                    className="bg-white border-4 border-black p-4 font-bold text-lg placeholder:text-gray-400 transition-all duration-75 neobrutal-shadow" 
                                    id="name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="E.G. JOHN DOE" required type="text"
                                />
                            </div>
                            {/* Email Address */}
                            <div className="flex flex-col gap-2">
                                <label className="font-headline font-black text-sm uppercase tracking-wider text-[#1a1c1c]" htmlFor="email">Email Address</label>
                                <input 
                                    className="bg-white border-4 border-black p-4 font-bold text-lg placeholder:text-gray-400 transition-all duration-75 neobrutal-shadow" 
                                    id="email" 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="EMAIL@EXAMPLE.COM" required
                                />
                            </div>
                            {/* Password Group */}
                            <div className="grid grid-cols-1 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="font-headline font-black text-sm uppercase tracking-wider text-[#1a1c1c]" htmlFor="password">Password</label>
                                    <input 
                                        className="bg-white border-4 border-black p-4 font-bold text-lg placeholder:text-gray-400 transition-all duration-75 neobrutal-shadow" 
                                        id="password" 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="********" required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-headline font-black text-sm uppercase tracking-wider text-[#1a1c1c]" htmlFor="confirm_password">Confirm Password</label>
                                    <input 
                                        className="bg-white border-4 border-black p-4 font-bold text-lg placeholder:text-gray-400 transition-all duration-75 neobrutal-shadow" 
                                        id="confirm_password" 
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="********" required
                                    />
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="pt-4">
                                <button className="w-full bg-[#1a1c1c] text-[#ffde03] font-headline font-black text-2xl py-5 border-4 border-black neobrutal-shadow neobrutal-shadow-hover transition-all duration-100 uppercase tracking-widest" type="submit">
                                    Join The Vision
                                </button>
                            </div>
                        </form>
                        {/* Social/Alt Actions */}
                        <div className="mt-10 pt-10 border-t-4 border-black flex flex-col items-center gap-6">
                            <p className="font-headline font-bold text-[#1a1c1c] uppercase text-center">
                                Already have an account? 
                                <Link className="text-[#b81d27] underline decoration-4 underline-offset-4 hover:text-black transition-colors" to="/login">Login Here</Link>
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 w-full">
                                <button className="flex-1 min-w-[140px] bg-white border-4 border-black p-3 font-bold flex items-center justify-center gap-2 neobrutal-shadow neobrutal-shadow-hover">
                                    <span className="material-symbols-outlined">brand_family</span> GOOGLE
                                </button>
                                <button className="flex-1 min-w-[140px] bg-white border-4 border-black p-3 font-bold flex items-center justify-center gap-2 neobrutal-shadow neobrutal-shadow-hover">
                                    <span className="material-symbols-outlined">code</span> GITHUB
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Global Footer */}
            <footer className="w-full py-8 px-10 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1A1C1C] border-t-4 border-black">
                <div className="flex items-center gap-4">
                    <span className="text-[#FFDE03] font-black font-headline text-xl tracking-tighter">SANJAY'S VISION</span>
                    <span className="font-headline font-semibold text-sm uppercase tracking-widest text-white opacity-50 hidden md:inline">|</span>
                    <span className="font-headline font-semibold text-sm uppercase tracking-widest text-[#FFDE03]">© 2024 SANJAY'S VISION. NO PERMISSION REQUIRED.</span>
                </div>
                <nav className="flex gap-8">
                    <a className="font-headline font-semibold text-sm uppercase tracking-widest text-white hover:text-[#FFDE03] underline" href="#">Privacy</a>
                    <a className="font-headline font-semibold text-sm uppercase tracking-widest text-white hover:text-[#FFDE03] underline" href="#">Terms</a>
                    <a className="font-headline font-semibold text-sm uppercase tracking-widest text-white hover:text-[#FFDE03] underline" href="#">Contact</a>
                </nav>
            </footer>
        </div>
    );
};

export default Signup;
