import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signIn";
  };
  return (
    <>
      {/* <!-- Sidebar --> */}
      <aside
        aria-label="Sidebar navigation"
        className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 overflow-y-auto transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out pt-20"
        id="sidebar"
      >
        <nav className="flex flex-col py-6 px-4 space-y-2">
          <NavLink
            to="/admin/doctors-list"
            id="linkDoctorsList"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-semibold transition ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-700"
              }`
            }
          >
            <i className="fas fa-user-md mr-3"></i> All Doctors
          </NavLink>

          <NavLink
            to="/admin/patients-list"
            id="linkPatientsList"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-semibold transition ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-700"
              }`
            }
          >
            <i className="fas fa-users mr-3"></i> All Patients
          </NavLink>

          <NavLink
            to="/admin/feedback-list"
            id="linkFeedback" 
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-semibold transition ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-700"
              }`
            }
          >
            <i className="fas fa-comment mr-3"></i> Feedback
          </NavLink>

          <NavLink
            to="/admin/profile"
            id="linkAdminProfile"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md font-semibold transition ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-700"
              }`
            }
          >
            <i className="fas fa-id-badge mr-3"></i> Profile
          </NavLink>
          
          <button
            className="mt-6 flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-100 hover:text-red-800 font-semibold focus:outline-none"
            id="sidebarLogoutBtn"
            title="Logout"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt mr-3"></i> Logout
          </button>
        </nav>
      </aside>
      {/* <!-- Overlay for mobile sidebar --> */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black bg-opacity-30 z-30 hidden md:hidden"
        id="sidebarOverlay"
        tabIndex="-1"
      ></div>
    </>
  );
}
