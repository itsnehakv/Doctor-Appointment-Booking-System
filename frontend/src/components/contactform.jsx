/*CONTACT PAGE*/
import TransmitButton from "./sendmessagebutton";
export function ContactForm() {
  return (
    <section className="relative py-10 max-w-3xl mx-auto px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-50/30 blur-[120px] -z-10 rounded-full" />

      <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200 p-8 md:p-14 rounded-[3rem] shadow-2xl shadow-slate-200/50">
        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900">
            Submit a <span className="text-emerald-600">Service Request.</span>
          </h3>
          <p className="text-slate-500 mt-4 font-light text-lg">
            Describe your requirements. Our system architects will review and
            reach out.
          </p>
        </div>

        <form className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                FULL NAME
              </label>
              <input
                type="text"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all text-slate-900 placeholder:text-slate-300"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all text-slate-900 placeholder:text-slate-300"
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">
              MESSAGE
            </label>
            <textarea
              rows="4"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all text-slate-900 placeholder:text-slate-300 resize-none"
              placeholder="Describe your requirements..."
            ></textarea>
          </div>

          <TransmitButton />
        </form>
      </div>
    </section>
  );
}
