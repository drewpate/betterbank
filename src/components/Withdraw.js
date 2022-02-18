import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import MyCard from "./MyCard";

function Withdraw() {
  const [data, setData] = useState([]);
  const [checkingBalance, setCheckingBalance] = useState([]);
  const [savingsBalance, setSavingsBalance] = useState([]);
  const [selectedOption, setSelectedOption] = useState("checking");
  const [showError, setShowError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  React.useEffect(() => {
    const username = localStorage.getItem("username");

    try {
      fetch(`${process.env.REACT_APP_API_URL}api/users/account/${username}`, {
        headers: {
          Authorization: localStorage.getItem("SavedToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    } catch (err) {
      throw new Error(err.message);
    }
    setCheckingBalance(data.checkingBalance);
    setSavingsBalance(data.savingsBalance);
  }, [data.checkingBalance, data.savingsBalance]);

  const WithdrawSchema = Yup.object().shape({
    withdrawAmount: Yup.number("Please enter a number")
      .min(1)
      .required("Required")
      .positive()
      .integer(),
  });

  function handleUpdate(values, accountType) {
    const accountUpdate =
      accountType === "checking"
        ? { checkingBalance: -values.withdrawAmount, savingsBalance: 0 }
        : { checkingBalance: 0, savingsBalance: -values.withdrawAmount };
    try {
      const username = localStorage.getItem("username");
      fetch(`${process.env.REACT_APP_API_URL}api/users/transactions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("SavedToken"),
        },
        body: JSON.stringify({
          username,
          ...accountUpdate,
        }),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <div className="container">
      <MyCard
        className="mx-auto"
        header="Withdraw"
        txtcolor="black"
        body={
          <Formik
            initialValues={{
              userPosition: "",
              withdrawAmount: 0,
            }}
            validationSchema={WithdrawSchema}
            onSubmit={(values, { resetForm }) => {
              if (selectedOption === "checking") {
                if (checkingBalance < values.withdrawAmount) {
                  return (
                    setShowError(true) +
                    setTimeout(() => {
                      setShowError(false);
                    }, 1500)
                  );
                } else {
                  handleUpdate(values, selectedOption);
                  setCheckingBalance(checkingBalance - values.withdrawAmount);
                  resetForm();
                  return (
                    setShowSuccessMessage(true) +
                    setTimeout(() => {
                      setShowSuccessMessage(false);
                    }, 1500)
                  );
                }
              } else {
                if (savingsBalance < values.withdrawAmount) {
                  return (
                    setShowError(true) +
                    setTimeout(() => {
                      setShowError(false);
                    }, 1500)
                  );
                } else {
                  handleUpdate(values, selectedOption);
                  setSavingsBalance(savingsBalance - values.withdrawAmount);
                  console.log("you withdrew" + values.withdrawAmount);
                  resetForm();
                  return (
                    setShowSuccessMessage(true) +
                    setTimeout(() => {
                      setShowSuccessMessage(false);
                    }, 1500)
                  );
                }
              }
            }}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form>
                <label htmlFor="Choose-Account">Choose Account:</label>
                <br />
                <Field
                  as="select"
                  className="form-control"
                  id="ChooseAccount"
                  name="ChooseAccount"
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </Field>
                <br />
                {selectedOption === "checking" ? (
                  <p>{"Balance $" + checkingBalance}</p>
                ) : (
                  <p>{"Balance $" + savingsBalance}</p>
                )}
                <br />
                <p>Amount</p>
                {selectedOption === "checking" && (
                  <Field
                    className="form-control"
                    name="withdrawAmount"
                    id="withdrawAmount"
                    placeholder="Withdraw Checking"
                    type="number"
                    default="0"
                    min="0"
                  />
                )}
                {selectedOption === "savings" && (
                  <Field
                    className="form-control"
                    name="withdrawAmount"
                    id="withdrawAmount"
                    placeholder="Withdraw Savings"
                    type="number"
                    default="0"
                    min="0"
                  />
                )}
                <br />
                <br />
                {errors.userPosition && touched.userPosition ? (
                  <div
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "x-small",
                    }}
                  >
                    {errors.userPosition}
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="btn btn-outline-primary mr-1 w-100"
                  disabled={!(isValid && dirty)}
                >
                  Submit
                </button>
                <br />
                {showError ? (
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
                    Insufficient funds
                  </div>
                ) : null}
                {showSuccessMessage ? (
                  <div
                    style={{
                      color: "green",
                      backgroundColor: "LightGreen",
                      textAlign: "center",
                      borderRadius: 5,
                      fontWeight: "bold",
                      fontSize: "x-small",
                      padding: 10,
                      marginTop: 10,
                    }}
                  >
                    Withdraw Successful
                  </div>
                ) : null}
              </Form>
            )}
          </Formik>
        }
      />
    </div>
  );
}

export default Withdraw;
