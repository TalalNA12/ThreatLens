// app/components/UI/CyberEye.js
import React from "react";

const CyberEye = () => {
  return (
    <div className="relative flex items-center justify-center py-6">
      {/* Main Eye Container */}
      <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full bg-slate-950 overflow-hidden border-[3px] border-slate-800 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        
        {/* Background Grid inside the eye */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent_2px,_#06b6d4_2px),_linear-gradient(90deg,_#06b6d4_1px,_transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Outer Rotating Ring (Targeting Reticle) */}
        <div className="absolute inset-2 rounded-full border border-dashed border-cyan-900/60 animate-[spin_10s_linear_infinite]" />

        {/* THE PUPIL (The part that moves) */}
        <div className="absolute inset-0 flex items-center justify-center animate-eye-scan">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-cyan-950/50 border border-cyan-400/80 shadow-[0_0_20px_var(--neon-cyan)]">
            {/* Inner Glint */}
            <div className="h-4 w-4 rounded-full bg-cyan-100 shadow-[0_0_10px_#fff]" />
          </div>
        </div>

        {/* Scanning Laser Beam (Horizontal Line) */}
        <div className="absolute top-0 h-full w-[2px] bg-cyan-500/50 blur-[2px] animate-scan-sweep" />
        
        {/* Glass Reflection Overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default CyberEye;