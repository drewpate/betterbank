import React, { useState } from "react";
import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import MyCard from "./MyCard";

function Deposit() {
  const [data, setData] = useState([]);
  const [checkingBalance, setCheckingBalance] = useState([]);
  const [savingsBalance, setSavingsBalance] = useState([]);
  const [selectedOption, setSelectedOption] = useState("checking");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
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
    setLoading(false)
  }, [data.checkingBalance, data.savingsBalance]);

  const DepositSchema = Yup.object().shape({
    depositAmount: Yup.number()
      .required("Please enter an amount")
      .positive()
      .integer(),
  });

  function handleUpdate(values, accountType) {
    const accountUpdate =
      accountType === "checking"
        ? { checkingBalance: +values.depositAmount, savingsBalance: 0 }
        : { checkingBalance: 0, savingsBalance: +values.depositAmount };

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
        header="Deposit"
        txtcolor="black"
        body={
          <Formik
            initialValues={{
              userPosition: "",
              depositAmount: 0,
            }}
            validationSchema={DepositSchema}
            onSubmit={(values, { resetForm }) => {
              if (selectedOption === "checking") {
                handleUpdate(values, selectedOption);
                setCheckingBalance(checkingBalance + values.depositAmount);
                resetForm();
                return (
                  setShowSuccessMessage(true) +
                  setTimeout(() => {
                    setShowSuccessMessage(false);
                  }, 1500)
                );
              } else {
                handleUpdate(values, selectedOption);
                setSavingsBalance(savingsBalance + values.depositAmount);
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
                <label htmlFor="Choose-Account">Choose Account:</label>
                <br />
                <Field
                  as="select"
                  name="ChooseAccount"
                  id="ChooseAccount"
                  className="form-control"
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </Field>
                <br />
                { loading? <p>Loading...</p> : selectedOption === "checking" ? (
                  <p>{"Balance $" + checkingBalance}</p>
                ) : (
                  <p>{"Balance $" + savingsBalance}</p>
                )}
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
                  name="depositAmount"
                  placeholder="Deposit Amount"
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
                    Deposit Sucessful
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

export default Deposit;
