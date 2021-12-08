import { useContext } from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import styled from "styled-components";

const LeftNavContainer = styled.div`
  margin-left: auto;
`

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  console.log(state, "nav");
  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Navbar>
      <NavItem>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </NavItem>
      {state.data && (
        <LeftNavContainer>
          <NavItem>
            <Link 
              to="/" 
              className="nav-link"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </NavItem>
        </LeftNavContainer>
        )
      }
    </Navbar>
  )
}

export default Nav;
