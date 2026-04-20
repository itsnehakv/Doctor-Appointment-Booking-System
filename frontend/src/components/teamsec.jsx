import lady1img from "../assets/lady1.webp";
import lady2img from "../assets/lady2.jpg";
import man2img from "../assets/man2.jpg";
import man3img from "../assets/man3.avif";
import man4img from "../assets/man4.webp";
import founderimg from "../assets/founder.avif";
export default function TeamSec() {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
            `}</style>

      <section className="max-w-4xl mx-auto font-[Poppins]">
        {/* Heading */}
        <div className="text-center">
          {/* ✅ Green Line */}
          <div className="w-16 h-[3px] bg-gradient-to-r from-emerald-600 to-emerald-300 rounded-full mx-auto mb-3"></div>

          <h1 className="text-3xl font-medium text-slate-800">Meet Our Team</h1>

          <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
            At InstantMD, our team works together to simplify healthcare access
            by providing a seamless hospital appointment booking experience. We
            combine medical expertise with technology to connect patients and
            doctors efficiently.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mt-12">
          {/* 1 */}
          <div className="flex flex-col items-center">
            <div className="size-20 rounded-full overflow-hidden border-2 border-emerald-100 shadow-sm">
              <img
                src={founderimg}
                alt="User"
                className="w-full h-full object-cover object-center scale-150"
              />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mt-2">
              Dr. Ithal Sundaram
            </h3>
            <p className="text-sm text-emerald-600">Founder & CEO</p>
          </div>

          {/* 2 */}
          <div className="flex flex-col items-center">
            {/* The Container is the "Window" */}
            <div className="size-20 rounded-full overflow-hidden border-2 border-emerald-100 shadow-sm">
              <img
                src={man2img}
                alt="User"
                className="w-full h-full object-cover object-center scale-150"
              />
            </div>

            <h3 className="text-lg font-medium text-slate-700 mt-2">
              Joseph Cherakkal
            </h3>
            <p className="text-sm text-emerald-600">
              Chief Medical Officer (CMO)
            </p>
          </div>

          {/* 3 */}
          <div className="flex flex-col items-center">
            <img
              src={lady2img}
              alt="User"
              className="size-20 rounded-full object-cover object-center border-2 border-emerald-100 shadow-sm"
            />
            <h3 className="text-lg font-medium text-slate-700 mt-2">
              Dr. Ananya John
            </h3>
            <p className="text-sm text-emerald-600">Clinical Systems Analyst</p>
          </div>

          {/* 4 */}
          <div className="flex flex-col items-center">
            <img
              src={lady1img}
              alt="User"
              className="size-20 rounded-full object-cover object-center border-2 border-emerald-100 shadow-sm"
            />
            <h3 className="text-lg font-medium text-slate-700 mt-2">
              Anushka Kadavil
            </h3>
            <p className="text-sm text-emerald-600">
              Health Informatics Specialist
            </p>
          </div>

          {/* 5 */}
          <div className="flex flex-col items-center">
            <img
              src={man3img}
              alt="User"
              className="size-20 rounded-full object-cover object-center border-2 border-emerald-100 shadow-sm"
            />
            <h3 className="text-lg font-medium text-slate-700 mt-2">
              Dr. Vikram Nihal
            </h3>
            <p className="text-sm text-emerald-600">Healthcare Coordinator</p>
          </div>

          {/* 6 */}
          <div className="flex flex-col items-center">
            <img
              src={man4img}
              alt="User"
              className="size-20 rounded-full object-cover object-center border-2 border-emerald-100 shadow-sm"
            />
            <h3 className="text-lg font-medium text-slate-700 mt-2">
              Arjun Meera
            </h3>
            <p className="text-sm text-emerald-600">DevOps Engineer</p>
          </div>
        </div>
      </section>
    </>
  );
}
