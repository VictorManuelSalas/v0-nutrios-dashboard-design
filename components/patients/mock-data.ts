import { type Patient } from "./patient-card"

export interface WeightEntry {
  date: string
  weight: number
  bodyFat: number
  bmi: number
  muscle: number
  water: number
}

export interface Diet {
  id: string
  name: string
  created: string
  status: "Active" | "Completed" | "Paused"
  compliance: number
}

export interface Appointment {
  id: string
  date: string
  time: string
  type: string
  status: "Upcoming" | "Completed" | "Cancelled"
}

export interface Payment {
  id: string
  date: string
  amount: string
  method: string
  status: "Paid" | "Pending" | "Failed"
}

export interface ActivityItem {
  id: string
  date: string
  type: "meal" | "weight" | "goal" | "diet" | "appointment" | "missed"
  text: string
}

export interface PatientDetail extends Patient {
  dob: string
  occupation: string
  muscleMass: number
  joinedDate: string
  nextAppointment: string
  conditions: string[]
  allergies: string[]
  medications: string[]
  weightHistory: WeightEntry[]
  diets: Diet[]
  appointments: Appointment[]
  payments: Payment[]
  activity: ActivityItem[]
}

export const mockPatients: PatientDetail[] = [
  {
    id: "p1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 234-5678",
    age: 34,
    gender: "Female",
    currentWeight: 68.5,
    goalWeight: 60,
    bmi: 24.2,
    bodyFat: 28,
    lastCheckIn: "2 days ago",
    dietAdherence: 85,
    goalCompletion: 72,
    status: "excellent",
    goal: "Weight Loss",
    dob: "March 15, 1990",
    occupation: "Teacher",
    muscleMass: 42.3,
    joinedDate: "Jan 15, 2026",
    nextAppointment: "Jun 2, 2026",
    conditions: ["None"],
    allergies: ["Shellfish"],
    medications: ["None"],
    weightHistory: [
      { date: "Jan", weight: 74, bodyFat: 32, bmi: 26.3, muscle: 40.1, water: 1.8 },
      { date: "Feb", weight: 73, bodyFat: 31, bmi: 25.9, muscle: 40.5, water: 2.0 },
      { date: "Mar", weight: 71, bodyFat: 30, bmi: 25.3, muscle: 41.2, water: 2.1 },
      { date: "Apr", weight: 70, bodyFat: 29, bmi: 24.9, muscle: 41.8, water: 2.2 },
      { date: "May", weight: 68.5, bodyFat: 28, bmi: 24.2, muscle: 42.3, water: 2.3 },
    ],
    diets: [
      { id: "d1", name: "Mediterranean Diet Plan", created: "Mar 1, 2026", status: "Active", compliance: 85 },
      { id: "d2", name: "Low Carb Starter", created: "Jan 15, 2026", status: "Completed", compliance: 91 },
    ],
    appointments: [
      { id: "a1", date: "Jun 2, 2026", time: "10:00 AM", type: "Follow-up Consultation", status: "Upcoming" },
      { id: "a2", date: "May 1, 2026", time: "2:00 PM", type: "Monthly Check-in", status: "Completed" },
    ],
    payments: [
      { id: "pay1", date: "May 1, 2026", amount: "$120.00", method: "Credit Card", status: "Paid" },
      { id: "pay2", date: "Apr 1, 2026", amount: "$120.00", method: "Credit Card", status: "Paid" },
    ],
    activity: [
      { id: "a1", date: "May 28, 2026", type: "meal", text: "Uploaded breakfast photo" },
      { id: "a2", date: "May 27, 2026", type: "weight", text: "Recorded new weight: 68.5 kg" },
      { id: "a3", date: "May 25, 2026", type: "goal", text: "Completed weekly calorie goal" },
      { id: "a4", date: "May 20, 2026", type: "diet", text: "Received Mediterranean Diet Plan" },
    ],
  },
  {
    id: "p2",
    name: "Marcus Rivera",
    email: "m.rivera@email.com",
    phone: "+1 (555) 345-6789",
    age: 28,
    gender: "Male",
    currentWeight: 92.3,
    goalWeight: 85,
    bmi: 28.1,
    bodyFat: 22,
    lastCheckIn: "5 days ago",
    dietAdherence: 35,
    goalCompletion: 28,
    status: "at-risk",
    goal: "Muscle Gain",
    dob: "July 22, 1998",
    occupation: "Software Engineer",
    muscleMass: 58.4,
    joinedDate: "Feb 10, 2026",
    nextAppointment: "Jun 5, 2026",
    conditions: ["Hypertension Stage 1"],
    allergies: ["Peanuts", "Tree nuts"],
    medications: ["Lisinopril 10mg"],
    weightHistory: [
      { date: "Feb", weight: 95, bodyFat: 25, bmi: 28.9, muscle: 55.2, water: 1.5 },
      { date: "Mar", weight: 94, bodyFat: 24, bmi: 28.6, muscle: 56.1, water: 1.6 },
      { date: "Apr", weight: 93.5, bodyFat: 23, bmi: 28.4, muscle: 57.3, water: 1.7 },
      { date: "May", weight: 92.3, bodyFat: 22, bmi: 28.1, muscle: 58.4, water: 1.6 },
    ],
    diets: [
      { id: "d3", name: "High Protein Muscle Build", created: "Feb 10, 2026", status: "Active", compliance: 35 },
    ],
    appointments: [
      { id: "a4", date: "Jun 5, 2026", time: "11:00 AM", type: "Nutrition Review", status: "Upcoming" },
      { id: "a5", date: "May 5, 2026", time: "10:00 AM", type: "Initial Assessment", status: "Completed" },
    ],
    payments: [
      { id: "pay4", date: "May 5, 2026", amount: "$150.00", method: "PayPal", status: "Paid" },
    ],
    activity: [
      { id: "a6", date: "May 25, 2026", type: "missed", text: "Missed scheduled appointment — no show" },
      { id: "a7", date: "May 22, 2026", type: "weight", text: "Recorded weight: 92.3 kg" },
      { id: "a8", date: "May 18, 2026", type: "missed", text: "Diet plan not followed for 5 days" },
    ],
  },
  {
    id: "p3",
    name: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+1 (555) 456-7890",
    age: 42,
    gender: "Female",
    currentWeight: 62.1,
    goalWeight: 58,
    bmi: 22.8,
    bodyFat: 26,
    lastCheckIn: "1 day ago",
    dietAdherence: 92,
    goalCompletion: 88,
    status: "excellent",
    goal: "Diabetes Management",
    dob: "November 8, 1984",
    occupation: "Marketing Manager",
    muscleMass: 37.8,
    joinedDate: "Nov 20, 2025",
    nextAppointment: "Jun 8, 2026",
    conditions: ["Type 2 Diabetes"],
    allergies: ["Gluten"],
    medications: ["Metformin 500mg"],
    weightHistory: [
      { date: "Dec", weight: 68, bodyFat: 30, bmi: 25.0, muscle: 35.2, water: 2.0 },
      { date: "Jan", weight: 66, bodyFat: 29, bmi: 24.3, muscle: 36.1, water: 2.1 },
      { date: "Feb", weight: 64.5, bodyFat: 27.5, bmi: 23.7, muscle: 37.0, water: 2.2 },
      { date: "Mar", weight: 63, bodyFat: 27, bmi: 23.2, muscle: 37.5, water: 2.3 },
      { date: "Apr", weight: 62.5, bodyFat: 26.5, bmi: 23.0, muscle: 37.7, water: 2.4 },
      { date: "May", weight: 62.1, bodyFat: 26, bmi: 22.8, muscle: 37.8, water: 2.5 },
    ],
    diets: [
      { id: "d4", name: "Diabetic-Friendly Low Glycemic", created: "Apr 1, 2026", status: "Active", compliance: 92 },
      { id: "d5", name: "Gluten-Free Weight Loss", created: "Nov 20, 2025", status: "Completed", compliance: 88 },
    ],
    appointments: [
      { id: "a6", date: "Jun 8, 2026", time: "9:00 AM", type: "Quarterly Review", status: "Upcoming" },
      { id: "a7", date: "May 8, 2026", time: "9:00 AM", type: "Monthly Check-in", status: "Completed" },
    ],
    payments: [
      { id: "pay5", date: "May 8, 2026", amount: "$130.00", method: "Bank Transfer", status: "Paid" },
      { id: "pay6", date: "Apr 8, 2026", amount: "$130.00", method: "Bank Transfer", status: "Paid" },
    ],
    activity: [
      { id: "a9", date: "May 29, 2026", type: "meal", text: "Logged all meals — perfect nutrition day" },
      { id: "a10", date: "May 28, 2026", type: "weight", text: "Recorded new weight: 62.1 kg" },
      { id: "a11", date: "May 27, 2026", type: "goal", text: "Completed weekly goal — 5th week in a row" },
    ],
  },
  {
    id: "p4",
    name: "James Wilson",
    email: "j.wilson@email.com",
    phone: "+1 (555) 567-8901",
    age: 55,
    gender: "Male",
    currentWeight: 88.7,
    goalWeight: 80,
    bmi: 27.3,
    bodyFat: 31,
    lastCheckIn: "7 days ago",
    dietAdherence: 58,
    goalCompletion: 45,
    status: "needs-follow-up",
    goal: "Hypertension Control",
    dob: "May 30, 1971",
    occupation: "Executive",
    muscleMass: 48.2,
    joinedDate: "Mar 5, 2026",
    nextAppointment: "Jun 10, 2026",
    conditions: ["Hypertension", "High Cholesterol"],
    allergies: ["None"],
    medications: ["Atenolol 50mg", "Atorvastatin 20mg"],
    weightHistory: [
      { date: "Mar", weight: 91, bodyFat: 33, bmi: 28.0, muscle: 46.8, water: 1.9 },
      { date: "Apr", weight: 90, bodyFat: 32, bmi: 27.7, muscle: 47.5, water: 2.0 },
      { date: "May", weight: 88.7, bodyFat: 31, bmi: 27.3, muscle: 48.2, water: 2.0 },
    ],
    diets: [
      { id: "d6", name: "Heart-Healthy DASH Diet", created: "Mar 5, 2026", status: "Active", compliance: 58 },
    ],
    appointments: [
      { id: "a8", date: "Jun 10, 2026", time: "1:00 PM", type: "Nutrition Review", status: "Upcoming" },
      { id: "a9", date: "May 10, 2026", time: "11:00 AM", type: "Monthly Check-in", status: "Completed" },
    ],
    payments: [
      { id: "pay7", date: "May 10, 2026", amount: "$140.00", method: "Credit Card", status: "Paid" },
      { id: "pay8", date: "Apr 10, 2026", amount: "$140.00", method: "Credit Card", status: "Pending" },
    ],
    activity: [
      { id: "a13", date: "May 23, 2026", type: "weight", text: "Recorded new weight: 88.7 kg" },
      { id: "a14", date: "May 20, 2026", type: "missed", text: "Missed meal logging for 3 consecutive days" },
      { id: "a15", date: "May 15, 2026", type: "goal", text: "Partially completed weekly goal (58%)" },
    ],
  },
  {
    id: "p5",
    name: "Aisha Patel",
    email: "aisha.p@email.com",
    phone: "+1 (555) 678-9012",
    age: 26,
    gender: "Female",
    currentWeight: 54.2,
    goalWeight: 57,
    bmi: 20.1,
    bodyFat: 22,
    lastCheckIn: "1 day ago",
    dietAdherence: 95,
    goalCompletion: 91,
    status: "excellent",
    goal: "Muscle Gain",
    dob: "January 12, 2000",
    occupation: "Graduate Student",
    muscleMass: 35.6,
    joinedDate: "Apr 1, 2026",
    nextAppointment: "Jun 12, 2026",
    conditions: ["Anemia"],
    allergies: ["Dairy"],
    medications: ["Iron Supplement"],
    weightHistory: [
      { date: "Apr", weight: 52.5, bodyFat: 21, bmi: 19.5, muscle: 33.8, water: 1.9 },
      { date: "May", weight: 54.2, bodyFat: 22, bmi: 20.1, muscle: 35.6, water: 2.2 },
    ],
    diets: [
      { id: "d7", name: "Plant-Based Muscle Gain", created: "Apr 1, 2026", status: "Active", compliance: 95 },
    ],
    appointments: [
      { id: "a10", date: "Jun 12, 2026", time: "3:00 PM", type: "Progress Review", status: "Upcoming" },
      { id: "a11", date: "May 12, 2026", time: "3:00 PM", type: "Initial Assessment", status: "Completed" },
    ],
    payments: [
      { id: "pay9", date: "May 12, 2026", amount: "$110.00", method: "Debit Card", status: "Paid" },
    ],
    activity: [
      { id: "a16", date: "May 29, 2026", type: "meal", text: "Uploaded all 3 meals today" },
      { id: "a17", date: "May 28, 2026", type: "weight", text: "New weight record: 54.2 kg (+1.7 kg)" },
      { id: "a18", date: "May 27, 2026", type: "goal", text: "Hit protein target for 7th day straight" },
    ],
  },
  {
    id: "p6",
    name: "Robert Thompson",
    email: "r.thompson@email.com",
    phone: "+1 (555) 789-0123",
    age: 48,
    gender: "Male",
    currentWeight: 102.1,
    goalWeight: 88,
    bmi: 31.2,
    bodyFat: 36,
    lastCheckIn: "12 days ago",
    dietAdherence: 22,
    goalCompletion: 15,
    status: "inactive",
    goal: "Weight Loss",
    dob: "September 3, 1978",
    occupation: "Contractor",
    muscleMass: 52.6,
    joinedDate: "Jan 5, 2026",
    nextAppointment: "Not scheduled",
    conditions: ["Type 2 Diabetes", "Sleep Apnea"],
    allergies: ["None"],
    medications: ["Metformin 1000mg", "CPAP therapy"],
    weightHistory: [
      { date: "Jan", weight: 108, bodyFat: 39, bmi: 33.0, muscle: 50.0, water: 1.6 },
      { date: "Feb", weight: 106, bodyFat: 38, bmi: 32.4, muscle: 50.8, water: 1.7 },
      { date: "Mar", weight: 105, bodyFat: 37, bmi: 32.1, muscle: 51.4, water: 1.7 },
      { date: "Apr", weight: 104, bodyFat: 37, bmi: 31.8, muscle: 51.9, water: 1.8 },
      { date: "May", weight: 102.1, bodyFat: 36, bmi: 31.2, muscle: 52.6, water: 1.8 },
    ],
    diets: [
      { id: "d8", name: "Caloric Deficit for Diabetes", created: "Jan 5, 2026", status: "Paused", compliance: 22 },
    ],
    appointments: [
      { id: "a12", date: "May 5, 2026", time: "10:00 AM", type: "Monthly Review", status: "Cancelled" },
    ],
    payments: [
      { id: "pay10", date: "Mar 5, 2026", amount: "$120.00", method: "Credit Card", status: "Paid" },
      { id: "pay11", date: "Apr 5, 2026", amount: "$120.00", method: "Credit Card", status: "Failed" },
    ],
    activity: [
      { id: "a20", date: "May 18, 2026", type: "missed", text: "Has not logged meals in 5 days" },
      { id: "a21", date: "May 15, 2026", type: "missed", text: "Missed scheduled appointment" },
      { id: "a22", date: "May 10, 2026", type: "weight", text: "Recorded weight: 102.1 kg" },
    ],
  },
  {
    id: "p7",
    name: "Isabella Morales",
    email: "i.morales@email.com",
    phone: "+1 (555) 890-1234",
    age: 31,
    gender: "Female",
    currentWeight: 65.3,
    goalWeight: 62,
    bmi: 23.5,
    bodyFat: 27,
    lastCheckIn: "3 days ago",
    dietAdherence: 78,
    goalCompletion: 65,
    status: "active",
    goal: "Weight Loss",
    dob: "April 18, 1995",
    occupation: "Nurse",
    muscleMass: 40.1,
    joinedDate: "Feb 25, 2026",
    nextAppointment: "Jun 15, 2026",
    conditions: ["PCOS"],
    allergies: ["None"],
    medications: ["Inositol 4g/day"],
    weightHistory: [
      { date: "Feb", weight: 68, bodyFat: 29, bmi: 24.5, muscle: 38.5, water: 2.0 },
      { date: "Mar", weight: 67, bodyFat: 28.5, bmi: 24.1, muscle: 39.2, water: 2.1 },
      { date: "Apr", weight: 66, bodyFat: 28, bmi: 23.8, muscle: 39.7, water: 2.2 },
      { date: "May", weight: 65.3, bodyFat: 27, bmi: 23.5, muscle: 40.1, water: 2.2 },
    ],
    diets: [
      { id: "d9", name: "PCOS-Friendly Balanced Diet", created: "Feb 25, 2026", status: "Active", compliance: 78 },
    ],
    appointments: [
      { id: "a13", date: "Jun 15, 2026", time: "4:00 PM", type: "Monthly Check-in", status: "Upcoming" },
      { id: "a14", date: "May 15, 2026", time: "4:00 PM", type: "Monthly Check-in", status: "Completed" },
    ],
    payments: [
      { id: "pay12", date: "May 15, 2026", amount: "$120.00", method: "Credit Card", status: "Paid" },
      { id: "pay13", date: "Apr 15, 2026", amount: "$120.00", method: "Credit Card", status: "Paid" },
    ],
    activity: [
      { id: "a23", date: "May 27, 2026", type: "weight", text: "Recorded new weight: 65.3 kg" },
      { id: "a24", date: "May 25, 2026", type: "meal", text: "Uploaded lunch photo — healthy choice" },
      { id: "a25", date: "May 22, 2026", type: "goal", text: "Completed 65% of weekly goals" },
    ],
  },
  {
    id: "p8",
    name: "David Kim",
    email: "d.kim@email.com",
    phone: "+1 (555) 901-2345",
    age: 37,
    gender: "Male",
    currentWeight: 79.8,
    goalWeight: 75,
    bmi: 25.8,
    bodyFat: 20,
    lastCheckIn: "1 day ago",
    dietAdherence: 88,
    goalCompletion: 82,
    status: "active",
    goal: "Muscle Gain",
    dob: "December 5, 1989",
    occupation: "Chef",
    muscleMass: 55.3,
    joinedDate: "Mar 15, 2026",
    nextAppointment: "Jun 18, 2026",
    conditions: ["None"],
    allergies: ["None"],
    medications: ["Creatine 5g/day", "Vitamin D 2000IU"],
    weightHistory: [
      { date: "Mar", weight: 82, bodyFat: 22, bmi: 26.5, muscle: 52.8, water: 2.3 },
      { date: "Apr", weight: 81, bodyFat: 21, bmi: 26.2, muscle: 53.8, water: 2.4 },
      { date: "May", weight: 79.8, bodyFat: 20, bmi: 25.8, muscle: 55.3, water: 2.5 },
    ],
    diets: [
      { id: "d10", name: "Athletic Performance Plan", created: "Mar 15, 2026", status: "Active", compliance: 88 },
    ],
    appointments: [
      { id: "a15", date: "Jun 18, 2026", time: "6:00 PM", type: "Progress Review", status: "Upcoming" },
      { id: "a16", date: "May 18, 2026", time: "6:00 PM", type: "Monthly Check-in", status: "Completed" },
    ],
    payments: [
      { id: "pay14", date: "May 18, 2026", amount: "$125.00", method: "Bank Transfer", status: "Paid" },
      { id: "pay15", date: "Apr 18, 2026", amount: "$125.00", method: "Bank Transfer", status: "Paid" },
    ],
    activity: [
      { id: "a26", date: "May 29, 2026", type: "meal", text: "Logged pre and post-workout nutrition" },
      { id: "a27", date: "May 28, 2026", type: "weight", text: "New body composition: 20% body fat" },
      { id: "a28", date: "May 27, 2026", type: "goal", text: "Completed all workout + nutrition goals" },
    ],
  },
]

export const aiInsights = [
  {
    id: "i1",
    patientName: "Marcus Rivera",
    patientId: "p2",
    type: "alert" as const,
    message: "Has not registered meals for 5 days. Immediate follow-up recommended.",
  },
  {
    id: "i2",
    patientName: "Robert Thompson",
    patientId: "p6",
    type: "alert" as const,
    message: "Weight has increased by 3% this month. Diet plan needs urgent review.",
  },
  {
    id: "i3",
    patientName: "Emily Chen",
    patientId: "p3",
    type: "positive" as const,
    message: "Highly engaged — logged meals 29 out of 30 days. Excellent progress.",
  },
  {
    id: "i4",
    patientName: "James Wilson",
    patientId: "p4",
    type: "recommendation" as const,
    message: "Recommend scheduling a follow-up. Last check-in was 7 days ago.",
  },
  {
    id: "i5",
    patientName: "Aisha Patel",
    patientId: "p5",
    type: "positive" as const,
    message: "Consistently hitting protein targets. Consider advancing to next phase.",
  },
  {
    id: "i6",
    patientName: "Robert Thompson",
    patientId: "p6",
    type: "warning" as const,
    message: "Payment failed on Apr 5. Account requires immediate attention.",
  },
]
