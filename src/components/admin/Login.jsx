import '../../components/Home.css'
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./api/AuthContext"

export default function LoginComponent() {

    const authContext = useAuth();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [failureMessage, setFailureMessage] = useState(null);

    const navigate = useNavigate()

    function updateUsername(event) {
        setUsername(event.target.value)
    }

    function updatePassword(event) {
        setPassword(event.target.value)
    }

    async function handleLoginSubmit(event) {
        event.preventDefault();
        if (await authContext.login(username, password)) {
            setFailureMessage(false)
            navigate(`/admin/books`)
        } else {
            setFailureMessage(true)
        }
    }

    return (
        <div className='LoginComponent d-flex justify-content-center align-items-center 100-w vh-100 bg-dark'>

            <div className="form-container 40-w p-5 border rounded bg-white">

                <form>
                    <h2 className="text-center">GoodReads</h2>

                    {failureMessage && <div className="failureMessage text-danger text-center">Incorrect username or password.</div>}

                    <div className="mb-2">
                        <label htmlFor="username" className="pb-1">Username</label>
                        <input type="text" placeholder="Enter Username" className="form-control" onChange={updateUsername} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="pb-1">Password</label>
                        <input type="password" placeholder="Enter Password" className="form-control" onChange={updatePassword} required />
                    </div>

                    <div className="d-grid mt-3">
                        <button className="btn btn-primary" type="submit" onClick={handleLoginSubmit}>Sign-in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
