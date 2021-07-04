import React from "react";

export const Header = (props) => {
    const {date} = props
    return (
        <div className="container">
            <div className="header">
                    <h2>Ile zarobiłeś</h2>
                    <p>Dzisiaj jest: {date.getDate()}.{date.getMonth() +1}.{date.getFullYear()}</p>
            </div>
        </div>
    )
}