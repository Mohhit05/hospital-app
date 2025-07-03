import React, { useState, useEffect } from "react";
import FormValidator from "../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../Redux/ActionCreators/UsersActionCreators";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const [errorMessage, setErrorMessage] = useState({
    email: "Email field is mandatory",
    password: "Password field is mandatory",
  });

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const UsersStateData = useSelector((state) => state.UsersStateData);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  function getInputData(e) {
    const { name, value } = e.target;

    setErrorMessage((prev) => ({
      ...prev,
      [name]: FormValidator(e),
    }));

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function postdata(e) {
    e.preventDefault();
    const error = Object.values(errorMessage).find((msg) => msg !== "");

    if (error) {
      setShow(true);
    } else {
      setShow(false);

      const item = UsersStateData.find(
        (x) =>
          x.email.toLowerCase() === data.email.toLowerCase() &&
          x.password === data.password &&
          x.role === data.role
      );

      if (item) {
        // Save common values
        localStorage.setItem("email", item.email);
        localStorage.setItem("role", item.role);
        localStorage.setItem("name", item.name);
        localStorage.setItem("pic", item.pic);
        localStorage.setItem("id", item.id);
        localStorage.setItem("phone", item.phone);

        // Redirect by role
        if (item.role === "patient") {
          navigate("/patient/doctors-list");
        } else if (item.role === "doctor") {
          navigate("/doctor/total-appointments");
        } else if (item.role === "admin") {
          navigate("/admin/doctors-list");
        }
      } else {
        setShow(true);
        setErrorMessage((prev) => ({
          ...prev,
          email: "Invalid email or password",
        }));
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 py-16 px-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-10" role="div" aria-label="Sign in form">
        <h1 className="text-3xl font-extrabold text-green-700 mb-8 text-center">
          Sign In to Nova Hospital
        </h1>
        <form id="signInForm" className="space-y-6" onSubmit={postdata}>
          <div>
            <label htmlFor="email" className="block text-green-700 font-semibold mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={getInputData}
              value={data.email}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-green-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-green-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={getInputData}
              value={data.password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-green-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-green-700 font-semibold mb-2">
              Sign in as
            </label>
            <select
              id="role"
              name="role"
              onChange={getInputData}
              value={data.role}
              className="w-full px-4 py-2 border border-green-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-3 rounded-md hover:bg-green-800 transition"
            >
              Sign In
            </button>
          </div>

          {show && (
            <p id="signInMessage" className="text-center text-red-600 font-semibold mt-4" role="alert">
              {errorMessage.email}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
