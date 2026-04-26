import { Video } from "lucide-react";
export default function MeetingRoom() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-32 pb-24 text-white">
      <div className="w-full max-w-4xl aspect-video bg-slate-900 rounded-3xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
          <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Live Consultation
          </span>
        </div>

        <Video size={80} className="text-slate-800 mb-4" />
        {/* <p className="text-slate-500 font-mono text-sm">
          SECURE_ENCRYPTED_CHANNEL_ACTIVE
        </p> */}
      </div>
      <div className="mt-10 flex gap-6">
        <button
          className="bg-rose-600 px-8 py-3 rounded-2xl font-bold hover:bg-rose-700"
          onClick={() => window.close()}
        >
          End Session
        </button>
      </div>
    </div>
  );
}
