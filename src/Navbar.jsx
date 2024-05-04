import { Link } from "react-router-dom";
import './App.css';

export default function Navbar() {
    return (
        <div className="App">
            <center>
                <ul>
                    <li><Link to={"/customers"}>Customers </Link></li>
                    <li><Link to={"/trainings"}>Training</Link></li>
                </ul>
            </center>
        </div>
    )
}