import React from 'react'
import { Link } from "react-router-dom"

function ComicBotton() {
    return (
        <div className="CommicBotton-container">
            <Link to="/store/japan">
                <div className="CommicBotton">
                    <img src="/images/JapanComic.png" alt="" />
                </div>
            </Link>
            <Link to="/store/taiwan">
                <div className="CommicBotton">
                    <img src="/images/TaiwanComic.png" alt="" />
                </div>
            </Link>
        </div>
    )
}

export default ComicBotton
