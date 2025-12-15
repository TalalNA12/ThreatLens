import connectDB from "@/lib/db";
import Finding from "@/models/Finding";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    // .populate() pulls the Asset Name so we know which IP has the vulnerability
    const findings = await Finding.find({}).populate("assetId", "name value").sort({ detectedAt: -1 });
    return NextResponse.json(findings);
  } catch (err) {
    console.log("Error in GET /api/findings:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}