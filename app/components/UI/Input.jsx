export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-slate-200">{label}</label>
      )}
      <input
        {...props}
        className="w-full rounded-md border border-slate-700 bg-slate-950 
                   px-3 py-2 text-sm text-slate-100
                   focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
      />
    </div>
  );
}
