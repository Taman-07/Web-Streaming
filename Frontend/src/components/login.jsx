import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "../utils/constants";

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

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [slide, setSlide] = useState(0);

  const [error, setError] = useState("");

  const current = slides[slide];


  const handleLogin = async () => {

  console.log("Login clicked");

  try {
    const res = await axios.post(
      BASE_URL + "/login",
      {
        emailId: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Response:", res.data);

  } catch (err) {

    console.log("Error:", err.response?.data || err.message);

    setError(
      err?.response?.data || "Something went Wrong !!"
    );
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };


  const prevSlide = () =>
    setSlide((i) =>
      i === 0 ? slides.length - 1 : i - 1
    );


  const nextSlide = () =>
    setSlide((i) =>
      i === slides.length - 1 ? 0 : i + 1
    );


  return (

    <div className="min-h-screen w-full flex items-center justify-center p-4">

      <div className="w-full max-w-[920px] bg-white rounded-[28px] shadow-xl flex overflow-hidden">


        {/* LEFT FORM */}

        <div className="w-full md:w-1/2 px-8 py-10">


          <div className="text-center mb-9">

            <h1 className="text-3xl font-bold">
              Hello Again!
            </h1>

            <p className="text-gray-400 mt-3">
              Welcome back to your streaming library
            </p>

          </div>



          <form onSubmit={handleSubmit} className="space-y-4">


            <input

              type="email"

              placeholder="Email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              className="w-full bg-gray-100 rounded-xl px-4 py-3"

              required

            />



            <div className="relative">

              <input

                type={showPassword ? "text":"password"}

                placeholder="Password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-12"

                required

              />



              <button

                type="button"

                onClick={() =>
                  setShowPassword(!showPassword)
                }

                className="absolute right-4 top-3"

              >

                {
                  showPassword
                  ?
                  <FaEyeSlash/>
                  :
                  <FaEye/>
                }

              </button>


            </div>



            {
              error &&

              <p className="text-red-500 text-sm text-center">
                {error}
              </p>

            }



            <button type="submit" className="w-full bg-[#926c72] text-white rounded-xl py-3">
              Log In
            </button>
          </form>



          <p className="text-center mt-8 text-gray-400">

            Don't have an account?

            <Link
              to="/signup"
              className="text-[#926c72] ml-1"
            >
              Sign Up
            </Link>

          </p>



        </div>





        {/* RIGHT IMAGE */}


        <div className="hidden md:block w-1/2 p-4">


          <div className="relative h-full rounded-3xl overflow-hidden">


            <img

              src={current.image}

              className="w-full h-full object-cover"

            />



            <div className="absolute bottom-10 left-8 text-white text-xl">

              {current.caption}

            </div>



            <div className="absolute bottom-5 left-5 flex gap-3">


              <button
                onClick={prevSlide}
                className="border rounded-full px-3 py-1 text-white"
              >
                ←
              </button>



              <button
                onClick={nextSlide}
                className="border rounded-full px-3 py-1 text-white"
              >
                →
              </button>


            </div>


          </div>


        </div>


      </div>


    </div>

  );

}