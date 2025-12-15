export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center px-5 py-2.5 rounded-md 
                 bg-cyan-600 text-slate-50 text-sm font-semibold
                 shadow-md shadow-cyan-500/30
                 hover:bg-cyan-500 hover:-translate-y-0.5 hover:shadow-lg
                 transition"
    >
      {children}
    </button>
  );
}
