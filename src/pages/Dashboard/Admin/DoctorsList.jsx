import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/AdminComponents/Admin/AdminSidebar";
import AdminNavbar from "../../../components/AdminComponents/Admin/AdminNavbar";
import FormValidator from "../../../Validators/FormValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  createUsers, 
  deleteUsers,
} from "../../../Redux/ActionCreators/UsersActionCreators";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";
import { Link } from "react-router-dom";

export default function Users() {
  let [section, setSection] = useState("doctorsList");
  let [showModal, setShowModal] = useState(false);
  let [showNotification, setShowNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  let [data, setData] = useState({
    name: "",
    pic: "",
    role: "doctor",
    specialty: "",
    experiance: "",
    email: "",
    phone: "",
    bio: "",
    password: "Novadoctor@1998",
    confirmPassword: "",
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "Name field is mendatory",
    specialty: "specialty field is mendatory",
    experiance: "experiance field is mendatory",
    email: "email field is mendatory",
    phone: "phone field is mendatory",
  });

  let [show, setShow] = useState(false);
  const [flag, setflag] = useState(false);

  let dispatch = useDispatch();
  let UsersStateData = useSelector((state) => state.UsersStateData);

  let [selectedDoctorId, setSelectedDoctorId] = useState(null);

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

      setData({
        name: "",
        specialty: "",
        experiance: "",
        email: "",
        phone: "",
        active: true,
      }); // Reset the form data

      // in case of real backend

      // let formData = new FormData()
      // formData.append("name", data.name)
      // formData.append("pic", data.pic)
      // formData.append("message", data.message)
      // formData.append("active", data.active)
      // dispatch(createDoctorsList(formData));

      try {
        setSection("doctorsList"); // Switch back to the doctors list section
        setShowNotification({
          show: true,
          message: "Doctor added successfully!",
          type: "success",
        });
        setTimeout(() => {
          setShowNotification({ show: false, message: "", type: "" });
        }, 3000);
      } catch (error) {
        setShowNotification({
          show: true,
          message: "Doctor not added!",
          type: "error",
        });
        setTimeout(() => {
          setShowNotification({ show: false, message: "", type: "" });
        }, 3000);
      }
    }
  }
 
  // Validation if product has same name
  function getApiData() {
    dispatch(getUsers());

    if (UsersStateData.length) {
      var time = setTimeout(() => {
        $("#myTable").DataTable();
      }, 300);

      return time;
    }
  }

  useEffect(() => {
    let time = getApiData();
    return () => clearTimeout(time);
    setflag(true);
  }, [UsersStateData.length]);

  function DeleteModel(id) {
    // Call the delete action with the ID of the doctor to be deleted
    dispatch(deleteUsers({ id: id }));
    getApiData();
    setShowModal(false);
    setShowNotification({
      show: true,
      message: "Doctor deleted successfully!",
      type: "success",
    });
    setTimeout(() => {
      setShowNotification({ show: false, message: "", type: "" });
    }, 3000);
  }

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />

        <main
          className="flex-1 overflow-auto bg-gray-50 p-6 sm:p-8 md:ml-64"
          id="mainContent"
          tabIndex="-1"
        >
          {/* <!-- Notification --> */}
          {showNotification.show && (
            <div
              className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
              px-5 py-4 rounded-lg shadow-md text-sm font-medium 
              flex items-center space-x-3 transition-all duration-300 
          ${
            showNotification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
            >
              <i
                className={`fas ${
                  showNotification.type === "success"
                    ? "fa-check-circle"
                    : "fa-times-circle"
                }`}
              ></i>
              <span>{showNotification.message}</span>
            </div>
          )}

          {/* <!-- Doctors List --> */}
          <section className="tab-content h-screen" id="doctorsList">
            {section === "doctorsList" && (
              <div id="doctorsListView">
                <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center justify-between">
                  <span>All Doctors</span>
                  <button
                    id="showAddDoctorBtn"
                    type="button"
                    onClick={() => setSection("addDoctor")}
                    className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 focus:outline-none text-sm"
                  >
                    <i className="fas fa-plus mr-2"></i> Add New Doctor
                  </button>
                </h2>
                <div className="overflow-x-auto max-w-full rounded-lg mb-6">
                  <table
                    id="myTable"
                    className="min-w-full divide-y bg-white divide-gray-200"
                  >
                    <thead className="bg-green-700 text-white">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold"
                        >
                          Sn.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold"
                        >
                          Profile
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold"
                        >
                          Specialty
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold"
                        >
                          Experiance
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-sm font-semibold"
                        >
                          Phone
                        </th>
                        <th
                          scope="col" 
                          className="px-6 py-3 text-center text-sm font-semibold"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      id="doctorsListContainer"
                      className="divide-y divide-gray-200"
                    >
                      {UsersStateData.filter((x) => x.role === "doctor").map((item, index) => {
                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-green-50 border-b transition duration-200 text-sm"
                          >
                            <td className="px-4 py-3 text-center font-medium text-gray-700">
                              {index + 1}
                            </td>

                            <td className="px-4 py-3">
                              <Link
                                to={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}
                                target="_blank"
                                className="flex items-center justify-center"
                              >
                                <img
                                  src={
                                    item.pic
                                      ? `${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`
                                      : "/img/sample-profile.png"
                                  }
                                  alt="Doctor Profile"
                                  className="w-10 h-10 rounded-full object-cover border border-green-200 shadow-sm"
                                />
                              </Link>
                            </td>

                            <td className="px-4 py-3 font-semibold text-green-700">
                              {item.name}
                            </td>

                            <td className="px-4 py-3 text-gray-700">
                              {item.specialty}
                            </td>

                            <td className="px-4 py-3 text-gray-700 ">
                              {item.experiance}
                            </td>

                            <td className="px-4 py-3 text-gray-700">
                              {item.email}
                            </td>

                            <td className="px-4 py-3 text-gray-700">
                              +91 {item.phone}
                            </td> 
                            <td className="px-4 py-3 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedDoctorId(item.id);
                                  setShowModal(true);
                                }}
                                className="flex items-center justify-center gap-1 text-red-600 bg-green-100 hover:bg-red-700 hover:text-white px-4 py-1.5 rounded-full transition"
                              >
                                <i className="fas fa-trash-alt"></i>
                                <span className="text-sm font-medium">
                                  Delete
                                </span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {showModal && (
              // Modal for confirmation of deletion doctor
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Confirm Deletion
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this doctor? This action
                    cannot be undone.
                  </p>

                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => DeleteModel(selectedDoctorId)}
                      className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {section === "addDoctor" && (
              <div
                id="addDoctorSection"
                className=" max-w-full mx-auto h-screen "
              >
                <button
                  id="backToDoctorsBtn"
                  type="button"
                  onClick={() => setSection("doctorsList")}
                  className="mb-6 flex items-center text-green-700 font-semibold hover:underline focus:outline-none"
                >
                  <i className="fas fa-arrow-left mr-2"></i> Back to Doctors
                  List
                </button>
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  Add New Doctor
                </h3>
                <form
                  id="addDoctorForm"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
                  onSubmit={postData}
                >
                  <div>
                    <label
                      htmlFor="doctorName"
                      className="block text-green-700 font-semibold mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="doctorName"
                      name="name"
                      onChange={getInputData}
                      className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        show && errorMessage.name ? "border-red-500" : ""
                      }`}
                      placeholder="Enter full name"
                    />
                    {show && errorMessage.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorMessage.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="doctorSpecialty"
                      className="block text-green-700 font-semibold mb-1"
                    >
                      Specialty
                    </label>
                    <input
                      type="text"
                      id="doctorSpecialty"
                      name="specialty"
                      onChange={getInputData}
                      className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        show && errorMessage.specialty ? "border-red-500" : ""
                      }`}
                      placeholder="Enter specialty"
                    />
                    {show && errorMessage.specialty && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorMessage.specialty}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="doctorExperiance"
                      className="block text-green-700 font-semibold mb-1"
                    >
                      Experience
                    </label>
                    <input
                      type="number"
                      id="doctorExperiance"
                      name="experiance"
                      onChange={getInputData}
                      className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        show && errorMessage.experiance ? "border-red-500" : ""
                      }`}
                      placeholder="Enter experience"
                    />
                    {show && errorMessage.experiance && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorMessage.experiance}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="doctorEmail"
                      className="block text-green-700 font-semibold mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="doctorEmail"
                      name="email"
                      onChange={getInputData}
                      className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        show && errorMessage.email ? "border-red-500" : ""
                      }`}
                      placeholder="Enter email"
                    />
                    {show && errorMessage.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorMessage.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="doctorPhone"
                      className="block text-green-700 font-semibold mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="doctorPhone"
                      name="phone"
                      onChange={getInputData}
                      className={`w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        show && errorMessage.phone ? "border-red-500" : ""
                      }`}
                      placeholder="Enter phone number"
                    />
                    {show && errorMessage.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errorMessage.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="doctorActive"
                      className="block text-green-700 font-semibold mb-1"
                    >
                      Active
                    </label>
                    <select
                      name="active"
                      onChange={getInputData}
                      className="w-full border border-green-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 flex justify-end mt-2 space-x-3">
                    <button
                      type="reset"
                      className="px-4 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="bg-green-700 text-white font-semibold py-1.5 px-6 rounded-md hover:bg-green-800"
                    >
                      Create Doctor
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
