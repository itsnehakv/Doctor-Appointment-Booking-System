import img from "../assets/doctor-hero.jpg"
const Hero = () => {
  return (
    <section className='w-full bg-[url("https://assets.prebuiltui.com/images/components/hero-section/hero-grid-gradient-img.png")] bg-cover bg-center bg-no-repeat px-4 pb-10'>

      <div className='w-full md:px-16 lg:px-24 xl:px-32 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-20'>

        {/* LEFT */}
        <div className='flex flex-col items-start'>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-sm mt-10">
            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
              HEALTH
            </span>
            <p className="text-emerald-700 text-sm">
              Trusted by 10,000+ patients
            </p>
          </div>

          <h1 className="text-neutral-900 text-4xl md:text-5xl lg:text-[52px]/16 leading-tight font-semibold max-w-[610px] mt-4">
            Book Doctor Appointments{" "}
            <span className="text-emerald-600">
              Instantly
            </span>
          </h1>

          <p className="text-base text-neutral-600 max-w-md mt-4">
            Find verified doctors, check availability, and book appointments
            easily. Fast, reliable healthcare at your fingertips.
          </p>

          <div className="flex items-center border gap-2 border-neutral-300 h-12 max-w-[440px] w-full rounded-full overflow-hidden mt-6">
            <input
              type="text"
              placeholder="Search doctors, clinics..."
              className="w-full h-full pl-6 outline-none text-sm bg-transparent text-neutral-600"
            />

            <button className="bg-emerald-600 hover:bg-emerald-700 w-40 h-10 rounded-full text-sm text-white cursor-pointer mr-1.5 transition">
              Search
            </button>
          </div>

          <div className="flex items-center gap-6 mt-10">
            <div className="flex gap-4">
              <div className="p-2 bg-white border rounded-full shadow-sm">🩺</div>
              <div className="p-2 bg-white border rounded-full shadow-sm">💊</div>
              <div className="p-2 bg-white border rounded-full shadow-sm">🏥</div>
              <div className="p-2 bg-white border rounded-full shadow-sm">👨‍⚕️</div>
            </div>

            <div>
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-xs text-neutral-600">
                Trusted healthcare platform
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT IMAGE */}
<div className="max-w-[450px] mx-auto">
  <img src={img} className="w-full rounded-xl shadow-md" alt="Healthcare" />
</div>

</div>
    </section>
  );
};

export default Hero;