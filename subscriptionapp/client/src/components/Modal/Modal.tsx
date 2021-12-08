import axios from 'axios';
import { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  text: string;
  variant: 'primary' | 'secondary' | 'danger';
  isSingupFlow: boolean;
}

const ErrorMessage = styled.p`
  color: red;
`

const ModalComponent = ({ text, variant, isSingupFlow }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    let data;
    if(isSingupFlow) {
      //instead const response we can destructure to { data: signUpData }
      const { data: signUpData } = await axios.post('http://localhost:5000/auth/signup', {
        email,
        password
      });
      data = signUpData;
    } else {
      const { data: loginData } = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });
      data = loginData;
    }

    if(data.errors.length) {
      return setErrorMsg(data.errors[0].msg);
    }

    localStorage.setItem("token", data.data.token);
    navigate("/articles");
  }

  return (
    <>
      <Button onClick={handleShow} variant={variant} size="lg" className="m-2">
        {text}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {text}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              Email
            </InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              Password
            </InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClick}>{text}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalComponent;
