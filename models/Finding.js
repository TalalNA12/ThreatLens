import mongoose from "mongoose";

const FindingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a finding title"],
  },
  severity: {
    type: String,
    required: true,
    enum: ["Critical", "High", "Medium", "Low"],
    default: "Low",
  },
  status: {
    type: String,
    enum: ["Open", "Fixed", "False Positive"],
    default: "Open",
  },
  // This links the Finding to a specific Asset (Relational Data)
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true,
  },
  description: { type: String },
  detectedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Finding || mongoose.model("Finding", FindingSchema);