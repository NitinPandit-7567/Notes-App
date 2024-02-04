import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import getToken from '../assets/getToken'
import { useNavigate } from 'react-router-dom'
export default function SignUp() {
    const [formData, setFormData] = useState({ email: "", username: "", password: "", firstName: "", lastName: "", phone: null, address: "" })
    const [error, setError] = useState({ field: '', message: '', isError: false })
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    const imageUrl = "data:image/jpeg;base64,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"
    useEffect(() => {
        if (formData[error.field] != "") {
            setError({ ...error, isError: false })
            const field = document.getElementById(error.field)
            if (field) {
                field.classList.remove('is-invalid');
                field.autofocus = false
            }
        }
    }, [formData])
    const handleChange = function (e) {
        let id = e.target.id;
        let value = e.target.value;
        setFormData(currentData => {
            return { ...currentData, [id]: value }
        })
    }
    const setAutofocus = function () {
        if (error.isError) {
            const field = document.getElementById(error.field)
            console.log(field)
            if (field) {
                field.classList.add('is-invalid')
                field.autofocus = true
                console.log('Toggle:', field)
            }
        }
    }
    const handleSubmit = async function (e) {
        e.preventDefault();
        console.log(formData)
        const response = await fetch('http://localhost:3000/user/sign-up', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(formData)
        })
        const responseJson = await response.json()
        console.log(responseJson)
        if (responseJson.error) {
            let field = responseJson.error.details[0].path[0];
            let message = responseJson.error.details[0].message
            setError({ field: field, message: message, isError: true })

        } else {
            sessionStorage.setItem('authToken', responseJson.authToken)
            return navigate('/')
        }
    }
    setAutofocus();
    return (
        <>
            <Navbar hide={'signup'} />
            {error.isError && <div className="alert alert-danger alert-dismissible fade show" role="danger">
                <strong>Invalid Fileds: [{error.field.toUpperCase()}]</strong> {error.message}.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            <div className="row text-light">
                <div className="col-6 offset-3">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-center">SignUp</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="email" value={FormData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" required value={FormData.username} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required value={FormData.password} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" required value={FormData.firstName} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" required value={FormData.lastName} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="number" className="form-control" id="phone" required value={FormData.phone} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea className="form-control" id="address" rows="3" value={formData.address} onChange={handleChange}></textarea>
                        </div>
                        {/* <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" for="exampleCheck1">Check me out</label>
                            </div> */}
                        <button type="submit" className="btn btn-primary mx-auto">SignUp</button>
                    </form>
                </div>
            </div >
        </>
    );
}