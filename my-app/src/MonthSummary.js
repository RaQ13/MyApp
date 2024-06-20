import React, { useState, useEffect } from "react";

const API = "http://localhost:3000";

export const MonthSummary = (props) => {
    const [month, setMonth] = useState(props.date.getMonth() + 1);
    const [monthStats, setMonthStats] = useState([]);
    const [forwardedMonth, setForwardedMonth] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [shownDay, setShownDay] = useState([]);

    const months = [
        '',
        'styczen',
        'luty',
        'marzec',
        'kwiecień',
        'maj',
        'czerwiec',
        'lipiec',
        'sierpień',
        'wrzesień',
        'październik',
        'listopad',
        'grudzień'
    ];

    useEffect(() => {
        fetch(`${API}/db`).then(res => res.json()).then(data => {
            setMonthStats(data);
            // Aktualizacja forwardedMonth po załadowaniu danych
            const initialMonthData = data.filter(item => item.month === month);
            setForwardedMonth(initialMonthData);
        })
            .catch(error => {
                console.log(error);
            });
    }, [month]);

    const toggleSummary = () => {
        setShowSummary(prev => !prev);
    };

    const filterMonthData = () => {
        const filteredData = monthStats.filter(item => item.month === month);
        setForwardedMonth(filteredData);
    };

    const calculateSalarySum = () => {
        let salarySum = 0;
        forwardedMonth.forEach(day => {
            salarySum += day.salary;
        });
        return salarySum.toFixed(2);
    };

    const handleMonthChange = (direction) => {
        setMonth(prev => {
            let newMonth = prev;
            if (direction === "prev" && prev > 1) newMonth = prev - 1;
            if (direction === "next" && prev < 12) newMonth = prev + 1;
            return newMonth;
        });
    };

    const handleDayClick = (ev) => {
        let clickedDay = "";

        if (ev.target.tagName !== "LI" && ev.target.tagName !== "P") {
            return;
        }

        if (ev.target.tagName === "LI") {
            clickedDay = ev.target.innerText;
        }
        if (ev.target.tagName === "P") {
            clickedDay = ev.target.parentElement.innerText;
        }
        const chosenDay = forwardedMonth.filter(day => day.day === Number(clickedDay));
        setShownDay(chosenDay);
    };

    const renderMonthHeader = () => {
        return <h2>Podsumowanie miesiąca {months[month]}</h2>;
    };

    useEffect(() => {
        filterMonthData();
    }, [month, monthStats]);

    if (!showSummary) {
        return (
            <div className="container month__summary__container" style={{ width: "20%" }}>
                <div className="month__summary">
                    <div className="month__summary__bars">
                        <button
                            style={{ display: "block", margin: "0 auto", width: "100%" }}
                            onClick={() => { toggleSummary(); filterMonthData(); }}
                        >
                            Pokaż podsumowanie aktualnego miesiaca
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container month__summary__container">
                <div className="month__summary">
                    {renderMonthHeader()}
                    <p>W tym miesiącu zarobiłeś: {calculateSalarySum()}zł</p>
                </div>
                <div onClick={handleDayClick} className="month__summary__bars">
                    <ul className="days-bars">
                        {forwardedMonth.map((day, index) => {
                            const dayEffect = day.effectiveness >= 90;
                            return (
                                <li key={index} style={{ background: dayEffect ? "green" : "red", height: `${day.effectiveness}%` }}>
                                    <p>{day.effectiveness}%</p>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="days-numbers">
                        {forwardedMonth.map((day, index) => (
                            <li key={index}><p>{day.day}</p></li>
                        ))}
                        <p className="days-bars__number">Dzień L.p.</p>
                    </ul>
                    <p className="days-bars__effectivenes">Efektywność %</p>
                </div>
                <div className="month__summary__choose-btns">
                    <button onClick={() => handleMonthChange("prev")}>Poprzedni miesiąc</button>
                    <button onClick={() => handleMonthChange("next")}>Następny miesiąc</button>
                </div>
            </div>
            {shownDay.map((el, index) => (
                <div key={index} className="container shown__day__stats">
                    <h3>Podglądasz dzień: {el.day}</h3>
                    <ul className="shown__day__list">
                        <li>W tym dniu miałeś {el.packages} paczek</li>
                        <li>Awizowałeś: {el.notifications} paczek</li>
                        <li>Zarobiłeś tego dnia: {el.salary}zł</li>
                        <li>Twoja doręczalność wynosiła {el.effectiveness} paczek</li>
                    </ul>
                </div>
            ))}
        </>
    );
}
