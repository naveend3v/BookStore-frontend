import React, { useState } from 'react'

export default function SignUp() {

  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    password: ''
  })

  function HandeChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails(values => ({ ...values, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userDetails)
  }

  return (
    <div className='SignUp'>
      <div className='Login d-flex justify-content-center align-items-center 100-w vh-100 bg-dark'>

        <div className="form-container 40-w p-5 border rounded bg-white">

          <form onSubmit={handleSubmit} onChange={HandeChange} >
            <h3 className="text-center">ReaderHub</h3>

            <div className="">
              <label htmlFor="email" className="" />
              <input type="email" className="form-control" placeholder="Enter Email Address" id="email" name="email" required />
            </div>

            <div className="">
              <label htmlFor="username" className="" />
              <input type="text" placeholder="Enter Username" id="username" name="username"  className="form-control" required />
            </div>

            <div className="">
              <label htmlFor="password" className="" />
              <input type="password" placeholder="Enter Password" id="password" name="password" className="form-control" required />
            </div>

            <div className="d-grid mt-3">
              <button className="btn btn-primary" type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
