import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { inboxMessages } from "@/lib/dashboardMockData";
import { Mail } from "lucide-react";

const Inbox = () => {
  const [selected, setSelected] = useState(inboxMessages[0]);
  const unread = inboxMessages.filter((m) => m.unread).length;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Inbox</h1>
          {unread > 0 && (
            <span className="bg-amber-500 text-amber-950 text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              {unread}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-white/[0.05]">
               <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Messages</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {inboxMessages.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className={`w-full text-left p-5 border-b border-white/[0.05] last:border-0 transition-all duration-300 ${
                    selected?.id === m.id ? "bg-blue-500/10 border-l-2 border-l-blue-500" : "hover:bg-white/[0.04] border-l-2 border-l-transparent"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border ${
                       m.unread ? "bg-blue-500/20 border-blue-500/30 text-blue-400" : "bg-white/[0.05] border-white/[0.1] text-slate-400"
                    }`}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className={`text-xs font-medium truncate ${m.unread ? "text-blue-300" : "text-slate-400"}`}>{m.from}</p>
                        {m.unread && <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                      </div>
                      <p className={`font-semibold text-sm truncate mb-1 ${m.unread ? "text-white" : "text-slate-300"}`}>
                        {m.subject}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {m.preview}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] p-8 h-[600px] flex flex-col">
            {selected ? (
              <>
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/[0.05]">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/[0.1] flex items-center justify-center text-white font-bold text-lg">
                        {selected.from[0]}
                     </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">{selected.subject}</h2>
                      <p className="text-sm text-slate-400">From: <span className="text-slate-300">{selected.from}</span></p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-white/[0.05] border border-white/[0.05] px-3 py-1.5 rounded-full">
                    {selected.date}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto text-sm text-slate-300 leading-relaxed space-y-4">
                  <p>{selected.preview}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/[0.05] flex gap-3">
                   <button className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                     Reply Message
                   </button>
                   <button className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-white text-sm font-semibold rounded-xl transition-colors border border-white/[0.05]">
                     Forward
                   </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-4">
                   <Mail className="w-6 h-6 text-slate-600" />
                </div>
                <p>Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inbox;
