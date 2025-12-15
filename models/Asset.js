import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide an asset name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  type: {
    type: String,
    required: true,
    enum: ["Domain", "IP", "Cloud Bucket", "Server"], // Restricts to these values
    default: "Domain",
  },
  value: {
    type: String,
    required: [true, "Please provide a value (IP or Domain)"],
  },
  riskLevel: {
    type: String,
    enum: ["Critical", "High", "Medium", "Low"],
    default: "Low",
  },
  // These new fields are for the automated data we will fetch later
  location: { type: String, default: "Unknown" }, // From IPinfo
  isp: { type: String, default: "Unknown" },      // From IPinfo
  lastScanned: { type: Date, default: Date.now },
});

// This line prevents "OverwriteModelError" in Next.js
export default mongoose.models.Asset || mongoose.model("Asset", AssetSchema);