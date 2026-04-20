import teamImg from "../assets/missionstate.jpg";

export default function MissionState() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
                
                {/* Image Section */}
                <div className="relative shadow-2xl shadow-emerald-600/40 rounded-2xl overflow-hidden shrink-0">
                    
                    <img
                        className="w-full max-w-lg h-[350px] object-cover rounded-2xl"
                        src={teamImg}
                        alt="Medical Team Discussion"
                    />

                    <div className="flex items-center gap-1 max-w-72 absolute bottom-6 left-6 bg-white p-4 rounded-xl">
                        <div className="flex -space-x-4 shrink-0">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt=""
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt=""
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                                alt=""
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]" />
                            <div className="flex items-center justify-center text-xs text-white size-9 rounded-full border-[3px] border-white bg-emerald-600 hover:-translate-y-1 transition z-[4]">
                                50+
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-800">
                            Trusted by patients & doctors
                        </p>
                    </div>
                </div>

                {/* Text Section */}
                <div className="text-sm text-slate-600 max-w-lg">
                    
                    <h1 className="text-xl uppercase font-semibold text-slate-700">
                        About Our Platform
                    </h1>

                    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-emerald-600 to-emerald-200"></div>

                    <p className="mt-8">
                        Our medical appointment booking platform is designed to make healthcare
                        access simple, fast, and reliable. Patients can easily book appointments
                        with doctors without waiting in long queues.
                    </p>

                    <p className="mt-4">
                        We provide real-time doctor availability, seamless scheduling, and a
                        user-friendly interface that helps patients manage their appointments
                        efficiently from anywhere.
                    </p>

                    <p className="mt-4">
                        By connecting patients and healthcare providers through technology,
                        we aim to improve the overall healthcare experience and save valuable time.
                    </p>

                    <a href="#" className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-emerald-600 to-emerald-400 py-3 px-8 rounded-full text-white">
                        <span>Read more</span>
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                            <path
                                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                fill="#fff"
                            />
                        </svg>
                    </a>
                </div>
            </section>
        </>
    );
}