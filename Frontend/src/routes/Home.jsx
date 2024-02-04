import Navbar from "../components/Navbar";

export default function Home() {
    return (<>
        <Navbar />
        <div className="container mt-5">
            <div className="row">
                <div className="col-6 offset-4 text-light"><h1>Welcome to Notes!</h1></div>
            </div>

        </div>
    </>);
}