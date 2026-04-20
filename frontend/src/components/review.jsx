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
                    animation: scroll 28s linear infinite;
                }

                .scroll-container:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <section className="w-full flex flex-col items-start px-4 md:px-10 lg:px-16 text-sm overflow-hidden mb-20">

                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                    <span>Testimonials</span>
                </div>

                <h1 className="text-3xl font-medium bg-gradient-to-r from-emerald-800 to-emerald-500 text-transparent bg-clip-text mt-4">
                    What Patients Are Saying
                </h1>

                <p className="text-slate-500 mt-4 max-w-2xl">
                    Real experiences from people using InstantMD in their daily lives.
                </p>

                <div className="mt-10 overflow-hidden w-full">
                    <div className="scroll-container gap-6">

                        {[
                            {
                                text: "I usually hate booking appointments, but this was actually quick. Took me like 2 minutes.",
                                name: "Rahul S."
                            },
                            {
                                text: "Booked a doctor at 11 PM for the next day. Didn’t expect it to be this smooth honestly.",
                                name: "Sneha I."
                            },
                            {
                                text: "Earlier I had to call hospitals multiple times. Now I just check and book here. Much easier.",
                                name: "Amit V."
                            },
                            {
                                text: "Not super tech-savvy, but I could still use it without any help. That says a lot.",
                                name: "Suchith N."
                            },
                            {
                                text: "Found a nearby doctor quickly when I needed one urgently. That was really helpful.",
                                name: "Arjun P."
                            },
                            {
                                text: "UI is clean and simple. No unnecessary steps, which I liked.",
                                name: "Rohit K."
                            },
                            {
                                text: "I didn’t have to wait in line at the hospital anymore. That alone makes it worth it.",
                                name: "Megha R."
                            },
                            {
                                text: "Sometimes slots fill fast, but overall booking is way better than offline.",
                                name: "Vikram D."
                            }
                        ].map((item, index) => (
                            <div key={index} className="min-w-[300px] max-w-[300px] border border-emerald-100 p-6 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition duration-500 bg-white">

                                <div className="flex text-yellow-400 mb-3">
                                    {"★★★★★"}
                                </div>

                                <p className="text-base text-slate-600 leading-relaxed">
                                    {item.text}
                                </p>

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
                                        <p className="text-gray-500 text-sm">Patient</p>
                                    </div>
                                </div>

                            </div>
                        ))}

                        {/* Duplicate for smooth loop */}
                        {[...Array(4)].map((_, index) => (
                            <div key={"dup" + index} className="min-w-[300px] max-w-[300px] border border-emerald-100 p-6 rounded-xl bg-white">
                                <div className="flex text-yellow-400 mb-3">
                                    {"★★★★★"}
                                </div>
                                <p className="text-base text-slate-600">
                                    Pretty useful overall. Saves time compared to going directly.
                                </p>
                                <div className="flex items-center gap-3 mt-6">
                                    <img
                                        className="size-12 rounded-full"
                                        src={`https://i.pravatar.cc/100?img=${index + 30}`}
                                        alt="user"
                                    />
                                    <div>
                                        <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                                            User
                                            <span className="text-emerald-600 text-sm">✔️</span>
                                        </h2>
                                        <p className="text-gray-500 text-sm">Patient</p>
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