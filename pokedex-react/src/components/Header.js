import React from "react"
import { Link } from "react-router-dom"
import logo from "../images/Pok3Dex.png"

export default function Header() {
    return (
        <div className="header--container">
            {/* <h2 className="header--title">Pok3Dex</h2> */}
            <Link to='/'>
                <img className="header--title" src={logo} alt="Pok3Dex logo" />
            </Link>

        </div>

    )
}

