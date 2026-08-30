
import { Bell, Globe, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900">SwasthyaSetu AI</h1>
          <p className="text-sm text-slate-500">Accessible public healthcare coordination platform</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-white p-2 shadow-sm ring-1 ring-slate-200">
            <Globe className="h-5 w-5 text-slate-700" />
          </button>
          <button className="rounded-full bg-white p-2 shadow-sm ring-1 ring-slate-200">
            <Bell className="h-5 w-5 text-slate-700" />
          </button>
          <button className="rounded-full bg-brand-600 p-2 text-white shadow-soft lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}