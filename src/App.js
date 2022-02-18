import React from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import MyAccount from "./components/MyAccount";
import Login from "./components/Login";
import Transactions from "./components/Transactions";
import AllAccounts from "./components/AllAccounts";
import { Routes, Route, Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/allaccounts" element={<AllAccounts />} />
        </Routes>
      </UserProvider>
      <Outlet />
    </div>
  );
}

export default App;
