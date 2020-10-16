import React,{useState} from 'react'
import FormContainer from './../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { login } from './../actions/userActions';
import { useDispatch, useSelector } from 'react-redux'

const LoginPage = ({history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);
  const onSubmitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
    history.push('/')
  }

  return (
    <>
      <div className="banner d-flex justify-content-center flex-column">
        <FormContainer>
        <h1>Log In</h1>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="user@example.com"
                onChange={e=> setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e=> setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">
              Submit
            </Button>
          </Form>
        </FormContainer>

      </div>
    </>
  )
}


export default LoginPage
