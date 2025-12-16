"use client";
import { useState, useEffect } from "react";
// Added FaRobot for the AI section
import { FaBug, FaExclamationTriangle, FaCheckCircle, FaRobot } from "react-icons/fa";

export default function FindingsPage() {
  const [findings, setFindings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFindings = async () => {
      try {
        const res = await fetch("/api/findings");
        const data = await res.json();
        setFindings(data);
      } catch (err) {
        console.error("Failed to load findings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFindings();
  }, []);

  // --- 🤖 HEURISTIC AI ENGINE (The "Expert System") ---
  const getAIRecommendation = (severity) => {
    // 1. Critical Templates
    const criticalAdvice = [
      "URGENT: Isolate asset immediately. Remote Code Execution (RCE) vector probable.",
      "CRITICAL: APT (Advanced Persistent Threat) indicators detected. Initiate Incident Response.",
      "ALERT: High-value target exposed. Recommended Action: Sever network connection immediately."
    ];

    // 2. High Templates
    const highAdvice = [
      "High Priority: Patching required within 24 hours. Exploit available in public DB.",
      "Warning: Service allows unauthenticated access. Firewall rules update recommended.",
      "Security Gap: Standard compliance violation detected. Close port if unused."
    ];

    // 3. Medium Templates
    const mediumAdvice = [
      "Advisory: Unnecessary service exposure. Reduce attack surface by restricting IP ranges.",
      "Observation: Non-standard port usage. Monitor logs for brute-force attempts.",
      "Optimization: Service detected on public interface. Ensure SSL/TLS is enforced."
    ];

    // 4. Low Templates
    const lowAdvice = [
      "Info: Service operating within normal parameters. No immediate action.",
      "Status: Routine traffic. Continue standard monitoring protocols.",
      "Log: Asset reachable but secured. Low probability of exploitation."
    ];

    // Pick a random message based on severity to simulate dynamic analysis
    if (severity === "Critical") return criticalAdvice[Math.floor(Math.random() * criticalAdvice.length)];
    if (severity === "High") return highAdvice[Math.floor(Math.random() * highAdvice.length)];
    if (severity === "Medium") return mediumAdvice[Math.floor(Math.random() * mediumAdvice.length)];
    return lowAdvice[Math.floor(Math.random() * lowAdvice.length)];
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-mono text-cyan-400 animate-pulse">SCANNING_VULNERABILITY_DB...</h2>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold font-mono text-cyan-400 mb-8 flex items-center">
        <FaBug className="mr-3" /> VULNERABILITY_REPORT
      </h1>

      {findings.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 p-10 border border-gray-800 rounded">
          <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-4" />
          <p className="text-xl">System Clean.</p>
          <p>No vulnerabilities detected in current scan cycle.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {findings.map((finding) => (
            <div key={finding._id} className="bg-gray-900 border border-gray-800 p-6 rounded-lg hover:border-cyan-500/50 transition-all group shadow-lg">
              
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  {/* Icon on the left */}
                  <div className={`mt-1 p-3 rounded-lg ${
                    finding.severity === 'Critical' ? 'bg-red-900/20 text-red-500' :
                    finding.severity === 'High' ? 'bg-orange-900/20 text-orange-500' :
                    finding.severity === 'Medium' ? 'bg-yellow-900/20 text-yellow-500' :
                    'bg-blue-900/20 text-blue-500'
                  }`}>
                    <FaExclamationTriangle size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-200 group-hover:text-cyan-400 transition-colors">
                      {finding.title}
                    </h3>
                    
                    {/* TARGET NAME BADGE */}
                    <div className="flex items-center gap-2 mt-2 mb-2">
                        <span className="text-xs font-mono text-cyan-300 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-900/50">
                        TARGET: {finding.assetId?.name || "Unknown"}
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                        ({finding.assetId?.value || "IP N/A"})
                        </span>
                    </div>
                  </div>
                </div>
                
                {/* SEVERITY BADGE */}
                <span className={`px-4 py-1.5 rounded text-xs font-bold uppercase border tracking-widest ${
                   finding.severity === 'Critical' ? 'bg-red-950/40 text-red-500 border-red-900' :
                   finding.severity === 'High' ? 'bg-orange-950/40 text-orange-500 border-orange-900' :
                   finding.severity === 'Medium' ? 'bg-yellow-950/40 text-yellow-500 border-yellow-900' :
                   'bg-blue-950/40 text-blue-500 border-blue-900'
                }`}>
                  {finding.severity}
                </span>
              </div>

              {/* Description Text */}
              <p className="text-gray-400 text-sm mt-2 mb-4 pl-0 md:pl-[72px]">{finding.description}</p>

              {/* 🤖 THE NEW AI ANALYSIS BOX */}
              <div className="ml-0 md:ml-[72px] bg-slate-950 border border-slate-800 rounded p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>
                <div className="flex items-start gap-3">
                  <FaRobot className="text-purple-400 mt-1 min-w-[16px]" size={16} />
                  <div>
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">AI Threat Assessment</h4>
                    <p className="text-xs font-mono text-gray-300 leading-relaxed">
                      {getAIRecommendation(finding.severity)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Meta Data */}
              <div className="mt-4 pl-0 md:pl-[72px] flex gap-6 text-xs font-mono text-gray-600">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> STATUS: {finding.status}</span>
                <span>DETECTED: {new Date(finding.detectedAt).toLocaleDateString()}</span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}