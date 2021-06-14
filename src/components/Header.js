import React from 'react'
import { Link } from "react-router-dom"
import NavBar from './NavBar'

function header() {
    return (
        <div class="header-container">
            <div className="container header">
                <Link to="/">
                    <img className="header-logo" src="https://i.ibb.co/sQmL9Qr/Group-7.png" alt="" />
                </Link>
                <span className="header-line1"></span>
                <span className="header-line2"></span>
                <span className="header-line3"></span>
                <NavBar />
            </div>
        </div>
        
    )
}

export default header
