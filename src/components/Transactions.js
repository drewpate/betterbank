import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Transfer from "./Transfer";

const Transactions = () => {
  const [showTransaction, setShowTransaction] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("SavedToken");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleShow = (e) => {
    let whichButton = e.target.id;
    console.log(whichButton);
    setShowTransaction(whichButton);
  };

  return (
    <div className="container">
      <div
        className="container"
        style={{ textAlign: "center", padding: 10, marginTop: 50 }}
      >
        <Button id="Withdraw" variant="primary" onClick={handleShow}>
          Withdraw
        </Button>{" "}
        <Button id="Deposit" variant="primary" onClick={handleShow}>
          Desposit
        </Button>{" "}
        <Button id="Transfer" variant="primary" onClick={handleShow}>
          Transfer
        </Button>
        <br />
        <br />
        {showTransaction === "Withdraw" ? (
          <Withdraw />
        ) : showTransaction === "Deposit" ? (
          <Deposit />
        ) : showTransaction === "Transfer" ? (
          <Transfer />
        ) : null}
      </div>
    </div>
  );
};

export default Transactions;
