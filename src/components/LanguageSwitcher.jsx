export default function LanguageSwitcher() {
  return (
    <div className="flex flex-wrap gap-2">
      {["English", "தமிழ்", "हिंदी", "తెలుగు"].map((lang) => (
        <button
          key={lang}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
        >
          {lang}
        </button>
      ))}
    </div>
  );
}