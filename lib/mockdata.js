export const mockAssets = [
  {
    id: "a1",
    name: "Web Gateway",
    type: "Domain",
    value: "gateway.threatlens.lab",
    riskLevel: "High",
  },
  {
    id: "a2",
    name: "API Server",
    type: "IP",
    value: "10.0.5.21",
    riskLevel: "Medium",
  },
  {
    id: "a3",
    name: "Mail Server",
    type: "Domain",
    value: "mail.threatlens.lab",
    riskLevel: "Critical",
  },
];

export const mockFindings = [
  {
    id: "f1",
    assetId: "a1",
    title: "SSH Port 22 exposed to internet",
    severity: "High",
    detectedAt: "2025-02-01",
  },
  {
    id: "f2",
    assetId: "a2",
    title: "Outdated OpenSSL version",
    severity: "Medium",
    detectedAt: "2025-02-03",
  },
  {
    id: "f3",
    assetId: "a3",
    title: "Credential leak detected in public breach dump",
    severity: "Critical",
    detectedAt: "2025-02-05",
  },
  {
    id: "f4",
    assetId: "a1",
    title: "Directory listing enabled on web root",
    severity: "Low",
    detectedAt: "2025-02-06",
  },
];
