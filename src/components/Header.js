import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() { // TODO: Make this clickable to return to the landing page
    return (
        <div className="header">
            <div className="title-box">
                <Link to="/"><img className="logo" src= {process.env.PUBLIC_URL + "/logo.png"} alt="main logo"/></Link>
                <div className="title-and-subtitle">
                    <h1 className="title">
                        Breadbox
                    </h1>
                    <h4 className="subtitle">
                        Asking the real questions!
                    </h4>
                </div>
            </div>
        </div>
    )
}
