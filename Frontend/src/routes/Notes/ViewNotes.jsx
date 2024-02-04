import getToken from "../../assets/getToken";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router";
export default function ViewNotes() {
    const { id } = useParams()
    console.log('ID: ', id)
    const [note, setNote] = useState("")
    const token = getToken()
    const navigate = useNavigate()
    const getNote = async function () {
        const response = await fetch(`http://localhost:3000/view/${id}`, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        const res = await response.json()
        console.log(res)
        if (res.success) {
            // const body = document.querySelector('body');
            // body.style.background = `url(${res.note.img})`
            // body.style.backgroundSize = '200% 200% '
            // body.style.height = '100vh'
            // console.dir(body.style.background)
            console.log(res.note)
            setNote(res.note)
        }
        else {
            sessionStorage.setItem('authToken', "")
            alert(res.error)
            return navigate('/login')
        }


    }
    const handleDelete = async function () {
        const response = await fetch(`http://localhost:3000/view/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        })
        const res = await response.json();
        if (res.success) {
            console.log(res)
            return navigate('/notes')
        }
        else {
            console.log(res)
        }
    }
    useEffect(() => {
        if (token) {
            getNote()
        }
    }, [])
    return (<>
        <Navbar />
        <div className="row mt-5">
            <div className="col-6 offset-4">
                {note && <div key={`${note._id}`} className="card text-bg-light bg-primary-subtle my-2" style={{ width: "35rem" }}>
                    {note.img && <img src={note.img} className="card-img-top" alt={`${note._id} Image`} />}
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <h6>{note.description}</h6>
                        <p className="card-text">{note.text}</p>
                        <a href={`/edit/${note._id}`} className="btn btn-warning me-2">Edit</a>
                        <a className="btn btn-danger" onClick={handleDelete}>Delete</a>
                    </div>
                </div>}
            </div>
        </div>
    </>)
}