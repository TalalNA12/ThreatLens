"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAsset } from "../../context/AssetContext";
import { FaShieldAlt, FaSearch, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function NewAssetPage() {
  const router = useRouter();
  const { addAsset } = useAsset(); // Hook into our new Context
  
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    type: "Domain",
  });
  
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsScanning(true);

    try {
      // 1. Call the Async function we wrote in the Context
      // This sends the data to the API and waits for the OSINT scan
      await addAsset(formData);
      
      // 2. Redirect only after success
      router.push("/assets");
      
    } catch (err) {
      console.error(err);
      setError("Scan Failed. Please check the domain/IP and try again.");
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link href="/assets" className="flex items-center text-gray-500 hover:text-cyan-400 mb-6 transition-colors font-mono text-sm">
        <FaArrowLeft className="mr-2" /> RETURN_TO_GRID
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Header Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

        <h1 className="text-2xl font-bold text-gray-100 mb-6 flex items-center">
          <FaShieldAlt className="mr-3 text-cyan-500" /> 
          INITIATE TARGET SCAN
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 text-red-400 rounded text-sm font-mono">
            ⚠ ERROR: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Asset Name */}
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">Target Name</label>
            <input
              type="text"
              placeholder="e.g. Netflix Primary"
              className="w-full bg-black border border-gray-700 rounded p-3 text-gray-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isScanning}
            />
          </div>

          {/* Asset Value */}
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">Target Value (Domain or IP)</label>
            <input
              type="text"
              placeholder="e.g. netflix.com"
              className="w-full bg-black border border-gray-700 rounded p-3 text-gray-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              required
              disabled={isScanning}
            />
          </div>

          {/* Asset Type */}
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">Asset Type</label>
            <select
              className="w-full bg-black border border-gray-700 rounded p-3 text-gray-100 focus:border-cyan-500 focus:outline-none font-mono"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              disabled={isScanning}
            >
              <option value="Domain">Domain</option>
              <option value="IP">IP Address</option>
              <option value="Server">Server</option>
              <option value="Cloud Bucket">Cloud Bucket</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isScanning}
            className={`w-full py-4 rounded font-bold tracking-wider uppercase transition-all flex items-center justify-center ${
              isScanning
                ? "bg-gray-800 text-cyan-400 cursor-not-allowed animate-pulse border border-cyan-900"
                : "bg-cyan-600 hover:bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            }`}
          >
            {isScanning ? (
              <>
                <FaSearch className="animate-spin mr-3" />
                SCANNING TARGET NETWORK...
              </>
            ) : (
              "EXECUTE SCAN"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}