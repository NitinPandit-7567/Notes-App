import getToken from "../assets/getToken";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import logo from '../../Logo.png'
export default function Navbar({ hide }) {
    const navigate = useNavigate()
    const [login, setLogin] = useState(getToken())
    // useEffect(() => {
    //     async () => {
    //         setTimeout(() => {
    //             console.log('Here')
    //             return redirect('/')
    //         }, 30000)
    //     }

    // }, [login])
    const handleLogout = async () => {
        const response = await fetch('http://localhost:3000/user/logout', {
            headers: {
                Authorization: `${login}`
            }
        })
        const res = await response.json()
        if (!res.error && !res.login) {
            sessionStorage.setItem('authToken', "")
            setLogin(false)
            return navigate('/')
        }
        else {
            if (res.error) {
                sessionStorage.setItem('authToken', "")
                setLogin(false)
                return navigate('/')
            }
        }
    }
    const authenticationButtons = function () {
        if (!login) {
            if (hide === 'signup') {
                return (
                    <a className="btn btn-success me-2" href='/login'>LogIn</a>
                )
            }
            if (hide === 'login') {
                return (<a className="btn btn-primary me-2" href='/sign-up'>SignUp</a>)
            }
            else {
                return (<div>
                    <a className="btn btn-primary me-2" href='/sign-up'>SignUp</a>
                    <a className="btn btn-success me-2" href='/login'>LogIn</a>
                </div>)
            }
        }
        else {
            return (<a className="btn btn-warning me-2" onClick={handleLogout}>Logout</a>)
        }
    }
    const authenticatedLinks = function () {
        if (login) {
            return (<><li className="nav-item">
                <a className="nav-link" href="/notes">My Notes</a>
            </li>
                <li className="nav-item">
                    <a className="nav-link" href="/new">New Note</a>
                </li></>)
        }
        else {
            return (<><li className="nav-item">
                <a className="nav-link" href="#">About</a>
            </li></>)
        }
    }
    const finalButtons = authenticationButtons()
    const finalLinks = authenticatedLinks()
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img
                        src={logo} alt="Logo" stwidth="50" height="44" />Notes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {finalLinks}

                        </ul>
                        {/* {!login &&
                            <div>
                                {hide !== 'signup' && <a className="btn btn-primary me-2" href='/sign-up'>SignUp</a>}
                                {hide !== 'login' && <a className="btn btn-success me-2" href='/login'>LogIn</a>}
                            </div>
                        }
                        {login && <a className="btn btn-warning me-2" onClick={handleLogout}>Logout</a>} */}
                        {finalButtons}
                    </div>
                </div>
            </nav >
        </>
    );
}