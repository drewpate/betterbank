import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import MyCard from "./MyCard";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Too short")
      .max(20, "Too long")
      .required("Required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string().min(8, "Too short").required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <div className="container">
      <MyCard
        className="mx-auto"
        header="Please Create Account"
        txtcolor="black"
        body={
          show ? (
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={formSchema}
              onSubmit={(values, { resetForm }) => {
                (async () => {
                  setLoading(true);
                  try {
                    const response = await fetch(
                      `${process.env.REACT_APP_API_URL}api/users`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          username: `${values.username}`,
                          email: `${values.email}`,
                          password: `${values.password}`,
                        }),
                      }
                    ).then((res) => res.json());
                    console.log(response);
                    setShow(false);
                    setLoading(false);
                    resetForm();
                  } catch (err) {
                    console.log(err);
                    throw new Error(err.message);
                  }
                })();
              }}
            >
              {({ errors, touched, isValid, dirty }) => (
                <Form>
                  Username
                  <br />
                  <Field
                    className="form-control"
                    name="username"
                    placeholder="Enter username"
                    autoComplete="new-username"
                  />
                  {errors.username && touched.username ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "x-small",
                      }}
                    >
                      {errors.username}
                    </div>
                  ) : null}
                  <br />
                  Email address
                  <br />
                  <Field
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    autoComplete="new-username"
                  />
                  {errors.email && touched.email ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "x-small",
                      }}
                    >
                      {errors.email}
                    </div>
                  ) : null}
                  <br />
                  Password
                  <br />
                  <Field
                    className="form-control"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    autoComplete="new-password"
                  />
                  {errors.password && touched.password ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "x-small",
                      }}
                    >
                      {errors.password}
                    </div>
                  ) : null}
                  <br />
                  Confirm Password
                  <br />
                  <Field
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "x-small",
                      }}
                    >
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                  <br />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-outline-primary w-100"
                  >
                    Submit
                  </button>
                  <br />
                  <br />
                  <button
                    type="reset"
                    className="btn btn-outline-primary mt-1 w-100"
                    disabled={loading}
                  >
                    Clear
                  </button>
                  <br />
                  <br />
                  Already have an account?
                  <br />
                  <a href="/login" style={{ color: "blue" }}>
                    Login
                  </a>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <h5>Account successfully created!</h5>
              <button
                type="submit"
                className="btn btn-outline-primary mr-1"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Go to login page.
              </button>
            </>
          )
        }
      />
    </div>
  );
}

export default CreateAccount;
