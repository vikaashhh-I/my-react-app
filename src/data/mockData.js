export const stats = [
  { title: "Patients Served", value: "12,480", change: "+18%", color: "from-emerald-500 to-teal-500" },
  { title: "Avg Wait Time", value: "24 min", change: "-32%", color: "from-sky-500 to-blue-500" },
  { title: "Referral Completion", value: "84%", change: "+11%", color: "from-violet-500 to-fuchsia-500" },
  { title: "Stock Alerts", value: "07", change: "Needs action", color: "from-amber-500 to-orange-500" }
];

export const queueData = [
  { name: "Rani M", token: "A-12", reason: "Fever + weakness", priority: "High", status: "Waiting" },
  { name: "Suresh K", token: "A-13", reason: "BP follow-up", priority: "Medium", status: "In Triage" },
  { name: "Asha P", token: "A-14", reason: "ANC checkup", priority: "High", status: "Queued for Doctor" },
  { name: "Mohan L", token: "A-15", reason: "Diabetes refill", priority: "Low", status: "Completed" }
];

export const referrals = [
  { step: "PHC Screening", time: "09:30 AM", done: true },
  { step: "Teleconsult Scheduled", time: "10:10 AM", done: true },
  { step: "District Hospital Referral", time: "02:00 PM", done: false },
  { step: "Specialist Review", time: "Pending", done: false }
];

export const medicines = [
  { item: "Paracetamol 500mg", stock: "Available", qty: "2,400", status: "Stable" },
  { item: "ORS Packets", stock: "Low", qty: "180", status: "Restock soon" },
  { item: "Insulin", stock: "Critical", qty: "24", status: "Urgent" },
  { item: "Iron Tablets", stock: "Available", qty: "1,120", status: "Stable" }
];