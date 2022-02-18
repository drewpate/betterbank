import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyCard from "./MyCard";

const AllAccounts = (props) => {
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  React.useEffect(() => {
    //Check for user in localstorage
    let token = localStorage.getItem("SavedToken");
    if (!token) return navigate("/login");
    //Fetch all accounts from API
    try {
      fetch(`${process.env.REACT_APP_API_URL}api/users`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData({ users: data });
        });
    } catch (error) {
      console.log(error.message);
    }
  }, [navigate]);

  return data.users?.length
    ? data.users?.map((user, item) => (
        <MyCard
          txtcolor="black"
          key={`user-${item}`}
          header={`Username: ${user.username}`}
          text={`Email: ${user.email}`}
          text2={`Password: ${user.password}`}
          body={`Checking Balance: ${user.checkingBalance}`}
          body2={`Savings Balance: ${user.savingsBalance}`}
        />
      ))
    : null;
};

export default AllAccounts;
