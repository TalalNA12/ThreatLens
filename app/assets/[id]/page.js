"use client";
import { useAsset } from "../../context/AssetContext";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";
import { useState } from "react";
import { FaServer, FaGlobe, FaMapMarkerAlt, FaNetworkWired, FaBug, FaArrowLeft, FaTrash } from "react-icons/fa";

export default function AssetDetailsPage() {
  const { id } = useParams();
  const router = useRouter(); // To redirect after delete
  const { assets, loading } = useAsset();
  const [isDeleting, setIsDeleting] = useState(false);

  // Find the specific asset
  const asset = assets.find((a) => a._id === id);

  // --- DELETE FUNCTION ---
  const handleDelete = async () => {
    if (!window.confirm("WARNING: This will delete the asset and ALL associated findings. Are you sure?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/assets/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Force a hard refresh to clear the Context state and go back to grid
        window.location.href = "/assets"; 
      } else {
        alert("Failed to delete asset.");
        setIsDeleting(false);
      }
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-cyan-400 font-mono animate-pulse">ACCESSING_SECURE_ARCHIVE...</div>;
  if (!asset) return <div className="p-10 text-center text-red-500 font-mono">ERROR: TARGET_NOT_FOUND</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/assets" className="flex items-center text-gray-500 hover:text-cyan-400 transition-colors font-mono text-sm">
          <FaArrowLeft className="mr-2" /> RETURN_TO_GRID
        </Link>
        
        {/* DELETE BUTTON */}
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/50 text-red-500 border border-red-900 rounded transition-all font-mono text-xs uppercase tracking-wider"
        >
          {isDeleting ? "DELETING..." : <><FaTrash /> DELETE_TARGET</>}
        </button>
      </div>

      {/* Header Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{asset.name}</h1>
              <span className={`px-3 py-1 rounded text-xs font-bold uppercase border ${
                asset.riskLevel === 'Critical' ? 'bg-red-900/30 text-red-500 border-red-800' :
                asset.riskLevel === 'High' ? 'bg-orange-900/30 text-orange-500 border-orange-800' :
                asset.riskLevel === 'Medium' ? 'bg-yellow-900/30 text-yellow-500 border-yellow-800' :
                'bg-emerald-900/30 text-emerald-500 border-emerald-800'
              }`}>
                {asset.riskLevel} THREAT LEVEL
              </span>
            </div>
            <p className="text-gray-400 font-mono text-lg">{asset.value}</p>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
             <div className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Last Scan</div>
             <div className="text-cyan-400 font-mono">{new Date(asset.lastScanned || Date.now()).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* OSINT Intel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Location */}
        <div className="bg-black/50 border border-gray-800 p-5 rounded hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center mb-3 text-gray-400">
            <FaMapMarkerAlt className="mr-2 text-cyan-500" /> <span className="text-xs font-bold uppercase">Geo-Location</span>
          </div>
          <div className="text-xl text-gray-100 font-mono">{asset.location || "Unknown"}</div>
        </div>

        {/* Card 2: ISP */}
        <div className="bg-black/50 border border-gray-800 p-5 rounded hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center mb-3 text-gray-400">
            <FaNetworkWired className="mr-2 text-cyan-500" /> <span className="text-xs font-bold uppercase">Service Provider</span>
          </div>
          <div className="text-xl text-gray-100 font-mono">{asset.isp || "Unknown"}</div>
        </div>

        {/* Card 3: Type */}
        <div className="bg-black/50 border border-gray-800 p-5 rounded hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center mb-3 text-gray-400">
            <FaServer className="mr-2 text-cyan-500" /> <span className="text-xs font-bold uppercase">Asset Type</span>
          </div>
          <div className="text-xl text-gray-100 font-mono">{asset.type}</div>
        </div>
      </div>

      {/* Linked Findings Section */}
      <div className="border-t border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
          <FaBug className="mr-2 text-red-500" /> Associated Vulnerabilities
        </h2>
        
        <div className="bg-gray-900/50 rounded p-6 text-center border border-dashed border-gray-700">
          <p className="text-gray-400 mb-4">View detailed vulnerability reports for this asset in the Findings console.</p>
          <Link href="/findings" className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline">
            Open Findings Console &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}