import React from "react";

export const Header = (props) => {
    const {date} = props
    // console.log(date.getMonth()); czemu 06?
    return (
        <div className="container">
            <div className="header">
                    <h2>Ile dziś zarobisz</h2>
                    <p>Dzisiaj jest: {date.getDay()}.{date.getMonth() +1}.{date.getFullYear()}</p>
            </div>
        </div>
    )
}