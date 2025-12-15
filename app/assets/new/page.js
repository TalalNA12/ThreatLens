"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // To redirect after save
import Shell from '../../components/Layout/Shell';
import { useAssets } from '../../context/AssetContext'; // Import Hook

export default function NewAssetPage() {
  const router = useRouter();
  const { addAsset } = useAssets(); // Get the function

  // Local state for the form inputs
  const [formData, setFormData] = useState({
    name: '',
    type: 'Domain',
    value: '',
    riskLevel: 'Low'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the new object
    const newAsset = {
      id: Date.now().toString(), // Generate a unique ID
      ...formData
    };

    // Save to Global Context
    addAsset(newAsset);

    // Redirect back to the list
    router.push('/assets');
  };

  return (
    <Shell>
      <div className="max-w-2xl mx-auto mt-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/assets" className="text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-2">
            <span>&lt;&lt;</span> Return to Grid
          </Link>
        </div>

        <div className="relative rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
           
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Configure New Asset
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            Register a new external node for automated monitoring.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Asset Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-cyan-500">Asset Designation</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Primary Web Gateway"
                className="w-full bg-slate-900/50 border border-slate-700 rounded p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
              />
            </div>

            {/* Type & Risk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-cyan-500">Node Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded p-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-all text-sm appearance-none"
                >
                  <option>Domain</option>
                  <option>IP Address</option>
                  <option>Cloud Bucket</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-cyan-500">Initial Risk</label>
                 <select 
                  value={formData.riskLevel}
                  onChange={(e) => setFormData({...formData, riskLevel: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded p-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-all text-sm appearance-none"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

             {/* Value */}
             <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-cyan-500">Target Value</label>
              <input 
                required
                type="text" 
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                placeholder="e.g. api.threatlens.lab or 10.0.5.21"
                className="w-full bg-slate-900/50 border border-slate-700 rounded p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm"
              />
            </div>

            <button 
              type="submit" 
              className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Initiate Monitoring Protocol
            </button>
          </form>
        </div>
      </div>
    </Shell>
  );
}