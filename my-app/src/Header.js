import React from "react";

export const Header = (props) => {
    const {date} = props
    return (
        <div className="header">
            <h1>Ile zarobiłeś</h1>
            <p className="header__date">Dzisiaj jest: {date.getDate()}.{date.getMonth() +1}.{date.getFullYear()}</p>
        </div>
    )
}