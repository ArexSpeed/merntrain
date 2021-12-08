import axios from 'axios';
import { useState, useContext } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';

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
  const [state, setState] = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    let response;
    if(isSingupFlow) {
      //instead const response we can destructure to { data: signUpData }
      const { data: signUpData } = await axios.post('http://localhost:5000/auth/signup', {
        email,
        password
      });
      response = signUpData;
    } else {
      const { data: loginData } = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });
      response = loginData;
    }

    if(response.errors.length) {
      return setErrorMsg(response.errors[0].msg);
    }

    setState({
      data: {
        id: response.data.user.id,
        email: response.data.user.email
      },
      loading: false,
      error: null
    })
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common["authorization"] = `Bearer ${response.data.token};`
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
