import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utilities/hooks/reduxHook';
import { useCallback } from 'react';
import { logout } from '../redux/slices/user.slice';

function NavBar() {
  const { userToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>
          <Link
            to={'/'}
            className="nav-link"
          >
            React-Bootstrap
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to={'/'}
              className="nav-link"
            >
              Home
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="ms-auto flex-grow-0"
        >
          <Nav className="me-auto">
            {userToken ? (
              <>
                <Link
                  to={'/login'}
                  className="nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={'/register'}
                  className="nav-link"
                >
                  Register
                </Link>
                <Link
                  to={'/login'}
                  className="nav-link"
                >
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
