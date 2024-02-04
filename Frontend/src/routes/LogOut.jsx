import getToken from "../assets/getToken"
import Navbar from "../components/Navbar"
import { useNavigate } from 'react-router-dom'
export default function LogOut() {
    const login = getToken()
    const navigate = useNavigate()
    const logout = async function () {
        if (login) {
            const response = await fetch('http://localhost:3000/user/logout')
            const res = await response.json()
            if (!res.login) {
                sessionStorage.setItem('authToken', "")
                return navigate('/')
            }
        }
    }
    logout()
    return (
        <>
            <div className="row">
                <div className="col-6 offset-3">
                    {!login &&
                        <h3>You have been successfully Logged Out</h3>
                    }
                </div>
            </div>
        </>)
}