import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import getToken from '../../assets/getToken'
export default function EditNotes() {
    const token = getToken()
    const navigate = useNavigate()
    const { id } = useParams()
    const [formData, setForm] = useState({ title: "", description: "", text: "", img: "" })
    const getData = async function () {
        const response = await fetch(`http://localhost:3000/view/${id}`, {
            headers: {
                Authorization: token
            }
        })
        const res = await response.json();
        if (res) {
            delete res.note._id
            console.log(res.note)
            setForm({ ...res.note })
            return res.note
        }
        else {
            return { title: "", description: "", text: "", img: "" }
        }
    }

    useEffect(() => {
        // setForm((currData) => { return { ...getData() } });
        getData()
    }, [])
    const handleChange = function (evt) {
        return setForm(currData => { return { ...currData, [evt.target.id]: evt.target.value } })
    }
    const handleSubmit = async function (evt) {
        evt.preventDefault();
        const response = await fetch(`http://localhost:3000/view/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(formData)
        })
        const res = await response.json();
        console.log(res);
        if (res.success) {
            return navigate(`/view/${id}`)
        } else {
            console.log(res)
        }
    }
    return (<>
        < Navbar />
        <div className="row">
            <div className="col-6 offset-2">
                <h1 className="text-light">{formData.title}</h1>
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
                    <a href={`/view/${id}`} className="btn btn-secondary me-2">Back</a>
                    <button type='submit' className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    </>);
}