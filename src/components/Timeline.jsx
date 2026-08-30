export default function Timeline({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.step} className="flex items-start gap-3">
          <div className={`mt-1 h-3 w-3 rounded-full ${item.done ? "bg-emerald-500" : "bg-slate-300"}`} />
          <div className="flex-1">
            <p className="font-medium text-slate-900">{item.step}</p>
            <p className="text-sm text-slate-500">{item.time}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.done ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
            {item.done ? "Done" : "Pending"}
          </span>
        </div>
      ))}
    </div>
  );
}