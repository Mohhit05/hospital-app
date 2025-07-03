import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminComponents/Admin/AdminSidebar";
import AdminNavbar from "../../../components/AdminComponents/Admin/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback, deleteFeedback } from "../../../Redux/ActionCreators/FeedbackActionCreators";

import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net"; 

export default function FeedbackList() {
  let [showModal, setShowModal] = useState(false);
  let [showComments, setShowComments] = useState(null);

  let dispatch = useDispatch();
  let FeedbackStateData = useSelector((state) => state.FeedbackStateData);

  function handleDeleteFeedback(id) {
      if (window.confirm(`Are you want to delete that item : ${id}`)) {
        dispatch(deleteFeedback({ id: id }));
        getApiData();
      }
    }

  function getApiData() {
    dispatch(getFeedback());

    if (FeedbackStateData.length) {
      var time = setTimeout(() => {
        $("#myTable").DataTable();
      }, 300);

      return time;
    }
  }

  useEffect(() => {
    let time = getApiData();
    return () => clearTimeout(time);
  }, [FeedbackStateData.length]);

  // function viewFeedback() {
  //   setShowModal(true);
  //   setShowComments(showComments);
  // }
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-1  overflow-auto bg-gray-50 p-6 sm:p-8 md:ml-64">
          {/* <!-- Feedback List --> */}
          <section className="tab-content ">
            <h2 className="text-2xl font-bold text-green-700 mb-6">
              All Feedback
            </h2>
            <div className="overflow-x-auto max-w-full   ">
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
                      Name
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
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold"
                    >
                      Comment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {FeedbackStateData.map((item, index) => {
                    return (
                      <tr key={item.id} >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           {item.name}
                        </td>
                        <td className="px-6 py-4 font-semibold text-green-700 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap"> {item.rating}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {setShowModal(true);
                             setShowComments(item.comments)
                            }}
                            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 focus:outline-none text-sm"
                          >
                            View
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteFeedback(item.id)}
                            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 focus:outline-none text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-5 shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 bg-green-100 px-3 py-1 rounded-full right-4 text-xl text-gray-500 hover:bg-green-800 hover:text-white  font-bold"
            >
              &times;
            </button>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Full Message
            </h3>

            {/* Message Content */}
            <div className="text-gray-700 mb-4">
              <p className="mb-2">
                { showComments ? showComments : "No comments available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
