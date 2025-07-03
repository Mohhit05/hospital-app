import React, { useEffect } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../../../Components/AdminComponents/Sidebar";
import { Link } from "react-router-dom";

import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net";

import {
  getTestimonial,
  deleteTestimonial,
} from "../../../Redux/ActionCreators/TestimonialActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function AdminTestimonial() {
  let dispatch = useDispatch();
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);

  function deleteRecord(id) {
    if (window.confirm(`Are you want to delete that item : ${id}`)) {
      dispatch(deleteTestimonial({ id: id }));
      getApiData();
    }
  }

  function getApiData() {
    dispatch(getTestimonial());

    if (TestimonialStateData.length) {
      var time = setTimeout(() => {
        $("#myTable").DataTable();
      }, 300);

      return time;
    }
  }

  useEffect(() => {
    let time = getApiData();
    return () => clearTimeout(time);
  }, [TestimonialStateData.length]);
  return (
    <>
      <Breadcrum title={"Testimonial"} />
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <h5 className="bg-primary w-100 p-2 my-2 rounded-top text-center pe-3 text-light">
              Testimonial{" "}
              <Link to="/admin/testimonial/create">
                <i className="bi bi-plus-circle text-light float-end"></i>
              </Link>
            </h5>
            <div className="table-responsive">
              <table
                id="myTable"
                className="table table-bordered table-striped table-hover"
              >
                <thead className="table-primary text-center">
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PIC</th>
                    <th>MESSAGE</th>
                    <th>ACTIVE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {TestimonialStateData.map((item, index) => {
                    return (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <Link
                            to={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}
                            target="_blank"
                          >
                            <img
                              src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}
                              alt="testimonial"
                              className="img-fluid rounded"
                              width="50"
                              height="50"
                            />
                          </Link>
                        </td>
                        
                        <td>
                          <div className="testimonial-message ">
                            {item.message}
                          </div>
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              item.active ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {item.active ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/admin/testimonial/update/${item.id}`}
                            className="btn btn-sm btn-warning me-2 my-1"
                          >
                            <i className="bi bi-pencil-square"></i> Update
                          </Link>
                          <button
                            onClick={() => deleteRecord(item.id)}
                            className="btn btn-sm btn-danger my-1"
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
