import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminComponents/Admin/AdminSidebar";
import AdminNavbar from "../../../components/AdminComponents/Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormValidator from "../../../Validators/FormValidator";
import ImageValidator from "../../../Validators/ImageValidator";
import {
  getUsers,
  updateUsers,
} from "../../../Redux/ActionCreators/UsersActionCreators";

export default function AdminProfile() { 
  const [showNotification, setShowNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  let [data, setData] = useState({
    name: "",
    pic: "",
    role: "admin",
    email: "mmohitsingh05@gmail.com",
    phone: "",
    password: "NovaAdmin@1998",
    confirmPassword: "",
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    pic: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  let [show, setShow] = useState(false);
  const [flag, setflag] = useState(false);

  let navigate = useNavigate();

  let dispatch = useDispatch();
  let UsersStateData = useSelector((state) => state.UsersStateData);

  // Retrieve current user (patient) from local storage
  const name =  localStorage.getItem('name');
  const email =  localStorage.getItem('email');
  const pic =  localStorage.getItem('pic');
  const id =  localStorage.getItem('id');
  const phone =  localStorage.getItem('phone'); 
  const role =  localStorage.getItem('role'); 

  function getInputData(e) {
    var name = e.target.name;
    var value =
      e.target.files && e.target.files.length
        ? "users/admin/" + e.target.files[0].name
        : e.target.value;

    // in case of real backend

    // var value =
    //   e.target.files && e.target.files.length
    //     ? e.target.files[0]
    //     : e.target.value;

    setErrorMessage((old) => {
      return {
        ...old,
        [name]: e.target.files ? ImageValidator(e) : FormValidator(e),
      };
    });

    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  async function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
    } else {
      dispatch(updateUsers({ ...data }));

      // in case of real backend

      // let formData = new FormData()
      // formData.append("_id", data._id)
      // formData.append("name", data.name)
      // formData.append("pic", data.pic)
      // formData.append("message", data.message)
      // formData.append("active", data.active)
      // dispatch(createUsers(formData));
      navigate(`/admin/profile/${id}`);
    }
  }

  // Validation if product has same name
  useEffect(() => {
    dispatch(getUsers());
    if (UsersStateData.length) {
      setData(UsersStateData.find((x) => x.id === id));
    }
    setflag(true);
  }, [UsersStateData.length]);

  function UpdateProfileNotification() {
    try {
      setShowNotification({
        show: true,
        type: "success",
        message: "Profile updated successfully!",
      });
      setTimeout(() => {
        setShowNotification({ show: false, type: "", message: "" });
      }, 3000);
    } catch (error) {
      setShowNotification({
        show: true,
        type: "error",
        message: "Error updating profile!",
      });
      setTimeout(() => {
        setShowNotification({ show: false, type: "", message: "" });
      }, 3000);
    }
  }

  function UpdatePasswordNotification() {
    try {
      setShowNotification({
        show: true,
        type: "success",
        message: "Password updated successfully!",
      });
      setTimeout(() => {
        setShowNotification({ show: false, type: "", message: "" });
      }, 3000);
    } catch (error) {
      setShowNotification({
        show: true,
        type: "error",
        message: "Error updating password!",
      });
      setTimeout(() => {
        setShowNotification({ show: false, type: "", message: "" });
      }, 3000);
    }
  }
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-1 overflow-auto p-6 sm:p-8 md:ml-64">
          {/* <!-- Notification --> */}
          {showNotification.show && (
            <div
              className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
              px-5 py-4 rounded-lg shadow-md text-sm font-medium 
              flex items-center space-x-3 transition-all duration-300 
          ${showNotification.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
                }`}
            >
              <i
                className={`fas ${showNotification.type === "success"
                    ? "fa-check-circle"
                    : "fa-times-circle"
                  }`}
              ></i>
              <span>{showNotification.message}</span>
            </div>
          )}

          {/* <!-- Admin Profile --> */}
          <section className="tab-content" id="adminProfile">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Admin Profile
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Column 1: Empty spacer on mobile — content merged into form below on desktop */}

              {/* Column 2: Profile Form including image */}
              <form
                className="bg-white p-6 w-full space-y-6 col-span-1 lg:col-span-1"
                onSubmit={postData}
              >
                {/* Profile Image inside form */}
                <div className="flex flex-col items-center space-y-4">
                {UsersStateData.filter((x) => x.role === role).map((item) => {
  return (
    <div className="relative w-40 h-40 mx-auto" key={item.id}>
      <button
        aria-label="Remove profile image"
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 hover:bg-red-600 shadow-md focus:outline-none z-20 transition-all duration-300"
        id="removeImageBtn"
        type="button"
      >
        <i className="fas fa-times text-xs"></i>
      </button>

      <div
        className="w-40 h-40 rounded-full bg-green-600 text-white flex items-center justify-center text-5xl font-bold overflow-hidden shadow-lg relative"
        id="imagePreviewContainer"
      >
        <span className="select-none z-0" id="imageInitials">
          {item.pic || "Dp"}
        </span>
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-full z-0 transition-opacity duration-300"
          height="160"
          id="profileImagePreview"
          src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}
          width="160"
          alt="Profile"
        />
      </div>
    </div>
  );
})}

                  <label
                    className="cursor-pointer text-green-700 font-semibold hover:underline"
                    htmlFor="profileImage"
                  >
                    Change Profile Image
                  </label>
                  <input
                    accept="users/admin/*"
                    className="hidden"
                    id="profileImage"
                    name="pic"
                    type="file"
                    onChange={getInputData}
                  />
                  {show && errorMessage.pic && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.pic}
                    </p>
                  )}
                </div>

                {/* Name & Email */}
                <div>
                  <label
                    className="block text-green-700 font-semibold mb-2"
                    htmlFor="adminName"
                  >
                    Full Name
                  </label>
                  <input
                    className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.name ? "border-red-500" : ""
                      }`}
                    id="adminName"
                    name="name"
                    required
                    type="text"
                    value={data.name}
                    onChange={getInputData}
                  />
                  {show && errorMessage.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-green-700 font-semibold mb-2"
                    htmlFor="adminEmail"
                  >
                    Email
                  </label>
                  <input
                    className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.email ? "border-red-500" : ""
                      }`}
                    id="adminEmail"
                    name="email"
                    value={data.email}
                    onChange={getInputData}
                    required
                    type="email"
                  />
                  {show && errorMessage.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.email}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    className="bg-green-700 text-white font-bold py-3 rounded-md w-full hover:bg-green-800 transition"
                    type="submit"
                    onClick={() => UpdateProfileNotification()}
                  >
                    Update Profile
                  </button>
                </div>
              </form>

              {/* Column 3: Password Form with left border */}
              <div className="bg-white p-6 border-t lg:border-t-0 lg:border-l border-green-300">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  Change Password
                </h3>
                <form id="passwordChangeForm" noValidate>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-green-700 font-semibold mb-2"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="w-full border border-green-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                        autoComplete="current-password"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-green-700 font-semibold mb-2"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="w-full border border-green-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                        autoComplete="new-password"
                        minLength="8"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-green-700 font-semibold mb-2"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full border border-green-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                        autoComplete="new-password"
                        minLength="8"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        onClick={() => UpdatePasswordNotification()}
                        className="bg-green-700 text-white font-bold py-2 px-6 rounded-md hover:bg-green-800 focus:outline-none"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
