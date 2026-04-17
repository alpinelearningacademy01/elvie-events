import { motion } from "framer-motion";
import { Eye, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { monthlyViews, properties, inquiries } from "@/lib/dashboardMockData";
import { useState } from "react";

const Dashboard = () => {
  const [activeProperty, setActiveProperty] = useState(properties[0]?.id);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Dashboard</p>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">
            Insights on your properties
          </h1>
        </div>

        {/* Property tabs */}
        <div className="flex gap-2 bg-card rounded-xl p-1.5 border border-border overflow-x-auto">
          {properties.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProperty(p.id)}
              className={`flex-1 min-w-[200px] px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeProperty === p.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Stats + chart row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-card rounded-xl border border-border p-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyViews}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--elvie-gold))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--elvie-gold))", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-elvie-blue/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-elvie-blue" />
                  </div>
                  <p className="text-xs text-muted-foreground">Number of Views</p>
                  <p className="text-2xl font-bold text-foreground">18</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-elvie-gold/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-elvie-gold" />
                  </div>
                  <p className="text-xs text-muted-foreground">Number of Inquiries</p>
                  <p className="text-2xl font-bold text-foreground">{inquiries.length}</p>
                </div>
              </div>
            </div>
            <Link
              to="/dashboard/plans"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-elvie-blue hover:underline"
            >
              <TrendingUp className="w-4 h-4" /> Gain Visibility
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="elvie-gradient-dark rounded-xl p-6 text-primary-foreground relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-elvie-gold/20 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-elvie-gold mb-2">Boost</p>
              <h3 className="text-xl font-bold mb-2">
                Boost your venue with our subscription packages
              </h3>
              <Link
                to="/dashboard/plans"
                className="inline-flex items-center gap-2 mt-4 bg-elvie-gold text-elvie-navy-deep px-4 py-2 rounded-lg text-sm font-bold hover:bg-elvie-gold/90"
              >
                Explore Packages <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Latest inquiries */}
        <div className="bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-bold text-foreground">Latest inquiries</h2>
            <Link
              to="/dashboard/inquiries"
              className="text-sm font-semibold text-elvie-blue hover:underline flex items-center gap-1"
            >
              Show all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {inquiries.slice(0, 3).map((inq) => (
              <div key={inq.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{inq.name}</p>
                    <p className="text-xs text-muted-foreground">{inq.property}</p>
                    <p className="text-sm text-foreground/80 mt-1 truncate">{inq.message}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      inq.status === "New"
                        ? "bg-elvie-blue/10 text-elvie-blue"
                        : inq.status === "Replied"
                        ? "bg-elvie-gold/10 text-elvie-gold"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {inq.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
