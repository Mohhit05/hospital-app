import React, { useEffect, useState } from "react";
import DoctorSidebar from "../../../components/AdminComponents/Doctor/DoctorSidebar";
import DoctorNavbar from "../../../components/AdminComponents/Doctor/DoctorNavbar";
import {
  getAppointments,
  deleteAppointments,
  updateAppointments,
} from "../../../Redux/ActionCreators/AppointmentsActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function TotalAppointments() {
  const dispatch = useDispatch();
  const AppointmentsStateData = useSelector(
    (state) => state.AppointmentsStateData
  );
  const [data, setData] = useState({ status: "" });
  const [flag, setflag] = useState(false);

  useEffect(() => {
    dispatch(getAppointments());
    setflag(true);
  }, [AppointmentsStateData]);

  useEffect(() => {
    setData(
      [...AppointmentsStateData]
        .reverse()
        .filter((x) => x.doctorId === localStorage.getItem("id"))
    );
    setflag(true);
  }, [AppointmentsStateData]);

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      dispatch(deleteAppointments({ id }));
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  }

  function handleStatusChange(id, newStatus) {
    const updated = AppointmentsStateData.find((x) => x.id === id);
    if (updated) {
      dispatch(updateAppointments({ ...updated, status: newStatus }));
    }
  }

  return (
    <>
      <DoctorNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DoctorSidebar />
        <main
          className="flex-1 overflow-auto p-6 sm:p-8 md:ml-64"
          id="mainContent"
          tabIndex="-1"
        >
          <section className="tab-content" id="appointmentsList">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Total Appointments
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto" id="appointmentsContainer">
              {data.length > 0 ? (
                data.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Patient: {appointment.name}
                      </h3>
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full 
                          ${
                            appointment.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : appointment.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : appointment.status === "Rescheduled"
                              ? "bg-blue-100 text-blue-700"
                              : appointment.status === "Complete"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-gray-600"><b>Date:</b> {appointment.appointmentDate}</p>
                    <p className="text-gray-600"><b>Time:</b> {appointment.appointmentTime}</p>
                    {appointment.medicalReports ? (
                        <p className="text-gray-600">
                          <b>Medical Reports:</b>{" "}
                          <a
  href={`${process.env.REACT_APP_BACKEND_SERVER}${appointment.medicalReports}`}
  target="_blank"
  className="bg-gray-400 text-white px-2 py-1 rounded-md hover:bg-gray-600 ml-2"
><i className="fas fa-folder-open fa-lg mr-2"></i>
  View Report
</a>

                        </p>
                      ) : (
                        <p className="text-gray-600">
                          <b>Medical Reports:</b> Not Provided
                        </p>
                      )}
                    <p className="text-gray-600"><b>Additional Notes:</b> <span className="italic text-gray-500 text-sm">{appointment.additionalNotes || "None"}</span></p>

                    <div className="mt-4 flex gap-3 flex-wrap">
                      {(appointment.status === "Requested" || appointment.status === "Rescheduled") && (
                        <>
                          <button
                            onClick={() => handleStatusChange(appointment.id, "Approved")}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(appointment.id, "Cancelled")}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {appointment.status === "Approved" && (
                        <button
                          onClick={() => handleStatusChange(appointment.id, "Complete")}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Complete
                        </button>
                      )}

                      {(appointment.status === "Cancelled" || appointment.status === "Complete") && (
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No appointments available.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}