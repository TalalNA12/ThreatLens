// app/page.js
import Shell from "./components/Layout/Shell";
import CyberEye from "./components/UI/CyberEye"; // Import the new component
import { mockAssets, mockFindings } from "../lib/mockdata";

export default function Home() {
  // --- LOGIC (UNCHANGED) ---
  const totalAssets = mockAssets.length;
  const totalFindings = mockFindings.length;
  const highSeverityFindings = mockFindings.filter((f) =>
    ["High", "Critical"].includes(f.severity)
  ).length;

  const recentFindings = mockFindings.slice(0, 4);

  // --- UI (UPDATED) ---
  return (
    <Shell>
      {/* The "Eye Opening" Animation Container */}
      <div className="animate-eye-open space-y-12 mt-4 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* PLACE THE CYBER EYE HERE */}
          <CyberEye />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            System Online
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 drop-shadow-2xl">
            THREAT<span className="text-cyan-400 text-glow">LENS</span>
          </h1>
          <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">
            Global Asset Overwatch Active
          </p>
        </div>
        
        {/* Stats Grid - "Neural Nodes" */}
        <section className="grid gap-8 md:grid-cols-3 relative z-10">
          
          {/* Card 1: Assets (Blue Theme) */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-8 backdrop-blur-md transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-500 mb-2">
                Monitored Assets
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                  {totalAssets}
                </p>
                <span className="text-xs text-slate-500 font-mono">NODES</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-3/4 shadow-[0_0_10px_#06b6d4]"></div>
              </div>
            </div>
          </div>

          {/* Card 2: Total Findings (Purple Theme) */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-8 backdrop-blur-md transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 mb-2">
                Total Anomalies
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
                  {totalFindings}
                </p>
                <span className="text-xs text-slate-500 font-mono">DETECTED</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-1/2 shadow-[0_0_10px_#7c3aed]"></div>
              </div>
            </div>
          </div>

          {/* Card 3: High Severity (Red/Alert Theme) */}
          <div className="group relative overflow-hidden rounded-2xl border border-red-900/30 bg-red-950/10 p-8 backdrop-blur-md transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <p className="text-xs font-mono font-semibold uppercase tracking-widest text-red-400 mb-2">
                  Critical Threats
                </p>
                <span className="animate-pulse h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold text-red-100 tracking-tight group-hover:text-red-300 transition-colors">
                  {highSeverityFindings}
                </p>
                <span className="text-xs text-red-800/80 font-mono">ACTING</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-full shadow-[0_0_15px_#ef4444]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Findings Table */}
        <section className="relative rounded-2xl border border-slate-800/60 bg-slate-900/30 backdrop-blur-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
            <h2 className="text-lg font-mono font-semibold text-cyan-50 flex items-center gap-2">
              <span className="text-cyan-500"></span> Incoming Intel Stream
            </h2>
            <div className="flex gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-600"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-600"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-600"></div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase font-mono bg-slate-950/30">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wider">Detection Title</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Threat Level</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {recentFindings.map((finding) => (
                  <tr 
                    key={finding.id} 
                    className="group hover:bg-cyan-500/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {finding.title}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded border text-xs font-medium uppercase tracking-wide shadow-[0_0_10px_inset] ${
                          finding.severity === "Critical"
                            ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-red-500/20"
                            : finding.severity === "High"
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-orange-500/20"
                            : finding.severity === "Medium"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-yellow-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/20"
                        }`}
                      >
                        {finding.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs text-right group-hover:text-slate-300">
                      {finding.detectedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Shell>
  );
}