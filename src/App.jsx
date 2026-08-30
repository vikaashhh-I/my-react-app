import { useState } from "react";
import { translations, languages } from "./assets/translation";
import {
  Heart,
  Calendar,
  Pill,
  FileText,
  Activity,
  User,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  PhoneCall,
  Lock,
  Globe,
  Award,
  Upload,
  X
} from "lucide-react";

function Info({ label, value, detail }) {
  return (
    <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100">
      <span className="text-xs text-gray-500">{label}</span>
      <p className="font-bold text-sm mt-1">{value}</p>
      {detail && <p className="text-xs text-gray-600 mt-2 leading-relaxed">{detail}</p>}
    </div>
  );
}

export default function App() {
  const [selectedLang, setSelectedLang] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientIdInput, setPatientIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [errorMsg, setErrorMsg] = useState("");

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newCheckupTitle, setNewCheckupTitle] = useState("");
  const [newCheckupCategory, setNewCheckupCategory] = useState("Cardiology Checkup");
  const newCheckupDoctor = "Dr. Rajesh Kulkarni (MD, DM)";

  const t = translations[selectedLang || "en"];
  const currentPatientID = patientIdInput.trim() || "PRAAN-1001";

  // Checkup and Certificate Data
  const [checkupRecords, setCheckupRecords] = useState([
    {
      id: "CERT-01",
      type: "certificate",
      title: "Official Medical Fitness Certificate",
      category: "General Medical Assessment",
      doctor: "Dr. Rajesh Kulkarni (MD, DM Cardiology)",
      date: "Aug 29, 2026",
      verified: true,
      status: "Fit for Duty",
      summary: "Patient underwent full cardiovascular and systemic evaluation. Vital parameters are stable.",
    },
    {
      id: "CHK-02",
      type: "checkup",
      title: "Echocardiogram (2D Echo) & ECG Analysis",
      category: "Cardiology Investigation",
      doctor: "Dr. Rajesh Kulkarni (MD, DM)",
      date: "Aug 28, 2026",
      verified: true,
      status: "Normal Ejection Fraction (64%)",
      summary: "Normal left ventricular systolic function. No regional wall motion abnormalities detected.",
    },
    {
      id: "CHK-03",
      type: "checkup",
      title: "Digital Chest Radiograph (X-Ray PA View)",
      category: "Radiology Department",
      doctor: "Dr. Sandeep Patel (Radiologist)",
      date: "Aug 25, 2026",
      verified: true,
      status: "Clear Lung Fields",
      summary: "Bronchovascular markings normal. Both costophrenic angles are clear. Cardiothoracic ratio normal.",
    }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!patientIdInput.trim() || !passwordInput.trim()) {
      setErrorMsg("Please enter both Patient ID and Password.");
      return;
    }
    setErrorMsg("");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedLang(null);
    setPatientIdInput("");
    setPasswordInput("");
  };

  const handleDoctorUpload = (e) => {
    e.preventDefault();
    if (!newCheckupTitle.trim()) return;

    const newRecord = {
      id: `CHK-0${checkupRecords.length + 1}`,
      type: "checkup",
      title: newCheckupTitle,
      category: newCheckupCategory,
      doctor: newCheckupDoctor,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      verified: true,
      status: "Doctor Verified",
      summary: "Newly uploaded patient checkup documentation recorded by the attending doctor.",
    };

    setCheckupRecords([newRecord, ...checkupRecords]);
    setNewCheckupTitle("");
    setIsUploadModalOpen(false);
  };

  // -------------------------------------------------------------
  // STEP 1: LANGUAGE SELECTION SCREEN
  // -------------------------------------------------------------
  if (!selectedLang) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-pink-200/50 border border-pink-100 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-pink-300/50 mb-4 text-white">
            <Heart className="w-9 h-9 fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide mb-1 font-sans">
            PRAAN PATIENT PORTAL
          </h1>
          <p className="text-pink-600 font-medium text-xs mb-8 flex items-center justify-center gap-1">
            <Globe className="w-4 h-4" /> Choose Language / भाषा निवडा / भाषा चुनें / மொழியைத் தேர்வுசெய்க
          </p>

          <div className="grid grid-cols-1 gap-3 mb-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className="flex items-center justify-between p-4 rounded-2xl border-2 border-pink-100 hover:border-pink-500 hover:bg-pink-50/70 transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="font-bold text-gray-800 group-hover:text-pink-600 text-lg">
                      {lang.native}
                    </div>
                    <div className="text-xs text-gray-500">{lang.label}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-pink-300 group-hover:text-pink-600 transition-colors" />
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-400">
            Secure Healthcare Access • 256-bit Encrypted
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STEP 2: PATIENT LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl shadow-pink-200/60 border border-pink-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setSelectedLang(null)}
              className="text-xs font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full flex items-center gap-1 transition"
            >
              <Globe className="w-3.5 h-3.5" />
              {languages.find((l) => l.code === selectedLang)?.native} (Change)
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-2xl mx-auto flex items-center justify-center shadow-md shadow-pink-300 mb-3 text-white">
              <Heart className="w-8 h-8 fill-white" />
            </div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              PRAAN PATIENT PORTAL
            </h1>
            <p className="text-xs text-pink-600 font-medium mt-1">{t.welcomeBack}</p>
            <p className="text-xs text-gray-500 mt-1">{t.loginSubtitle}</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 text-xs bg-rose-50 text-rose-600 border border-rose-200 rounded-xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t.patientId}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={patientIdInput}
                  onChange={(e) => setPatientIdInput(e.target.value)}
                  placeholder={t.patientIdPlaceholder}
                  className="w-full pl-10 pr-4 py-3 bg-pink-50/40 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition font-medium"
                />
                <User className="w-4 h-4 text-pink-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t.password}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full pl-10 pr-4 py-3 bg-pink-50/40 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                />
                <Lock className="w-4 h-4 text-pink-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded text-pink-600 focus:ring-pink-500" defaultChecked />
                {t.rememberMe}
              </label>
              <a href="#forgot" className="text-pink-600 font-semibold hover:underline">
                {t.forgotPassword}
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-pink-300/60 transition duration-200 text-sm"
            >
              {t.signIn}
            </button>

          </form>

          <div className="mt-6 pt-4 border-t border-pink-100 text-center">
            <p className="text-xs text-gray-500">{t.needHelp}</p>
            <p className="text-xs font-bold text-rose-600 flex items-center justify-center gap-1.5 mt-1">
              <PhoneCall className="w-3.5 h-3.5" /> {t.emergencyHelpline}
            </p>
          </div>
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // STEP 3: MAIN PORTAL DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FFF5F7] text-gray-800 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-pink-100 flex flex-col justify-between shadow-sm">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-pink-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-xl flex items-center justify-center shadow-md shadow-pink-200 text-white">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-gray-900 tracking-tight">
                PRAAN PATIENT PORTAL
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full">
                ID: {currentPatientID}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {[
              { id: "dashboard", label: t.dashboard, icon: Activity },
              { id: "certificate", label: t.medicalCertificate, icon: Award },
              { id: "checkups", label: t.checkupResults, icon: FileText },
              { id: "appointments", label: t.appointments, icon: Calendar },
              { id: "prescriptions", label: t.prescriptions, icon: Pill },
              { id: "profile", label: t.profile, icon: User }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-300"
                      : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-pink-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-pink-100 space-y-3">
          <div className="flex items-center justify-between px-3 py-2 bg-pink-50/70 rounded-xl">
            <span className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
              <Globe className="w-3.5 h-3.5 text-pink-500" /> Lang:
            </span>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="text-xs bg-transparent font-bold text-pink-700 outline-none cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" /> {t.logout}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 bg-pink-50/50 border border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <Search className="w-4 h-4 text-pink-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.uploadNewRecord}</span>
            </button>

            <button className="relative p-2 text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-xl transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-pink-100">
              <div className="w-8 h-8 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-600 font-bold text-xs">
                {currentPatientID.slice(0, 3)}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-extrabold text-gray-800">{currentPatientID}</div>
                <div className="text-[10px] text-pink-600 font-semibold">Active Patient</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className={`p-6 md:p-8 space-y-6 ${activeTab === "dashboard" ? "" : "hidden"}`}>
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-pink-200 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-8 translate-y-8">
              <Heart className="w-64 h-64 fill-white" />
            </div>
            <div className="relative z-10 max-w-xl">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider">
                {t.portalTitle}
              </span>
              <h1 className="text-2xl md:text-3xl font-black mt-2">
                {t.hello}, Patient #{currentPatientID} 👋
              </h1>
              <p className="text-pink-100 text-xs md:text-sm mt-1 leading-relaxed">
                Unique UHID: <span className="font-bold">{currentPatientID}</span> • Status: Active • Primary Physician: Dr. Rajesh Kulkarni (Cardiologist)
              </p>

            </div>
          </div>

          {/* Health Summary */}
          <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">{t.vitals}</h2>
                <p className="text-sm text-gray-500 mt-1">Latest doctor-recorded health measurements</p>
              </div>
              <span className="w-fit text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">{t.normal}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                [t.bloodPressure, "118 / 78 mmHg", `Normal range: below 120 / 80 mmHg • ${t.normal}`],
                [t.heartRate, "72 bpm", `Resting range: 60–100 bpm • ${t.stable}`],
                [t.bloodSugar, "95 mg/dL", `Fasting range: 70–99 mg/dL • ${t.normal}`],
                [t.oxygenSat, "99%", `Expected range: 95–100% • ${t.normal}`]
              ].map(([label, value, detail]) => (
                <div key={label} className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
                  <p className="text-xs font-bold text-gray-600">{label}</p>
                  <p className="text-xl font-black text-gray-900 mt-2">{value}</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">{detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-pink-100">Last recorded: Aug 29, 2026 • 08:30 AM</p>
          </div>

        </div>

        {activeTab !== "dashboard" && (
          <div className="p-6 md:p-8">
            <section className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm">
              <h1 className="text-xl font-extrabold text-gray-900">
                {[
                  ["certificate", t.medicalCertificate],
                  ["checkups", t.checkupResults],
                  ["appointments", t.appointments],
                  ["prescriptions", t.prescriptions],
                  ["profile", t.profile]
                ].find(([id]) => id === activeTab)?.[1]}
              </h1>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab === "certificate" && <div className="md:col-span-2 max-w-3xl mx-auto w-full bg-[#fffdf5] border-2 border-dashed border-pink-300 rounded-lg p-5 md:p-8 shadow-sm space-y-4">
                  <div className="text-center border-b border-pink-100 pb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-pink-600">{t.certificateSlip.clinic}</p>
                    <h2 className="text-lg font-black text-gray-900 mt-1">{t.certificateSlip.title}</h2>
                    <p className="text-xs text-gray-500">{t.certificateSlip.number} {checkupRecords[0].id}</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{t.certificateSlip.statement}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Info label={t.certificateSlip.patientId} value={currentPatientID} />
                    <Info label={t.certificateSlip.issueDate} value={checkupRecords[0].date} />
                    <Info label={t.fitnessStatus} value={checkupRecords[0].status} />
                    <Info label={t.certificateSlip.validity} value={t.certificateSlip.validPeriod} />
                  </div>
                  <Info label={t.certificateSlip.clinicalBasis} value={checkupRecords[0].summary} detail={`${t.certificateSlip.physician}: ${checkupRecords[0].doctor}. ${t.certificateSlip.verified}.`} />
                </div>}
                {activeTab === "checkups" && checkupRecords.map((record) => <Info key={record.id} label={`${record.id} • ${record.category}`} value={record.title} detail={`${record.status}. ${record.summary} Recorded ${record.date} by ${record.doctor}.`} />)}
                {activeTab === "appointments" && <>
                  <Info label="Upcoming consultation" value="Sep 05, 2026 • 10:30 AM" detail="Cardiology consultation with Dr. Rajesh Kulkarni" />
                  <Info label="Appointment status" value={t.confirmed} detail="Please arrive 15 minutes early and bring your current medication list." />
                  <Info label="Clinic details" value="PRAAN Multi-Speciality Clinic" detail="Cardiology Department • Consultation room 204" />
                </>}
                {activeTab === "prescriptions" && <div className="md:col-span-2 max-w-3xl mx-auto w-full bg-[#fffdf5] border-2 border-dashed border-pink-300 rounded-lg p-5 md:p-8 shadow-sm">
                  <div className="text-center border-b-2 border-dashed border-pink-200 pb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-pink-600">{t.prescriptionSlip.clinic}</p>
                    <h2 className="text-2xl font-black text-gray-900 mt-1">{t.prescriptionSlip.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{t.certificateSlip.patientId}: <strong>{currentPatientID}</strong> • {t.prescriptionSlip.date}: Aug 29, 2026</p>
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="flex gap-3 p-4 bg-white rounded-lg border border-pink-100">
                      <span className="flex-none w-8 h-8 rounded-full bg-pink-500 text-white font-black flex items-center justify-center">1</span>
                      <div><p className="text-lg font-black text-gray-900">Amlodipine 5 mg</p><p className="text-base font-bold text-pink-700">{t.prescriptionSlip.afterBreakfast}</p><p className="text-sm text-gray-600 mt-1">{t.prescriptionSlip.continue30Days} • {t.prescriptionSlip.bloodPressure}</p></div>
                    </div>
                    <div className="flex gap-3 p-4 bg-white rounded-lg border border-pink-100">
                      <span className="flex-none w-8 h-8 rounded-full bg-pink-500 text-white font-black flex items-center justify-center">2</span>
                      <div><p className="text-lg font-black text-gray-900">Atorvastatin 10 mg</p><p className="text-base font-bold text-pink-700">{t.prescriptionSlip.atNight}</p><p className="text-sm text-gray-600 mt-1">{t.prescriptionSlip.continue30Days} • {t.prescriptionSlip.cholesterol}</p></div>
                    </div>
                  </div>
                  <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                    <p className="font-black text-gray-900">{t.prescriptionSlip.important}</p>
                    <p className="mt-1 text-gray-700">{t.prescriptionSlip.warning}</p>
                  </div>
                  <div className="mt-5 pt-4 border-t-2 border-pink-200 text-sm">
                    <p className="font-bold text-gray-900">{t.prescriptionSlip.prescribedBy}: Dr. Rajesh Kulkarni</p>
                    <p className="text-gray-600">MD, DM Cardiology • {t.prescriptionSlip.active}</p>
                  </div>
                </div>}
                {activeTab === "profile" && <>
                  <Info label="Patient ID / UHID" value={currentPatientID} detail="Identity record maintained by the clinic." />
                  <Info label={t.ageGender} value="34 / Male" detail="Demographic information recorded during clinical registration." />
                  <Info label="Body mass index (BMI)" value="23.4 kg/m²" detail="Healthy range; calculated from the height and weight recorded by the doctor." />
                  <Info label="Smoking status" value="Non-smoker" detail="Lifestyle history documented during the latest physician assessment." />
                  <Info label="Alcohol use" value="Occasional / low risk" detail="Patient history reviewed by the attending physician; moderation advised." />
                  <Info label="Allergies" value="No known drug allergies" detail="Recorded and verified by the attending physician." />
                  <Info label="Relevant medical history" value="Mild hypertension, controlled" detail="Condition monitored by Dr. Rajesh Kulkarni; current readings are stable." />
                  <Info label="Family history" value="No significant cardiac history reported" detail="Documented during the cardiovascular assessment." />
                  <Info label="Activity recommendation" value="Regular moderate exercise" detail="Doctor recommends 30 minutes of activity most days, as tolerated." />
                  <Info label="Recorded by" value="Dr. Rajesh Kulkarni" detail="MD, DM Cardiology • PRAAN Multi-Speciality Clinic • Last reviewed Aug 29, 2026" />
                </>}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* DOCTOR UPLOAD MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-pink-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-pink-600" />
                <h3 className="font-extrabold text-sm text-gray-900">{t.doctorUploadTitle}</h3>
              </div>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDoctorUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Target Patient ID (Auto-Linked)
                </label>
                <input
                  type="text"
                  value={currentPatientID}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-gray-100 border border-pink-200 rounded-xl text-xs font-bold text-pink-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.recordTitle}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abdominal Ultrasound / Blood Test Analysis"
                  value={newCheckupTitle}
                  onChange={(e) => setNewCheckupTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-pink-50/30 border border-pink-200 rounded-xl text-xs focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Department / Checkup Category
                </label>
                <select
                  value={newCheckupCategory}
                  onChange={(e) => setNewCheckupCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-pink-50/30 border border-pink-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-pink-500 focus:outline-none"
                >
                  <option value="Cardiology Checkup">Cardiology Checkup</option>
                  <option value="Medical Certificate">Official Medical Certificate</option>
                  <option value="Radiology & Scans">Radiology & Scans</option>
                  <option value="Pathology Lab Report">Pathology Lab Report</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-pink-300 bg-pink-50/40 rounded-2xl p-6 text-center cursor-pointer hover:bg-pink-50 transition">
                <Upload className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-700">Attach a medical report</p>
                <span className="text-[10px] text-gray-400 mt-1 block">Supports PDF up to 25MB</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl shadow-md shadow-pink-200 transition"
                >
                  {t.uploadBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}