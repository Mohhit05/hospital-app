import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FrontendNavbar() {
  const [showMenu, setShowMenu] = useState(false);

  const name = localStorage.getItem("name");
  const pic = localStorage.getItem("pic");
  const role = localStorage.getItem("role"); // 'doctor', 'admin', 'patient'

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signIn";
  };

  return (
    <>
      <header className="shadow-md sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link className="flex items-center space-x-2" to="/">
              <img
                alt="Nova Hospital logo"
                className="h-12 w-12"
                src="https://storage.googleapis.com/a1aa/image/156a95bb-fd98-438e-c376-65707ca861a3.jpg"
              />
              <span className="text-2xl font-bold text-green-700">
                Nova Hospital
              </span>
            </Link>

            <nav className="hidden md:flex space-x-8 font-semibold text-gray-800">
              <a href="#" className="hover:text-green-700 transition">
                Home
              </a>
              <a href="#about" className="hover:text-green-700 transition">
                About Us
              </a>
              <a href="#services" className="hover:text-green-700 transition">
                Services
              </a>
              <a href="#doctors" className="hover:text-green-700 transition">
                Doctors
              </a>
              {role === "patient" && (
                <a href="#feedback" className="hover:text-green-700 transition">
                  Feedback
                </a>
              )}
              <a href="#contact" className="hover:text-green-700 transition">
                Contact
              </a>

              {/* <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Dashboard
                  <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    <Link to="/patient/doctors-list" className="block px-4 py-2 text-sm text-gray-700">Patient Dashboard</Link>
                    <Link to="/doctor/total-appointments" className="block px-4 py-2 text-sm text-gray-700">Doctor Dashboard</Link>
                    <Link to="/admin/doctors-list" className="block px-4 py-2 text-sm text-gray-700">Admin Dashboard</Link>
                  </div>
                </div>
              </div> */}
            </nav>

            {!name ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/signIn"
                  className="border border-green-700 text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signUp"
                  className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
                >
                  Patient Sign Up
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <img 
                    className="rounded-full h-8 w-8 object-cover"
                    height="32"
                    src={`${process.env.REACT_APP_BACKEND_SERVER}${pic}`}
                    width="32"
                    alt={name}
                  />
                <span className="text-gray-800 font-medium">{name}</span>
                <Link
                  to={
                    role === "doctor"
                      ? "/doctor/total-appointments"
                      : role === "admin"
                      ? "/admin/doctors-list"
                      : "/patient/doctors-list"
                  }
                  className="text-sm px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                >
                  {role?.charAt(0).toUpperCase() + role?.slice(1)} Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline text-sm"
                >
                  Logout
                </button>
              </div>
            )}

            <div className="md:hidden">
            <span className="text-gray-800 md:hidden font-medium mr-2">{name}</span>
              <button
                aria-label="Open menu"
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700 p-2"
              >
                <i className="fas fa-bars fa-lg"></i>
              </button>
            </div>
          </div>
        </div>

        {showMenu && (
          <div className="bg-white border-t border-gray-200" id="mobile-menu">
            <nav className="fixed inset-y-0 left-0 top-16 z-50 w-64 bg-gray-50 shadow-lg px-5 py-6 overflow-y-auto flex flex-col gap-2 md:hidden">
              <a
                href="#"
                className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-700 transition"
              >
                Home
              </a>
              <a
                href="#about"
                className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-700 transition"
              >
                About Us
              </a>
              <a
                href="#services"
                className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-700 transition"
              >
                Services
              </a>
              <a
                href="#doctors"
                className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-700 transition"
              >
                Doctors
              </a>
              <a
                href="#feedback"
                className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-700 transition"
              >
                Feedback
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-700 transition"
              >
                Contact
              </a>

              {!name ? (
                <div className="flex flex-col space-y-2 mt-2 px-3">
                  <Link
                    to="/signIn"
                    className="w-full text-center border border-green-700 text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signUp"
                    className="w-full text-center bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
                  >
                    Patient Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 mt-4 px-3">
                 
                  <Link
                    to={
                      role === "doctor"
                        ? "/doctor/total-appointments"
                        : role === "admin"
                        ? "/admin/doctors-list"
                        : "/patient/doctors-list"
                    }
                    className="w-full text-center text-green-800 bg-green-100 rounded-md py-2 hover:bg-green-200"
                  >
                    {role?.charAt(0).toUpperCase() + role?.slice(1)} Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
