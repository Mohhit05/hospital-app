import React, { useState, useEffect } from "react";
import DoctorSidebar from "../../../components/AdminComponents/Doctor/DoctorSidebar";
import DoctorNavbar from "../../../components/AdminComponents/Doctor/DoctorNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../../Redux/ActionCreators/AppointmentsActionCreators";

export default function Advices() {
  const dispatch = useDispatch();
  const AppointmentsStateData = useSelector((state) => state.AppointmentsStateData);
  const [showAdviseForm, setShowAdviseForm] = useState(null);
  const [patients, setPatients] = useState([]);
  const [adviceText, setAdviceText] = useState("");
  const [messages, setMessages] = useState({}); // Store patient-wise messages

  let id = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getAppointments());
  }, [AppointmentsStateData.length]);

  useEffect(() => {
    const doctorId = localStorage.getItem("id");
    const uniquePatients = AppointmentsStateData
      .filter((x) => x.doctorId === doctorId)
      .reduce((acc, curr) => {
        const exists = acc.find((p) => p.email === curr.email);
        if (!exists) acc.push(curr);
        return acc;
      }, []);
    setPatients(uniquePatients);
  }, [AppointmentsStateData]);

  const handleAdviceSubmit = () => {
    const patient = patients[showAdviseForm];
    const email = patient.email;

    const newMessage = {
      text: adviceText,
      sender: "Doctor",
      timestamp: new Date().toLocaleString(),
    };

    setMessages((prev) => ({
      ...prev,
      [email]: [...(prev[email] || []), newMessage],
    }));

    setAdviceText("");
  };

  return (
    <>
      <DoctorNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DoctorSidebar />
        <main className="flex-1 overflow-auto p-6 sm:p-8 md:ml-64">
          {showAdviseForm === null ? (
            <section >
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-green-700 mb-6">
                  Your Patients
                </h2>
                <div className="max-w-4xl mx-auto space-y-6">
                  {AppointmentsStateData.map((patient, index) => (
                    <article
                      key={index}
                      className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          alt={`Patient ${patient.name}`}
                          className="w-16 h-16 rounded-full object-cover"
                          src="https://storage.googleapis.com/a1aa/image/ad04ee75-db87-4ada-fb7f-d946d070b8f3.jpg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-green-700">
                            {patient.name}
                          </h3>
                          <p className="text-gray-700">
                            Phone: {patient.phone}
                          </p>
                          <p className="text-gray-700">
                            Email: {patient.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
                        <div>
                          <p className="text-gray-600 font-semibold mb-1">
                            Last Visit
                          </p>
                          <p className="text-gray-700">May 15, 2024</p>
                        </div>
                        <button
                          className="bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800"
                          onClick={() => setShowAdviseForm(index)}
                        >
                          Advise
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-white shadow-lg rounded-lg border border-green-200">
              {/* Header */}
              <div className="p-4 border-b bg-green-600 rounded-t-lg text-white flex justify-between items-center">
                <p className="text-md text-gray-100 ">
                  Advise to <span className="font-bold text-lg text-white">{patients[showAdviseForm].name}</span>
                </p>
                <button
                  className="text-sm hover:bg-gray-600 transition bg-black px-2 py-1 rounded-md"
                  onClick={() => setShowAdviseForm(null)}
                >
                  Close
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-green-50">
                {(messages[patients[showAdviseForm].email] || []).map(
                  (msg, idx) => (
                    <div
                      key={idx}
                      className={`max-w-xs p-3 rounded-2xl shadow-md text-sm ${
                        msg.sender === "Doctor"
                          ? "bg-green-200 ml-auto text-right"
                          : "bg-white"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      <div className="mt-1 text-xs text-gray-600 flex justify-end items-center gap-1">
                        {/* Timestamp */}
                        <span>{msg.timestamp}</span>

                        {/* Read status icon */}
                        {msg.sender === "Doctor" && (
                          <>
                            {msg.read ? (
                              <span className="text-green-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 inline"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M1 13l4 4L19.5 2.5l2.5 2.5L5 21 0 16z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 -ml-2 inline"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M1 13l4 4L19.5 2.5l2.5 2.5L5 21 0 16z" />
                                </svg>
                              </span>
                            ) : msg.delivered ? (
                              <span className="text-gray-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 inline"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M1 13l4 4L19.5 2.5l2.5 2.5L5 21 0 16z" />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 -ml-2 inline"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M1 13l4 4L19.5 2.5l2.5 2.5L5 21 0 16z" />
                                </svg>
                              </span>
                            ) : (
                              <span className="text-gray-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 inline"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M1 13l4 4L19.5 2.5l2.5 2.5L5 21 0 16z" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}

                        {/* Muted symbol (if notifications are off) */}
                        {msg.muted && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19l-3-3m0 0l-3-3m3 3l3-3m-3 3v10"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Input */}
              <div className="border-t p-3 bg-white flex gap-3 items-center rounded-b-lg">
                <textarea
                  value={adviceText}
                  onChange={(e) => setAdviceText(e.target.value)}
                  rows="2"
                  placeholder="Write your message..."
                  className="flex-1 border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={handleAdviceSubmit}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Send
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
