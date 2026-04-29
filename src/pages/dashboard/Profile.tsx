import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Save, Camera, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? "Vipan Mishra",
    email: user?.email ?? "",
    company: "Pixoul Gaming",
    bio: "Property manager passionate about creating memorable event experiences.",
    notifyEmail: true,
    notifySMS: false,
  });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-8">Account Profile</h1>

        <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] p-6 sm:p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Sparkles className="w-32 h-32 text-amber-500" />
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-4xl font-bold border-4 border-white/[0.05] shadow-xl">
                {form.name[0]}
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2.5 rounded-full hover:bg-blue-600 transition-colors shadow-lg border-2 border-[#070c18]">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h2 className="text-2xl font-bold text-white">{form.name}</h2>
              <p className="text-sm text-slate-400 mb-3">{form.email}</p>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-full tracking-wider">
                <Sparkles className="w-3 h-3" /> PREMIUM MEMBER
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={save} className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] p-6 sm:p-8 space-y-8">
          <div>
             <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Personal Information</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                    Full Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    disabled
                    className="w-full px-4 py-3 bg-white/[0.01] border border-white/[0.02] rounded-xl text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                    Company
                  </label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                    Bio
                  </label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow resize-none"
                  />
                </div>
             </div>
          </div>

          <div className="pt-8 border-t border-white/[0.05]">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Notifications</h3>
            <div className="space-y-4">
               {[
                 { key: "notifyEmail" as const, label: "Email notifications", desc: "Receive updates via email" },
                 { key: "notifySMS" as const, label: "SMS notifications", desc: "Receive updates via SMS" },
               ].map((n) => (
                 <label key={n.key} className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                   <div>
                      <span className="text-sm font-semibold text-white block">{n.label}</span>
                      <span className="text-xs text-slate-500">{n.desc}</span>
                   </div>
                   <button
                     type="button"
                     onClick={() => setForm((f) => ({ ...f, [n.key]: !f[n.key] }))}
                     className={`relative w-12 h-6 rounded-full transition-colors ${
                       form[n.key] ? "bg-blue-500" : "bg-white/[0.1]"
                     }`}
                   >
                     <span
                       className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                         form[n.key] ? "translate-x-7" : "translate-x-1"
                       }`}
                     />
                   </button>
                 </label>
               ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
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

export default Profile;
