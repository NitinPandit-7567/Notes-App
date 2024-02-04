import Navbar from "../../components/Navbar"
import { useState } from 'react'
import getToken from "../../assets/getToken"
import { redirect, useNavigate } from "react-router-dom"
import { useEffect } from "react"
//{ title, description, text, img }
export default function CreateNote() {
    const navigate = useNavigate()
    const [formData, setForm] = useState({ title: "", description: "", text: "", img: "" })
    const [login, setLogin] = useState(getToken());
    const handleChange = function (e) {
        setForm(currData => {
            return { ...formData, [e.target.id]: e.target.value }
        })
    }
    const handleSubmit = async function (e) {
        e.preventDefault();
        console.log(formData)
        const response = await fetch('http://localhost:3000/new', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: login
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(formData)
        });
        const res = await response.json();
        console.log(res)
        if (res.status === 'success') {
            return navigate('/notes')
        } else {
            sessionStorage.setItem('authToken', "");
            setLogin(getToken())
            return navigate('/login')
        }
    }
    useEffect(() => {
        if (!login) {
            alert('You must be signed in!')
            return navigate('/login')
        }
    })
    return (<>
        <Navbar />
        {login &&
            <div className="row">
                <div className="col-6 offset-3">
                    <h1 className="text-light">{formData.title || "New Note"}</h1>
                    {formData.img !== "" && <><img src={formData.img} style={{ width: "35rem" }} /><br /></>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label text-light">Title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="title" value={formData.title} required onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label text-light">Description</label>
                            <input type="text" className="form-control" id="description" aria-describedby="description" value={formData.description} required onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label text-light">Text</label>
                            <textarea name="text" id="text" className="form-control" rows="3" value={formData.text} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="img" className="form-label text-light">Image Source</label>
                            <input type="text" className="form-control" id="img" aria-describedby="img" value={formData.img} required onChange={handleChange} />
                        </div>
                        <button type='submit' className="btn btn-success">Create</button>
                    </form>
                </div>
            </div>}
    </>)
}