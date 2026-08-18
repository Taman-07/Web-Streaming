import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     DEFAULT PROFILE IMAGE
  ===================================================== */

  const defaultProfilePic =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  /* =====================================================
     GET LOGGED-IN USER
  ===================================================== */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          BASE_URL + "/profile/view",
          {
            withCredentials: true,
          }
        );

        console.log("Profile response:", res.data);

        setUser(res.data);

      } catch (err) {
        console.log(
          "Profile Error:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
            err.response?.data ||
            "Unable to load profile. Please login again."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b0f] text-white flex items-center justify-center">
        <p className="text-xl text-[#89929c]">
          Loading Profile...
        </p>
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#070b0f] text-white flex items-center justify-center px-5">

        <div className="bg-[#0b1015] border border-[#27313a] rounded-2xl px-8 py-6 text-center">

          <p className="text-red-400 text-lg mb-5">
            {error || "User not found."}
          </p>

          <button
            onClick={() => navigate("/body")}
            className="
              bg-[#ff0033]
              hover:bg-[#e6002d]
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
              cursor-pointer
            "
          >
            Go to Homepage
          </button>

        </div>

      </div>
    );
  }

  /* =====================================================
     MONGODB DATA

     profilePic -> Profile Image
     bio        -> About
     emailId    -> Email
     username   -> Username
  ===================================================== */

  const userImage = user.profilePic || defaultProfilePic;

  const userBio =
    user.bio || "No bio added yet.";

  console.log("MongoDB profilePic:", user.profilePic);
  console.log("MongoDB bio:", user.bio);

  /* =====================================================
     PROFILE PAGE
  ===================================================== */

  return (
    <div className="min-h-screen bg-[#070b0f] text-white flex items-center justify-center px-5 py-8">

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

        {/* =================================================
            LEFT PROFILE SECTION
        ================================================= */}

        <div
          className="
            w-full
            lg:w-[55%]
            px-8
            sm:px-12
            py-10
            flex
            flex-col
            justify-center
          "
        >

          {/* =================================================
              TOP TEXT
          ================================================= */}

          <div className="mb-8">

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
              My Profile
            </p>

            <h1
              className="
                text-4xl
                font-bold
                tracking-tight
              "
            >
              Welcome, {user.username}
            </h1>

            <p
              className="
                text-[#89929c]
                mt-3
                leading-relaxed
              "
            >
              Your personal space. Discover your profile,
              information and everything about you.
            </p>

          </div>


          {/* =================================================
              PROFILE HEADER CARD
          ================================================= */}

          <div
            className="
              bg-[#11171d]
              border
              border-[#27313a]
              rounded-2xl
              p-6
              flex
              items-center
              gap-5
            "
          >

            {/* PROFILE IMAGE */}

            <div
              className="
                w-24
                h-24
                flex-shrink-0
                rounded-full
                ring
                ring-[#ff0033]
                ring-offset-[#11171d]
                ring-offset-4
                overflow-hidden
                bg-[#070b0f]
              "
            >

              <img
                src={userImage}
                alt={`${user.username} profile`}
                className="
                  w-full
                  h-full
                  object-cover
                "
                onError={(e) => {
                  e.currentTarget.src = defaultProfilePic;
                }}
              />

            </div>


            {/* USER DETAILS */}

            <div className="min-w-0">

              <h2
                className="
                  text-2xl
                  font-bold
                  truncate
                "
              >
                {user.username}
              </h2>

              <p
                className="
                  text-[#89929c]
                  mt-1
                  truncate
                "
              >
                {user.emailId}
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-3
                "
              >

                <span
                  className="
                    h-2
                    w-2
                    bg-green-500
                    rounded-full
                  "
                />

                <span className="text-xs text-[#89929c]">
                  Active
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              ABOUT / BIO
          ================================================= */}

          <div className="mt-6">

            <p
              className="
                text-[#aeb6bf]
                text-sm
                mb-2
              "
            >
              About
            </p>

            <div
              className="
                bg-[#11171d]
                border
                border-[#27313a]
                rounded-xl
                px-4
                py-4
                text-[#c3c8cd]
                leading-relaxed
                min-h-[74px]
              "
            >
              {userBio}
            </div>

          </div>


          {/* =================================================
              USER INFORMATION
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
              mt-6
            "
          >

            {/* EMAIL */}

            <div
              className="
                bg-[#11171d]
                border
                border-[#27313a]
                rounded-xl
                p-4
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-[#ff0033]/10
                  text-[#ff0033]
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <FaEnvelope />
              </div>

              <div className="min-w-0">

                <p className="text-xs text-[#69737d]">
                  Email
                </p>

                <p
                  className="
                    text-sm
                    font-medium
                    truncate
                  "
                >
                  {user.emailId}
                </p>

              </div>

            </div>


            {/* USERNAME */}

            <div
              className="
                bg-[#11171d]
                border
                border-[#27313a]
                rounded-xl
                p-4
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-10
                  h-10
                  rounded-lg
                  bg-[#ff0033]/10
                  text-[#ff0033]
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <FaUser />
              </div>

              <div className="min-w-0">

                <p className="text-xs text-[#69737d]">
                  Username
                </p>

                <p
                  className="
                    text-sm
                    font-medium
                    truncate
                  "
                >
                  {user.username}
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              GO TO HOMEPAGE
          ================================================= */}

          <button
            onClick={() => navigate("/body")}
            className="
              mt-8
              w-full
              bg-[#ff0033]
              hover:bg-[#e6002d]
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
              duration-200
              shadow-lg
              cursor-pointer
            "
          >
            Go to Homepage
          </button>


          {/* =================================================
              EDIT PROFILE
          ================================================= */}

          <button
            onClick={() => navigate("/editProfile")}
            className="
              mt-8
              w-full
              bg-[#ff0033]
              hover:bg-[#e6002d]
              text-white
              font-semibold
              py-3
              rounded-xl
              transition
              duration-200
              shadow-lg
              cursor-pointer
            "
          >
            Edit Profile
          </button>

        </div>


        {/* =================================================
            RIGHT PROFILE IMAGE SECTION
        ================================================= */}

        <div
          className="
            hidden
            lg:block
            w-[45%]
            p-4
          "
        >

          <div
            className="
              relative
              h-full
              rounded-2xl
              overflow-hidden
              bg-[#070b0f]
            "
          >

            {/* PROFILE IMAGE FROM MONGODB */}

            <img
              src={userImage}
              alt={`${user.username} profile`}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
              onError={(e) => {
                e.currentTarget.src = defaultProfilePic;
              }}
            />


            {/* DARK OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-black/50
                to-black/10
              "
            />


            {/* PROFILE BADGE */}

            <div
              className="
                absolute
                top-8
                left-8
              "
            >

            </div>


            {/* BOTTOM CONTENT */}

            <div
              className="
                absolute
                bottom-10
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
                YOUR SPACE
              </p>

              <h2
                className="
                  text-3xl
                  xl:text-4xl
                  font-bold
                  leading-tight
                "
              >
                {user.username}
              </h2>


              {/* BIO FROM MONGODB */}

              <p
                className="
                  text-[#c3c8cd]
                  mt-3
                  leading-relaxed
                "
              >
                {userBio}
              </p>


              {/* ACTIVE MEMBER */}

              <div className="flex items-center gap-3 mt-6">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    bg-black/40
                    backdrop-blur-md
                    border
                    border-white/10
                    px-4
                    py-2
                    rounded-full
                  "
                >

                  <span
                    className="
                      w-2
                      h-2
                      bg-green-500
                      rounded-full
                    "
                  />

                  <span className="text-xs">
                    Active Member
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
