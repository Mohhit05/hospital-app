import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getUsers } from "../../../Redux/ActionCreators/UsersActionCreators";
import { useDispatch, useSelector } from "react-redux"; 

export default function AdminNavbar() {
  let [showMenu, setShowMenu] = useState(); 
  let [data, setData] = useState({
    name: "",
    pic: "",
  });
  let dispatch = useDispatch();
  let UsersStateData = useSelector((state) => state.UsersStateData);

  const name =  localStorage.getItem('name');
    const email =  localStorage.getItem('email');
    const id =  localStorage.getItem('id');
    const phone =  localStorage.getItem('phone'); 
    const role =  localStorage.getItem('role'); 

  useEffect(() => {
    dispatch(getUsers());
    if (UsersStateData.length) {
      setData(UsersStateData.find((x) => x.id === id));
    }
  }, [UsersStateData.length]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signIn";
  };
  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link className="flex items-center space-x-2" to="/">
              <img
                alt="Nova Hospital logo, a green cross with a heart symbol in the center on a white background"
                className="h-10 w-10"
                height="40"
                src="https://storage.googleapis.com/a1aa/image/156a95bb-fd98-438e-c376-65707ca861a3.jpg"
                width="40"
              />
              <span className="text-2xl font-bold text-green-700">
                Nova Hospital
              </span>
            </Link>
            <div>
            <span className="text-gray-800 md:hidden font-medium mr-2">{name}</span>
            <button
              aria-label="Toggle menu"
              className="md:hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700"
              id="mobileMenuButton"
              onClick={() => setShowMenu(!showMenu)}
            >
              <i className="fas fa-bars fa-lg p-2 hover:bg-green-100 transition duration-300"></i>
            </button>
            </div>
            {UsersStateData.filter(
              (x) => x.id === id && x.role === role
            ).map((item, index) => {
              return (
                <nav
                  key={item.id}
                  className="hidden md:flex space-x-6 font-semibold text-gray-800 items-center"
                  id="desktopMenu"
                >
                  <img
                    alt={`${item.name} profile picture`}
                    className="rounded-full"
                    height="32"
                    src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}
                    width="32"
                  />
                  <span className="text-lg font-semibold text-green-700 mt-0.5">
                    {item.name}
                  </span>
                </nav>
              );
            })}
          </div>
        </div>
      </header>

      {showMenu && (
        <nav className="fixed  inset-y-0 left-0 top-16 z-50  w-64 bg-white shadow-lg px-5 py-6 overflow-y-auto   flex flex-col gap-2 md:hidden">
          {[
            {
              to: "/admin/doctors-list",
              icon: "fas fa-user-md",
              label: "All Doctors",
              id: "linkDoctorsList",
            },
            {
              to: "/admin/patients-list",
              icon: "fas fa-users",
              label: "All Patients",
              id: "linkPatientsList",
            },
            {
              to: "/admin/feedback-list",
              icon: "fas fa-comment",
              label: "Feedback",
              id: "linkFeedback",
            },
            {
              to: "/admin/profile",
              icon: "fas fa-id-badge",
              label: "Profile",
              id: "linkAdminProfile",
            },
          ].map(({ to, icon, label, id }) => (
            <NavLink
              key={id}
              to={to}
              id={id}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              <i className={`${icon} text-lg`}></i>
              {label}
            </NavLink>
          ))}

          <button
            className="mt-4 flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-100 hover:text-red-800 font-semibold transition-colors duration-200"
            id="sidebarLogoutBtn"
            title="Logout"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt text-lg"></i> Logout
          </button>
        </nav>
      )}
    </>
  );
}
