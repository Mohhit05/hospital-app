import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminComponents/Admin/AdminSidebar";
import AdminNavbar from "../../../components/AdminComponents/Admin/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Redux/ActionCreators/UsersActionCreators";

import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";

export default function PatientsList() {
  let dispatch = useDispatch();
  let UsersStateData = useSelector((state) => state.UsersStateData);

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
  }, [UsersStateData.length]);
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-1  overflow-auto bg-gray-50 p-6 sm:p-8 md:ml-64" id="mainContent"
          tabIndex="-1">
          {/* <!-- Patients List --> */}
          <section className="tab-content h-screen">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              All Patients
            </h2>
            <div className="overflow-x-auto max-w-full   ">
              <table id="myTable" className="min-w-full divide-y bg-white divide-gray-200">
                <thead className="bg-green-700 text-white">
                  <tr>
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
                      Age
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {UsersStateData.filter((x) => x.role === "patient").map(
                    (item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href="#">
                            <img
                              src={
                                item.pic
                                  ? `${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`
                                  : "/img/sample-profile.png"
                              }
                              alt="profile"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          </a>
                        </td>
                        <td className="px-6 py-4 font-semibold text-green-700 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.dateOfBirth
                            ? new Date().getFullYear() -
                              new Date(item.dateOfBirth).getFullYear()
                            : ""}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.phone}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
