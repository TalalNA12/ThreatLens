import connectDB from "@/lib/db";
import Asset from "@/models/Asset";
import Finding from "@/models/Finding";
import { enrichAsset, scanAsset } from "@/lib/osint";
import { NextResponse } from "next/server";

// GET: Fetch all assets
export async function GET() {
  try {
    await connectDB();
    const assets = await Asset.find({}).sort({ lastScanned: -1 });
    return NextResponse.json(assets);
  } catch (err) {
    console.log("Error in GET /api/assets:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Add Asset + Run OSINT Scans
export async function POST(request) {
  try {
    await connectDB();
    const { name, value, type } = await request.json();

    // 1. Validation
    if (!name || !value) {
      return NextResponse.json({ error: "Name and Value are required" }, { status: 400 });
    }

    // 2. Enrichment (IPinfo + AbuseIPDB)
    const enriched = await enrichAsset(value);

    // 3. Create Asset
    const newAsset = new Asset({
      name,
      type: type || "Domain",
      value: enriched.value,
      location: enriched.location,
      isp: enriched.isp,
      riskLevel: enriched.riskLevel,
    });
    await newAsset.save();

    // 4. Vulnerability Scan (Shodan)
    if (newAsset.value) {
      const findings = await scanAsset(newAsset.value);
      
      if (findings.length > 0) {
        // Link findings to this new Asset ID
        const findingsWithId = findings.map(f => ({ ...f, assetId: newAsset._id }));
        await Finding.insertMany(findingsWithId);

        // Update Asset Risk if Critical threats found
        const hasCritical = findings.some(f => ["Critical", "High"].includes(f.severity));
        if (hasCritical) {
          newAsset.riskLevel = "Critical";
          await newAsset.save();
        }
      }
    }

    return NextResponse.json(newAsset, { status: 201 });

  } catch (err) {
    console.log("Error in POST /api/assets:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}