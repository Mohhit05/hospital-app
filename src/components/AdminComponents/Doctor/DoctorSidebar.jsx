import React from "react";
import { Link } from 'react-router-dom'

export default function DoctorSidebar() {
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
          <Link
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700 transition font-semibold bg-green-100 text-green-700"
           to="/doctor/total-appointments"
            id="linkAppointmentsList"
          >
            {" "}
            <i className="fas fa-calendar-check mr-3"></i> Total Appointments
          </Link> 
          {/* <Link
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700 transition font-semibold"
           to="/doctor/Advices"
            id="linkDoctorProfile"
          >
            {" "}
            <i className="fas fa-users mr-3"></i> Advice to Patients
          </Link> */}
          <Link
            className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700 transition font-semibold"
           to="/doctor/profile"
            id="linkDoctorProfile"
          >
            {" "}
            <i className="fas fa-id-badge mr-3"></i> Doctor Profile
          </Link>
          
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
