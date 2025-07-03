import React, { useState, useEffect } from "react";
import FormValidator from "../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  createUsers, 
} from "../Redux/ActionCreators/UsersActionCreators";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  let [data, setData] = useState({
      name: "", 
      role: "patient", 
      email: "",
      phone: "", 
      password: "Novadoctor@1998",
      confirmPassword: "",
      active: true,
    });
  
    let [errorMessage, setErrorMessage] = useState({
      name: "Name field is mendatory", 
      email: "email field is mendatory",
      phone: "phone field is mendatory",
    });
  
    let [show, setShow] = useState(false);
  
    let dispatch = useDispatch();
    let UsersStateData = useSelector((state) => state.UsersStateData); 
    let navigate = useNavigate();

    function getInputData(e) {
      var name = e.target.name;
      var value = e.target.value;
  
      // in case of real backend
  
      // var value =
      //   e.target.files && e.target.files.length
      //     ? e.target.files[0]
      //     : e.target.value;
  
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: FormValidator(e),
        };
      });
  
      setData((old) => {
        return {
          ...old,
          [name]: name === "active" ? (value === "1" ? true : false) : value,
        };
      });
    }
  
    function postData(e) {
      e.preventDefault();
      let error = Object.values(errorMessage).find((x) => x !== "");
      if (error) {
        setShow(true);
      } else {
         
        dispatch(createUsers({ ...data }));
        
  
         navigate("/signIn");
  
        // in case of real backend
  
        // let formData = new FormData()
        // formData.append("name", data.name)
        // formData.append("pic", data.pic)
        // formData.append("message", data.message)
        // formData.append("active", data.active)
        // dispatch(createDoctorsList(formData));
  
         
      }
    }
   
     useEffect(() => {
        dispatch(getUsers()); 
      }, [UsersStateData.length]);
     
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-green-50 py-16 px-6">
        <div
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-10"
          role="div"
          aria-label="Patient sign up form"
        >
          <h1 className="text-3xl font-extrabold text-green-700 mb-8 text-center">
            Patient Sign Up
          </h1>
          <form id="signUpForm" className="space-y-6" onSubmit={postData}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-green-700 font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="name" 
                onChange={getInputData} 
                placeholder="Your full name"
                className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.name ? "border-red-500" : ""
                }`}
              />
              {show && errorMessage.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.name}
                    </p>
                  )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-green-700 font-semibold mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={getInputData}  
                placeholder="you@example.com"
                className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.email ? "border-red-500" : ""
                }`}
              />
              {show && errorMessage.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.email}
                    </p>
                  )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-green-700 font-semibold mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone" 
                onChange={getInputData} 
                placeholder="+1 234 567 8900"
                className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.phone ? "border-red-500" : ""
                }`}
              />
              {show && errorMessage.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.phone}
                    </p>
                  )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-green-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={getInputData} 
                name="password" 
                placeholder="Create a password"
                className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.password ? "border-red-500" : ""
                }`}
              />
              {show && errorMessage.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.password}
                    </p>
                  )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-green-700 font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                onChange={getInputData} 
                name="confirmPassword" 
                placeholder="Confirm your password"
                className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${show && errorMessage.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {show && errorMessage.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorMessage.confirmPassword}
                    </p>
                  )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-700 text-white font-bold py-3 rounded-md hover:bg-green-800 transition"
              >
                Sign Up
              </button>
            </div> 
          </form>
        </div>
      </div>
    </>
  );
}
