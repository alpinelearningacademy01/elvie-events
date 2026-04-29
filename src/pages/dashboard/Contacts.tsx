import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contacts = () => {
  const [form, setForm] = useState({
    contactName: "Vipan Mishra",
    role: "Property Manager",
    email: "vipan.mishra@pixoulgaming.com",
    phone: "+971 52 132 7081",
    whatsapp: "+971 52 132 7081",
    website: "https://pixoulgaming.com",
    address: "Al Khaleej Al Arabi St, Rabdan Area, Abu Dhabi, UAE",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Saved", description: "Contact information updated." });
  };

  const field = (label: string, key: keyof typeof form, type = "text") => (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow placeholder:text-slate-600"
      />
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Client Directory</h1>
        <p className="text-sm text-slate-400 mb-8">
          This information is shown to potential clients on your listing.
        </p>

        <form onSubmit={handleSave} className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {field("Contact Name", "contactName")}
            {field("Role", "role")}
            {field("Email", "email", "email")}
            {field("Phone", "phone", "tel")}
            {field("WhatsApp", "whatsapp", "tel")}
            {field("Website", "website", "url")}
          </div>
          {field("Address", "address")}

          <div className="pt-4 mt-6 border-t border-white/[0.05] flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Contacts;
