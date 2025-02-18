import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='Header bg-dark'>
      <nav className="navbar navbar-dark sticky-top w-100 navbar-expand-md bg-dark px-5 py-0">
        <div className="container-xxl">
          <Link className="navbar-brand fs-2 fw-bold text-light px-2 py-0" to="/">
            <span>ReaderHub</span>
          </Link>

          {/* Note: sometimes when clicking toggle button, the navbar does not collapse. We have to add below collapse js script to work.
                    import "../node_modules/bootstrap/js/src/collapse.js" */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="main-nav" className="collapse navbar-collapse align-center">
            <ul className="navbar-nav ms-auto px-3">
              <li className="nav-item fs-5">
                <Link className="nav-link text-light" to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item fs-5">
                <Link className="nav-link text-light" to="signup">
                  Sign-up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}