import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const logout = () => {
    setToken(false);
    navigate("/login");
    localStorage.removeItem("token");
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="flex items-center justify-between text-lg1 py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-44 cursor-pointer"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="https://hms-admin-nine.vercel.app/" target="_blank">
          <p className="py-1 px-2 rounded-md text-white border bg-primary ">
            Admin / Doctor Panel
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={userData.image}
              alt="Profile Icon"
              className="w-8 rounded-full"
            />
            <img
              src={assets.dropdown_icon}
              alt="Dropdown icon"
              className="w-2.5"
            />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          src={assets.menu_icon}
          className="w-6 md:hidden"
          alt=""
        />
        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "w-0 h-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              onClick={() => setShowMenu(false)}
              className="w-7"
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-start gap-2 mt-5 px-2 text-lg font-medium">
            <NavLink
              className="border w-full px-4 py-2 border-zinc-200 rounded-lg"
              to={"/"}
              onClick={() => setShowMenu(false)}
            >
              Home
            </NavLink>
            <NavLink
              className="border w-full px-4 py-2 border-zinc-200 rounded-lg"
              to={"/doctors"}
              onClick={() => setShowMenu(false)}
            >
              All Doctors
            </NavLink>
            <NavLink
              className="border w-full px-4 py-2 border-zinc-200 rounded-lg"
              to={"/about"}
              onClick={() => setShowMenu(false)}
            >
              About
            </NavLink>
            <NavLink
              className="border w-full px-4 py-2 border-zinc-200 rounded-lg"
              to={"/contact"}
              onClick={() => setShowMenu(false)}
            >
              Contact
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
