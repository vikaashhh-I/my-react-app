export default function DashboardCard({ title, subtitle, children, accent = "bg-brand-500" }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className={`h-3 w-3 rounded-full ${accent}`} />
      </div>
      {children}
    </section>
  );
}