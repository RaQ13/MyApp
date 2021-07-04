import React, {useState, useEffect} from "react";

const API = "http://localhost:3000";

export const MonthSummary = (props) => {

    const [month, setMonth] = useState("");
    const [monthStats, setMonthStats] = useState([]);
    const [fowardedMonth, setFowardedMonth] = useState([]);
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        setMonth(props.date.getMonth() + 1);
        fetch(`${API}/db`).then(res => res.json()).then(data => {
            setMonthStats(data.db);
        })
            .catch(error => {
                console.log(error);
            })
    }, []);


    const MonthBars = (db) => {

        const actualMonth = props.date.getMonth() + 1;
        const months = Array.from(db);

        const searchedMonths = months.filter(function (month, index) {
            return month.month === actualMonth;

        })
        setFowardedMonth(searchedMonths);
    }


    const Month = () => {
        if (month === 1) {
            return <h2>Podsumowanie miesiąca styczeń</h2>
        }
        if (month === 2) {
            return <h2>Podsumowanie miesiąca luty</h2>
        }
        if (month === 3) {
            return <h2>Podsumowanie miesiąca marzec</h2>
        }
        if (month === 4) {
            return <h2>Podsumowanie miesiąca kwiecień</h2>
        }
        if (month === 5) {
            return <h2>Podsumowanie miesiąca maj</h2>
        }
        if (month === 6) {
            return <h2>Podsumowanie miesiąca czerwiec</h2>
        }
        if (month === 7) {
            return <h2>Podsumowanie miesiąca lipiec</h2>
        }
        if (month === 8) {
            return <h2>Podsumowanie miesiąca sierpień</h2>
        }
        if (month === 9) {
            return <h2>Podsumowanie miesiąca wrzesień</h2>
        }
        if (month === 10) {
            return <h2>Podsumowanie miesiąca październik</h2>
        }
        if (month === 11) {
            return <h2>Podsumowanie miesiąca listopad</h2>
        }
        if (month === 12) {
            return <h2>Podsumowanie miesiąca grudzień</h2>
        }
    }

    const ShowSummamry = (e) => {
        if (showSummary === false) {
            setShowSummary(prev => (!prev));
        }
    }

    if (showSummary === false) {
        return (
            <>
                <div className="container month__summary__container">
                    <div className="month__summary">
                        <div className="month__summary__bars">
                            <button style={{
                                display: "block",
                                margin: "0 auto",
                            }} onClick={e => {ShowSummamry(e); MonthBars(monthStats);}}>Pokaż podsumowanie aktualnego miesiaca</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="container month__summary__container center">
                <div className="month__summary">
                    {Month()}
                </div>
                <div className="month__summary__bars">
                    <ul className="days-bars">
                        {fowardedMonth.map(function (day, index){
                            console.log(day.day)
                            return (
                                <li key={index} style={{
                                    background: "green",
                                    height: `${day.effectiveness}%`,
                                }}><p>{day.effectiveness}%</p></li>
                            )
                        })}
                    </ul>
                    <ul className="days-numbers">
                        {fowardedMonth.map(function (day, index){
                            console.log(day.day)
                            return (
                                <li key={index}><p>{day.day}</p></li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}