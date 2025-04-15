import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { userSignUpAPIService } from './api/AuthApiService'

export default function SignUp() {

  const [userDetails, setUserDetails] = useState({
    email: '',
    name: '',
    password: ''
  })

  const navigate = useNavigate();

  function HandeChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails(values => ({ ...values, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(userDetails)
    try {
      const resp = await userSignUpAPIService(userDetails)

      if (resp.status === 200) {
        navigate('/')
      }
    } catch (error) {
      console.log(`Error in submitting user details : + ${error}`)
    }
  }

  return (
    <div className='SignUp'>
      <div className='Login d-flex justify-content-center align-items-center 100-w vh-100 bg-dark'>

        <div className="form-container 40-w p-5 border rounded bg-white">

          <form onSubmit={handleSubmit} onChange={HandeChange} >
            <h3 className="text-center">ReaderHub</h3>

            <div className="">
              <label for="email" className="" />
              <input type="email" className="form-control" placeholder="Enter Email Address" id="email" name="email" required />
            </div>

            <div className="">
              <label for="username" className="" />
              <input type="text" placeholder="Enter Username" id="username" name="name" className="form-control" required />
            </div>

            <div className="">
              <label for="password" className="" />
              <input type="password" placeholder="Enter Password" id="password" name="password" className="form-control" required />
            </div>

            <div className="d-grid mt-3">
              <button className="btn btn-primary" type="submit">Sign Up</button>
            </div>
            <div className='text-center my-3'>
              Have an account?&nbsp;
              <Link to="/login" className='text-decoration-none fw-semibold'>Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
