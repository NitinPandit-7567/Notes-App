import Navbar from "../../components/Navbar";
import { useState, useEffect } from 'react'
import getToken from "../../assets/getToken";
import { useNavigate } from "react-router-dom";
export default function Notes() {
    const [token, setToken] = useState(getToken())
    const [notes, setNotes] = useState(new Array())
    const navigate = useNavigate()
    const getNotes = async function () {
        const response = await fetch('http://localhost:3000/mynotes', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                Authorization: token
            }
        })
        const res = await response.json();
        if (!res.error) {
            setNotes(res.notes)
        }
        else {
            sessionStorage.setItem('authToken', "")
            setToken(getToken())
            navigate('/login')
            alert(res.error);
        }

    }
    useEffect(() => {
        getNotes()
    }, [])
    let count = 3;
    let row = "row"
    return (<>
        <Navbar />
        {token &&
            <h1 className="text-center text-light">All Notes</h1>}
        <div className="row">
            {notes.map((el, i) => {
                console.log('Here:', el._id)

                // return (
                //     <div className="row">
                //         <div className="col-6 offset-4">
                //             <div key={`${el._id}`} className="card mb-2" style={{ width: "25rem" }}>
                //                 {el.img && <img src={el.img} className="card-img-top" alt={`${el._id} Image`} />}
                //                 <div className="card-body">
                //                     <h5 className="card-title">{el.title}</h5>
                //                     <h6>{el.description}</h6>
                //                     <p className="card-text">{el.text.slice(0, 30) + "\n..."}</p>
                //                     <a href={`/view/${el._id}`} className="btn btn-primary">View</a>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>)
                return (

                    <div className="col-3 mx-5 px-5">
                        <div key={`${el._id}`} className="card mb-2 text-bg-dark" style={{ width: "25rem" }}>
                            {el.img && <img src={el.img} className="card-img-top" alt={`${el._id} Image`} />}
                            <div className="card-body">
                                <h5 className="card-title">{el.title}</h5>
                                <h6>{el.description}</h6>
                                <p className="card-text">{el.text.slice(0, 30) + "\n..."}</p>
                                <a href={`/view/${el._id}`} className="btn btn-primary">View</a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </>);
}