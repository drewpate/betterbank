import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();

export function useNewUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) return;
    setCurrentUser(user);
  }, []);

  const setUser = (data) => {
    setCurrentUser(data);
  };

  const value = {
    currentUser,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
