import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";

const EditProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

        console.log("Edit Profile User:", res.data);

        const userData = res.data;

        setUser(userData);

        // Backend field names
        setBio(userData.bio || "");
        setProfilePic(userData.profilePic || "");

      } catch (err) {
        console.log(
          "Edit Profile Error:",
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
     SAVE PROFILE
  ===================================================== */

  const saveProfile = async () => {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          profilePic: profilePic,
          bio: bio,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Updated Profile:", res.data);

      setMessage("Profile updated successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);

    } catch (err) {
      console.log(
        "Save Profile Error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

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
     ERROR WHILE LOADING
  ===================================================== */

  if (error && !user) {
    return (
      <div className="min-h-screen bg-[#070b0f] text-white flex items-center justify-center px-5">

        <div className="bg-[#0b1015] border border-[#27313a] rounded-2xl px-8 py-6 text-center">

          <p className="text-red-400 text-lg mb-5">
            {error}
          </p>

          <button
            onClick={() => navigate("/profile")}
            className="
              bg-[#ff0033]
              hover:bg-[#e6002d]
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Back to Profile
          </button>

        </div>

      </div>
    );
  }

  /* =====================================================
     EDIT PROFILE PAGE
  ===================================================== */

  return (
    <div className="min-h-screen bg-[#070b0f] text-white px-5 py-8">

      <div className="max-w-[1100px] mx-auto">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/profile")}
          className="
            flex
            items-center
            gap-2
            text-[#89929c]
            hover:text-white
            transition
            mb-6
            cursor-pointer
          "
        >
          <FaArrowLeft />
          Back to Profile
        </button>

        {/* TITLE */}

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
            Account Settings
          </p>

          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
            "
          >
            Edit Profile
          </h1>

          <p
            className="
              text-[#89929c]
              mt-3
            "
          >
            Update your profile information and personalize
            your account.
          </p>

        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "
        >

          {/* =================================================
              LEFT - EDIT FORM
          ================================================= */}

          <div
            className="
              bg-[#0b1015]
              border
              border-[#1c252e]
              rounded-3xl
              p-6
              sm:p-8
              shadow-2xl
            "
          >

            <h2 className="text-2xl font-bold mb-6">
              Profile Information
            </h2>

            {/* BIO */}

            <div className="mb-6">

              <label
                className="
                  block
                  text-sm
                  text-[#aeb6bf]
                  mb-2
                "
              >
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell something about yourself"
                rows="5"
                className="
                  w-full
                  bg-[#11171d]
                  border
                  border-[#27313a]
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  resize-none
                  focus:border-[#ff0033]
                  transition
                "
              />

            </div>

            {/* PROFILE PHOTO */}

            <div className="mb-6">

              <label
                className="
                  block
                  text-sm
                  text-[#aeb6bf]
                  mb-2
                "
              >
                Profile Photo URL
              </label>

              <input
                type="url"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                placeholder="Paste profile image URL"
                className="
                  w-full
                  bg-[#11171d]
                  border
                  border-[#27313a]
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-[#ff0033]
                  transition
                "
              />

              <p className="text-xs text-[#69737d] mt-2">
                Paste a valid image URL.
              </p>

            </div>

            {/* ERROR */}

            {error && (
              <div
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  rounded-xl
                  px-4
                  py-3
                  mb-5
                  text-sm
                "
              >
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {message && (
              <div
                className="
                  bg-green-500/10
                  border
                  border-green-500/20
                  text-green-400
                  rounded-xl
                  px-4
                  py-3
                  mb-5
                  text-sm
                "
              >
                {message}
              </div>
            )}

            {/* SAVE BUTTON */}

            <button
              onClick={saveProfile}
              disabled={saving}
              className="
                w-full
                bg-[#ff0033]
                hover:bg-[#e6002d]
                disabled:opacity-50
                disabled:cursor-not-allowed
                text-white
                font-semibold
                py-3
                rounded-xl
                transition
                duration-200
                shadow-lg
                flex
                items-center
                justify-center
                gap-2
                cursor-pointer
              "
            >
              <FaSave />

              {saving ? "Saving..." : "Save Profile"}
            </button>

          </div>

          {/* =================================================
              RIGHT - LIVE PREVIEW
          ================================================= */}

          <div
            className="
              bg-[#0b1015]
              border
              border-[#1c252e]
              rounded-3xl
              p-6
              sm:p-8
              shadow-2xl
            "
          >

            <h2 className="text-2xl font-bold mb-6">
              Profile Preview
            </h2>

            {/* PREVIEW IMAGE */}

            <div className="flex justify-center mb-6">

              <div
                className="
                  w-32
                  h-32
                  rounded-full
                  ring
                  ring-[#ff0033]
                  ring-offset-[#0b1015]
                  ring-offset-4
                  overflow-hidden
                  bg-[#070b0f]
                "
              >

                <img
                  src={
                    profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile Preview"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                  }}
                />

              </div>

            </div>

            {/* PREVIEW EMAIL */}

            <div className="text-center mb-6">

              <p className="text-[#89929c] mt-2">
                {user?.emailId}
              </p>

            </div>

            {/* PREVIEW BIO */}

            <div>

              <p
                className="
                  text-[#aeb6bf]
                  text-sm
                  mb-2
                "
              >
                Bio
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
                  min-h-[100px]
                "
              >
                {bio || "Your bio will appear here..."}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EditProfile;
