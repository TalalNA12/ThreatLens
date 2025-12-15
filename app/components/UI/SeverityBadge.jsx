export default function SeverityBadge({ severity }) {
  const colors = {
    Low: "bg-emerald-500/20 text-emerald-300",
    Medium: "bg-yellow-500/20 text-yellow-300",
    High: "bg-orange-500/20 text-orange-300",
    Critical: "bg-rose-500/20 text-rose-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        colors[severity] || "bg-slate-700 text-slate-200"
      }`}
    >
      {severity}
    </span>
  );
}
