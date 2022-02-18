import React, { useState } from "react";
import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import MyCard from "./MyCard";

function Transfer() {
  const [data, setData] = useState([]);
  const [checkingBalance, setCheckingBalance] = useState([]);
  const [savingsBalance, setSavingsBalance] = useState([]);
  const [selectedFromOption, setSelectedFromOption] = useState("fromChecking");
  const [selectedToOption, setSelectedToOption] = useState("toSavings");
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

  const TransferSchema = Yup.object().shape({
    transferAmount: Yup.number()
      .required("Please enter an amount")
      .positive()
      .integer(),
  });

  function handleUpdate(values, transactionType) {
    const accountUpdate =
      transactionType === "fromChecking"
        ? {
            checkingBalance: -values.transferAmount,
            savingsBalance: values.transferAmount,
          }
        : {
            checkingBalance: values.transferAmount,
            savingsBalance: -values.transferAmount,
          };
    console.log(accountUpdate);
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
        header="Transfer"
        txtcolor="black"
        body={
          <Formik
            initialValues={{
              transferAmount: 0,
            }}
            validationSchema={TransferSchema}
            onSubmit={(values, { resetForm }) => {
              if (selectedFromOption === "fromChecking") {
                handleUpdate(values, selectedFromOption);
                setCheckingBalance(checkingBalance - values.transferAmount);
                setSavingsBalance(savingsBalance + values.transferAmount);
                resetForm();
                return (
                  setShowSuccessMessage(true) +
                  setTimeout(() => {
                    setShowSuccessMessage(false);
                  }, 1500)
                );
              } else {
                handleUpdate(values, selectedToOption);
                setCheckingBalance(checkingBalance + values.transferAmount);
                setSavingsBalance(savingsBalance - values.transferAmount);
                resetForm();
                return (
                  setShowSuccessMessage(true) +
                  setTimeout(() => {
                    setShowSuccessMessage(false);
                  }, 1500)
                );
              }
            }}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form>
                <label htmlFor="ChooseFromAccount">
                  <b>From:</b>
                </label>
                <br />
                <br />
                <Field
                  as="select"
                  name="ChooseFromAccount"
                  id="ChooseFromAccount"
                  className="form-control"
                  onChange={(e) => {
                    setSelectedFromOption(e.target.value);
                  }}
                >
                  <option value="fromChecking">
                    {"Checking: $ " + checkingBalance}
                  </option>
                  <option value="fromSavings">
                    {"Savings: $ " + savingsBalance}
                  </option>
                </Field>
                <br />
                <label htmlFor="ChooseFromAccount">
                  <b>To:</b>
                </label>
                <br />
                <br />
                <Field
                  as="select"
                  name="ChooseToAccount"
                  id="ChooseToAccount"
                  className="form-control"
                  onChange={(e) => {
                    setSelectedToOption(e.target.value);
                  }}
                >
                  <option value="toSavings">
                    {"Savings: $" + savingsBalance}
                  </option>
                  <option value="toChecking">
                    {"Checking: $ " + checkingBalance}
                  </option>
                </Field>
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
                <br />
                <p>Amount</p>
                <br />
                <Field
                  className="form-control"
                  name="transferAmount"
                  id="transferAmount"
                  placeholder="Transfer Amount"
                  type="number"
                  default="0"
                  min="0"
                />
                {errors.depositAmount && touched.depositAmount ? (
                  <div
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      marginTop: 6,
                      marginBottom: 10,
                      fontSize: "small",
                    }}
                  >
                    {errors.depositAmount}
                  </div>
                ) : null}
                <br />
                <button
                  type="submit"
                  className="btn btn-outline-primary mr-1 w-100"
                  disabled={!(isValid && dirty)}
                >
                  Submit
                </button>
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
                    <p>Funds Transferred Sucessfully</p>
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

export default Transfer;
