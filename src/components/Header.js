import React from 'react'

export default function Header() {
    return (
        <div className="header">
            <div className="title-box">
                <img className="logo" src="logo.png" />
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
