import React from "react";

const Login = () => {
    const [state, setState] = React.useState("login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="sm:w-87.5 w-full text-center bg-white border border-slate-200 shadow-xl rounded-2xl px-8"
        >
            <h1 className="text-slate-900 text-3xl mt-10 font-semibold">
                {state === "login" ? "Login" : "Sign up"}
            </h1>

            <p className="text-slate-500 text-sm mt-2">
                Please sign in to continue
            </p>

            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-slate-50 border border-slate-200 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg width="16" height="16" fill="none" stroke="currentColor" className="text-emerald-500" strokeWidth="2">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-slate-50 border border-slate-200 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg width="14" height="14" fill="none" stroke="currentColor" className="text-emerald-500" strokeWidth="2">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <input
                    type="email"
                    name="email"
                    placeholder="Email id"
                    className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="flex items-center mt-4 w-full bg-slate-50 border border-slate-200 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg width="14" height="14" fill="none" stroke="currentColor" className="text-emerald-500" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mt-4 text-left">
                <button className="text-sm text-emerald-600 hover:underline">
                    Forgot password?
                </button>
            </div>

            <button
                type="submit"
                className="mt-3 w-full h-11 rounded-full text-white bg-emerald-600 hover:bg-emerald-500 transition"
            >
                {state === "login" ? "Login" : "Sign up"}
            </button>

            <p
                onClick={() =>
                    setState(prev => prev === "login" ? "register" : "login")
                }
                className="text-slate-500 text-sm mt-4 mb-10 cursor-pointer"
            >
                {state === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                <span className="text-emerald-600 hover:underline ml-1">
                    click here
                </span>
            </p>
        </form>
    )
}

export default Login;