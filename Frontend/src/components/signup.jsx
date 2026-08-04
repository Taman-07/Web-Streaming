import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from '../utils/constants';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200",
    caption: "Finally, all your favorites in one place.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200",
    caption: "Stream what you love, anytime.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1200",
    caption: "Movies, shows, and more — ready when you are.",
  },
];

const inputClass =
  "w-full bg-[#eeeeef] text-[#1a1a1a] placeholder:text-[#a8adb5] rounded-xl px-4 py-3 outline-none border border-transparent focus:bg-white focus:border-[#926c72]/40 focus:ring-2 focus:ring-[#926c72]/12 transition";

export default function Signup() {
  const navigate=useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [slide, setSlide] = useState(0);

  const current = slides[slide];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const prevSlide = () =>
    setSlide((i) => (i === 0 ? slides.length - 1 : i - 1));
  const nextSlide = () =>
    setSlide((i) => (i === slides.length - 1 ? 0 : i + 1));

  const handleSignup = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }
       console.log("handleSignup called");
  try {
    const res = await axios.post(
      BASE_URL + "/signup",
      {
        username: form.username,
        emailId: form.email,
        password: form.password,
        confirmPassword:form.confirmPassword
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
    navigate("/body");
  } catch (err) {
    console.log(err.response?.data || err.message);
}
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[radial-gradient(ellipse_at_top,#9a8e97_0%,#7d727c_45%,#6a6068_100%)]">
      <div className="login-fade-up w-full max-w-[960px] min-h-[580px] bg-white rounded-[28px] shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)] flex overflow-hidden">
        {/* LEFT — Form */}
        <div className="w-full md:w-1/2 px-7 sm:px-10 py-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h1 className="text-[1.85rem] sm:text-[2rem] font-bold text-[#1a1a1a] tracking-tight leading-none">
              Create Account
            </h1>
            <p className="mt-2.5 text-[0.875rem] text-[#9ca3af] font-medium">
              Start streaming with your 30 days free trial
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-3">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`${inputClass} pr-12`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b0b5bd] hover:text-[#6b7280] transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-[18px] h-[18px]" />
                ) : (
                  <FaEye className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`${inputClass} pr-12`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b0b5bd] hover:text-[#6b7280] transition"
                aria-label={
                  showConfirm ? "Hide confirm password" : "Show confirm password"
                }
              >
                {showConfirm ? (
                  <FaEyeSlash className="w-[18px] h-[18px]" />
                ) : (
                  <FaEye className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#926c72] hover:bg-[#7f5c62] active:scale-[0.99] transition-all duration-200 rounded-xl py-3.5 text-white font-semibold tracking-wide shadow-[0_12px_24px_-6px_rgba(146,108,114,0.7)]"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-[#e5e5e8]" />
            <span className="mx-3 text-[#9ca3af] text-[0.8rem] whitespace-nowrap">
              Or continue with
            </span>
            <div className="flex-1 border-t border-[#e5e5e8]" />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="w-12 h-12 rounded-xl bg-white border border-[#ececef] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
              aria-label="Continue with Google"
            >
              <FcGoogle className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="w-12 h-12 rounded-xl bg-white border border-[#ececef] shadow-[0_4px_14px_rgba(0,0,0,0.1)] flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.14)] transition-all duration-200"
              aria-label="Continue with Apple"
            >
              <FaApple className="w-5 h-5 text-[#1a1a1a]" />
            </button>
            <button
              type="button"
              className="w-12 h-12 rounded-xl bg-white border border-[#ececef] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
              aria-label="Continue with Facebook"
            >
              <FaFacebookF className="w-[18px] h-[18px] text-[#1877F2]" />
            </button>
          </div>

          <p className="login-fade-up-delay text-center text-sm text-[#9ca3af] mt-6">
            Already have an account?
            <Link
              to="/login"
              className="text-[#926c72] font-medium ml-1 hover:text-[#7f5c62] transition"
            >
              Log In
            </Link>
          </p>
        </div>

        {/* RIGHT — Image panel */}
        <div className="hidden md:block w-1/2 p-4 pl-2">
          <div className="login-slide-in relative h-full min-h-[540px] rounded-[1.75rem] overflow-hidden">
            <img
              key={current.image}
              src={current.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover animate-[login-slide-in_0.55s_ease-out]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

            <p className="absolute bottom-16 left-8 right-14 text-white text-[1.15rem] font-medium leading-snug tracking-wide">
              {current.caption}
            </p>

            <div className="absolute bottom-6 left-6 flex gap-2.5">
              <button
                type="button"
                onClick={prevSlide}
                className="w-9 h-9 rounded-full border border-white/70 text-white flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-9 h-9 rounded-full border border-white/70 text-white flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
