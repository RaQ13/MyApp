import React from "react";

export const MobileMenu = (props) => {
    const {date} = props
    // console.log(date.getMonth()); czemu 06?
    return (
        <div className="container">
            <div className="header mobile__menu">
                <nav className="header__nav">
                    <h2>Ile dziś zarobisz</h2>
                    <p>Dzisiaj jest: {date.getDay()}.{date.getMonth() +1}.{date.getFullYear()}</p>
                    <a className="hamburger"><i className="fas fa-bars"></i></a>
                    <ul className="header__list">
                        <li>aa</li>
                        <li>aa</li>
                        <li>aa</li>
                        <li>aaa</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}