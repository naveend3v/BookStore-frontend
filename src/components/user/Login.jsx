import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './api/AuthContext';

export default function Login() {

  const [cred, setCred] = useState({
    username: '',
    password: ''
  })

  const [errorMsg, setErrorMsg] = useState(false)

  const navigate = useNavigate()

  const authContext = useAuth()

  function HandeChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setCred(values => ({ ...values, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (await authContext.login(cred) ) {
        setErrorMsg(false)
        navigate('/books')
      } else {
        setErrorMsg(true)
      }
    } catch (error) {
      setErrorMsg(true)
      console.log(errorMsg)
      console.log(`Error submitting login request: ${error}`)
    }

  }

  return (
    <div className='Login d-flex justify-content-center align-items-center 100-w vh-100 bg-dark'>

      <div className="form-container 40-w p-5 border rounded bg-white">

        <form onSubmit={handleSubmit}>
          <h3 className="text-center">ReaderHub</h3>
          {errorMsg && <div className='text-danger text-center'>Incorrect username or password</div>}
          <div className="mb-2">
            <label for="username" className="" />
            <input type="text" placeholder="Enter Username" id="username" name="username" className="form-control" onChange={HandeChange} required />
          </div>

          <div className="mb-2">
            <label for="password" className="" />
            <input type="password" placeholder="Enter Password" id="password" name="password" className="form-control" onChange={HandeChange} required />
          </div>

          <div className="d-grid mt-3">
            <button className="btn btn-primary" type="submit">Log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}
