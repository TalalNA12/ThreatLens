"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Shell from "@/app/components/Layout/Shell";
import { mockAssets, mockFindings } from "@/lib/mockdata";

export default function AssetDetailPage() {
  const params = useParams();
  const id = params?.id;
  
  // Find the asset matching the ID in the URL
  const asset = mockAssets.find((a) => a.id === id);

  // Styling logic: Critical = Red, High = Orange
  const getBadgeStyle = (level) => {
    switch (level) {
      case "Critical":
        return "bg-red-500/10 text-red-400 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
      case "High":
        return "bg-orange-500/10 text-orange-400 border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.2)]"; // Fixed Orange
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/50";
      case "Low":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/50";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  if (!asset) {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400 space-y-4">
          <div className="text-6xl animate-pulse font-mono text-cyan-900">404</div>
          <p className="font-mono uppercase tracking-widest">Asset Signal Lost</p>
          <Link href="/assets" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
            Return to Grid
          </Link>
        </div>
      </Shell>
    );
  }

  const relatedFindings = mockFindings.filter((f) => f.assetId === asset.id);

  return (
    <Shell>
      <div className="space-y-8 mt-4">
        
        {/* Breadcrumb */}
        <div className="mb-2">
          <Link href="/assets" className="text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-2">
            <span>&lt;&lt;</span> Return to Network Grid
          </Link>
        </div>

        {/* --- Asset Identity Card --- */}
        <section className="relative rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-xl p-8 overflow-hidden shadow-2xl">
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${asset.riskLevel === 'Critical' ? 'bg-red-500 animate-ping' : 'bg-cyan-500'}`} />
                <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400">Asset Diagnostic</h2>
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {asset.name}
              </h1>
            </div>
            
            {/* Main Risk Badge */}
            <div className={`px-4 py-2 rounded border text-sm font-bold uppercase tracking-widest ${getBadgeStyle(asset.riskLevel)}`}>
              Risk Level: {asset.riskLevel}
            </div>
          </div>

          {/* Technical Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-800/50">
            <div className="group p-4 rounded bg-slate-900/30 border border-slate-800 hover:border-cyan-500/30 transition-colors">
              <p className="text-xs font-mono uppercase text-cyan-500 mb-1">Asset Type</p>
              <p className="text-lg text-slate-200 font-medium">{asset.type}</p>
            </div>
            <div className="group p-4 rounded bg-slate-900/30 border border-slate-800 hover:border-cyan-500/30 transition-colors">
              <p className="text-xs font-mono uppercase text-cyan-500 mb-1">Target Value / IP</p>
              <p className="text-lg text-slate-200 font-mono tracking-wide">{asset.value}</p>
            </div>
          </div>
        </section>

        {/* --- Linked Findings Table --- */}
        <section className="rounded-xl border border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden min-h-[300px]">
          <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-sm font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <span className="text-red-500"></span> Active Vulnerabilities
            </h2>
            <div className="text-xs font-mono text-slate-500">
              COUNT: {relatedFindings.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/50 text-xs uppercase font-mono text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wider">Detection Title</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Severity</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-right">Detected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {relatedFindings.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-slate-500 font-mono">
                      No anomalies detected on this node.
                    </td>
                  </tr>
                ) : (
                  relatedFindings.map((finding) => (
                    <tr key={finding.id} className="group hover:bg-slate-800/30 transition-all">
                      <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {finding.title}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide ${getBadgeStyle(finding.severity)}`}>
                          {finding.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs text-right">
                        {finding.detectedAt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Shell>
  );
}