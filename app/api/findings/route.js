import connectDB from "@/lib/db";
import Finding from "@/models/Finding";
import Asset from "@/models/Asset"; // Important: Must import Asset model
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    
    // We use .populate('assetId') to swap the ID for the actual Asset Object
    // "name value" means: Only give me the name and value (IP/URL) fields
    const findings = await Finding.find({})
      .populate("assetId", "name value") 
      .sort({ detectedAt: -1 });

    return NextResponse.json(findings);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}