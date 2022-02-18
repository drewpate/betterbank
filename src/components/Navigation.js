import React from "react";
import { Nav, Navbar, Container, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useNewUser } from "../context/UserContext";

const Navigation = () => {
  let navigate = useNavigate();

  const { currentUser, setUser } = useNewUser();

  // const fetchCurrentUser = useCallback(() => {
  //   const user = localStorage.getItem('username');
  //   if (!user) return;
  //   console.log(user);
  // }, [currentUser]);

  // useEffect(fetchCurrentUser, [fetchCurrentUser]);

  function handleLogout() {
    localStorage.setItem("username", "");
    localStorage.setItem("SavedToken", "");
    setUser(null);
    navigate("/login");
  }

  // function goToLogin() {
  //   navigate("/login");
  // }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">The Better Bank</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/myaccount">My Account</Nav.Link>
              <Nav.Link href="/transactions">Transactions</Nav.Link>
              <Nav.Link href="/allaccounts">All Accounts</Nav.Link>
            </Nav>
            {currentUser?.length && (
              <h4>
                <Badge style={{ margin: 10 }}>{currentUser}</Badge>
              </h4>
            )}
            {currentUser?.length ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Button onClick={handleLogout}>Login</Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
