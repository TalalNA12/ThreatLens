"use client";
import { useEffect, useState } from "react";
import Shell from "./components/Layout/Shell";
import CyberEye from "./components/UI/CyberEye"; 
import { useAsset } from "./context/AssetContext"; 
import SeverityChart from "./components/UI/SeverityChart"; 
import { FaFileCsv, FaChartPie } from "react-icons/fa"; 

export default function Home() {
  const { assets } = useAsset();
  const [findings, setFindings] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/findings");
        const data = await res.json();
        setFindings(data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  // --- LOGIC ---
  const totalAssets = assets.length;
  const totalFindings = findings.length;
  
  // 1. Filter Critical Findings (Vulnerabilities Only)
  // We check for "Critical" AND "High" severity findings
  const criticalFindings = findings.filter((f) => ["High", "Critical"].includes(f.severity));
  
  // --- THE FIX: ONLY COUNT FINDINGS, IGNORE ASSETS ---
  const totalCriticalThreats = criticalFindings.length;

  // --- DEBUGGER (Updated) ---
  useEffect(() => {
    if (criticalFindings.length > 0) {
      console.log("🔴 --- DASHBOARD AUDIT --- 🔴");
      console.log("Counting ONLY these vulnerabilities:", criticalFindings.map(f => `${f.title} (${f.severity})`));
      console.log("Total Count:", totalCriticalThreats);
    }
  }, [criticalFindings, totalCriticalThreats]);

  const recentFindings = findings
    .sort((a, b) => new Date(b.detectedAt) - new Date(a.detectedAt))
    .slice(0, 4);

  // --- CSV EXPORT (Professional Version) ---
  const downloadCSV = () => {
    // 1. Define the AI Logic locally for the report
    const getAdvice = (severity) => {
      if (severity === "Critical") return "URGENT: Isolate asset. RCE vector probable.";
      if (severity === "High") return "High Priority: Patch immediately.";
      if (severity === "Medium") return "Advisory: Restrict access via firewall.";
      return "Info: routine monitoring.";
    };

    // 2. Setup Headers (Added "AI_Recommendation")
    const headers = ["Title", "Severity", "Target", "Status", "Date", "AI_Recommendation"];
    
    // 3. Build Rows
    const rows = findings.map(f => [
      `"${f.title}"`,
      f.severity, 
      `"${f.assetId?.name || "Unknown"}"`, 
      f.status, 
      new Date(f.detectedAt).toISOString().split('T')[0], // Standard YYYY-MM-DD (Excel loves this)
      `"${getAdvice(f.severity)}"` // <--- The new AI Column!
    ]);
    
    // 4. Create Content with BOM (\uFEFF) to force Excel to read UTF-8 correctly
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `threatlens_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Shell>
      <div className="animate-eye-open space-y-12 mt-4 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
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
        
        {/* Stats Grid */}
        <section className="grid gap-8 md:grid-cols-3 relative z-10">
          
          {/* Card 1: Assets */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-8 backdrop-blur-md transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-500 mb-2">Monitored Assets</p>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">{totalAssets}</p>
                <span className="text-xs text-slate-500 font-mono">NODES</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] transition-all duration-1000" style={{ width: `${Math.min(totalAssets * 10, 100)}%` }}></div>
              </div>
            </div>
          </div>

          {/* Card 2: Anomalies */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-8 backdrop-blur-md transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 mb-2">Total Anomalies</p>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">{totalFindings}</p>
                <span className="text-xs text-slate-500 font-mono">DETECTED</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 shadow-[0_0_10px_#7c3aed] transition-all duration-1000" style={{ width: `${Math.min(totalFindings * 5, 100)}%` }}></div>
              </div>
            </div>
          </div>

          {/* Card 3: Critical Threats */}
          <div className="group relative overflow-hidden rounded-2xl border border-red-900/30 bg-red-950/10 p-8 backdrop-blur-md transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <p className="text-xs font-mono font-semibold uppercase tracking-widest text-red-400 mb-2">Critical Threats</p>
                {totalCriticalThreats > 0 && (<span className="animate-pulse h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span>)}
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-bold text-red-100 tracking-tight group-hover:text-red-300 transition-colors">{totalCriticalThreats}</p>
                <span className="text-xs text-red-800/80 font-mono">ACTING</span>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-red-500 shadow-[0_0_15px_#ef4444] transition-all duration-1000" style={{ width: `${Math.min(totalCriticalThreats * 20, 100)}%` }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CHART + INTEL GRID --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Chart */}
          <div className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-md flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <FaChartPie className="text-cyan-500" /> Threat Distribution
              </h3>
            </div>
            <SeverityChart findings={findings} />
          </div>

          {/* RIGHT: Table */}
          <div className="lg:col-span-2 relative rounded-2xl border border-slate-800/60 bg-slate-900/30 backdrop-blur-xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
              <h2 className="text-lg font-mono font-semibold text-cyan-50 flex items-center gap-2">Incoming Intel Stream</h2>
              <button onClick={downloadCSV} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 border border-slate-700 transition-all hover:border-cyan-500/50">
                <FaFileCsv /> EXPORT_LOGS
              </button>
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
                  {recentFindings.length === 0 ? (
                    <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500 font-mono">// NO ACTIVE THREATS DETECTED</td></tr>
                  ) : (
                    recentFindings.map((finding) => (
                      <tr key={finding._id} className="group hover:bg-cyan-500/5 transition-colors duration-200">
                        <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">{finding.title}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded border text-xs font-medium uppercase tracking-wide shadow-[0_0_10px_inset] ${
                              finding.severity === "Critical" ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-red-500/20" : 
                              finding.severity === "High" ? "bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-orange-500/20" : 
                              finding.severity === "Medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-yellow-500/20" : 
                              "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/20"
                          }`}>
                            {finding.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-mono text-xs text-right group-hover:text-slate-300">
                          {new Date(finding.detectedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Shell>
  );
}