import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "@/hooks/use-toast";
import {
  ChevronLeft, Save, Loader2, User, Mail, Phone,
  Globe, MapPin, Tag, MessageSquare, Building2, Briefcase, X
} from "lucide-react";
import {
  createClient,
  updateClient,
  getClientById,
  ClientDirectoryEntry
} from "@/services/clientDirectoryService";

const CATEGORIES = [
  { value: "client",  label: "Client",  color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/30" },
  { value: "lead",    label: "Lead",    color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/30" },
  { value: "vip",     label: "VIP",     color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
  { value: "partner", label: "Partner", color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/30" },
  { value: "vendor",  label: "Vendor",  color: "text-rose-400",   bg: "bg-rose-500/10 border-rose-500/30" },
  { value: "other",   label: "Other",   color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/30" },
];

const emptyForm: Partial<ClientDirectoryEntry> = {
  contactName: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  whatsapp: "",
  website: "",
  address: "",
  category: "client",
  notes: "",
  tags: [],
};

const AddEditClient = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const isEdit = Boolean(editId);

  const [form, setForm] = useState<Partial<ClientDirectoryEntry>>(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  // Load existing data for edit mode
  useEffect(() => {
    if (!editId) return;
    const load = async () => {
      try {
        setDataLoading(true);
        const res = await getClientById(editId);
        if (res.success) setForm(res.data);
      } catch {
        toast({ title: "Error", description: "Failed to load contact data.", variant: "destructive" });
        navigate("/dashboard/client-directory");
      } finally {
        setDataLoading(false);
      }
    };
    load();
  }, [editId, navigate]);

  const setField = (key: keyof ClientDirectoryEntry, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags?.includes(t)) {
      setField("tags", [...(form.tags || []), t]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    setField("tags", form.tags?.filter((t) => t !== tag));

  const handleSave = async () => {
    if (!form.contactName?.trim()) {
      toast({ title: "Validation Error", description: "Contact name is required.", variant: "destructive" });
      return;
    }
    try {
      setSaving(true);
      if (isEdit && editId) {
        await updateClient(editId, form);
        toast({ title: "Updated", description: "Contact updated successfully." });
      } else {
        await createClient(form);
        toast({ title: "Added", description: "Contact added successfully." });
      }
      navigate("/dashboard/client-directory");
    } catch (err: any) {
      toast({ title: "Error", description: err?.response?.data?.message || "Failed to save.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full py-3 px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-vp-gold/40 focus:border-vp-gold/40 transition-all placeholder:text-slate-600";

  const withIcon = (icon: any, placeholder: string, key: keyof ClientDirectoryEntry, type = "text") => {
    const Icon = icon;
    return (
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        <input
          type={type}
          value={(form[key] as string) || ""}
          onChange={(e) => setField(key, e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} pl-10`}
        />
      </div>
    );
  };

  if (dataLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-10 h-10 animate-spin text-vp-gold" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Page Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/client-directory")}
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              {isEdit ? "Edit Contact" : "Add New Contact"}
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              {isEdit ? "Update the contact information below" : "Fill in the details to add a new contact"}
            </p>
          </div>
        </div>

        {/* ── Section: Basic Info ─────────────────────── */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <User className="w-3.5 h-3.5" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-1.5 lg:col-span-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Contact Name *</label>
              {withIcon(User, "Full Name", "contactName")}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Company / Organization</label>
              {withIcon(Building2, "Company Name", "company")}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Role / Designation</label>
              {withIcon(Briefcase, "e.g. Event Manager", "role")}
            </div>
          </div>
        </div>

        {/* ── Section: Category ──────────────────────── */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setField("category", cat.value)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  form.category === cat.value
                    ? `${cat.bg} ${cat.color} shadow-sm`
                    : "bg-white/[0.03] border-white/[0.07] text-slate-500 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Section: Contact Info ──────────────────── */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-6">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" /> Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email</label>
              {withIcon(Mail, "email@example.com", "email", "email")}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone</label>
              {withIcon(Phone, "+971 XX XXX XXXX", "phone", "tel")}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">WhatsApp</label>
              {withIcon(MessageSquare, "+971 XX XXX XXXX", "whatsapp", "tel")}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Website</label>
              {withIcon(Globe, "https://...", "website", "url")}
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Address</label>
              {withIcon(MapPin, "Full address", "address")}
            </div>
          </div>
        </div>

        {/* ── Section: Tags ─────────────────────────── */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Tag className="w-3.5 h-3.5" /> Tags
          </h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Type a tag and press Enter"
                className={`${inputClass} pl-10`}
              />
            </div>
            <button
              type="button"
              onClick={addTag}
              className="px-5 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/[0.09] transition-all font-bold"
            >
              Add
            </button>
          </div>
          {form.tags && form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] text-slate-300 text-xs rounded-full"
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Section: Notes ────────────────────────── */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Notes</h2>
          <textarea
            value={form.notes || ""}
            onChange={(e) => setField("notes", e.target.value)}
            placeholder="Any additional notes about this contact..."
            rows={4}
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-vp-gold/40 focus:border-vp-gold/40 transition-all placeholder:text-slate-600 resize-none"
          />
        </div>

        {/* ── Action Buttons ─────────────────────────── */}
        <div className="flex items-center justify-between pt-2 pb-10">
          <button
            onClick={() => navigate("/dashboard/client-directory")}
            className="px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] text-sm font-bold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-10 py-3 rounded-xl bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground text-sm font-bold transition-all shadow-lg shadow-vp-gold/20 disabled:opacity-60"
          >
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="w-4 h-4" /> {isEdit ? "Update Contact" : "Save Contact"}</>
            )}
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AddEditClient;
