import { useState } from "react";
import useAuthStore from "../Stores/AuthStore";

const VerifyEmailAddress = () => {
  const {
    SendOtpButton,
    AuthUser,
    isSendingOtp,
    VerifyOtp,
  } = useAuthStore();

  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    await SendOtpButton(AuthUser?.email);
    setShowModal(true);
  };

  const handleVerifyOtp = async () => {
    await VerifyOtp(AuthUser?._id, otp);
    setShowModal(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6 py-10">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] h-[350px] w-[350px] rounded-full bg-indigo-500/30 blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-violet-500/30 blur-3xl"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[36px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
        {/* TOP ICON */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-indigo-500 to-violet-600 text-5xl shadow-2xl">
          ✉️
        </div>

        {/* HEADING */}
        <div className="mt-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
            Email Verification
          </p>

          <h1 className="mt-4 text-4xl font-black text-white">
            Verify Your Email
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Your email address is not verified yet.
            <br />
            Verify now to unlock all features of the
            E-Court Diary platform.
          </p>
        </div>

        {/* USER EMAIL */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Registered Email
          </p>

          <p className="mt-2 break-all text-sm font-semibold text-white">
            {AuthUser?.email}
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-lg">
              🔐
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Secure Verification
              </h3>

              <p className="text-xs text-slate-400">
                OTP based secure verification system.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-lg">
              ⚡
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Instant Access
              </h3>

              <p className="text-xs text-slate-400">
                Unlock all dashboard features instantly.
              </p>
            </div>
          </div>
        </div>

        {/* SEND OTP BUTTON */}
        <button
          disabled={isSendingOtp}
          onClick={handleSendOtp}
          className="group relative mt-8 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-xl transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100"></span>

          <span className="relative">
            {isSendingOtp ? "Sending OTP..." : "Send OTP"}
          </span>
        </button>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Secure email verification powered by
            E-Court Diary.
          </p>
        </div>
      </div>

      {/* OTP MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-6">
          <div className="w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-2xl">
            {/* ICON */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-emerald-500 to-green-600 text-5xl shadow-2xl">
              🔑
            </div>

            {/* TITLE */}
            <div className="mt-6 text-center">
              <h2 className="text-3xl font-black text-white">
                Enter OTP
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                A verification code has been sent to
                your email address.
              </p>
            </div>

            {/* OTP INPUT */}
            <div className="mt-8">
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Verification Code
              </label>

              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="------"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-5 text-center text-3xl font-black tracking-[14px] text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
              />
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 font-semibold text-slate-300 transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleVerifyOtp}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 py-4 font-bold text-white shadow-xl transition hover:scale-[1.02]"
              >
                Verify OTP
              </button>
            </div>

            {/* RESEND */}
            <button
              onClick={handleSendOtp}
              className="mt-5 w-full text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailAddress;