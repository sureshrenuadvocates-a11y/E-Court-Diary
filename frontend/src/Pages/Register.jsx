import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../Stores/AuthStore";

const Register = () => {
  const { Register } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    MobileNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Register(
      formData.username,
      formData.email,
      formData.password,
      formData.MobileNumber
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-[-100px] h-[350px] w-[350px] rounded-full bg-violet-500/30 blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] h-[400px] w-[400px] rounded-full bg-indigo-500/30 blur-3xl"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 p-12 text-white lg:flex">
            <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
                ⚖️ E-Court Diary System
              </div>

              <h1 className="mt-8 text-5xl font-black leading-tight">
                Create Your
                <br />
                Legal Workspace
              </h1>

              <p className="mt-6 max-w-md text-lg text-indigo-100">
                Join the next-generation E-Court Diary platform and
                manage all court records securely and efficiently.
              </p>
            </div>

            {/* FEATURES */}
            <div className="relative z-10 mt-10 space-y-5">
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">
                  🛡️
                </div>

                <div>
                  <h3 className="font-bold">
                    Secure Registration
                  </h3>

                  <p className="text-sm text-indigo-100">
                    Protected account creation and verification.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">
                  📂
                </div>

                <div>
                  <h3 className="font-bold">
                    Court Diary Records
                  </h3>

                  <p className="text-sm text-indigo-100">
                    Organize legal records with ease.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">
                  ⚡
                </div>

                <div>
                  <h3 className="font-bold">
                    Fast & Modern
                  </h3>

                  <p className="text-sm text-indigo-100">
                    Responsive dashboard with modern UI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white px-8 py-10 sm:px-14 lg:px-16">
            <div className="mx-auto max-w-md">
              {/* MOBILE LOGO */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl text-white shadow-lg">
                  ⚖️
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    E-Court Diary
                  </h2>

                  <p className="text-sm text-slate-500">
                    Registration Portal
                  </p>
                </div>
              </div>

              {/* HEADER */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
                  Join Platform
                </p>

                <h2 className="mt-4 text-4xl font-black text-slate-900">
                  Create Account
                </h2>

                <p className="mt-3 text-slate-500">
                  Register your account to access the E-Court
                  Diary dashboard.
                </p>
              </div>

              {/* FORM */}
              <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit}
              >
                {/* USERNAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Username
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      👤
                    </div>

                    <input
                      type="text"
                      name="username"
                      required
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm transition focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      ✉️
                    </div>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm transition focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                </div>

                {/* MOBILE NUMBER */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Mobile Number
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      📱
                    </div>

                    <input
                      type="text"
                      name="MobileNumber"
                      required
                      placeholder="Enter mobile number"
                      value={formData.MobileNumber}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm transition focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      🔒
                    </div>

                    <input
                      type={
                        showPassword ? "text" : "password"
                      }
                      name="password"
                      required
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-14 text-sm text-slate-900 shadow-sm transition focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-6 py-4 text-sm font-bold text-white shadow-xl transition duration-300 hover:scale-[1.02]"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100"></span>

                  <span className="relative">
                    Create Account
                  </span>
                </button>

                {/* LOGIN */}
                <div className="pt-2 text-center">
                  <p className="text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-bold text-violet-600 hover:text-violet-700"
                    >
                      Login Here
                    </Link>
                  </p>
                </div>
              </form>

              {/* FOOTER */}
              <div className="mt-10 border-t border-slate-200 pt-6 text-center">
                <p className="text-xs text-slate-400">
                  © 2026 E-Court Diary Platform. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;