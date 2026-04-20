import DocType from "../assets/doc-typing.avif";
import OpRoom from "../assets/operating-room.avif";

export default function Vision() {
  const values = [
    {
      title: "Absolute Integrity",
      desc: "Data sanctity and privacy are our foundation. Secure by default, always.",
    },
    {
      title: "Engineered Velocity",
      desc: "Zero-latency response infrastructure designed for time-critical care.",
    },
    {
      title: "Empathetic Logic",
      desc: "Human-centric code that amplifies medical expertise rather than replacing it.",
    },
  ];

  return (
    <section className="py-32 bg-white font-geist antialiased">
      <div className="max-w-6xl mx-auto px-6">
        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-40">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-xl uppercase font-bold text-slate-800 tracking-tight">
              Our Mission
            </h2>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-emerald-600 to-emerald-200 mb-8"></div>

            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-6">
              Architecting the
              <span className="text-emerald-600">Bridge to Care.</span>
            </h3>

            <p className="text-slate-600 text-lg leading-relaxed font-light mb-8">
              Our mission is to architect a high-availability digital bridge
              between immediate medical needs and professional care. We are
              dedicated to engineering a platform where life-saving advice and
              clinical expertise are delivered with zero friction.
            </p>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative shadow-2xl shadow-emerald-600/30 rounded-[2.5rem] overflow-hidden">
              <img
                src={DocType}
                alt="Mission"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Vision Section (Reversed) */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-40">
          <div className="w-full lg:w-1/2">
            <div className="relative shadow-2xl shadow-emerald-600/30 rounded-[2.5rem] overflow-hidden">
              <img
                src={OpRoom}
                alt="Vision"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:pl-10">
            <h2 className="text-xl uppercase font-bold text-slate-800 tracking-tight">
              Our Vision
            </h2>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-emerald-600 to-emerald-200 mb-8"></div>

            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-6">
              The Global Backbone of{" "}
              <span className="text-emerald-600">Health.</span>
            </h3>

            <p className="text-slate-600 text-lg leading-relaxed font-light mb-8">
              We envision a future where InstantMD serves as the global backbone
              for autonomous, real-time healthcare. Our goal is to transform
              medical expertise into a fundamental right that is instantly
              accessible to everyone, everywhere.
            </p>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-emerald-600 font-bold text-xl">100%</span>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Commitment
                </p>
              </div>
              <p className="text-sm text-slate-500 font-medium max-w-[180px]">
                Driven by technical excellence and human empathy.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl border border-slate-100 hover:border-emerald-500/30 hover:bg-emerald-50/30 transition-all duration-300"
            >
              <div className="size-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <span className="text-white text-xl font-bold">✦</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-3">
                {value.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
