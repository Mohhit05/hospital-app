import React, { useEffect, useState } from "react";
import PatientSidebar from "../../../components/AdminComponents/Patient/PatientSidebar";
import PatientNavbar from "../../../components/AdminComponents/Patient/PatientNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Redux/ActionCreators/UsersActionCreators";
import { createAppointments } from "../../../Redux/ActionCreators/AppointmentsActionCreators";
import { useNavigate } from "react-router-dom";
import ImageValidator from "../../../Validators/ImageValidator";
import FormValidator from "../../../Validators/FormValidator";

export default function UsersForPatient() {
  let [showAppointmentModal, setShowAppointmentModal] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");  // Track the search query
  let dispatch = useDispatch();
  let UsersStateData = useSelector((state) => state.UsersStateData);
  let [data, setData] = useState({ 
    doctorId: null,
    doctorName: null,
    patientId: null,
    appointmentDate: null,
    appointmentTime: null,
    medicalReports: null,
    additionalNotes: "", 
    name: "", 
    email: "",
    phone: "",
    status: "Upcoming"
  });

  let [errorMessage, setErrorMessage] = useState({
    doctorId: null,
    doctorName: null,
    patientId: null,
    appointmentDate: null,
    appointmentTime: null,
    medicalReports: null,
    additionalNotes: "",
    name: "", 
    email: "",
    phone: "",
  });

  let [show, setShow] = useState(false);
  const navigate = useNavigate();

  // Retrieve current user (patient) from local storage
  const name =  localStorage.getItem('name');
  const email =  localStorage.getItem('email');
  const id =  localStorage.getItem('id');
  const phone =  localStorage.getItem('phone'); 
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
    var value =
      e.target.files && e.target.files.length
        ? "users/appointmentsreports/" + e.target.files[0].name
        : e.target.value;

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
      dispatch(createAppointments({ ...data }));
      setShowAppointmentModal(false)
 
      navigate(`/patient/my-appointments`);
    }
  }

  function getApiData() {
    dispatch(getUsers());
  }

  useEffect(() => {
    getApiData();
  }, [UsersStateData.length]);

  function openAppointmentModal(doctor) {
    setData((prevData) => ({
      ...prevData,
      doctorId: doctor.id,
      doctorName: doctor.name,
    }));
    setShowAppointmentModal(true);
  }

  function handleAppointmentModal() {
    setShowAppointmentModal(false);
  }

  // Filter doctors based on search query
  const filteredDoctors = UsersStateData.filter(
    (user) =>
      user.role === "doctor" &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <PatientNavbar />
      <div className="flex flex-1 overflow-hidden">
        <PatientSidebar />

        <main
          className="flex-1 overflow-auto p-6 bg-gray-50 sm:p-8 md:ml-64"
          id="mainContent"
          tabIndex="-1"
        >
          <section className="tab-content" id="doctorList">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Doctor List</h2>
            <form className="mb-6 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="searchDoctors">Search Doctors</label>
              <div className="flex rounded-full border border-green-300 overflow-hidden focus-within:ring-2 focus-within:ring-green-400">
                <input
                  className="flex-grow px-4 py-2 text-gray-900 focus:outline-none"
                  id="searchDoctors"
                  name="searchDoctors"
                  placeholder="Search doctors..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                />
                <button
                  aria-label="Search"
                  className="bg-green-700 hover:bg-green-800 text-white px-4 flex items-center justify-center"
                  type="submit"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((item) => {
                return (
                  <article key={item.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
                    <img
                      alt="doctor image"
                      src={
                        item.pic
                          ? `${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`
                          : "/img/sample-profile.png"
                      }
                      width="128"
                      className="w-32 h-32 rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-green-700">{item.name}</h3>
                    <p className="text-gray-700 mb-2">{item.specialty}</p>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.experiance} years of experience
                    </p>
                    <button
                      className="mt-auto bg-green-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-800 transition"
                      onClick={() => openAppointmentModal(item)}
                    >
                      Book Appointment
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Appointment Modal */}
          {showAppointmentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="appointmentModal" role="dialog">
              <div className="bg-white rounded-lg shadow-lg max-w-full w-full sm:max-w-xl md:max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                  aria-label="Close modal"
                  onClick={() => setShowAppointmentModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  type="button"
                >
                  <i className="fas fa-times fa-lg"></i>
                </button>
                <h3 className="text-xl font-bold text-green-700 mb-4" id="appointmentModalTitle">
                  Book Appointment with <span>{data.doctorName}</span>
                </h3>
                <form className="space-y-4" id="appointmentModalForm" onSubmit={postData}> 
                  <div>
                    <label className="block text-green-700 font-semibold mb-1" htmlFor="patientName">Full Name</label>
                    <input
                      className="w-full border border-green-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                      id="patientName"
                      name="name"
                      placeholder="Your full name"
                      onChange={getInputData}
                      value={data.name}
                      disabled
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-green-700 font-semibold mb-1" htmlFor="patientEmail">Email</label>
                    <input
                      className="w-full border border-green-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                      id="patientEmail"
                      name="email"
                      placeholder="you@example.com"
                      required=""
                      onChange={getInputData}
                      disabled
                      type="email"
                      value={data.email}
                    />
                  </div>
                  <div>
                    <label className="block text-green-700 font-semibold mb-1" htmlFor="patientPhone">Phone Number</label>
                    <input
                      className="w-full border border-green-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                      id="patientPhone"
                      name="phone"
                      onChange={getInputData}
                      placeholder="+1 234 567 8900"
                      required=""
                      disabled
                      type="tel"
                      value={data.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-green-700 font-semibold mb-1" htmlFor="appointmentDateModal">Appointment Date</label>
                    <input
                      className="w-full border border-green-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                      id="appointmentDateModal"
                      name="appointmentDate"
                      min="<?= date('Y-m-d'); ?>"
                      required=""
                      onChange={getInputData}
                      type="date"
                    />
                  </div>
                  <div>
                    <label className="block text-green-700 font-semibold mb-1" htmlFor="appointmentTimeModal">Appointment Time</label>
                    <input
                      className="w-full border border-green-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                      id="appointmentTimeModal"
                      name="appointmentTime"
                      onChange={getInputData}
                      required=""
                      type="time"
                    />
                  </div>
                  <div>
                    <label className="block text-green-700 font-semibold mb-1" htmlFor="medicalReports">Previous Medical Reports</label>
                    <input
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full text-gray-900"
                      id="medicalReports"
                      multiple=""
                      onChange={getInputData}
                      name="medicalReports"
                      type="file"
                    />
                  </div>
                  <div>
                    <label className="block text-green-700 font-semibold mb-1" htmlFor="additionalNotes">Additional Notes</label>
                    <textarea
                      className="w-full border border-green-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                      id="additionalNotes"
                      name="additionalNotes"
                      onChange={getInputData}
                      value={data.additionalNotes}
                      placeholder="Any additional information..."
                    />
                  </div>
                  <button
                    className="bg-green-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-800 transition"
                    type="submit"
                  >
                    Submit Appointment Request
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
