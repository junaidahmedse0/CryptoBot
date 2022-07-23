import React, { useState } from "react";

import "../App.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../services/auth.service";
// Creating schema
const schema = Yup.object().shape({
  name: Yup.string().required("Username is  required field"),
  email: Yup.string()
    .required("Email is  required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is  required field")
    .min(8, "Password must be at least 8 characters"),
  term: Yup.boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
});

const SignUp = () => {
  const [message, setMessage] = useState("");

  return (
    <div style={{}}>
      <div className="row mt-5">
        <div className="col-lg-3 col-md-4 col-sm-5 col-xs-8 offset-md-2 d-none d-sm-block d-flex justify-content-center align-items-center mb-4 ">
          <img
            src={require("../images/trading.png")}
            height={"100%"}
            width={"100%"}
            alt="logo"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-8 col-xs-12">
          <Formik
            validationSchema={schema}
            initialValues={{ name: "", email: "", password: "", term: false }}
            onSubmit={(values, { resetForm }) => {
              // Alert the input values of the form that we filled

              AuthService.register(
                values.name,
                values.email,
                values.password
              ).then(
                (response) => {
                  if (response?.status === "ok") {
                    setMessage(response.message);
                    toast.success(response.message);
                    resetForm();
                  } else if (response?.status === "exist") {
                    setMessage(response?.message);
                    toast.error(response.message);
                  }
                },
                (error) => {}
              );
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <>
                <div className="form">
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="row ">
                      <h3 className="d-flex justify-content-center">
                        Create your account
                      </h3>
                    </div>
                    <div className="input-group mt-4">
                      <span
                        className="input-group-text icon-style fa fa-user"
                        id="basic-addon1"
                      ></span>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Username"
                        className="form-control"
                        id="name"
                      />
                    </div>
                    <div className="error">
                      {errors.name && touched.name && errors.name}
                    </div>
                    <div className="input-group mt-4">
                      <span
                        className="input-group-text icon-style fa fa-envelope"
                        id="basic-addon1"
                      ></span>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Email"
                        className="form-control"
                        id="email"
                      />
                    </div>
                    <div className="error">
                      {errors.email && touched.email && errors.email}
                    </div>
                    <div
                      className="input-group mt-4 border"
                      style={{
                        borderStyle: "solid ",
                        borderColor: "red",
                        borderWidth: "3px",
                      }}
                    >
                      <span
                        className="input-group-text icon-style fa fa-lock"
                        id="basic-addon1"
                      ></span>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Password"
                        className="form-control"
                      />
                    </div>
                    <div className="error">
                      {errors.password && touched.password && errors.password}
                    </div>
                    <div className="form-check mt-3 ">
                      <input
                        name="term"
                        type="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.term}
                        className="form-check-input ml-4"
                      />
                      <label className="form-check-label">
                        I agree to Terms & and condtions{" "}
                        <span className="error">
                          {errors.term && touched.term && errors.term}
                        </span>
                      </label>
                    </div>
                    <button
                      className="btn mt-2"
                      style={{
                        backgroundColor: "#83bdf7",
                        color: "white",
                        width: "100%",
                      }}
                      type="submit"
                    >
                      Create my account
                    </button>
                    {message.length > 0 ? (
                      <div
                        className={`alert ${
                          message === "Successfully Registered"
                            ? "alert-success"
                            : "alert-danger"
                        } mt-2 d-flex justify-content-center`}
                        role="alert"
                        style={{ fontWeight: "bold" }}
                      >
                        {message}
                      </div>
                    ) : (
                      <></>
                    )}
                  </form>
                </div>
                <div className="row mt-2 ">
                  <div className="col d-flex justify-content-center">
                    Already have an account ?{" "}
                    <NavLink to="/sign-in">Sign in</NavLink>
                  </div>
                </div>
              </>
            )}
          </Formik>
        </div>

        {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      </div>
    </div>
  );
};

export default SignUp;
