"use client";
import Link from "next/link";
import { useAsset } from "../context/AssetContext";
import { FaServer, FaGlobe, FaShieldAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AssetsPage() {
  const { assets, loading } = useAsset();
  
  // Local state for the "Fake" loading progress bar visual
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING_UPLINK...");

  // This effect simulates the "Hacker Bar" filling up
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // Stall at 90% until real data arrives
          return prev + Math.random() * 15;
        });
        
        // Cycle through cool status messages based on progress
        if (progress > 30) setStatusText("HANDSHAKE_ESTABLISHED...");
        if (progress > 60) setStatusText("FETCHING_TARGET_INTEL...");
        if (progress > 80) setStatusText("DECRYPTING_DATABASES...");
        
      }, 150);
      return () => clearInterval(interval);
    }
  }, [loading, progress]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* Cyber Logo or Icon */}
        <div className="mb-6 animate-pulse text-cyan-500">
          <FaShieldAlt className="text-6xl" />
        </div>

        {/* The Bar Container */}
        <div className="w-96 h-2 bg-gray-900 border border-gray-800 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          {/* The Filling Bar (Glows Cyan) */}
          <div 
            className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Status Text */}
        <div className="mt-4 font-mono text-sm text-cyan-400 tracking-widest animate-pulse">
          {`> ${statusText}`} <span className="text-cyan-200">{Math.floor(progress)}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-mono text-cyan-400 tracking-tight">
          <span className="text-gray-500 mr-2">//</span>TARGET_ASSETS
        </h1>
        <Link 
          href="/assets/new" 
          className="bg-cyan-900/30 hover:bg-cyan-500 hover:text-black text-cyan-400 border border-cyan-500 font-bold py-2 px-6 rounded transition-all duration-300 flex items-center gap-2 group"
        >
          <span>+ ADD_TARGET</span>
        </Link>
      </div>

      {assets.length === 0 ? (
        <div className="text-center mt-20 p-10 border border-dashed border-gray-800 rounded-lg">
          <p className="text-xl text-gray-400 font-mono mb-2">NO TARGETS DETECTED</p>
          <p className="text-sm text-gray-600">Initiate a new scan to populate the database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <Link key={asset._id} href={`/assets/${asset._id}`}>
              <div className="bg-black/40 border border-gray-800 p-6 rounded-lg hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all cursor-pointer group relative overflow-hidden">
                
                {/* Decorative "Corner" accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gray-800/20 to-transparent -mr-8 -mt-8 rounded-full blur-xl"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 group-hover:border-cyan-500/30 transition-colors">
                    {asset.type === "Server" ? <FaServer className="text-xl text-cyan-400" /> : <FaGlobe className="text-xl text-cyan-400" />}
                  </div>
                  
                  {/* Risk Badge */}
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    asset.riskLevel === 'Critical' ? 'bg-red-900/20 text-red-500 border-red-900' :
                    asset.riskLevel === 'High' ? 'bg-orange-900/20 text-orange-500 border-orange-900' :
                    'bg-emerald-900/20 text-emerald-500 border-emerald-900'
                  }`}>
                    {asset.riskLevel}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-100 mb-1 group-hover:text-cyan-400 transition-colors truncate">{asset.name}</h3>
                <p className="text-gray-500 font-mono text-xs mb-5 truncate">{asset.value}</p>
                
                <div className="flex items-center text-[10px] text-gray-500 font-mono border-t border-gray-800 pt-4 mt-auto">
                   <span className="truncate max-w-[50%]">ISP: {asset.isp || "N/A"}</span>
                   <span className="ml-auto text-gray-400">{asset.location || "Unknown"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}