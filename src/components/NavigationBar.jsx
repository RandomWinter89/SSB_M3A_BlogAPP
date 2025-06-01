import React from "react";

import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Button, Container, Navbar, Nav } from "react-bootstrap";

import useLocalStorage from "use-local-storage";

const NavigationBar = () => {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        setAuthToken("");
        navigate("/login");
    };
    
    return(
        < >
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/home">Home</Navbar.Brand>
                    <Nav>
                        {authToken && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
                        {!(location.pathname === "/login" || authToken) && (<Nav.Link as={Link} to="/login">Register</Nav.Link>)}
                        {authToken && <Button className="ms-2" onClick={handleLogout}>Logout</Button>}
                    </Nav>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    );
}

export default NavigationBar;