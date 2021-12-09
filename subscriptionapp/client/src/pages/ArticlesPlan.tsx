import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 30rem;
  background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19,29,19, 0.3);
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19,29,19, 0.3);
`

const ArticlesPlan = () => {
  const [prices, setPrices] = useState<any[]>([]);
  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const {data: response} = await axios.get("http://localhost:5000/subs/prices");
    console.log(response.data);
    setPrices(response.data);
  }

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post("http://localhost:5000/subs/session", 
      {
        priceId
      }
    );

    window.location.href = response.url;
  }

  const backgroundColors: any = {
    Basic: "rgb(104,219,104)",
    Standard: "rgba(187, 42, 23, 0.835)",
    Premium: "pink"
  }

  return (
    <Container>
      <CardsContainer>
        {prices.map((price: any, i) => (
          <Card key={i} style={{ width: "18rem", height: "25rem", marginRight: "2rem" }}>
            <CardHeader style={{ backgroundColor: backgroundColors[price.nickname]}}>
              <PriceCircle>
                <PriceText>
                ${price.unit_amount/100}
                </PriceText>
              </PriceCircle>
            </CardHeader>
            <Card.Body>
              <Card.Title style={{ fontSize: "2rem" }}>
                {price.nickname}
              </Card.Title>
              <Button 
                variant="primary" 
                className="mt-4"
                onClick={() => createSession(price.id)}
              >
                Buy now
              </Button>
            </Card.Body>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  )
}

export default ArticlesPlan;
