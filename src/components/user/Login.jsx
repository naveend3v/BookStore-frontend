import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login() {

  const [cred, setCred] = useState({
    username: '',
    password: ''
  })

  function HandeChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setCred(values => ({ ...values, [name]: value }))
  }

  function handleSubmit(event) { 
    event.preventDefault();
    console.log(cred)
  }

  return (
    <div className='Login d-flex justify-content-center align-items-center 100-w vh-100 bg-dark'>

      <div className="form-container 40-w p-5 border rounded bg-white">

        <form onSubmit={handleSubmit}>
          <h3 className="text-center">ReaderHub</h3>

          <div className="mb-2">
            <label htmlFor="username" className="" />
            <input type="text" placeholder="Enter Username" id="username" name="username" className="form-control" onChange={HandeChange} required />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="" />
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
