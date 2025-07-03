import React, { useState } from "react";
import PatientSidebar from "../../../components/AdminComponents/Patient/PatientSidebar";
import PatientNavbar from "../../../components/AdminComponents/Patient/PatientNavbar";

export default function DoctorUpdate() {
  const [showUpdate, setShowUpdate] = useState(false);
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
          <section className="tab-content  " id="doctorUpdate">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              Doctor Update
            </h2>
            <p className="mb-6 text-gray-700 max-w-lg">
              Here you can view updates or notes from your doctors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <article
                className="bg-white p-6 rounded-lg shadow flex flex-col relative"
                data-read="false"
              >
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span
                    aria-label="Unread notification"
                    className="inline-block w-3 h-3 rounded-full bg-green-600"
                    title="Unread"
                  ></span>
                  <span className="text-xs font-semibold text-green-600">
                    Unread
                  </span>
                </div>
                <h3 className="font-semibold text-green-700 mb-1">
                  Dr. Anita Sharma
                </h3>
                <p className="text-sm text-gray-600 italic mb-2">
                  Specialist: General Physician
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  Your blood test results are normal. Continue your current
                  medication.
                </p>
                <time className="text-xs text-gray-500 mb-4">
                  April 10, 2024
                </time>
                <button
                  className="mt-auto self-start bg-green-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-800 transition"
                  data-article="0"
                  data-date="April 10, 2024"
                  data-doctor="Dr. Anita Sharma"
                  data-note="Your blood test results are normal. Continue your current medication."
                  data-specialist="General Physician"
                  onClick={() => setShowUpdate(true)}
                  type="button"
                >
                  View Full Details
                </button>
              </article>
              <article
                className="bg-white p-6 rounded-lg shadow flex flex-col relative"
                data-read="true"
              >
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span
                    aria-label="Read notification"
                    className="inline-block w-3 h-3 rounded-full bg-gray-400"
                    title="Read"
                  ></span>
                  <span className="text-xs font-semibold text-gray-400">
                    Read
                  </span>
                </div>
                <h3 className="font-semibold text-green-700 mb-1">
                  Dr. Raj Kumar
                </h3>
                <p className="text-sm text-gray-600 italic mb-2">
                  Specialist: Cardiologist
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  Please schedule a follow-up appointment in 3 months.
                </p>
                <time className="text-xs text-gray-500 mb-4">
                  March 15, 2024
                </time>
                <button
                  className="mt-auto self-start bg-green-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-800 transition"
                  data-article="1"
                  data-date="March 15, 2024"
                  data-doctor="Dr. Raj Kumar"
                  data-note="Please schedule a follow-up appointment in 3 months."
                  data-specialist="Cardiologist"
                  onClick={() => setShowUpdate(true)}
                  type="button"
                >
                  View Full Details
                </button>
              </article>
            </div>
          </section>

          {/* <!-- Full Detail Modal --> */}
          {showUpdate && (
            <div
              aria-describedby="detailModalDesc"
              aria-labelledby="detailModalTitle"
              aria-modal="true"
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              id="detailModal"
              role="dialog"
            >
              <div className="bg-white rounded-lg shadow-lg max-w-full w-full sm:max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                  aria-label="Close modal"
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowUpdate(false)}
                  type="button"
                >
                  <i className="fas fa-times fa-lg"></i>
                </button>
                <h3
                  className="text-xl font-bold text-green-700 mb-2"
                  id="detailModalTitle"
                >
                  Topic
                </h3>
                <p
                  className="text-sm text-gray-600 italic mb-4"
                  id="detailModalSpecialist"
                >
                  {" "}
                  Detailed massege regarding your health and treatment plan.
                </p>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
}
