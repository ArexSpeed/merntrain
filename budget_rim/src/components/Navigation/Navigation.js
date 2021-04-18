import React from 'react'
import { Link } from 'react-router-dom';
import { Container, NavigationWrapper, List } from './Navigation.css';


const Navigation = ({ items }) => {
  return (
    <Container>
      <NavigationWrapper>
        <List>
        {items.map(item => (
            <li key={item.to}>
              <Link to={item.to}>{(item.content)}</Link>
            </li>
          ))}
        </List>
      </NavigationWrapper>
    </Container>
  )
}

export default Navigation
