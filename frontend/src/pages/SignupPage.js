import React,{useState} from 'react'
import FormContainer from './../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { signup} from './../actions/userActions';

const SignupPage = ({history}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch()

  const {loading} = useSelector(state => state.auth);
  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(signup(username, email, password, confirmPassword))
      history.push('/')
    }
  }

  return (
    <>
      <div className="banner d-flex justify-content-center flex-column">
        <FormContainer>
          <h1>Sign Up</h1>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control type="text" placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="user@example.com"
                onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                onChange={e => setPassword(e.target.value)}
              />

            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                onChange={e => setConfirmPassword(e.target.value)}
              
              />
            </Form.Group>
            <Button  type="submit">
              Submit
            </Button>
          </Form>
        </FormContainer>
      </div>
    </>
  )
}

export default SignupPage
