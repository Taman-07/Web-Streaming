import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

/* =========================================================
   VIDEOS
========================================================= */

const videos = [
  {
    title: "Exploring the Mountains",
    channel: "Adventure Daily",
    views: "2.1M views",
    time: "2 days ago",
    duration: "14:28",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
  },
  {
    title: "Building a Streaming Setup",
    channel: "Tech With Sam",
    views: "1.2M views",
    time: "4 days ago",
    duration: "18:42",
    image:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=900&q=80",
  },
  {
    title: "5 Quick & Healthy Recipes",
    channel: "Tasty Bites",
    views: "3.4M views",
    time: "1 week ago",
    duration: "9:15",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80",
  },
  {
    title: "Acoustic Cover: Perfect",
    channel: "Music Vibes",
    views: "890K views",
    time: "3 days ago",
    duration: "4:37",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&q=80",
  },
  {
    title: "The Universe Explained",
    channel: "Science Hub",
    views: "2.7M views",
    time: "1 week ago",
    duration: "12:11",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=900&q=80",
  },
];

const trending = [
  {
    title: "Will AI Take Over Jobs?",
    channel: "Future Vision",
    views: "1.8M views",
    time: "1 day ago",
    duration: "10:24",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80",
  },
  {
    title: "Top 10 Goals of the Season",
    channel: "Sports Central",
    views: "2.3M views",
    time: "2 days ago",
    duration: "8:45",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80",
  },
  {
    title: "Epic Comeback in Ranked",
    channel: "Gaming Pro",
    views: "1.1M views",
    time: "1 day ago",
    duration: "15:30",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80",
  },
  {
    title: "A Day in My Life",
    channel: "Life With Alex",
    views: "950K views",
    time: "3 days ago",
    duration: "11:08",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80",
  },
  {
    title: "Live Concert Experience",
    channel: "Soundscape",
    views: "710K views",
    time: "2 days ago",
    duration: "6:22",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&q=80",
  },
];

const categories = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Live",
  "Learning",
  "Sports",
  "Podcasts",
  "Comedy",
  "Travel",
];

/* =========================================================
   ICON
========================================================= */

function Icon({ name, size = 21 }) {
  const icons = {
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),

    home: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </>
    ),

    shorts: (
      <>
        <path d="M13.5 2 6 12h5l-1.5 10L17 11h-5l1.5-9Z" />
      </>
    ),

    subscriptions: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="m10 9 5 3-5 3V9Z" />
      </>
    ),

    library: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m10 9 5 3-5 3V9Z" />
      </>
    ),

    history: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    like: (
      <>
        <path d="M7 10v10H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3Z" />
        <path d="M7 20h9.2a2 2 0 0 0 1.9-1.4l2-6A2 2 0 0 0 18.2 10H14l.7-4.1A2.5 2.5 0 0 0 12.2 3L7 10v10Z" />
      </>
    ),

    fire: (
      <>
        <path d="M12 22c4.4 0 7-3.2 7-7.2 0-3.8-2.2-6.7-5.7-9.8.1 2.3-.6 3.7-2 4.8.1-3.8-1.7-6.7-4-7.8.3 3.7-2.3 6.3-2.3 10.3C5 18.8 7.7 22 12 22Z" />
      </>
    ),

    music: (
      <>
        <path d="M9 18V5l10-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="16" cy="16" r="3" />
      </>
    ),

    gaming: (
      <>
        <path d="m6 10 3-3h6l3 3 2 7a2 2 0 0 1-3.5 1.7L14 16h-4l-2.5 2.7A2 2 0 0 1 4 17l2-7Z" />
        <path d="M8 11v4M6 13h4" />
        <circle cx="16" cy="12" r=".8" />
        <circle cx="18" cy="14" r=".8" />
      </>
    ),

    news: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h10M7 16h6" />
      </>
    ),

    live: (
      <>
        <circle cx="12" cy="12" r="2" />
        <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" />
      </>
    ),

    learning: (
      <>
        <path d="M3 10 12 5l9 5-9 5-9-5Z" />
        <path d="M6 12.5V17c3 2 9 2 12 0v-4.5" />
      </>
    ),

    sports: (
      <>
        <path d="m12 3 2.2 4.5L19 8.2l-3.5 3.4.8 4.8-4.3-2.3-4.3 2.3.8-4.8L5 8.2l4.8-.7L12 3Z" />
      </>
    ),

    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),

    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),

    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
      </>
    ),

    play: (
      <>
        <path d="m8 5 11 7-11 7V5Z" />
      </>
    ),

    explore: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-2 4-4 2 2-4 4-2Z" />
      </>
    ),

    chevronLeft: (
      <>
        <path d="m15 18-6-6 6-6" />
      </>
    ),

    chevronRight: (
      <>
        <path d="m9 18 6-6-6-6" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

/* =========================================================
   VIDEO CARD
========================================================= */

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <div className="thumbnail">
        <img src={video.image} alt={video.title} />

        <span className="duration">{video.duration}</span>

        <div className="progress">
          <span></span>
        </div>

        <div className="play-overlay">
          <Icon name="play" size={22} />
        </div>
      </div>

      <div className="video-title">{video.title}</div>

      <div className="channel">{video.channel}</div>

      <div className="video-meta">
        {video.views} <span>•</span> {video.time}
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({ icon, text, active, onClick }) {
  return (
    <div
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <Icon name={icon} size={21} />
      <span>{text}</span>
    </div>
  );
}

/* =========================================================
   MAIN BODY
========================================================= */

export default function Body() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* =====================================================
     USER STATE
  ===================================================== */

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [photoPic, setPhotoPic] = useState("");
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  /* =====================================================
     DEFAULT PROFILE IMAGE
  ===================================================== */

  const defaultProfileImage =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  /* =====================================================
     GET CURRENT LOGGED-IN USER
  ===================================================== */

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoadingUser(true);

        const res = await axios.get(
          BASE_URL + "/profile/view",
          {
            withCredentials: true,
          }
        );

        console.log("Current User:", res.data);

        setUser(res.data);

        setUsername(res.data.username || "");

        /*
          IMPORTANT:
          Your EditProfile uses photoPic,
          so Body also uses photoPic.
        */

        setPhotoPic(res.data.photoPic || "");

        setIsLoggedIn(true);
      } catch (error) {
        console.log(
          "User not logged in:",
          error.response?.data || error.message
        );

        setUser(null);
        setUsername("");
        setPhotoPic("");
        setIsLoggedIn(false);
      } finally {
        setLoadingUser(false);
      }
    };

    getUser();
  }, [location.pathname]);

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setIsLoggedIn(false);
      setUsername("");
      setPhotoPic("");
      setUser(null);

      navigate("/");
    } catch (error) {
      console.log(
        "Logout Error:",
        error.response?.data || error.message
      );
    }
  };

  /* =====================================================
     SIDEBAR NAVIGATION
  ===================================================== */

  const handleSidebarClick = (item) => {
    if (item === "Home") {
      navigate("/body");
    } else {
      console.log(`${item} selected`);
    }
  };

  /* =====================================================
     CREATE
  ===================================================== */

  const handleCreate = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    console.log("Create clicked");
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = () => {
    console.log("Searching:", search);
  };

  /* =====================================================
     PROFILE IMAGE ERROR
  ===================================================== */

  const handleImageError = (e) => {
    e.currentTarget.src = defaultProfileImage;
  };

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #070b0f;
          color: #f5f5f5;
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        button,
        input {
          font-family: inherit;
        }

        .streamtube {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 60% 0%,
              rgba(20, 31, 43, 0.22),
              transparent 35%
            ),
            #070b0f;
        }

        /* =====================================================
           SIDEBAR
        ===================================================== */

        .sidebar {
          position: fixed;
          left: 0;
          top: 0;

          width: 250px;
          height: 100vh;

          background: #090e13;
          border-right: 1px solid #20262d;

          z-index: 100;

          display: flex;
          flex-direction: column;

          padding: 18px 0;

          overflow: hidden;

          transition: width 0.3s ease;
        }

        .logo-area {
          height: 48px;

          display: flex;
          align-items: center;

          padding: 0 20px;

          margin-bottom: 12px;
        }

        .menu-button {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #eeeeee;

          border-radius: 50%;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .menu-button:hover {
          background: #171e25;
          transform: rotate(5deg);
        }

        .sidebar-scroll {
          flex: 1;

          overflow-y: auto;
          overflow-x: hidden;

          padding: 0 20px;

          scrollbar-width: none;
        }

        .sidebar-scroll::-webkit-scrollbar {
          display: none;
        }

        .sidebar-section {
          padding: 0 0 16px;

          border-bottom: 1px solid #20252b;

          margin-bottom: 17px;
        }

        .sidebar-section:last-child {
          border-bottom: none;
        }

        .sidebar-item {
          height: 43px;

          display: flex;
          align-items: center;

          gap: 18px;

          padding: 0 15px;

          margin-bottom: 3px;

          border-radius: 9px;

          color: #e3e6e9;

          font-size: 14px;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease,
            color 0.2s ease;
        }

        .sidebar-item:hover {
          background: #151b21;
          transform: translateX(4px);
          color: #ffffff;
        }

        .sidebar-item.active {
          background: #171e25;
          color: #ffffff;
          box-shadow: inset 3px 0 0 #ff0018;
        }

        .sidebar-item:hover svg {
          transform: scale(1.08);
        }

        .sidebar-title {
          color: #9aa2aa;
          font-size: 13px;
          padding: 2px 15px 9px;
        }

        /* =====================================================
           MAIN
        ===================================================== */

        .main {
          margin-left: 250px;
          min-height: 100vh;
          padding: 0 20px 50px;

          transition: margin-left 0.3s ease;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .topbar {
          height: 72px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 25px;
        }

        .search-area {
          flex: 1;

          display: flex;
          justify-content: center;
        }

        .search-box {
          width: min(550px, 100%);

          height: 42px;

          display: flex;

          border: 1px solid #252c33;

          border-radius: 25px;

          background: #090d12;

          overflow: hidden;
        }

        .search-box:focus-within {
          border-color: #414a54;

          box-shadow:
            0 0 0 3px rgba(255, 0, 24, 0.08);
        }

        .search-box input {
          flex: 1;

          border: none;
          outline: none;

          background: transparent;

          color: white;

          padding: 0 20px;

          font-size: 14px;
        }

        .search-box input::placeholder {
          color: #858c94;
        }

        .search-button {
          width: 60px;

          border: 0;

          border-left: 1px solid #252c33;

          background: #10151b;

          color: #e9edf0;

          display: flex;

          align-items: center;
          justify-content: center;

          cursor: pointer;
        }

        .search-button:hover {
          background: #1a222a;
        }

        .mic-button {
          width: 42px;
          height: 42px;

          border-radius: 50%;

          background: #171d24;

          display: flex;

          align-items: center;
          justify-content: center;

          color: white;

          margin-left: 10px;

          cursor: pointer;
        }

        .mic-button:hover {
          transform: scale(1.06);
          background: #202830;
        }

        /* =====================================================
           TOP ACTIONS
        ===================================================== */

        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .create-button,
        .login-button,
        .signup-button,
        .logout-button {
          height: 40px;

          border-radius: 12px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 9px;

          padding: 0 17px;

          font-size: 14px;

          cursor: pointer;

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .create-button:hover,
        .login-button:hover,
        .signup-button:hover,
        .logout-button:hover {
          transform: translateY(-2px);
        }

        .create-button {
          background: #151b21;
          color: white;
          border: none;
        }

        .create-button:hover {
          background: #202830;
        }

        .login-button {
          background: transparent;
          color: white;
          border: 1px solid #3b4249;
        }

        .login-button:hover {
          border-color: #69727c;
        }

        .signup-button {
          background: #ff0018;
          color: white;
          border: 1px solid #ff0018;
          font-weight: 500;
        }

        .signup-button:hover {
          background: #e50016;

          box-shadow:
            0 5px 20px rgba(255, 0, 24, 0.22);
        }

        /* =====================================================
           USER BOX
        ===================================================== */

        .user-box {
          height: 40px;

          min-width: 145px;

          padding: 0 13px 0 7px;

          display: flex;

          align-items: center;

          gap: 9px;

          border-radius: 12px;

          border: 1px solid #333c45;

          background:
            linear-gradient(
              135deg,
              #151b21,
              #0d1217
            );

          color: #ffffff;

          box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.18);

          cursor: pointer;

          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .user-box:hover {
          transform: translateY(-2px);

          border-color: #ff0018;

          box-shadow:
            0 6px 20px rgba(255, 0, 24, 0.12);
        }

        .user-avatar {
          width: 29px;
          height: 29px;

          flex-shrink: 0;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              #ff0018,
              #ff4d5b
            );

          color: white;

          font-size: 13px;

          font-weight: 700;

          text-transform: uppercase;

          overflow: hidden;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .user-info {
          display: flex;

          flex-direction: column;

          justify-content: center;

          min-width: 0;
        }

        .user-label {
          font-size: 9px;

          color: #8f99a2;

          text-transform: uppercase;

          letter-spacing: 0.7px;

          line-height: 1.1;

          margin-bottom: 2px;
        }

        .username-display {
          color: #f3f5f6;

          font-size: 13px;

          font-weight: 600;

          max-width: 90px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;

          line-height: 1.1;
        }

        .logout-button {
          background: transparent;

          color: #ff4a59;

          border: 1px solid #4a252a;
        }

        .logout-button:hover {
          background: #251216;

          border-color: #ff0018;

          color: #ff6875;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .hero {
          height: 338px;

          border-radius: 10px;

          overflow: hidden;

          position: relative;

          background:
            linear-gradient(
              90deg,
              #05080c 0%,
              rgba(5, 8, 12, 0.95) 25%,
              rgba(5, 8, 12, 0.40) 65%,
              rgba(5, 8, 12, 0.12) 100%
            ),
            url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85")
            center/cover;

          animation: heroAppear 0.8s ease both;
        }

        @keyframes heroAppear {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero::after {
          content: "";

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.25),
              transparent
            ),
            linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.25),
              transparent 40%
            );

          pointer-events: none;
        }

        .hero-content {
          position: relative;

          z-index: 2;

          padding: 44px 22px;

          width: 53%;
        }

        .trending-label {
          color: #ff1525;

          font-size: 12px;

          font-weight: 600;

          display: flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 17px;
        }

        .hero h1 {
          font-size: 36px;

          line-height: 1.3;

          margin: 0;

          font-weight: 750;

          letter-spacing: -1.1px;
        }

        .hero-description {
          color: #adb4bb;

          font-size: 16px;

          line-height: 1.55;

          margin: 13px 0 22px;

          max-width: 500px;
        }

        .hero-buttons {
          display: flex;

          gap: 13px;
        }

        .start-button,
        .explore-button {
          height: 44px;

          border-radius: 8px;

          padding: 0 20px;

          display: flex;

          align-items: center;

          gap: 10px;

          font-weight: 600;

          cursor: pointer;

          font-size: 14px;
        }

        .start-button {
          border: 1px solid #ff0018;

          background: #ed0018;

          color: white;
        }

        .start-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 7px 22px rgba(255, 0, 24, 0.25);
        }

        .explore-button {
          background: rgba(5, 8, 12, 0.5);

          border: 1px solid #515861;

          color: white;
        }

        .explore-button:hover {
          transform: translateY(-2px);

          background: rgba(20, 25, 31, 0.8);
        }

        .hero-dots {
          position: absolute;

          bottom: 14px;

          left: 50%;

          transform: translateX(-50%);

          z-index: 5;

          display: flex;

          gap: 10px;
        }

        .dot {
          width: 9px;
          height: 9px;

          border-radius: 50%;

          background: #81878d;
        }

        .dot.active {
          background: #f1001b;

          transform: scale(1.2);
        }

        /* =====================================================
           SECTIONS
        ===================================================== */

        .section {
          margin-top: 23px;
        }

        .section-header {
          height: 32px;

          display: flex;

          justify-content: space-between;

          align-items: center;

          margin-bottom: 10px;
        }

        .section-title {
          font-size: 17px;

          font-weight: 650;

          margin: 0;
        }

        .section-actions {
          display: flex;

          align-items: center;

          gap: 14px;
        }

        .view-all {
          color: #aeb5bb;

          font-size: 12px;

          cursor: pointer;
        }

        .arrow {
          color: #e0e4e7;

          cursor: pointer;
        }

        .arrow:hover {
          color: #ff0018;

          transform: scale(1.15);
        }

        /* =====================================================
           VIDEO GRID
        ===================================================== */

        .video-grid {
          display: grid;

          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          gap: 16px;
        }

        .video-card {
          min-width: 0;

          cursor: pointer;
        }

        .thumbnail {
          position: relative;

          width: 100%;

          aspect-ratio: 16 / 9;

          overflow: hidden;

          border-radius: 8px;

          background: #10151a;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;

          object-fit: cover;

          display: block;

          transition:
            transform 0.35s ease,
            filter 0.35s ease;
        }

        .video-card:hover .thumbnail img {
          transform: scale(1.06);

          filter: brightness(0.72);
        }

        .duration {
          position: absolute;

          right: 7px;
          bottom: 7px;

          background: rgba(0, 0, 0, 0.85);

          padding: 3px 5px;

          border-radius: 4px;

          color: white;

          font-size: 11px;

          font-weight: 600;

          z-index: 3;
        }

        .play-overlay {
          position: absolute;

          top: 50%;
          left: 50%;

          transform:
            translate(-50%, -50%)
            scale(0.7);

          width: 48px;
          height: 48px;

          border-radius: 50%;

          background: rgba(255, 0, 24, 0.92);

          display: flex;

          align-items: center;
          justify-content: center;

          opacity: 0;

          transition:
            opacity 0.25s ease,
            transform 0.25s ease;

          z-index: 2;
        }

        .video-card:hover .play-overlay {
          opacity: 1;

          transform:
            translate(-50%, -50%)
            scale(1);
        }

        .progress {
          position: absolute;

          left: 0;
          bottom: 0;

          width: 100%;

          height: 3px;

          background: rgba(255, 255, 255, 0.2);

          z-index: 4;
        }

        .progress span {
          display: block;

          height: 100%;

          width: 25%;

          background: #ff0018;
        }

        .video-title {
          margin-top: 10px;

          font-size: 14px;

          font-weight: 600;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }

        .channel {
          color: #9da5ad;

          font-size: 12px;

          margin-top: 8px;
        }

        .video-meta {
          color: #8e979f;

          font-size: 12px;

          margin-top: 6px;
        }

        .video-meta span {
          padding: 0 4px;
        }

        /* =====================================================
           CATEGORIES
        ===================================================== */

        .category-section {
          margin-top: 26px;
        }

        .category-list {
          display: flex;

          gap: 10px;

          overflow-x: auto;

          padding-bottom: 5px;

          scrollbar-width: none;
        }

        .category-list::-webkit-scrollbar {
          display: none;
        }

        .category {
          flex-shrink: 0;

          height: 34px;

          padding: 0 18px;

          border-radius: 18px;

          background: #151b21;

          color: #c7cdd2;

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 12px;

          cursor: pointer;

          border: 1px solid transparent;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease,
            border-color 0.2s ease;
        }

        .category:hover {
          border-color: #343c44;

          transform: translateY(-2px);
        }

        .category.selected {
          background: #f0f1f2;

          color: #0a0d10;

          font-weight: 600;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1200px) {
          .sidebar {
            width: 220px;
          }

          .main {
            margin-left: 220px;
          }

          .video-grid {
            grid-template-columns:
              repeat(4, minmax(0, 1fr));
          }

          .video-card:nth-child(5) {
            display: none;
          }
        }

        @media (max-width: 950px) {
          .sidebar {
            width: 75px;
          }

          .logo-area {
            justify-content: center;
            padding: 0;
          }

          .sidebar-scroll {
            padding: 0 10px;
          }

          .sidebar-item {
            justify-content: center;
            padding: 0;
          }

          .sidebar-item span,
          .sidebar-title {
            display: none;
          }

          .main {
            margin-left: 75px;
          }

          .video-grid {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
          }

          .video-card:nth-child(4),
          .video-card:nth-child(5) {
            display: none;
          }

          .hero-content {
            width: 65%;
          }

          .user-box {
            min-width: 40px;
            width: 40px;
            padding: 0;
            justify-content: center;
          }

          .user-info {
            display: none;
          }
        }

        @media (max-width: 700px) {
          .main {
            padding: 0 12px 40px;
          }

          .topbar {
            gap: 10px;
          }

          .mic-button,
          .create-button {
            display: none;
          }

          .top-actions {
            gap: 6px;
          }

          .login-button,
          .signup-button,
          .logout-button {
            padding: 0 11px;
            font-size: 12px;
          }

          .user-box {
            width: 40px;
            min-width: 40px;
          }

          .hero {
            height: 320px;
          }

          .hero-content {
            width: 85%;
            padding: 35px 20px;
          }

          .hero h1 {
            font-size: 28px;
          }

          .hero-description {
            font-size: 13px;
          }

          .video-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 14px;
          }

          .video-card:nth-child(3),
          .video-card:nth-child(4),
          .video-card:nth-child(5) {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 65px;
          }

          .main {
            margin-left: 65px;
          }

          .search-box {
            height: 38px;
          }

          .hero {
            height: 300px;
          }

          .hero-content {
            width: 100%;
            padding: 30px 18px;
          }

          .hero h1 {
            font-size: 25px;
          }

          .hero-description {
            font-size: 12px;
          }

          .hero-buttons {
            gap: 8px;
          }

          .start-button,
          .explore-button {
            padding: 0 13px;
          }

          .top-actions {
            gap: 4px;
          }
        }

      `}</style>

      <div className="streamtube">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        {sidebarOpen && (
          <aside className="sidebar">

            <div className="logo-area">

              <div
                className="menu-button"
                onClick={() => setSidebarOpen(false)}
              >
                <Icon name="menu" size={23} />
              </div>

            </div>

            <div className="sidebar-scroll">

              <div className="sidebar-section">

                <SidebarItem
                  icon="home"
                  text="Home"
                  active={
                    location.pathname === "/" ||
                    location.pathname === "/home" ||
                    location.pathname === "/body"
                  }
                  onClick={() =>
                    handleSidebarClick("Home")
                  }
                />

                <SidebarItem
                  icon="shorts"
                  text="Shorts"
                  onClick={() =>
                    handleSidebarClick("Shorts")
                  }
                />

                <SidebarItem
                  icon="subscriptions"
                  text="Subscriptions"
                  onClick={() =>
                    handleSidebarClick("Subscriptions")
                  }
                />

              </div>

              <div className="sidebar-section">

                <div className="sidebar-title">
                  You
                </div>

                <SidebarItem
                  icon="library"
                  text="Library"
                  onClick={() =>
                    handleSidebarClick("Library")
                  }
                />

                <SidebarItem
                  icon="history"
                  text="History"
                  onClick={() =>
                    handleSidebarClick("History")
                  }
                />

                <SidebarItem
                  icon="library"
                  text="Your Videos"
                  onClick={() =>
                    handleSidebarClick("Your Videos")
                  }
                />

                <SidebarItem
                  icon="clock"
                  text="Watch Later"
                  onClick={() =>
                    handleSidebarClick("Watch Later")
                  }
                />

                <SidebarItem
                  icon="like"
                  text="Liked Videos"
                  onClick={() =>
                    handleSidebarClick("Liked Videos")
                  }
                />

              </div>

              <div className="sidebar-section">

                <div className="sidebar-title">
                  Explore
                </div>

                <SidebarItem
                  icon="fire"
                  text="Trending"
                  onClick={() =>
                    handleSidebarClick("Trending")
                  }
                />

                <SidebarItem
                  icon="music"
                  text="Music"
                  onClick={() =>
                    handleSidebarClick("Music")
                  }
                />

                <SidebarItem
                  icon="gaming"
                  text="Gaming"
                  onClick={() =>
                    handleSidebarClick("Gaming")
                  }
                />

                <SidebarItem
                  icon="news"
                  text="News"
                  onClick={() =>
                    handleSidebarClick("News")
                  }
                />

                <SidebarItem
                  icon="live"
                  text="Live"
                  onClick={() =>
                    handleSidebarClick("Live")
                  }
                />

                <SidebarItem
                  icon="learning"
                  text="Learning"
                  onClick={() =>
                    handleSidebarClick("Learning")
                  }
                />

                <SidebarItem
                  icon="sports"
                  text="Sports"
                  onClick={() =>
                    handleSidebarClick("Sports")
                  }
                />

              </div>

            </div>

          </aside>
        )}

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main
          className="main"
          style={{
            marginLeft: sidebarOpen ? undefined : "0px",
          }}
        >

          {/* =================================================
              TOP BAR
          ================================================= */}

          <header className="topbar">

            <div className="search-area">

              <div className="search-box">

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search"
                />

                <button
                  className="search-button"
                  onClick={handleSearch}
                >
                  <Icon
                    name="search"
                    size={21}
                  />
                </button>

              </div>

              <div className="mic-button">
                <Icon name="mic" size={20} />
              </div>

            </div>

            {/* =================================================
                TOP ACTIONS
            ================================================= */}

            <div className="top-actions">

              {/* CREATE */}

              <button
                className="create-button"
                onClick={handleCreate}
              >
                <Icon
                  name="plus"
                  size={19}
                />

                Create
              </button>

              {/* =================================================
                  LOADING USER
              ================================================= */}

              {loadingUser && (
                <div className="user-box">

                  <div className="user-avatar">
                    U
                  </div>

                  <div className="user-info">

                    <span className="user-label">
                      Loading
                    </span>

                    <span className="username-display">
                      ...
                    </span>

                  </div>

                </div>
              )}

              {/* =================================================
                  LOGGED OUT
              ================================================= */}

              {!loadingUser && !isLoggedIn && (
                <>
                  <button
                    className="login-button"
                    onClick={() =>
                      navigate("/login")
                    }
                  >
                    Login
                  </button>

                  <button
                    className="signup-button"
                    onClick={() =>
                      navigate("/signup")
                    }
                  >
                    Sign Up
                  </button>
                </>
              )}

              {/* =================================================
                  LOGGED IN
              ================================================= */}

              {!loadingUser && isLoggedIn && (
                <>
                  <div
                    className="user-box"
                    onClick={() =>
                      navigate("/profile")
                    }
                  >

                    {/* PROFILE IMAGE */}

                    <div className="user-avatar">

                      {photoPic ? (
                        <img
                          src={photoPic}
                          alt={username}
                          onError={handleImageError}
                        />
                      ) : (
                        username
                          ? username
                              .charAt(0)
                              .toUpperCase()
                          : "U"
                      )}

                    </div>

                    {/* USERNAME */}

                    <div className="user-info">

                      <span className="user-label">
                        Welcome
                      </span>

                      <span className="username-display">
                        {username}
                      </span>

                    </div>

                  </div>

                  <button
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}

            </div>

          </header>

          {/* =================================================
              HERO
          ================================================= */}

          <section className="hero">

            <div className="hero-content">

              <div className="trending-label">

                <Icon
                  name="fire"
                  size={15}
                />

                TRENDING

              </div>

              <h1>
                Watch, Create, Share.
                <br />
                All in One Place.
              </h1>

              <p className="hero-description">
                Stream endless videos,
                discover new creators,
                <br />
                and be part of a global
                community.
              </p>

              <div className="hero-buttons">

                <button
                  className="start-button"
                  onClick={() => {
                    if (!isLoggedIn) {
                      navigate("/login");
                      return;
                    }

                    console.log(
                      "Start Watching"
                    );
                  }}
                >
                  <Icon
                    name="play"
                    size={16}
                  />

                  Start Watching
                </button>

                <button
                  className="explore-button"
                  onClick={() =>
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  <Icon
                    name="explore"
                    size={17}
                  />

                  Explore
                </button>

              </div>

            </div>

            <div className="hero-dots">

              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>

            </div>

          </section>

          {/* =================================================
              CONTINUE WATCHING
          ================================================= */}

          <section className="section">

            <div className="section-header">

              <h2 className="section-title">
                Continue Watching
              </h2>

              <div className="section-actions">

                <span className="view-all">
                  View all
                </span>

                <span className="arrow">
                  <Icon
                    name="chevronLeft"
                    size={20}
                  />
                </span>

                <span className="arrow">
                  <Icon
                    name="chevronRight"
                    size={20}
                  />
                </span>

              </div>

            </div>

            <div className="video-grid">

              {videos.map(
                (video, index) => (
                  <VideoCard
                    key={index}
                    video={video}
                  />
                )
              )}

            </div>

          </section>

          {/* =================================================
              TRENDING
          ================================================= */}

          <section className="section">

            <div className="section-header">

              <h2 className="section-title">
                Trending Now
              </h2>

              <div className="section-actions">

                <span className="view-all">
                  View all
                </span>

                <span className="arrow">
                  <Icon
                    name="chevronLeft"
                    size={20}
                  />
                </span>

                <span className="arrow">
                  <Icon
                    name="chevronRight"
                    size={20}
                  />
                </span>

              </div>

            </div>

            <div className="video-grid">

              {trending.map(
                (video, index) => (
                  <VideoCard
                    key={index}
                    video={video}
                  />
                )
              )}

            </div>

          </section>

          {/* =================================================
              CATEGORIES
          ================================================= */}

          <section
            className="category-section"
            id="categories"
          >

            <div className="section-header">

              <h2 className="section-title">
                Explore by Category
              </h2>

            </div>

            <div className="category-list">

              {categories.map(
                (category) => (
                  <div
                    key={category}
                    className={`category ${
                      selectedCategory ===
                      category
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                  >
                    {category}
                  </div>
                )
              )}

            </div>

          </section>

        </main>

      </div>
    </>
  );
}
