export default function Testimonials() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
                
                * {
                    font-family: 'Poppins', sans-serif;
                }

                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .scroll-container {
                    display: flex;
                    width: max-content;
                    animation: scroll 25s linear infinite;
                }

                .scroll-container:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* FULL WIDTH + BOTTOM SPACE */}
            <section className="w-full flex flex-col items-start px-4 md:px-10 lg:px-16 text-sm overflow-hidden mb-20">

                {/* Header */}
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                    <span>Testimonials</span>
                </div>

                <h1 className="text-3xl font-medium bg-gradient-to-r from-emerald-800 to-emerald-500 text-transparent bg-clip-text mt-4">
                    Trusted by Patients & Doctors
                </h1>

                <p className="text-slate-500 mt-4 max-w-2xl">
                    InstantMD is helping thousands book doctor appointments faster and easier than ever.
                </p>

                {/* SCROLL AREA */}
                <div className="mt-10 overflow-hidden w-full">
                    <div className="scroll-container gap-6">

                        {[
                            {
                                text: "Booking appointments has never been this easy. InstantMD saved me so much waiting time.",
                                name: "Rahul Sharma",
                                role: "Patient"
                            },
                            {
                                text: "Managing appointments is now seamless. I can focus more on patients instead of paperwork.",
                                name: "Dr. Priya Mehta",
                                role: "General Physician"
                            },
                            {
                                text: "I found the right specialist within minutes. The process is smooth and fast.",
                                name: "Amit Verma",
                                role: "Patient"
                            },
                            {
                                text: "InstantMD helps organize consultations efficiently. Perfect for modern clinics.",
                                name: "Dr. Karan Reddy",
                                role: "Cardiologist"
                            },
                            {
                                text: "No more long queues! Booking from my phone is super convenient.",
                                name: "Sneha Iyer",
                                role: "Patient"
                            },
                            {
                                text: "Improved patient flow in my clinic. Very reliable system.",
                                name: "Dr. Arjun Nair",
                                role: "Dermatologist"
                            }
                        ].map((item, index) => (
                            <div key={index} className="min-w-[300px] max-w-[300px] border border-emerald-100 p-6 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition duration-500 bg-white">

                                {/* Stars */}
                                <div className="flex text-yellow-400 mb-3">
                                    {"★★★★★"}
                                </div>

                                <p className="text-base text-slate-600">{item.text}</p>

                                <div className="flex items-center gap-3 mt-6">
                                    <img
                                        className="size-12 rounded-full"
                                        src={`https://i.pravatar.cc/100?img=${index + 10}`}
                                        alt="user"
                                    />
                                    <div>
                                        <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                                            {item.name}
                                            <span className="text-emerald-600 text-sm">✔️</span>
                                        </h2>
                                        <p className="text-gray-500 text-sm">{item.role}</p>
                                    </div>
                                </div>

                            </div>
                        ))}

                        {/* DUPLICATE FOR SMOOTH LOOP */}
                        {[
                            {
                                text: "Easy booking and great experience every time.",
                                name: "Patient",
                                role: "User"
                            },
                            {
                                text: "Helps doctors manage time efficiently.",
                                name: "Doctor",
                                role: "Specialist"
                            },
                            {
                                text: "Highly recommended for healthcare booking.",
                                name: "User",
                                role: "Patient"
                            }
                        ].map((item, index) => (
                            <div key={"dup" + index} className="min-w-[300px] max-w-[300px] border border-emerald-100 p-6 rounded-xl bg-white">
                                <div className="flex text-yellow-400 mb-3">
                                    {"★★★★★"}
                                </div>
                                <p className="text-base text-slate-600">{item.text}</p>
                                <div className="flex items-center gap-3 mt-6">
                                    <img
                                        className="size-12 rounded-full"
                                        src={`https://i.pravatar.cc/100?img=${index + 30}`}
                                        alt="user"
                                    />
                                    <div>
                                        <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                                            {item.name}
                                            <span className="text-emerald-600 text-sm">✔️</span>
                                        </h2>
                                        <p className="text-gray-500 text-sm">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </section>
        </>
    );
}