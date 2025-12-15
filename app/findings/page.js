"use client";

import { useState } from "react";
import Shell from "@/app/components/Layout/Shell";

// Initial mock findings
const initialFindings = [
  {
    id: 1,
    title: "SQL Injection",
    category: "Web",
    severity: "Critical",
    date: "2025-12-01",
  },
  {
    id: 2,
    title: "Weak Password Policy",
    category: "Auth",
    severity: "High",
    date: "2025-11-25",
  },
  {
    id: 3,
    title: "Open S3 Bucket",
    category: "Cloud",
    severity: "Medium",
    date: "2025-11-20",
  },
];

export default function FindingsPage() {
  const [findings, setFindings] = useState(initialFindings);

  // Local state for the form inputs to handle the "Cyber" UI
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    severity: "Low",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const newFinding = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      severity: formData.severity,
      date: new Date().toISOString().split("T")[0],
    };

    // Add new finding to the TOP of the list
    setFindings((prev) => [newFinding, ...prev]);
    
    // Reset Form
    setFormData({ title: "", category: "", severity: "Low" });
  };

  return (
    <Shell>
      <div className="space-y-10 mt-4">
        
        {/* --- HEADER --- */}
        <div className="border-b border-white/5 pb-4">
           <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
              THREAT <span className="text-red-500 text-glow">FINDINGS</span>
            </h1>
            <p className="text-slate-400 font-mono text-sm tracking-widest uppercase mt-2">
              / Anomalies Detected: <span className="text-red-500">{findings.length}</span>
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: Input Console (The Form) --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-slate-800 bg-slate-950/80 backdrop-blur-md p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <h2 className="text-sm font-mono uppercase tracking-widest text-slate-300">Log Manual Threat</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                   <label className="block text-xs text-slate-500 font-mono mb-1 uppercase">Vulnerability Title</label>
                   <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-black/40 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-red-500 focus:outline-none transition-colors" 
                      placeholder="e.g. SQL Injection" 
                   />
                </div>
                
                {/* Category Input */}
                 <div>
                   <label className="block text-xs text-slate-500 font-mono mb-1 uppercase">Category</label>
                   <input 
                      type="text" 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-black/40 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-red-500 focus:outline-none transition-colors" 
                      placeholder="e.g. Network, Auth..." 
                   />
                </div>

                {/* Severity Select */}
                 <div>
                   <label className="block text-xs text-slate-500 font-mono mb-1 uppercase">Severity</label>
                   <select 
                      value={formData.severity}
                      onChange={(e) => setFormData({...formData, severity: e.target.value})}
                      className="w-full bg-black/40 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-red-500 focus:outline-none transition-colors appearance-none"
                   >
                     <option>Low</option>
                     <option>Medium</option>
                     <option>High</option>
                     <option>Critical</option>
                   </select>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full mt-2 bg-red-900/20 border border-red-500/50 text-red-400 py-2 rounded font-mono text-xs uppercase hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all"
                >
                  &gt;&gt; Submit Report
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT COLUMN: The Data Stream (The Table) --- */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 backdrop-blur-md overflow-hidden min-h-[500px]">
              <div className="px-6 py-4 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs font-mono uppercase text-slate-500">Live Intel Feed</span>
                <div className="flex gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                   <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                   <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                   <tbody className="divide-y divide-slate-800/50">
                    {findings.length === 0 ? (
                        <tr>
                            <td className="p-8 text-center text-slate-500 font-mono text-sm">
                                No active threats detected. System secure.
                            </td>
                        </tr>
                    ) : (
                        findings.map((finding) => (
                        <tr key={finding.id} className="group hover:bg-slate-800/30 transition-all">
                            <td className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${
                                finding.severity === 'Critical' ? 'border-red-500/50 text-red-400 bg-red-950/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                                finding.severity === 'High' ? 'border-orange-500/50 text-orange-400 bg-orange-950/30' :
                                finding.severity === 'Medium' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-950/30' :
                                'border-emerald-500/50 text-emerald-400 bg-emerald-950/30'
                                }`}>
                                {finding.severity}
                                </span>
                                <span className="font-mono text-xs text-slate-500">{finding.date}</span>
                            </div>
                            <h3 className="text-slate-200 font-medium group-hover:text-white transition-colors text-lg">
                                {finding.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-slate-500 font-mono uppercase">Category:</span>
                                <span className="text-xs text-slate-400">{finding.category || 'General'}</span>
                            </div>
                            </td>
                        </tr>
                        ))
                    )}
                   </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Shell>
  );
}