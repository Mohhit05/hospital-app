import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormValidator from "../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  createFeedback,
} from "../Redux/ActionCreators/FeedbackActionCreators"; 
import { getUsers } from "../Redux/ActionCreators/UsersActionCreators";

export default function Feedback() {
  let [showFeedbackSuccess, setShowFeedbackSuccess] = useState({
    show: false,
    message: "",
    type: "",
  });
  let [data, setData] = useState({
    patientId: null,
    name: "",
    email: "",
    phone: "",
    rating: "",
    comments: "",
  });

  let [errorMessage, setErrorMessage] = useState({ 
    rating: "rating field is mendatory",
    comments: "comments field is mendatory",
  });

  let [show, setShow] = useState(false);
  

  let navigate = useNavigate();

  let dispatch = useDispatch(); 
  let UsersStateData = useSelector((state) => state.UsersStateData);

  // Retrieve current user (patient) from local storage
    const name =  localStorage.getItem('name');
    const email =  localStorage.getItem('email');
    const id =  localStorage.getItem('id');
    const phone =  localStorage.getItem('phone'); 
    const role =  localStorage.getItem('role'); 
    const currentPatient = { id, name, email, phone };
  
    // Initialize form with patient details from local storage
    useEffect(() => {
      if (currentPatient) {
        setData((prevData) => ({
          ...prevData,
          patientId: currentPatient.id,
          name: currentPatient.name,
          email: currentPatient.email,
          phone: currentPatient.phone, 
        }));
      }
    }, []);  // Added currentPatient as a dependency

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
        [name]:
          name === "rating"
            ? value === "5"
              ? "Excellent"
              : value === "4"
              ? "Very Good"
              : value === "3"
              ? "Good"
              : value === "2"
              ? "Fair"
              : "Poor"
            : value,
      };
    });
  }

  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
    } else {
      dispatch(createFeedback({ ...data }));

    //   setData( {
    //     name: "",
    //     email: "",
    //     rating: "",
    //     comments: "",
    //  }); // Reset the form data

     setData((prev) => ({
      ...prev,
      rating: "",
      comments: "",
    }));
    
    

      // in case of real backend

      // let formData = new FormData()
      // formData.append("name", data.name)
      // formData.append("pic", data.pic)
      // formData.append("message", data.message)
      // formData.append("active", data.active)
      // dispatch(createFeedback(formData));

      try {
        setShowFeedbackSuccess({
          show: true,
          message: "Thank you for your feedback!",
          type: "success",
        });
        setTimeout(() => {
          setShowFeedbackSuccess({ show: false, message: "", type: "" });  
        }, 3000);  // Redirect to the feedback section after 3 seconds
        
      } catch (error) {
        setShowFeedbackSuccess({
          show: true,
          message: "Failed to submit feedback. Please try again.",
          type: "error",
        });
        setTimeout(() => {
          setShowFeedbackSuccess({ show: false, message: "", type: "" });
        }, 3000);
      } 

      
    }
  }

  function getApiData() {
      dispatch(getUsers());
    }
  
    useEffect(() => {
      if (!UsersStateData.length) getApiData();
    }, []);
    

   
  return (
    <>
    {role === "patient" && (
  <section className="py-20 px-6 sm:px-12 md:px-20 bg-white" id="feedback">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-green-700 text-center">
        Patient Feedback
      </h2>
      <form 
        onSubmit={postData}
        id="feedbackForm"
        className="space-y-6 bg-green-50 p-8 rounded-lg shadow-md"
      >
        {/* Name Field */}
        <div>
          <label className="block mb-2 font-semibold text-green-700" htmlFor="name">Name</label>
          <input
            className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              show && errorMessage.name ? "border-red-500" : ""
            }`}
            id="name"
            onChange={getInputData}
            name="name"
            placeholder="Your full name"
            value={name}
            readOnly
            required
            type="text"
          />
          {show && errorMessage.name && (
            <p className="text-danger text-capitalize">{errorMessage.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block mb-2 font-semibold text-green-700" htmlFor="email">Email</label>
          <input
            className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              show && errorMessage.email ? "border-red-500" : ""
            }`}
            id="email"
            onChange={getInputData}
            name="email"
            placeholder="you@example.com"
            value={email}
            readOnly
            required
            type="email"
          />
          {show && errorMessage.email && (
            <p className="text-danger text-capitalize">{errorMessage.email}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-2 font-semibold text-green-700" htmlFor="rating">Rating</label>
          <select
            className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              show && errorMessage.rating ? "border-red-500" : ""
            }`}
            id="rating"
            onChange={getInputData}
            name="rating" 
            placeholder="Select rating"
            required
          >
            <option value="">Select rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
          {show && errorMessage.rating && (
            <p className="text-danger text-capitalize">{errorMessage.rating}</p>
          )}
        </div>

        {/* Comments */}
        <div>
          <label className="block mb-2 font-semibold text-green-700" htmlFor="comments">Comments</label>
          <textarea
            className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              show && errorMessage.comments ? "border-red-500" : ""
            }`}
            id="comments"
            onChange={getInputData}
            name="comments"
            placeholder="Your feedback here..." 
            maxLength="500"
            rows="4"
            required
          />
          {show && errorMessage.comments && (
            <p className="text-danger text-capitalize">{errorMessage.comments}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="bg-green-700 text-white font-bold px-10 py-3 rounded-lg shadow-lg hover:bg-green-800 transition"
            type="submit"
          >
            Submit Feedback
          </button>
        </div>

        {/* Success/Error Message */}
        {showFeedbackSuccess.show && (
          <p className={`mt-4 text-center font-semibold ${
            showFeedbackSuccess.type === "success" ? "text-green-700" : "text-red-700"
          }`}>
            {showFeedbackSuccess.message}
          </p>
        )}
      </form>
    </div>
  </section>
)}

    </>
  );
}
