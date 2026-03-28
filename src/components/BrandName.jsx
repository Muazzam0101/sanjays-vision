import React from 'react';

const BrandName = ({ className = '', size = 'text-2xl' }) => {
  return (
    <div className={`font-brand select-none flex items-baseline gap-2 ${className}`}>
      <span className={`${size} font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary drop-shadow-[0_0_15px_rgba(161,250,255,0.3)]`}>
        Sanjay’s Vision
      </span>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
        .font-brand {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default BrandName;
