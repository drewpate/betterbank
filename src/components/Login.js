import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useNewUser } from "../context/UserContext";

import MyCard from "./MyCard";
import * as Yup from "yup";

const Login = () => {
  const [show, setShow] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, setUser } = useNewUser();

  useEffect(() => {
    if (!currentUser?.length) setShow(true);
  }, [currentUser?.length]);

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Too short")
      .max(20, "Too Long")
      .required("Required"),
    password: Yup.string().min(8, "Too Short").required("Required"),
  });

  let navigate = useNavigate();

  const handleLogin = (values) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${values.username}`,
        password: `${values.password}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const token = res.token;
        if (!token)
          return (
            setLoginError(true) +
            setTimeout(() => {
              setLoginError(false);
            }, 1500)
          );
        localStorage.setItem("SavedToken", token);
        localStorage.setItem("username", values.username);
        setUser(values.username);
        setLoading(false);
        setShow(false);
      })
      .catch((error) => console.error("Error occurred on login", error));
  };

  return (
    <div>
      <MyCard
        header="Login"
        body={
          show ? (
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                handleLogin(values);
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
                    autoComplete="username"
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
                  Password
                  <br />
                  <Field
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="passord"
                  />
                  <br />
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
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-outline-primary w-100"
                  >
                    Submit
                  </button>
                  {loginError ? (
                    <div
                      style={{
                        color: "red",
                        backgroundColor: "pink",
                        textAlign: "center",
                        borderRadius: 5,
                        fontWeight: "bold",
                        fontSize: "x-small",
                        padding: 10,
                        marginTop: 10,
                      }}
                    >
                      Invalid Credentials
                    </div>
                  ) : null}
                  <br />
                  <br />
                  Don't have an account?
                  <br />
                  <a href="/createaccount" style={{ color: "blue" }}>
                    Create Account
                  </a>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <h5>Login successful!</h5>
              <button
                type="submit"
                className="btn btn-outline-primary mr-1"
                onClick={() => {
                  navigate("/myaccount");
                }}
              >
                Go to my account.
              </button>
            </>
          )
        }
      />
    </div>
  );
};

export default Login;
