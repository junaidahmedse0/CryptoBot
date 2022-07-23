import React, { useEffect, useState } from "react";

import "../App.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { toast } from "react-toastify";

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(5, "Password must be at least 8 characters"),
});

const SignIn = (props) => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    remember: false,
  });

  let history = useNavigate();
  useEffect(() => {
    //Runs only on the first render
    let values = JSON.parse(localStorage.getItem("remember"));
    console.log("Get Remember values", values);
    if (values?.remember) {
      console.log("set Remember values");
      setInitialValues(values);
      console.log("set Remember values", initialValues);
    }
  }, []);
  useEffect(() => {
    console.log("User updated", user);
  }, [user]);
  return (
    <>
      <div className="col-md-4 col-sm-8 col-xs-12 offset-md-4   mt-5">
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values) => {
            // Alert the input values of the form that we filled
            console.log("Inside Login");
            if (values.remember) {
              console.log("Inside remember");

              localStorage.setItem("remember", JSON.stringify(values));
            }

            AuthService.login(values.email, values.password).then(
              (response) => {
                console.log("inside login", response);
                if (response?.status === "ok") {
                  setMessage(response.message);
                  toast.success(response.message);
                  setUser(response);
                  props.setIsLogged(true);
                  props.setUserName(response.name);
                  history("/");
                } else if (response?.status === "invalid") {
                  setMessage(response?.message);
                  toast.error(response.message);
                }
              },
              (error) => {
                console.log("inside error", error);
              }
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
                    <h3 className="d-flex justify-content-center">LogIn</h3>
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
                      placeholder="Enter email"
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
                      placeholder="Enter password"
                      className="form-control"
                    />
                  </div>
                  <div className="error">
                    {errors.password && touched.password && errors.password}
                  </div>
                  <div className="form-check mt-3 ">
                    <input
                      type="checkbox"
                      name="remember"
                      value={values.remember}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-check-input ml-4"
                      id="remember"
                    />
                    <label className="form-check-label">Remember me</label>
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
                    Login
                  </button>
                  {message.length > 0 ? (
                    <div
                      class="alert alert-danger mt-2 d-flex justify-content-center"
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
                  Don't have an account ?{" "}
                  <NavLink to="/sign-up">SignUp</NavLink>
                </div>
              </div>
            </>
          )}
        </Formik>
      </div>

      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
    </>
  );
};

export default SignIn;
