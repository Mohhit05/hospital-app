import React, { useEffect, useState } from "react";
import PatientSidebar from "../../../components/AdminComponents/Patient/PatientSidebar";
import PatientNavbar from "../../../components/AdminComponents/Patient/PatientNavbar";

import {
  getAppointments,
  updateAppointments, 
} from "../../../Redux/ActionCreators/AppointmentsActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function MyAppointments() {
  const [reschedule, setReschedule] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({
    status: "Requested",
    appointmentDate: null,
    appointmentTime: null,
    rescheduleRequested: false,
  });

  const dispatch = useDispatch();
  const AppointmentsStateData = useSelector(
    (state) => state.AppointmentsStateData
  );

  useEffect(() => {
    dispatch(getAppointments());
    setFlag(true);
  }, [dispatch]);

  function handleCancelAppointment(id) {
    const updated = AppointmentsStateData.find((x) => x.id === id);
    if (updated) {
      dispatch(updateAppointments({ ...updated, status: "Cancelled" }));
    }
    setCancelAppointment(false);
  }

  function getRescheduleData(e) {
    const { name, value } = e.target;
    setData((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function handleRescheduleSubmit(e) {
    e.preventDefault();
    const updated = AppointmentsStateData.find((x) => x.id === selectId); 
    if (updated) {
      const updatedData = {
        ...data,
        rescheduleRequested: true,
        status: "Rescheduled",
      };
      dispatch(updateAppointments({ ...updated, ...updatedData }));
    }
    setReschedule(false);
  }
  

  return (
    <>
      <PatientNavbar />
      <div className="flex flex-1 overflow-hidden">
        <PatientSidebar />
        <main
          className="flex-1 overflow-auto p-6 sm:p-8 md:ml-64"
          id="mainContent"
          tabIndex="-1"
        >
          <section className="tab-content " id="bookAppointment">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              My Appointments
            </h2>
            <div className="space-y-4 max-w-3xl" id="appointmentsList">
              {AppointmentsStateData.length > 0 ? (
                [...AppointmentsStateData].reverse().filter((x) => x.patientId === localStorage.getItem("id")).map((appointment) => (
                  <article
                    key={appointment.id}
                    className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between"
                  >
                    <div className="mb-4 sm:mb-0">
                      <h4 className="text-lg font-semibold text-green-700">
                        {appointment.doctorName || "Unknown Doctor"}
                      </h4>
                      <p className="text-gray-700">
                        Date: {appointment.appointmentDate}
                      </p>
                      <p className="text-gray-700">
                        Time: {appointment.appointmentTime}
                      </p> 
                      <p className="text-gray-600 italic mt-1 mb-3">
                      Status:{" "}
                      <span
                        className={`px-2 py-1 text-sm font-medium rounded-full  
                        ${
                          appointment.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : appointment.status === "Rescheduled"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </p>
                      <p className="text-gray-600 italic mt-1">
                        Message: <span className="text-gray-700 mt-1 bg-gray-100 rounded-md px-2 border border-gray-300">{appointment.additionalNotes || "No details provided"}</span>
                      </p> 
                    </div>
                    {(appointment.status === "Requested" || appointment.status === "Approved" || appointment.status === "Rescheduled") &&  (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setCancelAppointment(true);
                            setSelectId(appointment.id);
                          }}
                          className="px-4 py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-100 focus:outline-none"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setReschedule(true);
                            setSelectId(appointment.id);
                          }}
                          className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 focus:outline-none"
                        >
                          Reschedule
                        </button>
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <p className="text-gray-600 italic">No appointments found.</p>
              )}
            </div>
          </section>
        </main>
      </div>

      {reschedule && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-700">
                Reschedule Appointment
              </h2>
              <button
                onClick={() => setReschedule(false)}
                className="text-red-600 text-xl"
              >
                &times;
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleRescheduleSubmit}>
              <div>
                <label className="block font-medium text-green-700 mb-1">
                  Select New Date
                </label>
                <input
                  type="date"
                  className="w-full border border-green-300 rounded-md px-3 py-2"
                  name="appointmentDate"
                  required
                  onChange={getRescheduleData}
                />
              </div>
              <div>
                <label className="block font-medium text-green-700 mb-1">
                  Select New Time
                </label>
                <input
                  type="time"
                  className="w-full border border-green-300 rounded-md px-3 py-2"
                  name="appointmentTime"
                  required
                  onChange={getRescheduleData}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-800 transition"
                >
                  Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {cancelAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Cancel Appointment
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel this appointment?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setCancelAppointment(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                No
              </button>
              <button
                onClick={() => handleCancelAppointment(selectId)}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}