import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Save, Camera } from "lucide-react";
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
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">My Profile</h1>

        <div className="bg-card rounded-xl border border-border p-6 mb-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full elvie-gradient-dark text-primary-foreground flex items-center justify-center text-3xl font-bold border-2 border-elvie-gold">
                {form.name[0]}
              </div>
              <button className="absolute -bottom-1 -right-1 bg-elvie-gold text-elvie-navy-deep p-2 rounded-full">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{form.name}</h2>
              <p className="text-sm text-muted-foreground">{form.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold bg-elvie-gold/15 text-elvie-gold px-2 py-0.5 rounded-full">
                PREMIUM MEMBER
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={save} className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-bold text-foreground">Personal Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Full Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-elvie-blue"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full px-4 py-2.5 bg-muted/30 border border-border rounded-lg text-sm text-muted-foreground"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Company
              </label>
              <input
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-elvie-blue"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-elvie-blue resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <h3 className="font-bold text-foreground">Notifications</h3>
            {[
              { key: "notifyEmail" as const, label: "Email notifications" },
              { key: "notifySMS" as const, label: "SMS notifications" },
            ].map((n) => (
              <label key={n.key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-foreground">{n.label}</span>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, [n.key]: !f[n.key] }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    form[n.key] ? "bg-elvie-gold" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      form[n.key] ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="elvie-gradient-dark text-primary-foreground px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
