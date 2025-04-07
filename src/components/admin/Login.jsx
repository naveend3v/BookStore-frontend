import '../../components/Home.css'
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./api/AuthContext"

export default function LoginComponent() {

    const authContext = useAuth();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [authFailureStatus, setAuthFailureStatus] = useState(null);
    const [failureMessage, setFailureMessage] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {},[failureMessage])

    function updateUsername(event) {
        setUsername(event.target.value)
    }

    function updatePassword(event) {
        setPassword(event.target.value)
    }

    async function handleLoginSubmit(event) {
        event.preventDefault();
        const result = await authContext.login(username, password)
        if (result.loginStatus) {
            setAuthFailureStatus(false)
            navigate(`/admin/books`)
        } else {
            setFailureMessage(result.message)
            setAuthFailureStatus(true)
        }
    }

    return (
        <div className='LoginComponent d-flex justify-content-center align-items-center 100-w vh-100 bg-dark'>

            <div className="form-container 40-w p-5 border rounded bg-white">

                <form className='ValidateForm' validate onSubmit={handleLoginSubmit}>
                    <h3 className="text-center">ReaderHub</h3>
                    {authFailureStatus && <div className="failureMessage text-danger text-center">{failureMessage}</div>}
                    <div className="">
                        <input type="text" placeholder="Enter Username" className="form-control my-4" onChange={updateUsername} required />
                    </div>
                    <div className="">
                        <input type="password" placeholder="Enter Password" className="form-control my-4" onChange={updatePassword} required />
                    </div>
                    <div className="d-grid mt-3">
                        <button className="btn btn-primary" type="submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
