import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem, NavbarBrand, Container} from 'reactstrap'


const Heading = () => {
  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand href="/">Users</NavbarBrand>
        <Nav>
          <NavItem>
            <Link to="/add" className="btn btn-primary">Add User</Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Heading
