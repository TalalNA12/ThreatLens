import axios from "axios";
import dns from "dns";
import util from "util";

// 1. Setup DNS Lookup (The "Phone Book")
const lookup = util.promisify(dns.lookup);
const isIP = (str) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(str);

export async function enrichAsset(targetInput) {
  let ip = targetInput;

  // 2. If it is a Domain, find the IP first
  if (!isIP(targetInput)) {
    try {
      const { address } = await lookup(targetInput);
      ip = address;
    } catch (err) {
      console.error("DNS Resolution Failed:", err.message);
      return { 
        value: targetInput, 
        location: "Unresolved Domain", 
        isp: "Unknown", 
        riskLevel: "Low" 
      };
    }
  }

  // 3. Now scan the IP with IPinfo & AbuseIPDB
  try {
    const ipInfoRes = await axios.get(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
    const abuseRes = await axios.get("https://api.abuseipdb.com/api/v2/check", {
      params: { ipAddress: ip },
      headers: { Key: process.env.ABUSEIPDB_KEY, Accept: "application/json" },
    });

    const data = ipInfoRes.data;
    const riskScore = abuseRes.data.data.abuseConfidenceScore;

    let riskLevel = "Low";
    if (riskScore > 20) riskLevel = "Medium";
    if (riskScore > 50) riskLevel = "High";
    if (riskScore > 85) riskLevel = "Critical";

    return {
      value: targetInput, // Keep the name (e.g., scanme.nmap.org)
      location: `${data.city}, ${data.country}`,
      isp: data.org,
      riskLevel: riskLevel,
    };
  } catch (err) {
    console.error("OSINT API Error:", err.message);
    return { value: targetInput, location: "Unknown", isp: "Unknown", riskLevel: "Low" };
  }
}

export async function scanAsset(targetInput) {
  try {
    let ip = targetInput;
    // Resolve Domain again for Shodan
    if (!isIP(targetInput)) {
      const { address } = await lookup(targetInput);
      ip = address;
    }

    const res = await axios.get(`https://api.shodan.io/shodan/host/${ip}?key=${process.env.SHODAN_KEY}`);
    
    return (res.data.data || []).map((service) => {
      // --- NEW SEVERITY LOGIC FOR TESTING ---
      let severity = "Low";
      
      // Standard risky ports
      if (["80", "443", "8080"].includes(String(service.port))) severity = "Medium";
      if (["23", "3389", "21"].includes(String(service.port))) severity = "High";
      
      // Force Port 22 (SSH) to be CRITICAL so you can verify your UI
      if (String(service.port) === "22") severity = "Critical"; 
      // --------------------------------------

      return {
        title: `Open Port Detected: ${service.port}`,
        description: `Port ${service.port} is exposed. Service: ${service.product || "Unknown"}`,
        severity: severity,
        status: "Open",
        detectedAt: new Date(),
      };
    });
  } catch (err) {
    console.error("Shodan Error:", err.message);
    return [];
  }
}