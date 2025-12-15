export default function Table({ columns, rows }) {
  return (
    <table className="w-full text-sm">
      <thead className="border-b border-slate-700 text-left text-slate-400">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="py-2 pr-4">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className="border-b border-slate-800 hover:bg-slate-900/70"
          >
            {columns.map((col) => (
              <td key={col.key} className="py-2 pr-4 text-slate-100">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
