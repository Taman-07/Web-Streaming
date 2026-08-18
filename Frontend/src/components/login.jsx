import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaApple,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "../utils/constants";

const slides = [
  {
    image:
      "https://i.pinimg.com/736x/c2/cd/12/c2cd123596debff14d550f47c8800c76.jpg",
    title: "Your next story starts here.",
    description: "Share your ideas, views with everyone.",
  },
  {
    image:
      "https://i.pinimg.com/736x/b2/ed/39/b2ed398d1e68a9ed6eb1192e81ca6461.jpg",
    title: "Sit back. Press play.",
    description:
      "Your favorite entertainment is always waiting for you.",
  },
  {
    image:
      "https://i.pinimg.com/736x/d0/94/33/d094330eb1900f292b7075167abb06d3.jpg",
    title: "Learn something new everyday.",
    description:
      "Explore new worlds and discover something worth watching.",
  },
  {
    image:
      "https://i.pinimg.com/736x/1c/16/f4/1c16f48dcaf4122b8ca068e412441d8a.jpg",
    title: "Your Next Story Starts Here",
    description:
      "Experience movies and entertainment like never before.",
  },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [slide, setSlide] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const current = slides[slide];

  // =========================================
  // AUTO IMAGE SLIDER
  // =========================================

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((index) =>
        index === slides.length - 1 ? 0 : index + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // =========================================
  // LOGIN
  // =========================================

  const handleLogin = async () => {
    console.log("Login clicked");

    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        {
          // IMPORTANT:
          // Backend cookie/session will be stored by browser
          withCredentials: true,
        }
      );

      console.log("Login response:", res.data);

      // =========================================
      // NO LOCAL STORAGE
      // =========================================
      //
      // Don't store:
      // localStorage.setItem("user", ...)
      // localStorage.setItem("username", ...)
      // localStorage.setItem("token", ...)
      //
      // User information will be fetched from
      // backend/MongoDB whenever required.
      // =========================================

      navigate("/body");

    } catch (err) {
      console.log(
        "Login Error:",
        err.response?.data || err.message
      );

      setError(
        err?.response?.data ||
          "Invalid email or password."
      );
    }
  };

  // =========================================
  // FORM SUBMIT
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  // =========================================
  // PREVIOUS SLIDE
  // =========================================

  const prevSlide = () => {
    setSlide((index) =>
      index === 0 ? slides.length - 1 : index - 1
    );
  };

  // =========================================
  // NEXT SLIDE
  // =========================================

  const nextSlide = () => {
    setSlide((index) =>
      index === slides.length - 1 ? 0 : index + 1
    );
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#070b0f]
        text-white
        flex
        items-center
        justify-center
        px-5
        py-8
      "
    >
      <div
        className="
          w-full
          max-w-[1100px]
          min-h-[650px]
          bg-[#0b1015]
          border
          border-[#1c252e]
          rounded-3xl
          overflow-hidden
          shadow-2xl
          flex
        "
      >

        {/* ========================================= */}
        {/* LEFT LOGIN SECTION */}
        {/* ========================================= */}

        <div
          className="
            w-full
            lg:w-[48%]
            px-8
            sm:px-12
            py-10
            flex
            flex-col
            justify-center
          "
        >

          {/* TOP TEXT */}

          <div className="mb-10">

            <p
              className="
                text-[#ff0033]
                text-xs
                uppercase
                tracking-[0.25em]
                font-semibold
                mb-3
              "
            >
              Welcome back
            </p>

            <h1
              className="
                text-4xl
                font-bold
                tracking-tight
              "
            >
              Log in to continue.
            </h1>

            <p
              className="
                text-[#89929c]
                mt-3
                leading-relaxed
              "
            >
              Continue watching your favorite
              movies, shows, and creators.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label
                className="
                  block
                  text-sm
                  text-[#aeb6bf]
                  mb-2
                "
              >
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  w-full
                  bg-[#11171d]
                  border
                  border-[#27313a]
                  rounded-xl
                  px-4
                  py-3.5
                  text-white
                  placeholder-[#626c76]
                  outline-none
                  transition
                  duration-200
                  focus:border-[#ff0033]
                  focus:ring-1
                  focus:ring-[#ff0033]
                "
                required
              />

            </div>

            {/* PASSWORD */}

            <div>

              <div
                className="
                  flex
                  justify-between
                  mb-2
                "
              >

                <label
                  className="
                    text-sm
                    text-[#aeb6bf]
                  "
                >
                  Password
                </label>

                <button
                  type="button"
                  className="
                    text-xs
                    text-[#ff3b5c]
                    hover:text-[#ff0033]
                    transition
                  "
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="
                    w-full
                    bg-[#11171d]
                    border
                    border-[#27313a]
                    rounded-xl
                    px-4
                    py-3.5
                    pr-12
                    text-white
                    placeholder-[#626c76]
                    outline-none
                    transition
                    duration-200
                    focus:border-[#ff0033]
                    focus:ring-1
                    focus:ring-[#ff0033]
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#7d8791]
                    hover:text-white
                    transition
                  "
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  text-sm
                  rounded-xl
                  px-4
                  py-3
                "
              >
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="
                w-full
                bg-[#ff0033]
                hover:bg-[#e6002e]
                text-white
                font-semibold
                rounded-xl
                py-3.5
                transition
                duration-200
                shadow-lg
                shadow-red-500/10
              "
            >
              Log In
            </button>

          </form>

          {/* DIVIDER */}

          <div
            className="
              flex
              items-center
              gap-4
              my-7
            "
          >

            <div
              className="
                h-px
                bg-[#242c34]
                flex-1
              "
            />

            <span
              className="
                text-xs
                text-[#69737d]
                whitespace-nowrap
              "
            >
              OR CONTINUE WITH
            </span>

            <div
              className="
                h-px
                bg-[#242c34]
                flex-1
              "
            />

          </div>

          {/* SOCIAL BUTTONS */}

          <div
            className="
              grid
              grid-cols-3
              gap-3
            "
          >

            <button
              type="button"
              className="
                h-11
                bg-[#11171d]
                border
                border-[#27313a]
                rounded-xl
                flex
                items-center
                justify-center
                hover:bg-[#171e25]
                hover:border-[#38434d]
                transition
              "
            >
              <FcGoogle className="text-xl" />
            </button>

            <button
              type="button"
              className="
                h-11
                bg-[#11171d]
                border
                border-[#27313a]
                rounded-xl
                flex
                items-center
                justify-center
                hover:bg-[#171e25]
                hover:border-[#38434d]
                transition
              "
            >
              <FaFacebookF
                className="text-[#1877f2]"
              />
            </button>

            <button
              type="button"
              className="
                h-11
                bg-[#11171d]
                border
                border-[#27313a]
                rounded-xl
                flex
                items-center
                justify-center
                hover:bg-[#171e25]
                hover:border-[#38434d]
                transition
              "
            >
              <FaApple className="text-white text-lg" />
            </button>

          </div>

          {/* SIGN UP */}

          <p
            className="
              text-center
              text-sm
              text-[#747e88]
              mt-8
            "
          >
            Don't have an account?

            <Link
              to="/signup"
              className="
                text-white
                font-semibold
                ml-1
                hover:text-[#ff0033]
                transition
              "
            >
              Sign Up
            </Link>

          </p>

        </div>

        {/* ========================================= */}
        {/* RIGHT CINEMATIC SECTION */}
        {/* ========================================= */}

        <div
          className="
            hidden
            lg:block
            w-[52%]
            p-4
          "
        >

          <div
            className="
              relative
              h-full
              rounded-2xl
              overflow-hidden
            "
          >

            {/* IMAGE */}

            <img
              key={current.image}
              src={current.image}
              alt="Cinema"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                transition-all
                duration-700
              "
            />

            {/* OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-black/40
                to-black/10
              "
            />

            {/* FEATURED */}

            <div
              className="
                absolute
                top-8
                left-8
              "
            >

              <span
                className="
                  bg-black/40
                  backdrop-blur-md
                  border
                  border-white/10
                  px-4
                  py-2
                  rounded-full
                  text-xs
                  text-white
                "
              >
                Featured
              </span>

            </div>

            {/* IMAGE CONTENT */}

            <div
              className="
                absolute
                bottom-24
                left-8
                right-8
              "
            >

              <p
                className="
                  text-[#ff0033]
                  uppercase
                  text-xs
                  font-bold
                  tracking-widest
                  mb-3
                "
              >
                STREAM NOW
              </p>

              <h2
                className="
                  text-3xl
                  xl:text-4xl
                  font-bold
                  leading-tight
                  max-w-[500px]
                "
              >
                {current.title}
              </h2>

              <p
                className="
                  text-[#c3c8cd]
                  mt-3
                  max-w-[450px]
                  leading-relaxed
                "
              >
                {current.description}
              </p>

            </div>

            {/* SLIDER CONTROLS */}

            <div
              className="
                absolute
                bottom-8
                left-8
                right-8
                flex
                items-center
                justify-between
              "
            >

              {/* DOTS */}

              <div
                className="
                  flex
                  gap-2
                  items-center
                "
              >

                {slides.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() =>
                      setSlide(index)
                    }
                    className={`
                      h-1.5
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        slide === index
                          ? "w-8 bg-[#ff0033]"
                          : "w-2 bg-white/40"
                      }
                    `}
                  />
                ))}

              </div>

              {/* ARROWS */}

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={prevSlide}
                  className="
                    w-9
                    h-9
                    rounded-full
                    border
                    border-white/20
                    bg-black/30
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    hover:bg-white/10
                    transition
                  "
                >
                  <FaArrowLeft className="text-xs" />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  className="
                    w-9
                    h-9
                    rounded-full
                    border
                    border-white/20
                    bg-black/30
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    hover:bg-white/10
                    transition
                  "
                >
                  <FaArrowRight className="text-xs" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
