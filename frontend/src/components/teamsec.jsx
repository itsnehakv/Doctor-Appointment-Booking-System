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

                    <h1 className="text-3xl font-medium text-slate-800">
                        Meet Our Team
                    </h1>

                    <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
                        At InstantMD, our team works together to simplify healthcare access by providing
                        a seamless hospital appointment booking experience. We combine medical expertise
                        with technology to connect patients and doctors efficiently.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mt-12">

                    {/* 1 */}
                    <div className="flex flex-col items-center">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                            alt="User" className="size-20 rounded-full" />
                        <h3 className="text-lg font-medium text-slate-700 mt-2">Dr. Rahul Sharma</h3>
                        <p className="text-sm text-emerald-600">Founder & CEO</p>
                    </div>

                    {/* 2 */}
                    <div className="flex flex-col items-center">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                            alt="User" className="size-20 rounded-full" />
                        <h3 className="text-lg font-medium text-slate-700 mt-2">Chris Evans</h3>
                        <p className="text-sm text-emerald-600">Chief Medical Officer (CMO)
</p>
                    </div>

                    {/* 3 */}
                    <div className="flex flex-col items-center">
                        <img src="https://randomuser.me/api/portraits/men/75.jpg"
                            alt="User" className="size-20 rounded-full" />
                        <h3 className="text-lg font-medium text-slate-700 mt-2">Peter Griffin</h3>
                        <p className="text-sm text-emerald-600">Clinical Systems Analyst
</p>
                    </div>

                    {/* 4 */}
                    <div className="flex flex-col items-center">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                            alt="User" className="size-20 rounded-full" />
                        <h3 className="text-lg font-medium text-slate-700 mt-2">Emma John</h3>
                        <p className="text-sm text-emerald-600">Health Informatics Specialist
</p>
                    </div>

                    {/* 5 */}
                    <div className="flex flex-col items-center">
                        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60"
                            alt="User" className="size-20 rounded-full" />
                        <h3 className="text-lg font-medium text-slate-700 mt-2">Dr. Vikram Singh</h3>
                        <p className="text-sm text-emerald-600">Healthcare Coordinator</p>
                    </div>

                    {/* 6 */}
                    <div className="flex flex-col items-center">
                        <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
                            alt="User" className="size-20 rounded-full" />
                        <h3 className="text-lg font-medium text-slate-700 mt-2">Maximus Decimus</h3>
                        <p className="text-sm text-emerald-600">DevOps Engineer</p>
                    </div>

                </div>
            </section>
        </>
    );
};