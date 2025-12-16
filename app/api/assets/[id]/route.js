import connectDB from "@/lib/db";
import Asset from "@/models/Asset";
import Finding from "@/models/Finding";
import { NextResponse } from "next/server";

// --- 1. GET (Fetch Single Asset) ---
export async function GET(request, { params }) {
  try {
    const resolvedParams = await params; // Next.js 15 requirement
    const id = resolvedParams.id;

    await connectDB();
    const asset = await Asset.findById(id);

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    return NextResponse.json(asset);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- 2. DELETE (Remove Asset + Findings) ---
export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
       return NextResponse.json({ message: "Missing asset ID" }, { status: 400 });
    }

    await connectDB();

    // Cleanup: Delete findings first
    await Finding.deleteMany({ assetId: id });

    // Delete the asset
    const deletedAsset = await Asset.findByIdAndDelete(id);

    if (!deletedAsset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Asset and findings deleted" }, { status: 200 });

  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}