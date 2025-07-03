import React, { useState, useEffect } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../../../Components/AdminComponents/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import FormValidator from "../../../Validators/FormValidator";
import ImageValidator from "../../../Validators/ImageValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  getTestimonial,
  createTestimonial,
} from "../../../Redux/ActionCreators/TestimonialActionCreators";

export default function AdminCreateTestimonial() {
  let [data, setData] = useState({
    name: "",
    pic: "",
    message: "",
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "Name field is mendatory",
    message: "Message field is mendatory",
    pic: "Pic field is mendatory",
  });

  let [show, setShow] = useState(false);

  let navigate = useNavigate();

  let dispatch = useDispatch();
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);

  function getInputData(e) {
    var name = e.target.name;
    var value =
      e.target.files && e.target.files.length
        ? "testimonial/" + e.target.files[0].name
        : e.target.value;

    // in case of real backend

    // var value =
    //   e.target.files && e.target.files.length
    //     ? e.target.files[0]
    //     : e.target.value;

    setErrorMessage((old) => {
      return {
        ...old,
        [name]: e.target.files ? ImageValidator(e) : FormValidator(e),
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
      let item = TestimonialStateData.find(
        (x) => x.name.toLowerCase() === data.name.toLowerCase()
      );
      if (item) {
        setShow(true);
        setErrorMessage((old) => {
          return { ...old, name: "Testimonial with same name already exist" };
        });
        return;
      }

      dispatch(createTestimonial({ ...data }));

      // in case of real backend

      // let formData = new FormData()
      // formData.append("name", data.name)
      // formData.append("pic", data.pic)
      // formData.append("message", data.message)
      // formData.append("active", data.active)
      // dispatch(createTestimonial(formData));

      navigate(`/admin/testimonial`);
    }
  }

  // Validation if product has same name
  useEffect(() => {
    dispatch(getTestimonial());
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
              <Link to="/admin/testimonial">
                {" "}
                <i className="bi bi-arrow-left-circle text-light float-end"></i>
              </Link>
            </h5>

            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    onChange={getInputData}
                    placeholder="Enter your name..."
                    className={`form-control border border-1 ${
                      show && errorMessage.name
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.name ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.name}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="my-3">
                <label>Message*</label>
                <textarea
                  name="message"
                  rows="5"
                  onChange={getInputData}
                  className={`form-control border border-1 ${
                    show && errorMessage ? "border-danger" : "border-primary"
                  }`}
                  placeholder="Enter your message..."
                ></textarea>
                {show && errorMessage.message ? (
                  <p className="text-danger text-capitalize">
                    {errorMessage.message}
                  </p>
                ) : null}
              </div>

              <div className="row ">
                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
                  <input
                    type="file"
                    name="pic"
                    onChange={getInputData}
                    placeholder="Enter your pic..."
                    className={`form-control border border-1 ${
                      show && errorMessage.pic
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.pic ? (
                    <p className="text-danger text-capitalize">
                      {errorMessage.pic}
                    </p>
                  ) : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    onChange={getInputData}
                    className="form-control border border-1 border-primary"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
