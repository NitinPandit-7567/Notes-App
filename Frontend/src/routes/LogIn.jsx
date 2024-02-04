import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
export default function LogIn() {
    const navigate = useNavigate()
    const [formData, setForm] = useState({ username: "", password: "" })
    const [error, setError] = useState({ error: "", isError: false })
    useEffect(() => {
        // setError({ ...error, isError: false })
        const fields = document.querySelectorAll('input')
        for (let i of fields) {
            i.classList.remove('is-invalid')
        }
    }, [formData])
    const logger = (token) => {
        return sessionStorage.setItem('authToken', token)
    }
    const handleChange = function (e) {
        setForm((currentData) => { return { ...currentData, [e.target.id]: e.target.value } })
    }
    const setAutofocus = function () {
        if (error.isError) {
            const fields = document.querySelectorAll('input')
            for (let i of fields) {
                i.classList.add('is-invalid')
                console.log('Toggle:', i)
            }
        }
    }
    const handleSubmit = async function (e) {
        e.preventDefault()
        console.log(formData)
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(formData)
        });
        const responseJson = await response.json();
        console.log(responseJson)
        if (responseJson.error) {
            setError({ error: responseJson.error, isError: true })
        }
        else {
            if (responseJson.login) {
                logger(JSON.stringify(responseJson.authToken))
                console.log('AuthToken set')
                return navigate('/')
            }
        }

    }
    setAutofocus();
    return (
        <>
            <Navbar hide={'login'} />
            {error.isError && <div className="alert alert-danger alert-dismissible fade show" role="danger">
                <strong>{error.error.message}</strong>.
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
            <div className="row text-light">
                <div className="col-6 offset-3">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-center">LogIn</h1>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" aria-describedby="username" value={FormData.username} required onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required value={FormData.password} onChange={handleChange} />
                        </div>
                        <button type='submit' className="btn btn-success">LogIn</button>
                    </form>
                    <br />
                    <div>
                        <p>Need an Account?<br /><a href='/sign-up'>Sign Up</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}