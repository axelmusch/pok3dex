import React from "react"
import logo from "../images/Pok3Dex.png"

export default function Header() {
    return (
        <div className="header--container">
            {/* <h2 className="header--title">Pok3Dex</h2> */}
            <img className="header--title" src={logo} alt="Pok3Dex logo" />
        </div>

    )
}

