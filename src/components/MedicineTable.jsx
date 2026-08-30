export default function MedicineTable({ medicines }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Medicine</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Stock</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Qty</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {medicines.map((m) => (
            <tr key={m.item} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-sm font-medium text-slate-900">{m.item}</td>
              <td className="px-4 py-3 text-sm">{m.stock}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{m.qty}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  m.stock === "Critical" ? "bg-red-50 text-red-700" :
                  m.stock === "Low" ? "bg-amber-50 text-amber-700" :
                  "bg-emerald-50 text-emerald-700"
                }`}>
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}