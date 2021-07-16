import React, {useState, useEffect} from "react";

const API = "http://localhost:3000";

export const MonthSummary = (props) => {

    const [month, setMonth] = useState(props.date.getMonth() + 1 );
    const [monthStats, setMonthStats] = useState([]);
    const [fowardedMonth, setFowardedMonth] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [shownDay, setShownDay] = useState([]);

    useEffect(() => {
        fetch(`${API}/db`).then(res => res.json()).then(data => {
            setMonthStats(data.db);
        })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const ShowSummamry = (e) => {
        if (showSummary === false) {
            setShowSummary(prev => (!prev));
        }
    }

    const MonthBars = (db) => {

        const months = Array.from(db);
        const searchedMonths = months.filter(function (filteredMonth) {
            return filteredMonth.month === month;

        })
        setFowardedMonth(searchedMonths);
    }

    const SalarySum = () => {
        let salarySum = 0;
        {fowardedMonth.forEach(function (day){
            salarySum += day.salary;
        })}
        return salarySum.toFixed(2);
    }


    const ChooseMonthBars = (ev) => {

        if (ev.target.innerText === "Poprzedni miesiąc") {
            if (month > 1) {
                setMonth(prev => (prev -1));
            }
        }
        if (ev.target.innerText === "Następny miesiąc") {
            if (month < 12) {
                setMonth(prev => (prev +1));
            }
        }
        MonthBars(monthStats);
    }

    const ShowDay = (ev) => {

        let fowardedDay = "";

        if (ev.target.tagName !== "LI" && ev.target.tagName !== "P") {
            return
        }

        if (ev.target.tagName === "LI") {
            fowardedDay = ev.target.innerText;
            }
            if (ev.target.tagName === "P") {
                fowardedDay = ev.target.parentElement.innerText;
            }
            const choosenDay = fowardedMonth.filter(function (day){
                return day.day === Number(fowardedDay);
            })
        setShownDay(choosenDay);
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


    if (showSummary === false) {
        return (
            <>
                <div className="container month__summary__container" style={{
                    width: "20%",
                }}>
                    <div className="month__summary">
                        <div className="month__summary__bars">
                            <button style={{
                                display: "block",
                                margin: "0 auto",
                                width: "100%"
                            }} onClick={e => {ShowSummamry(e); MonthBars(monthStats)}}>Pokaż podsumowanie aktualnego miesiaca</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={`container month__summary__container`}>
                <div className="month__summary">
                    {Month()}
                    <p>W tym miesiącu zarobiłeś: {SalarySum()}</p>
                </div>
                <div onClick={ev => {ShowDay(ev);}} className="month__summary__bars">
                    <ul className="days-bars">
                        {fowardedMonth.map(function (day, index){
                            let dayEffect = false
                            if (day.effectiveness < 90) {
                                    dayEffect = false;
                            } else dayEffect = true;
                            return (
                                <li key={index} style={{
                                    background: dayEffect ? "green" : "red",
                                    height: `${day.effectiveness}%`,
                                }}><p>{day.effectiveness}%</p></li>
                            )
                        })}
                    </ul>
                    <ul className="days-numbers">
                        {fowardedMonth.map(function (day, index){
                            return (
                                <li key={index}><p>{day.day}</p></li>
                            )
                        })}
                        <p className="days-bars__number">Dzień L.p.</p>
                    </ul>
                    <p className="days-bars__effectivenes">Efektywność %</p>
                </div>
                <div onClick={ev => {ChooseMonthBars(ev);}} className="month__summary__choose-btns">
                    <button>Poprzedni miesiąc</button>
                    <button>Następny miesiąc</button>
                </div>
            </div>
            {shownDay.map(function (el, index){
                return (
                    <>
                        <div className="container shown__day__stats">
                            <h3>Podglądasz dzień: {el.day}</h3>
                            <ul className="shown__day__list">
                                <li key={index}>W tym dniu miałeś {el.packages} paczek</li>
                                <li key={index}>Awizowałeś: {el.notifications} paczek</li>
                                <li key={index}>Zarobiłeś tego dnia: {el.salary}zł</li>
                                <li key={index}>Twoja doręczalność wynosiła {el.effectiveness} paczek</li>
                            </ul>
                        </div>
                    </>
                )
            })}
        </>
    )
}
