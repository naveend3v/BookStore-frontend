import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from './api/AuthContext';

export default function Login() {

  const [cred, setCred] = useState({
    username: '',
    password: ''
  })

  const [authFailureStatus, setAuthFailureStatus] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

  const navigate = useNavigate()

  const authContext = useAuth()

  function HandeChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setCred(values => ({ ...values, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await authContext.login(cred);
    try {
      if (result.loginStatus) {
        setAuthFailureStatus(false)
        navigate('/books')
      } else {
        setFailureMessage(result.message)
        setAuthFailureStatus(true)
      }
    } catch (error) {
      setFailureMessage(error.response.data.message)
      console.log(`Error submitting login request: ${error}`)
    }
  }

  return (
    <div className='Login d-flex justify-content-center align-items-center 100-w vh-100 bg-dark'>

      <div className="form-container 40-w p-5 border rounded bg-white">

        <form onSubmit={handleSubmit} validate>
          <h3 className="text-center">ReaderHub</h3>
          {authFailureStatus && <div className='text-danger text-center'>{failureMessage}</div>}
          <div className="mb-2">
            <input type="text" placeholder="Enter Username" id="username" name="username" className="form-control my-4" onChange={HandeChange} required />
          </div>
          <div className="mb-2">
            <input type="password" placeholder="Enter Password" id="password" name="password" className="form-control my-4" onChange={HandeChange} required />
          </div>
          <div className="d-grid mt-3">
            <button className="btn btn-primary" type="submit">Log in</button>
          </div>
          <div className='text-center my-3'>
            Don't have an account?&nbsp;
            <Link to="/signup" className='text-decoration-none fw-semibold'>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
