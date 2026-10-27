import { useMemo, useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Cpu,
  Database,
  Eye,
  FileText,
  Film,
  Globe2,
  HardDrive,
  Headphones,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Play,
  PlayCircle,
  Plus,
  Radio,
  RadioTower,
  RefreshCw,
  Save,
  Search,
  Send,
  Server,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Ticket,
  Trash2,
  Tv2,
  Users,
  UsersRound,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
  ActionButton,
  BackLink,
  FilterChip,
  PageHeader,
  Panel,
  SearchBox,
  StatCard,
  StatusPill,
} from "@/components/AlmoghaniLayout";

const chartBars = [38, 52, 44, 66, 61, 79, 72, 92, 81, 96, 74, 88];
const channelRows = [
  { name: "ALMOGHANI Sport", category: "رياضية", viewers: "24.8K", status: "مباشر", tone: "green" as const, icon: "⚽" },
  { name: "ALMOGHANI News", category: "إخبارية", viewers: "18.2K", status: "مباشر", tone: "green" as const, icon: "◉" },
  { name: "ALMOGHANI Music", category: "موسيقية", viewers: "11.6K", status: "مباشر", tone: "green" as const, icon: "♫" },
  { name: "ALMOGHANI Kids", category: "أطفال", viewers: "7.9K", status: "تحت المراقبة", tone: "amber" as const, icon: "✦" },
];

function PageFrame({ children }: { children: ReactNode }) {
  return <div className="page-content">{children}</div>;
}

function InlineActions() {
  return <div className="inline-actions"><button className="tiny-button"><Eye size={15} /></button><button className="tiny-button"><Pencil size={15} /></button><button className="tiny-button"><MoreHorizontal size={15} /></button></div>;
}

function Donut({ value, label, tone = "violet" }: { value: string; label: string; tone?: string }) {
  return <div className={`donut tone-${tone}`}><div><strong>{value}</strong><span>{label}</span></div></div>;
}

export function DashboardOverview() {
  return <PageFrame>
    <PageHeader eyebrow="ALMOGHANI CONTROL CENTER" title="لوحة التحكم" subtitle="مرحباً بك في مركز إدارة المنصة" actions={<><div className="top-search"><Search size={16} /><span>البحث في النظام...</span></div><ActionButton icon={Plus}>بدء بث جديد</ActionButton></>} />
    <div className="stats-grid four"><StatCard label="المشاهدون الآن" value="125.4K" trend="↑ +12%" icon={UsersRound} tone="violet" /><StatCard label="إجمالي القنوات" value="48" trend="↑ +4%" icon={Tv2} tone="cyan" /><StatCard label="البثوث المباشرة" value="12" trend="↑ +33%" icon={Radio} tone="violet" /><StatCard label="إجمالي المشاهدات" value="2.8M" trend="↑ +18%" icon={Eye} tone="cyan" /></div>
    <div className="dashboard-grid top-grid">
      <Panel title="تحليلات المشاهدة" icon={BarChart3} action={<button className="select-button">آخر 7 أيام <ChevronDown size={14} /></button>} className="chart-panel">
        <div className="chart-wrap"><div className="chart-y"><span>300K</span><span>200K</span><span>100K</span><span>0</span></div><div className="bar-chart">{chartBars.map((height, index) => <div className="bar-track" key={index}><i style={{ height: `${height}%` }} /><span>{["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد", "الإثنين", "الثلاثاء", "اليوم"][index]}</span></div>)}</div></div>
      </Panel>
      <Panel title="البث المباشر الآن" icon={Radio} action={<Link href="/live" className="panel-link">عرض الجميع ›</Link>} className="live-preview-panel">
        <div className="broadcast-preview"><div className="preview-image"><div className="preview-sheen" /><span className="live-badge"><i /> LIVE</span><span className="preview-viewers"><Eye size={14} /> 24.8K</span><div className="preview-center"><PlayCircle size={48} /></div></div><div className="preview-info"><div><strong>ALMOGHANI Sport</strong><span>بطولة العالم للرياضات الإلكترونية</span></div><ActionButton icon={Settings2}>إدارة البث</ActionButton></div></div>
      </Panel>
    </div>
    <div className="dashboard-grid bottom-grid">
      <Panel title="القنوات النشطة" icon={Tv2} action={<Link href="/content" className="panel-link">إدارة القنوات ›</Link>}>
        <div className="compact-table"><div className="table-row table-head"><span>القناة</span><span>التصنيف</span><span>المشاهدون</span><span>الحالة</span><span>إجراءات</span></div>{channelRows.map((channel) => <div className="table-row" key={channel.name}><span className="channel-cell"><b>{channel.icon}</b>{channel.name}</span><span>{channel.category}</span><span>{channel.viewers}</span><span><StatusPill tone={channel.tone}>{channel.status}</StatusPill></span><InlineActions /></div>)}</div>
      </Panel>
      <Panel title="توزيع المحتوى" icon={BarChart3} action={<Link href="/content" className="panel-link">عرض التفاصيل ›</Link>} className="distribution-panel"><div className="distribution-content"><Donut value="348" label="إجمالي المحتوى" tone="cyan" /><div className="legend-list"><span><i className="legend-dot violet" />قنوات <b>48</b><em>14%</em></span><span><i className="legend-dot cyan" />مسلسلات <b>178</b><em>51%</em></span><span><i className="legend-dot pink" />أفلام <b>122</b><em>35%</em></span></div></div></Panel>
    </div>
  </PageFrame>;
}

export function LivePage() {
  const [active, setActive] = useState("الكل");
  return <PageFrame><PageHeader eyebrow="LIVE OPERATIONS" title="البث المباشر" subtitle="مراقبة البثوث والقنوات لحظة بلحظة" actions={<><div className="top-search"><Search size={16} /><span>ابحث في البثوث...</span></div><ActionButton icon={Plus}>إطلاق بث</ActionButton></>} /><div className="stats-grid four"><StatCard label="البثوث النشطة" value="12" trend="↑ +33%" icon={Radio} tone="violet" /><StatCard label="إجمالي المشاهدين" value="125.4K" trend="مباشر الآن" icon={Users} tone="cyan" /><StatCard label="جودة البث" value="99.8%" trend="ممتازة" icon={Wifi} tone="green" /><StatCard label="معدل النقل" value="18.4 Mbps" trend="مستقر" icon={Zap} tone="amber" /></div><Panel title="البثوث الحالية" icon={Radio} action={<div className="filter-row">{["الكل", "رياضة", "أخبار", "موسيقى"].map((item) => <FilterChip key={item} active={active === item} onClick={() => setActive(item)}>{item}</FilterChip>)}</div>}><div className="stream-grid">{channelRows.slice(0, 4).map((channel, index) => <div className="stream-card" key={channel.name}><div className={`stream-art art-${index}`}><span className="live-badge"><i /> LIVE</span><span className="preview-viewers"><Eye size={14} /> {channel.viewers}</span><PlayCircle size={42} /></div><div className="stream-card-body"><div><strong>{channel.name}</strong><span>{channel.category} · جودة 1080p</span></div><StatusPill tone={channel.tone}>{channel.status}</StatusPill></div><div className="stream-footer"><span><Activity size={14} /> 6.4 Mbps</span><ActionButton variant="ghost" onClick={() => toast.success(`تم فتح إدارة ${channel.name}`)}>إدارة البث</ActionButton></div></div>)}</div></Panel></PageFrame>;
}

const contentChannels = [
  { name: "ALMOGHANI Sport", category: "رياضية", viewers: "12,450", status: "مفتوحة", tone: "green" as const, updated: "2024-12-01", icon: "⚽" },
  { name: "ALMOGHANI News", category: "إخبارية", viewers: "8,230", status: "مفتوحة", tone: "green" as const, updated: "2024-11-30", icon: "◉" },
  { name: "ALMOGHANI Music", category: "موسيقية", viewers: "5,410", status: "متوقفة", tone: "red" as const, updated: "2024-11-28", icon: "♫" },
  { name: "ALMOGHANI Kids", category: "أطفال", viewers: "15,670", status: "مفتوحة", tone: "green" as const, updated: "2024-11-25", icon: "✦" },
];
const series = [
  { title: "القدر", season: "الموسم 2", episodes: "45 حلقة", rating: "9.1", color: "violet" },
  { title: "ليلى", season: "الموسم 1", episodes: "30 حلقة", rating: "8.2", color: "cyan" },
  { title: "العميل", season: "الموسم 1", episodes: "24 حلقة", rating: "8.7", color: "pink" },
];

export function ContentManagement() {
  const [tab, setTab] = useState<"channels" | "series">("channels");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("الكل");
  const filteredChannels = contentChannels.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()) && (filter === "الكل" || item.status === filter));
  return <PageFrame><BackLink /><PageHeader eyebrow="CONTENT STUDIO" title="إدارة المحتوى" subtitle="القنوات المفتوحة والمسلسلات" actions={<><ActionButton variant="ghost" icon={Plus} onClick={() => toast.success(tab === "channels" ? "تم فتح نموذج إضافة قناة" : "تم فتح نموذج إضافة مسلسل")}>{tab === "channels" ? "إضافة قناة" : "إضافة مسلسل"}</ActionButton><ActionButton icon={Plus} onClick={() => toast.success("تم فتح نموذج الإضافة")}>إضافة جديد</ActionButton></>} /><div className="segmented-tabs"><button className={tab === "channels" ? "active" : ""} onClick={() => setTab("channels")}>القنوات المفتوحة</button><button className={tab === "series" ? "active" : ""} onClick={() => setTab("series")}>المسلسلات</button></div><div className="stats-grid four"><StatCard label="إجمالي القنوات" value="48" icon={Tv2} tone="cyan" /><StatCard label="القنوات المفتوحة" value="32" icon={PlayCircle} tone="green" /><StatCard label="إجمالي المسلسلات" value="126" icon={Film} tone="violet" /><StatCard label="المسلسلات النشطة" value="98" icon={Users} tone="cyan" /></div>{tab === "channels" ? <Panel title="القنوات المفتوحة" icon={Tv2} action={<div className="toolbar"><SearchBox value={query} onChange={setQuery} placeholder="البحث عن قناة أو مسلسل" /><div className="filter-row"><FilterChip active={filter === "الكل"} onClick={() => setFilter("الكل")}>الكل</FilterChip><FilterChip active={filter === "مفتوحة"} onClick={() => setFilter("مفتوحة")}>مفتوحة</FilterChip><FilterChip active={filter === "متوقفة"} onClick={() => setFilter("متوقفة")}>متوقفة</FilterChip></div></div>}><div className="data-table"><div className="table-row table-head"><span>القناة</span><span>التصنيف</span><span>الحالة</span><span>المشاهدون</span><span>آخر تحديث</span><span>الإجراءات</span></div>{filteredChannels.map((channel) => <div className="table-row" key={channel.name}><span className="channel-cell"><b>{channel.icon}</b>{channel.name}</span><span>{channel.category}</span><span><StatusPill tone={channel.tone}>{channel.status}</StatusPill></span><span>{channel.viewers}</span><span className="muted-text">{channel.updated}</span><InlineActions /></div>)}{filteredChannels.length === 0 && <div className="empty-state"><CircleHelp size={24} />لا توجد نتائج مطابقة</div>}</div></Panel> : <Panel title="المسلسلات المضافة مؤخراً" icon={Film} action={<ActionButton variant="ghost" icon={Plus} onClick={() => toast.success("تم فتح نموذج إضافة مسلسل")}>إضافة مسلسل</ActionButton>}><div className="series-grid">{series.map((item) => <article className={`series-card series-${item.color}`} key={item.title}><div className="series-poster"><span className="rating">★ {item.rating}</span><div className="poster-art"><Film size={34} /></div><b>{item.title}</b><small>{item.episodes}</small></div><div className="series-meta"><strong>{item.title}</strong><span>{item.season} · {item.episodes}</span><ActionButton variant="ghost" icon={Pencil} onClick={() => toast.success(`تم فتح تعديل ${item.title}`)}>تعديل</ActionButton></div></article>)}</div></Panel>}</PageFrame>;
}

const users = [
  { name: "أحمد محمد", email: "ahmed.m***@mail.com", plan: "أساسي", status: "نشط", tone: "green" as const, joined: "2024-01-15", avatar: "أ" },
  { name: "سارة علي", email: "sara.a***@gmail.com", plan: "بريميوم", status: "نشط", tone: "green" as const, joined: "2024-02-03", avatar: "س" },
  { name: "خالد حسن", email: "khaled.h***@mail.com", plan: "عائلي", status: "منتهي", tone: "red" as const, joined: "2023-12-20", avatar: "خ" },
  { name: "نورا عبدالله", email: "nora.a***@gmail.com", plan: "بريميوم", status: "معلّق", tone: "amber" as const, joined: "2024-02-28", avatar: "ن" },
  { name: "محمد سالم", email: "mohammed.s***@mail.com", plan: "أساسي", status: "نشط", tone: "green" as const, joined: "2024-03-10", avatar: "م" },
];

export function UsersSubscriptions() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("الكل");
  const filtered = users.filter((user) => `${user.name} ${user.email} ${user.plan}`.includes(query) && (status === "الكل" || user.status === status));
  return <PageFrame><PageHeader eyebrow="AUDIENCE & PLANS" title="إدارة المستخدمين والاشتراكات" subtitle="إدارة الحسابات والخطط والصلاحيات" actions={<><SearchBox value={query} onChange={setQuery} placeholder="البحث عن مستخدم" /><ActionButton icon={Plus} onClick={() => toast.success("تم فتح نموذج إضافة مستخدم")}>إضافة مستخدم</ActionButton></>} /><div className="stats-grid four"><StatCard label="إجمالي المستخدمين" value="24,860" icon={UsersRound} tone="violet" /><StatCard label="المستخدمون النشطون" value="18,420" icon={Users} tone="green" /><StatCard label="الاشتراكات النشطة" value="12,680" icon={Database} tone="violet" /><StatCard label="معدل التجديد" value="86%" icon={RefreshCw} tone="cyan" /></div><div className="two-col-layout"><Panel title="قائمة المستخدمين" icon={UsersRound} action={<div className="filter-row">{["الكل", "نشط", "منتهي", "معلّق"].map((item) => <FilterChip key={item} active={status === item} onClick={() => setStatus(item)}>{item}</FilterChip>)}</div>}><div className="data-table user-table"><div className="table-row table-head"><span>المستخدم</span><span>البريد الإلكتروني</span><span>الخطة</span><span>الحالة</span><span>تاريخ الانضمام</span><span>الإجراءات</span></div>{filtered.map((user) => <div className="table-row" key={user.email}><span className="user-cell"><b>{user.avatar}</b>{user.name}</span><span className="muted-text">{user.email}</span><span><span className="plan-pill">{user.plan}</span></span><span><StatusPill tone={user.tone}>{user.status}</StatusPill></span><span className="muted-text">{user.joined}</span><InlineActions /></div>)}</div></Panel><div className="side-stack"><Panel title="خطط الاشتراك" icon={Sparkles}><div className="plan-list"><div className="plan-card basic"><b>أساسي</b><strong>2,410</strong><span>مشترك</span><small>جودة HD · جهازان</small></div><div className="plan-card premium"><b>بريميوم</b><strong>6,850</strong><span>مشترك</span><small>بدون إعلانات · 4 أجهزة</small></div><div className="plan-card family"><b>عائلي</b><strong>3,420</strong><span>مشترك</span><small>6 أجهزة · جودة HD</small></div></div><ActionButton onClick={() => toast.success("تم فتح إدارة الخطط")}>إدارة الخطط</ActionButton></Panel><Panel title="توزيع الاشتراكات" icon={BarChart3}><div className="distribution-content"><Donut value="12,680" label="اشتراك نشط" tone="cyan" /><div className="legend-list"><span><i className="legend-dot cyan" />أساسي <em>48%</em></span><span><i className="legend-dot violet" />بريميوم <em>32%</em></span><span><i className="legend-dot pink" />عائلي <em>20%</em></span></div></div></Panel></div></div></PageFrame>;
}

const notifications = [
  { title: "بدأ البث الآن", type: "تنبيه فوري", recipients: "12,540", status: "تم التسليم", tone: "green" as const, date: "2024/05/10 14:30", icon: Radio },
  { title: "حلقة جديدة متاحة", type: "محتوى جديد", recipients: "28,760", status: "تم التسليم", tone: "green" as const, date: "2024/05/10 10:15", icon: Play },
  { title: "عرض اشتراك مميز", type: "ترويجي", recipients: "46,200", status: "مجدول", tone: "blue" as const, date: "2024/05/09 18:45", icon: Sparkles },
  { title: "صيانة مجدولة", type: "نظام", recipients: "0", status: "مسودة", tone: "amber" as const, date: "2024/05/09 09:20", icon: Settings2 },
];

export function NotificationsPage() {
  const [filter, setFilter] = useState("الكل");
  const [query, setQuery] = useState("");
  const [urgent, setUrgent] = useState(true);
  const filtered = notifications.filter((item) => item.title.includes(query) && (filter === "الكل" || item.status === filter));
  const send = () => toast.success("تم إرسال الإشعار بنجاح", { description: urgent ? "إشعار فوري إلى الجمهور المحدد" : "تمت إضافة الإشعار إلى الجدولة" });
  return <PageFrame><PageHeader eyebrow="ENGAGEMENT CENTER" title="إدارة الإشعارات" subtitle="التنبيهات الفورية ورسائل المستخدمين" actions={<><SearchBox value={query} onChange={setQuery} placeholder="البحث في الإشعارات" /><ActionButton icon={Plus} onClick={() => toast.success("تم إنشاء إشعار جديد")}>إنشاء إشعار</ActionButton></>} /><div className="stats-grid four"><StatCard label="إجمالي الإشعارات" value="48,260" icon={Bell} tone="violet" /><StatCard label="تم التسليم" value="96%" icon={Send} tone="green" /><StatCard label="غير مقروءة" value="1,284" icon={Mail} tone="amber" /><StatCard label="الحملات النشطة" value="6" icon={BarChart3} tone="cyan" /></div><div className="two-col-layout notifications-layout"><Panel title="سجل الإشعارات" icon={FileText} action={<div className="filter-row">{["الكل", "تم التسليم", "مجدول", "مسودة"].map((item) => <FilterChip key={item} active={filter === item} onClick={() => setFilter(item)}>{item}</FilterChip>)}</div>}><div className="data-table notification-table"><div className="table-row table-head"><span>العنوان</span><span>النوع</span><span>المستلمون</span><span>الحالة</span><span>التاريخ</span><span>الإجراءات</span></div>{filtered.map((item) => { const Icon = item.icon; return <div className="table-row" key={item.title}><span className="notification-cell"><b><Icon size={15} /></b>{item.title}</span><span>{item.type}</span><span>{item.recipients}</span><span><StatusPill tone={item.tone}>{item.status}</StatusPill></span><span className="muted-text">{item.date}</span><InlineActions /></div>; })}</div></Panel><div className="side-stack"><Panel title="إرسال إشعار جديد" icon={Send}><div className="form-stack"><label>نوع الإشعار<select><option>تنبيه فوري</option><option>محتوى جديد</option><option>ترويجي</option></select></label><label>الجمهور المستهدف<select><option>جميع المستخدمين</option><option>المشاهدون النشطون</option><option>المشتركون بريميوم</option></select></label><label>قناة الإرسال<select><option>إشعارات التطبيق</option><option>البريد الإلكتروني</option><option>رسائل SMS</option></select></label><label>عنوان الإشعار<input placeholder="أدخل عنوان الإشعار" /></label><label>نص الإشعار<textarea placeholder="اكتب نص الإشعار هنا..." maxLength={500} /></label><div className="toggle-row"><span><b className={`fake-toggle ${urgent ? "on" : ""}`} onClick={() => setUrgent(!urgent)}><i /></b>إشعار فوري</span><span><b className="fake-toggle on"><i /></b>إرسال عبر البريد</span></div><ActionButton icon={Send} onClick={send}>إرسال الآن</ActionButton></div></Panel><Panel title="قنوات الإرسال" icon={RadioTower}><div className="channel-settings"><span><Smartphone size={17} />إشعارات التطبيق <StatusPill>مفعّل</StatusPill></span><span><Mail size={17} />البريد الإلكتروني <StatusPill>مفعّل</StatusPill></span><span><MessageCircle size={17} />رسائل SMS <StatusPill tone="red">غير مفعّل</StatusPill></span></div></Panel></div></div></PageFrame>;
}

const tickets = [
  { id: "#TK-1048", subject: "مشكلة في تسجيل الدخول", user: "أحمد سالم", priority: "عالية", priorityTone: "red" as const, status: "مفتوحة", statusTone: "red" as const, date: "2024/12/15 14:32" },
  { id: "#TK-1047", subject: "تقطيع أثناء البث", user: "فاطمة علي", priority: "متوسطة", priorityTone: "amber" as const, status: "قيد المعالجة", statusTone: "amber" as const, date: "2024/12/15 11:20" },
  { id: "#TK-1046", subject: "طلب إلغاء الاشتراك", user: "محمد خالد", priority: "منخفضة", priorityTone: "blue" as const, status: "تم الحل", statusTone: "green" as const, date: "2024/12/14 19:45" },
  { id: "#TK-1045", subject: "لا تصل الإشعارات", user: "سارة عبدالله", priority: "متوسطة", priorityTone: "amber" as const, status: "مفتوحة", statusTone: "red" as const, date: "2024/12/14 16:10" },
];

export function SupportPage() {
  const [selected, setSelected] = useState(tickets[0]);
  const [filter, setFilter] = useState("الكل");
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");
  const filtered = tickets.filter((ticket) => `${ticket.subject} ${ticket.user} ${ticket.id}`.includes(query) && (filter === "الكل" || ticket.status === filter || ticket.priority === filter));
  return <PageFrame><PageHeader eyebrow="SERVICE DESK" title="الدعم الفني وتذاكر الشكاوي" subtitle="متابعة طلبات المستخدمين وحل المشكلات بسرعة" actions={<><SearchBox value={query} onChange={setQuery} placeholder="البحث في التذاكر" /><ActionButton icon={Plus} onClick={() => toast.success("تم فتح تذكرة جديدة")}>تذكرة جديدة</ActionButton></>} /><div className="stats-grid four"><StatCard label="إجمالي التذاكر" value="1,248" icon={Ticket} tone="cyan" /><StatCard label="مفتوحة" value="186" icon={AlertCircle} tone="violet" /><StatCard label="قيد المعالجة" value="74" icon={Clock3} tone="amber" /><StatCard label="تم الحل" value="988" icon={CheckCircle2} tone="green" /></div><div className="two-col-layout support-layout"><Panel title="صندوق التذاكر" icon={Ticket} action={<div className="filter-row">{["الكل", "مفتوحة", "عالية", "قيد المعالجة", "تم الحل"].map((item) => <FilterChip key={item} active={filter === item} onClick={() => setFilter(item)}>{item}</FilterChip>)}</div>}><div className="data-table ticket-table"><div className="table-row table-head"><span>رقم التذكرة</span><span>المستخدم</span><span>الموضوع</span><span>الأولوية</span><span>الحالة</span><span>آخر تحديث</span></div>{filtered.map((ticket) => <button className={`table-row ticket-row ${selected.id === ticket.id ? "selected" : ""}`} key={ticket.id} onClick={() => setSelected(ticket)}><span className="ticket-id">{ticket.id}</span><span className="user-cell"><b>{ticket.user.slice(0, 1)}</b>{ticket.user}</span><span>{ticket.subject}</span><span><StatusPill tone={ticket.priorityTone}>{ticket.priority}</StatusPill></span><span><StatusPill tone={ticket.statusTone}>{ticket.status}</StatusPill></span><span className="muted-text">{ticket.date}</span></button>)}</div></Panel><div className="side-stack"><Panel title={`تفاصيل التذكرة ${selected.id}`} icon={FileText}><div className="ticket-detail"><div className="detail-user"><b>{selected.user.slice(0, 1)}</b><div><strong>{selected.user}</strong><span>user123@almoghani.com</span></div></div><div className="detail-meta"><span>المستخدم<strong>{selected.user}</strong></span><span>الأولوية<StatusPill tone={selected.priorityTone}>{selected.priority}</StatusPill></span><span>الحالة<StatusPill tone={selected.statusTone}>{selected.status}</StatusPill></span></div><div className="conversation"><div className="message user-message"><span>{selected.date}</span>مرحباً، لا أستطيع تسجيل الدخول إلى حسابي رغم أن البيانات صحيحة.</div><div className="message agent-message"><span>اليوم · 15:05</span>أهلاً {selected.user.split(" ")[0]}، سنقوم بمراجعة المشكلة والتواصل معك قريباً.</div></div><div className="reply-box"><textarea value={reply} onChange={(event) => setReply(event.target.value)} placeholder="اكتب ردك هنا..." /><div><button className="tiny-button"><PaperclipIcon /></button><ActionButton icon={Send} onClick={() => { if (reply.trim()) { toast.success("تم إرسال الرد"); setReply(""); } }}>إرسال الرد</ActionButton></div></div></div></Panel><div className="mini-panels"><Panel title="أداء الدعم" icon={BarChart3}><div className="support-score"><Donut value="78%" label="نسبة الحل" tone="violet" /><div className="score-list"><span>زمن الاستجابة <b>42 دقيقة</b></span><span>نسبة الحل <b>78%</b></span><span>رضا المستخدمين <b>91%</b></span></div></div></Panel><Panel title="قاعدة المعرفة" icon={CircleHelp}><div className="knowledge-list"><span>الأسئلة الشائعة <ChevronDown size={15} /></span><span>دليل الاشتراك <ChevronDown size={15} /></span><span>مشاكل البث <ChevronDown size={15} /></span><ActionButton variant="ghost" onClick={() => toast.success("تم فتح إدارة المقالات")}>إدارة المقالات</ActionButton></div></Panel></div></div></div></PageFrame>;
}

function PaperclipIcon() { return <span className="paperclip">↗</span>; }

const servers = [
  { name: "ALMOGHANI-ME-01", region: "الشرق الأوسط", status: "متصل", tone: "green" as const, cpu: 32, ram: 58, viewers: "12,428", bitrate: "8.6 Mbps" },
  { name: "ALMOGHANI-EU-02", region: "أوروبا", status: "متصل", tone: "green" as const, cpu: 28, ram: 46, viewers: "9,215", bitrate: "6.4 Mbps" },
  { name: "ALMOGHANI-US-03", region: "أمريكا الشمالية", status: "تحت المراقبة", tone: "amber" as const, cpu: 78, ram: 72, viewers: "18,320", bitrate: "12.8 Mbps" },
  { name: "ALMOGHANI-ASIA-04", region: "آسيا", status: "متصل", tone: "green" as const, cpu: 41, ram: 60, viewers: "7,908", bitrate: "5.1 Mbps" },
];

export function SystemSettings() {
  const [tab, setTab] = useState("خوادم البث");
  const [maintenance, setMaintenance] = useState(false);
  const tabs = ["الإعدادات العامة", "خوادم البث", "جودة البث", "الأمان والصلاحيات"];
  return <PageFrame><PageHeader eyebrow="PLATFORM INFRASTRUCTURE" title="إعدادات النظام" subtitle="التحكم في المنصة وخوادم البث" actions={<><ActionButton variant="ghost" icon={Plus} onClick={() => toast.success("تم فتح إضافة خادم")}>إضافة خادم</ActionButton><ActionButton icon={Save} onClick={() => toast.success("تم حفظ التغييرات بنجاح")}>حفظ التغييرات</ActionButton></>} /><div className="settings-tabs">{tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>{tab === "خوادم البث" ? <><div className="settings-layout"><Panel title="خوادم البث Stream Servers" icon={Server}><div className="server-list">{servers.map((server) => <div className="server-row" key={server.name}><div className="server-icon"><Server size={21} /></div><div className="server-name"><strong>{server.name}</strong><span><Globe2 size={13} /> {server.region}</span></div><StatusPill tone={server.tone}>{server.status}</StatusPill><div className="resource"><span>CPU {server.cpu}%</span><i><b style={{ width: `${server.cpu}%` }} /></i><span>RAM {server.ram}%</span><i><b style={{ width: `${server.ram}%` }} /></i></div><div className="server-metrics"><span><Users size={14} />{server.viewers}<small>المشاهدون</small></span><span><Activity size={14} />{server.bitrate}<small>معدل البث</small></span></div><InlineActions /></div>)}</div></Panel><Panel title="الإعدادات العامة" icon={Settings2}><div className="form-stack"><label>اسم المنصة<input defaultValue="ALMOGHANI" /></label><label>رابط البث الرئيسي<input defaultValue="rtmp://stream.almoghani.com/live" /></label><label>المنطقة الافتراضية<select defaultValue="الشرق الأوسط"><option>الشرق الأوسط</option><option>أوروبا</option><option>أمريكا الشمالية</option></select></label><label>الحد الأقصى للمشاهدين<input defaultValue="50,000" /></label><div className="settings-toggles"><span><b className="fake-toggle on"><i /></b>تفعيل البث التلقائي</span><span><b className="fake-toggle on"><i /></b>تسجيل البثوث</span><span><b className={`fake-toggle ${maintenance ? "on" : ""}`} onClick={() => setMaintenance(!maintenance)}><i /></b>وضع الصيانة</span></div></div></Panel></div><div className="settings-bottom"><Panel title="مراقبة البث المباشر" icon={Activity}><div className="topology"><div><Server size={30} /><span>المصدر<small>محتوى البث</small></span></div><i /><div><Database size={30} /><span>خادم التوزيع<small>CDN / Edge Servers</small></span></div><i /><div><UsersRound size={30} /><span>المشاهدون<small>حول العالم</small></span></div></div><div className="metric-strip"><span><Clock3 size={17} />زمن الاستجابة<strong>42ms</strong></span><span><Wifi size={17} />جودة الاتصال<strong>99.8%</strong></span><span><Zap size={17} />معدل النقل<strong>18.4 Mbps</strong></span></div></Panel><Panel title="سجل النظام" icon={FileText} action={<button className="panel-link">عرض الكل ›</button>}><div className="system-log"><span><i className="log-dot green" />تم تحديث إعدادات الخادم<small>2024-06-15 14:32</small></span><span><i className="log-dot green" />تم الاتصال بخادم جديد<small>2024-06-15 12:18</small></span><span><i className="log-dot cyan" />تم تغيير جودة البث<small>2024-06-15 10:05</small></span></div></Panel></div></> : <Panel title={tab} icon={Settings2}><div className="settings-placeholder"><SlidersHorizontal size={44} /><h3>{tab}</h3><p>هذه الإعدادات جاهزة للتخصيص داخل مركز التحكم.</p><ActionButton icon={Save} onClick={() => toast.success("تم حفظ إعدادات القسم")}>حفظ إعدادات القسم</ActionButton></div></Panel>}</PageFrame>;
}
