import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import ModalComponent from '../Modal/Modal';

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-color: pink;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5,148,112);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>
            Fill what you want
          </Heading>
          <SubHeading>
            Grow, learn, and become more succesful by reading some of the top article by highly individuals
          </SubHeading>
          <ModalComponent 
            text="Signup"
            variant="primary"
            isSingupFlow={true}
          />
          <ModalComponent 
            text="Login"
            variant="secondary"
            isSingupFlow={false}
          />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  )
}

export default Hero;
