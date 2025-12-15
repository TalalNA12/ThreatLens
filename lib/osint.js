import axios from 'axios';

// Helper: Check if string is an IP address
const isIP = (value) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(value);

/**
 * 1. ENRICHMENT (IPinfo + AbuseIPDB)
 * Returns location, ISP, and calculated Risk Level.
 */
export async function enrichAsset(value) {
  let data = {
    location: "Unknown",
    isp: "Unknown",
    riskLevel: "Low",
    value: value // Default to input value
  };

  try {
    // A. If it's a Domain, resolve it to IP first (using IPinfo)
    // Note: IPinfo automatically resolves domains passed to it
    const ipResponse = await axios.get(`https://ipinfo.io/${value}/json?token=${process.env.IPINFO_TOKEN}`);
    
    // Update data with real info
    if (ipResponse.data.ip) data.value = ipResponse.data.ip; // The resolved IP
    if (ipResponse.data.country) data.location = `${ipResponse.data.city}, ${ipResponse.data.country}`;
    if (ipResponse.data.org) data.isp = ipResponse.data.org;

    // B. Check Reputation (AbuseIPDB) - Only works with IPs
    if (isIP(data.value)) {
      const abuseResponse = await axios.get('https://api.abuseipdb.com/api/v2/check', {
        params: { ipAddress: data.value, maxAgeInDays: 90 },
        headers: { 'Key': process.env.ABUSEIPDB_KEY, 'Accept': 'application/json' }
      });

      const score = abuseResponse.data.data.abuseConfidenceScore;
      
      // Auto-calculate Risk based on Score
      if (score > 80) data.riskLevel = "Critical";
      else if (score > 50) data.riskLevel = "High";
      else if (score > 20) data.riskLevel = "Medium";
      else data.riskLevel = "Low";
    }

  } catch (error) {
    console.error("OSINT Enrichment Error:", error.message);
    // We return whatever partial data we managed to get
  }

  return data;
}

/**
 * 2. SCANNING (Shodan Passive Scan)
 * Returns a list of "Findings" (Open Ports, CVEs) to save to DB.
 */
export async function scanAsset(ip) {
  const findings = [];

  if (!process.env.SHODAN_KEY) return findings;

  try {
    // Passive Lookup (Does not consume scan credits, usually free)
    const url = `https://api.shodan.io/shodan/host/${ip}?key=${process.env.SHODAN_KEY}`;
    const response = await axios.get(url);
    const hostData = response.data;

    // 1. Create a Finding for every Open Port
    if (hostData.ports && hostData.ports.length > 0) {
      hostData.ports.forEach(port => {
        findings.push({
          title: `Open Port Detected: ${port}`,
          severity: port === 22 || port === 3389 ? "High" : "Low", // Flag SSH/RDP as High
          status: "Open",
          description: `Port ${port} is exposed to the public internet. Service: ${hostData.data.find(d => d.port === port)?.product || 'Unknown'}`,
          detectedAt: new Date()
        });
      });
    }

    // 2. Create a Finding for Vulnerabilities (CVEs) if Shodan reports them
    if (hostData.vulns && hostData.vulns.length > 0) {
      hostData.vulns.forEach(cve => {
        findings.push({
          title: `Vulnerability: ${cve}`,
          severity: "Critical",
          status: "Open",
          description: "Known Common Vulnerability Exposure (CVE) detected on this host.",
          detectedAt: new Date()
        });
      });
    }

  } catch (error) {
    console.error("Shodan Scan Error:", error.response?.status === 404 ? "IP not found in Shodan" : error.message);
  }

  return findings;
}