export default function Card({ children }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-6 shadow-md">
      {children}
    </div>
  );
}
