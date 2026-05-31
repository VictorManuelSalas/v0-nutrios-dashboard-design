"use client"

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { type PatientDetail } from "./mock-data"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"
import {
  Phone,
  Mail,
  Briefcase,
  Calendar,
  FileText,
  ImageIcon,
  Scale,
  Target,
  Utensils,
  AlertCircle,
  Clock,
  ChevronRight,
  Pencil,
  Plus,
  Copy,
  Eye,
} from "lucide-react"

const statusConfig = {
  active: { label: "Active", className: "bg-primary/10 text-primary border-primary/20" },
  "at-risk": { label: "At Risk", className: "bg-destructive/10 text-destructive border-destructive/20" },
  excellent: { label: "Excellent Progress", className: "bg-primary/10 text-primary border-primary/20" },
  "needs-follow-up": { label: "Needs Follow Up", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground border-border" },
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  )
}

function MetricBox({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-muted/30 px-3 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn("text-xl font-bold", color ?? "text-foreground")}>{value}</span>
    </div>
  )
}

/* ─── TABS ─── */

function OverviewTab({ patient }: { patient: PatientDetail }) {
  return (
    <div className="space-y-5">
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current Vitals</h4>
        <div className="grid grid-cols-4 gap-2">
          <MetricBox label="Weight" value={`${patient.currentWeight}kg`} />
          <MetricBox label="Goal" value={`${patient.goalWeight}kg`} color="text-[#3B82F6]" />
          <MetricBox label="BMI" value={patient.bmi} color={patient.bmi > 25 ? "text-amber-500" : "text-primary"} />
          <MetricBox label="Body Fat" value={`${patient.bodyFat}%`} />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Patient Information</h4>
        <div className="space-y-3">
          <InfoRow icon={Phone} label="Phone" value={patient.phone} />
          <InfoRow icon={Mail} label="Email" value={patient.email} />
          <InfoRow icon={Calendar} label="Date of Birth" value={patient.dob} />
          <InfoRow icon={Briefcase} label="Occupation" value={patient.occupation} />
          <InfoRow icon={Clock} label="Member Since" value={patient.joinedDate} />
          <InfoRow icon={Calendar} label="Next Appointment" value={patient.nextAppointment} />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Goal</h4>
        <Badge className="bg-primary/10 text-primary border-primary/20">{patient.goal}</Badge>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Progress Snapshot</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Diet Adherence</span>
              <span className="text-xs font-semibold text-primary">{patient.dietAdherence}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-primary/20">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${patient.dietAdherence}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Goal Completion</span>
              <span className="text-xs font-semibold text-[#3B82F6]">{patient.goalCompletion}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#3B82F6]/20">
              <div className="h-full rounded-full bg-[#3B82F6] transition-all" style={{ width: `${patient.goalCompletion}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MedicalHistoryTab({ patient }: { patient: PatientDetail }) {
  return (
    <div className="space-y-5">
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Medical Conditions</h4>
        <div className="space-y-2">
          {patient.conditions.map((c, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
              <span className="text-sm text-foreground">{c}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Allergies</h4>
        <div className="flex flex-wrap gap-2">
          {patient.allergies.map((a, i) => (
            <Badge key={i} className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">{a}</Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current Medications</h4>
        <div className="space-y-2">
          {patient.medications.map((m, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3B82F6]/10">
                <FileText className="h-4 w-4 text-[#3B82F6]" />
              </div>
              <span className="text-sm text-foreground">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProgressTab({ patient }: { patient: PatientDetail }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Weight & BMI History</h4>
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={patient.weightHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} dx={-5} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: 12 }} labelStyle={{ fontWeight: 600, color: "var(--foreground)" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="#22C55E" strokeWidth={2} dot={{ r: 4, fill: "#22C55E" }} />
              <Line type="monotone" dataKey="bmi" name="BMI" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, fill: "#3B82F6" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Body Composition</h4>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={patient.weightHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradFat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradMuscle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} dx={-5} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: 12 }} labelStyle={{ fontWeight: 600, color: "var(--foreground)" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="bodyFat" name="Body Fat %" stroke="#EF4444" fill="url(#gradFat)" strokeWidth={2} />
              <Area type="monotone" dataKey="muscle" name="Muscle Mass" stroke="#22C55E" fill="url(#gradMuscle)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Water Intake (L/day)</h4>
        <div className="h-36 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={patient.weightHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} dx={-5} domain={[0, 3]} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: 12 }} labelStyle={{ fontWeight: 600, color: "var(--foreground)" }} />
              <Area type="monotone" dataKey="water" name="Water (L)" stroke="#3B82F6" fill="url(#gradWater)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function DietsTab({ patient }: { patient: PatientDetail }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{patient.diets.length} diet(s) assigned</span>
        <Button size="sm" className="gap-1.5 h-8 text-xs">
          <Plus className="h-3.5 w-3.5" /> Generate New Diet
        </Button>
      </div>
      <div className="space-y-3">
        {patient.diets.map((diet) => (
          <div key={diet.id} className="space-y-3 rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{diet.name}</p>
                <p className="text-xs text-muted-foreground">Created {diet.created}</p>
              </div>
              <Badge
                className={cn(
                  "flex-shrink-0 text-xs",
                  diet.status === "Active" && "bg-primary/10 text-primary border-primary/20",
                  diet.status === "Completed" && "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20",
                  diet.status === "Paused" && "bg-amber-500/10 text-amber-600 border-amber-500/20"
                )}
              >
                {diet.status}
              </Badge>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Compliance</span>
                <span className="text-xs font-semibold text-primary">{diet.compliance}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/20">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${diet.compliance}%` }} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 h-7 flex-1 text-xs"><Eye className="h-3 w-3" /> View</Button>
              <Button variant="outline" size="sm" className="gap-1 h-7 flex-1 text-xs"><Copy className="h-3 w-3" /> Duplicate</Button>
              <Button variant="outline" size="sm" className="gap-1 h-7 flex-1 text-xs"><Pencil className="h-3 w-3" /> Edit</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AppointmentsTab({ patient }: { patient: PatientDetail }) {
  const upcoming = patient.appointments.filter((a) => a.status === "Upcoming")
  const past = patient.appointments.filter((a) => a.status !== "Upcoming")

  return (
    <div className="space-y-5">
      {upcoming.length > 0 && (
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upcoming</h4>
          <div className="space-y-2">
            {upcoming.map((appt) => (
              <div key={appt.id} className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{appt.type}</p>
                  <p className="text-xs text-muted-foreground">{appt.date} · {appt.time}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-7 text-xs">Reschedule</Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs text-destructive border-destructive/20 hover:bg-destructive/10">Cancel</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Past Appointments</h4>
          <div className="space-y-2">
            {past.map((appt) => (
              <div key={appt.id} className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{appt.type}</p>
                  <p className="text-xs text-muted-foreground">{appt.date} · {appt.time}</p>
                </div>
                <Badge
                  className={cn(
                    "text-xs",
                    appt.status === "Completed" && "bg-primary/10 text-primary border-primary/20",
                    appt.status === "Cancelled" && "bg-destructive/10 text-destructive border-destructive/20"
                  )}
                >
                  {appt.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button className="w-full gap-2" size="sm">
        <Plus className="h-4 w-4" /> Schedule New Appointment
      </Button>
    </div>
  )
}

function PaymentsTab({ patient }: { patient: PatientDetail }) {
  const totalPaid = patient.payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace("$", "")), 0)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Total Paid</p>
          <p className="text-xl font-bold text-primary">${totalPaid.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-foreground">Transactions</p>
          <p className="text-xl font-bold text-foreground">{patient.payments.length}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Date</th>
              <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground">Amount</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground">Method</th>
              <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patient.payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-muted/20">
                <td className="px-3 py-2.5 text-xs text-muted-foreground">{payment.date}</td>
                <td className="px-3 py-2.5 text-right text-sm font-semibold text-foreground">{payment.amount}</td>
                <td className="px-3 py-2.5 text-xs text-muted-foreground">{payment.method}</td>
                <td className="px-3 py-2.5 text-right">
                  <Badge
                    className={cn(
                      "text-[10px]",
                      payment.status === "Paid" && "bg-primary/10 text-primary border-primary/20",
                      payment.status === "Pending" && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                      payment.status === "Failed" && "bg-destructive/10 text-destructive border-destructive/20"
                    )}
                  >
                    {payment.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ActivityFeedTab({ patient }: { patient: PatientDetail }) {
  const iconMap = {
    meal: { icon: ImageIcon, color: "text-primary", bg: "bg-primary/10" },
    weight: { icon: Scale, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
    goal: { icon: Target, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10" },
    diet: { icon: Utensils, color: "text-amber-500", bg: "bg-amber-500/10" },
    appointment: { icon: Calendar, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
    missed: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
  }

  return (
    <div className="space-y-1">
      {patient.activity.map((item, index) => {
        const config = iconMap[item.type]
        const Icon = config.icon
        const isLast = index === patient.activity.length - 1
        return (
          <div key={item.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", config.bg)}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              {!isLast && <div className="my-1 w-px flex-1 bg-border" />}
            </div>
            <div className={cn("flex-1 min-w-0", !isLast && "pb-4")}>
              <p className="text-sm text-foreground leading-snug">{item.text}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.date}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DocumentsTab() {
  const docs = [
    { name: "Initial Assessment.pdf", date: "Jan 15, 2026", size: "1.2 MB" },
    { name: "Blood Work Results.pdf", date: "Feb 10, 2026", size: "0.8 MB" },
    { name: "Body Composition Report.pdf", date: "Mar 1, 2026", size: "2.1 MB" },
    { name: "Diet Plan v1.pdf", date: "Mar 1, 2026", size: "0.4 MB" },
  ]
  return (
    <div className="space-y-3">
      <Button variant="outline" size="sm" className="w-full gap-2">
        <Plus className="h-4 w-4" /> Upload Document
      </Button>
      <div className="space-y-2">
        {docs.map((doc) => (
          <div key={doc.name} className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/10">
              <FileText className="h-5 w-5 text-[#3B82F6]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.date} · {doc.size}</p>
            </div>
            <button className="text-muted-foreground transition-colors hover:text-foreground">
              <Eye className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── MAIN DRAWER ─── */

interface PatientProfileDrawerProps {
  patient: PatientDetail | null
  open: boolean
  onClose: () => void
}

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "medical", label: "Medical" },
  { value: "progress", label: "Progress" },
  { value: "diets", label: "Diets" },
  { value: "appointments", label: "Appointments" },
  { value: "payments", label: "Payments" },
  { value: "activity", label: "Activity" },
  { value: "documents", label: "Documents" },
]

export function PatientProfileDrawer({ patient, open, onClose }: PatientProfileDrawerProps) {
  if (!patient) return null

  const status = statusConfig[patient.status]

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex w-full max-w-xl flex-col gap-0 p-0 sm:max-w-xl">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border bg-gradient-to-br from-primary/5 to-[#3B82F6]/5 px-6 py-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/20">
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                {patient.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <SheetTitle className="text-lg font-bold text-foreground">{patient.name}</SheetTitle>
                <Badge variant="outline" className={status.className}>{status.label}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {patient.age} years · {patient.gender} · {patient.occupation}
              </p>
              <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                <span><span className="font-semibold text-primary">{patient.dietAdherence}%</span> adherence</span>
                <span><span className="font-semibold text-[#3B82F6]">{patient.goalCompletion}%</span> goal</span>
                <span>Check-in: {patient.lastCheckIn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="flex flex-1 flex-col overflow-hidden">
          <TabsList className="flex-shrink-0 w-full justify-start overflow-x-auto rounded-none border-b border-border bg-background px-2 h-10 gap-0">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent px-3 py-2 text-xs data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                <TabsContent value="overview" className="m-0"><OverviewTab patient={patient} /></TabsContent>
                <TabsContent value="medical" className="m-0"><MedicalHistoryTab patient={patient} /></TabsContent>
                <TabsContent value="progress" className="m-0"><ProgressTab patient={patient} /></TabsContent>
                <TabsContent value="diets" className="m-0"><DietsTab patient={patient} /></TabsContent>
                <TabsContent value="appointments" className="m-0"><AppointmentsTab patient={patient} /></TabsContent>
                <TabsContent value="payments" className="m-0"><PaymentsTab patient={patient} /></TabsContent>
                <TabsContent value="activity" className="m-0"><ActivityFeedTab patient={patient} /></TabsContent>
                <TabsContent value="documents" className="m-0"><DocumentsTab /></TabsContent>
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
