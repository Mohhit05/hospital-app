import React, { useEffect, useState } from "react";
import DoctorSidebar from "../../../components/AdminComponents/Doctor/DoctorSidebar";
import DoctorNavbar from "../../../components/AdminComponents/Doctor/DoctorNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormValidator from "../../../Validators/FormValidator";
import ImageValidator from "../../../Validators/ImageValidator";
import {
  getUsers,
  updateUsers,
} from "../../../Redux/ActionCreators/UsersActionCreators";

export default function DoctorProfile() {
    let id = localStorage.getItem("id");
    const [showNotification, setShowNotification] = useState({
        show: false,
        type: "",
        message: "",
      });
  
    let [data, setData] = useState({
        name: "",
        pic: "",
        role: "doctor",
        email: "",
        phone: "",
        specialty: "",
        experiance: "",
        bio: "",
        password: "",
        confirmPassword: "",
      });
    
      let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: "",
        email: "",
        phone: "",
        specialty: "",
        experiance: "",
        bio: "",
        password: "",
        confirmPassword: "",
      });
    
      let [show, setShow] = useState(false);
      const [flag, setflag] = useState(false);

    
      let navigate = useNavigate();
    
      let dispatch = useDispatch();
      let UsersStateData = useSelector((state) => state.UsersStateData);
    
      function getInputData(e) {
        var name = e.target.name;
        var value =
          e.target.files && e.target.files.length
            ? "users/doctor/" + e.target.files[0].name
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

        setflag(true);
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
          navigate(`/doctor/profile`);
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
      <DoctorNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DoctorSidebar />

        <main
          className="flex-1 overflow-auto p-6 bg-gray-50 sm:p-8 md:ml-64"
          id="mainContent"
          tabIndex="-1"
        >
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
          <section className="tab-content " id="doctorProfile">
  <h2 className="text-2xl font-bold text-green-700 mb-6">Doctor Profile</h2>
  <form
    className="  rounded-lg   p-6 w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
    onSubmit={postData}
  >
    {/* Profile Image Section */}
    <div className="col-span-1 flex flex-col items-center space-y-4">
      {UsersStateData.filter((x) => x.role === "doctor").map((item) => {
        return (
          <div key={item.id} className="relative w-40 h-40">
        <button
          aria-label="Remove profile image"
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 hover:bg-red-600 shadow-md focus:outline-none z-20"
          id="removeImageBtn"
          type="button"
        >
          <i className="fas fa-times text-xs"></i>
        </button>
        <div
          className="w-40 h-40 rounded-full bg-green-600 text-white flex items-center justify-center text-5xl font-bold overflow-hidden shadow-lg relative"
          id="imagePreviewContainer"
        >
          <span className="select-none z-0" id="imageInitials">RK</span>
          <img 
            className="absolute inset-0 w-full h-full object-cover rounded-full z-0 transition-opacity duration-300"
            height="160"
            id="profileImagePreview"
            src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}
            width="160"
          />
        </div>
      </div>
        );
      })}
      
      <label className="cursor-pointer text-green-700 font-semibold hover:underline" htmlFor="profileImage">
        Change Profile Image
      </label>
      <input accept="users/doctor/*" onChange={getInputData} className="hidden" id="profileImage" name="pic" type="file" />
      {show && errorMessage.pic && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.pic}
                    </p>
                  )}
    </div>

    {/* Input Fields Section */}
    <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label className="block text-green-700 font-semibold mb-2" htmlFor="doctorName">Full Name</label>
        <input
           className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.name ? "border-red-500" : ""
           }`}
          id="doctorName"
          name="name"
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
        <label className="block text-green-700 font-semibold mb-2" htmlFor="doctorEmail">Email</label>
        <input
           className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.name ? "border-red-500" : ""
           }`}
          id="doctorEmail"
          name="email"
          onChange={getInputData}
          type="email"
          value={data.email}
        />
        {show && errorMessage.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.email}
                    </p>
                  )}
      </div>
      <div>
        <label className="block text-green-700 font-semibold mb-2" htmlFor="doctorPhone">Phone Number</label>
        <input
           className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.name ? "border-red-500" : ""
           }`}
          id="doctorPhone"
          name="phone"
          onChange={getInputData}
          type="tel"
          value={data.phone} 
        />
        {show && errorMessage.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.phone}
                    </p>
                  )}
      </div>
      <div>
        <label className="block text-green-700 font-semibold mb-2" htmlFor="doctorSpecialty">Specialty</label>
        <input
           className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.name ? "border-red-500" : ""
           }`}
          id="doctorSpecialty"
          name="specialty"
          onChange={getInputData}
          type="text"
          value={data.specialty}
        />
        {show && errorMessage.specialty && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.specialty}
                    </p>
                  )}
      </div>
      <div>
        <label className="block text-green-700 font-semibold mb-2" htmlFor="doctorExperience">Years of Experience</label>
        <input
           className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.name ? "border-red-500" : ""
           }`}
          id="doctorExperience"
          name="experiance"
          onChange={getInputData}
          type="number"
          min="0"
          value={data.experiance}
        />
        {show && errorMessage.experiance && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.experiance}
                    </p>
                  )}
      </div>
      <div className="sm:col-span-2">
        <label className="block text-green-700 font-semibold mb-2" htmlFor="doctorBio">Biography</label>
        <textarea
           className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.name ? "border-red-500" : ""
           }`}
          id="doctorBio"
          name="bio"
          onChange={getInputData}
          value={data.bio}
          rows="4"
        > 
        {show && errorMessage.bio && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.bio}
                    </p>
                  )}
        </textarea>
      </div>
      <div className="sm:col-span-2">
        <button
          className="bg-green-700 text-white font-bold py-3 rounded-md w-full hover:bg-green-800"
          type="submit"
          onClick={() => UpdateProfileNotification()}
        >
          Update Profile
        </button>
      </div>
    </div>
  </form>

  <hr className="my-8 border-t border-green-300" />

  {/* Password Change Section */}
  <div className="mt-10   rounded-lg p-6 max-w-7xl mx-auto">
    <h3 className="text-xl font-bold text-green-700 mb-4">Change Password</h3>
    <form id="passwordChangeForm" noValidate className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <label htmlFor="currentPassword" className="block text-green-700 font-semibold mb-2">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          className="w-full border border-green-300 rounded-md px-4 py-2"
          required
        />
      </div>
      <div className="md:col-span-1">
        <label htmlFor="newPassword" className="block text-green-700 font-semibold mb-2">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="w-full border border-green-300 rounded-md px-4 py-2"
          required
        />
      </div>
      <div className="md:col-span-1">
        <label htmlFor="confirmPassword" className="block text-green-700 font-semibold mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="w-full border border-green-300 rounded-md px-4 py-2"
          required
        />
      </div>
      <div className="md:col-span-3 flex justify-end">
        <button
          type="submit"
          onClick={() => UpdatePasswordNotification()}
          className="bg-green-700 text-white font-bold py-2 px-6 rounded-md hover:bg-green-800"
        >
          Update Password
        </button>
      </div>
    </form>
  </div>
</section>

        </main>
      </div>
    </>
  );
}
