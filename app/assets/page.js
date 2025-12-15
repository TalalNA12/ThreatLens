"use client"; // Needs to be client now to read Context

import Link from 'next/link';
import Shell from '../components/Layout/Shell';
import { useAssets } from '../context/AssetContext'; // <--- IMPORT HOOK

export default function AssetsPage() {
  const { assets } = useAssets(); // <--- GET DATA FROM CONTEXT

  return (
    <Shell>
      <div className="space-y-8 mt-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
              NETWORK <span className="text-cyan-400 text-glow">ASSETS</span>
            </h1>
            <p className="text-slate-400 font-mono text-sm tracking-widest uppercase mt-2">
              / Active Nodes: <span className="text-cyan-400">{assets.length}</span>
            </p>
          </div>
          
          {/* Add Button */}
          <Link 
            href="/assets/new" 
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-cyan-950/30 overflow-hidden rounded border border-cyan-500/50 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <div className="absolute inset-0 w-1 bg-cyan-500 transition-all group-hover:w-full group-hover:opacity-10" />
            <span className="font-mono text-cyan-400 text-xs uppercase tracking-widest group-hover:text-cyan-300 relative z-10">
              + Initialize New Node
            </span>
          </Link>
        </div>

        {/* ... The rest of your Table code remains exactly the same ... 
            Just ensure you iterate over `assets.map(...)` not `mockAssets.map` 
        */}
        
        {/* The Table Implementation */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden relative">
           {/* ... decorative corners ... */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-950/80 text-xs uppercase font-mono text-slate-500 tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium border-b border-slate-800">Asset Name</th>
                  <th className="px-6 py-4 font-medium border-b border-slate-800">Type</th>
                  <th className="px-6 py-4 font-medium border-b border-slate-800">Value / IP</th>
                  <th className="px-6 py-4 font-medium border-b border-slate-800 text-right">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {assets.map((asset) => (
                  <tr key={asset.id} className="group hover:bg-cyan-500/5 transition-colors duration-200">
                    <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-cyan-300 font-mono">
                      <Link href={`/assets/${asset.id}`} className="block w-full h-full hover:underline decoration-cyan-500/50 underline-offset-4">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="inline-block px-2 py-1 rounded bg-slate-800/50 border border-slate-700 text-xs">
                        {asset.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs tracking-wide">
                      {asset.value}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase tracking-wide border ${
                          asset.riskLevel === "Critical"
                            ? "bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                            : asset.riskLevel === "High"
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)]"
                            : asset.riskLevel === "Medium"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        }`}
                      >
                        {asset.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
}