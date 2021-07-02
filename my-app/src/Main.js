import React, {useState, useEffect} from "react";

const API = "http://localhost:3000";

export const Main = (props) => {

    // zmienne state

    const [day, setDay] = useState({});
    const [rate, setRate] = useState("");
    const [packages, setPackages] = useState("");
    const [zpo, setZpo] = useState("");
    const [notifications, setNotifications] = useState("");
    const [notifZpo, setNotfiZpo] = useState("");
    const [effectiveness, setEffectiveness] = useState("");
    const [salary, setSalary] = useState("");

    //----------------------------

    // zmienne pomocnicze

    const packagesSum = packages - notifications;
    const zpoSum = zpo - notifZpo;
    const {date} = props;
    const dayNow = date.getDay();
    const monthNow = date.getMonth() +1;

    //----------------------------

    //import bazy danych

    useEffect(() => {
        getDb();
    }, []);

    const getDb = () => {
        fetch(`${API}/db`).then(res => res.json())
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
        })
    }
    //--------------------

    //dodawanie statystyk dnia

    const AddDay = () => {
        fetch(`${API}/db`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(day)
        }).then(res => res.json()).then(data => {
            console.log(data);
        })
            .catch(error => {
                console.log(error);
            })
    };

    //----------------------------------

    const SetDay = (e) => {
        e.preventDefault();
        setDay({
            month: monthNow,
            day: dayNow,
            packages: packagesSum,
            zpo: zpoSum,
            notifications: Number(notifZpo) + Number(notifications),
            salary: Number(salary),
            effectiveness: Number(effectiveness),
        });
    };

    // funckcje kalkulacyjne

    const CalcExample = () => {
        return (rate * (Number(packages) + Number(zpo / 2))).toFixed(2);
    }

    const CalcSalary = () => {
        setSalary((rate * (Number(packagesSum) + Number(zpoSum / 2))).toFixed(2));
    }

    const CalcEffectiveness = () => {
        setEffectiveness( (((Number(packagesSum)  + Number(zpoSum)) * 100) / (Number(packages) + Number(zpo)))
            .toFixed(2));
    }

    //----------------------------


    //renderowana strona

    return (
        <>

            <div className="container daily__form__container">
                <form onChange={e => {CalcExample(); CalcSalary(); CalcEffectiveness(); SetDay(e);}}
                      className="daily__form" >
                    <label className="daily__form__label">Jaką masz stawkę za paczkę?</label>
                    <input
                        value={rate}
                        type="number"
                        onChange={e => setRate(e.target.value)}
                        placeholder="Wprowadź stawkę"
                    />
                    <label className="daily__form__label">Ile masz paczek?</label>
                    <input
                        value={packages}
                        type="number"
                        onChange={e => setPackages(e.target.value)}
                        placeholder="Wprowadź ilość paczek"
                    />
                    <label className="daily__form__label">Ile odbiorów w punkcie?</label>
                    <input
                        value={zpo}
                        type="number"
                        onChange={e => setZpo(e.target.value)}
                        placeholder="Wprowadź ilość ZPO"
                    />
                    <label className="daily__form__label">Ile miałeś awiz?</label>
                    <input
                        value={notifications}
                        type="number"
                        onChange={e => setNotifications(e.target.value)}
                        placeholder="Wprowadź ilość awiz"
                    />
                    <label className="daily__form__label">Ile awizowanych ZPO</label>
                    <input
                        value={notifZpo}
                        type="number"
                        onChange={e => setNotfiZpo(e.target.value)}
                        placeholder="Wprowadź ilość awizowanych ZPO"
                    />
                </form>
                <div className="data__input">
                    <p>Paczki do klientów indywidualnych: {packages}</p>
                    <p>Paczki do odbioru w punkcie: {zpo}</p>
                    <p>Ogólnie dzisiaj możesz zarobić: {CalcExample()}</p>
                    <br></br>
                    <p>Ilośc awiz: {notifications}</p>
                    <p>Ilość awizowanych ZPO: {notifZpo}</p>
                    <button onClick={e => {AddDay()}} type="submit">Zakończ dzień</button>
                </div>
                <div className="summary">
                    <p>Twoja doręczalnosć dzisiaj to: {effectiveness}</p>
                    <p>Faktycznie zarobiłeś dzisiaj: {salary}</p>
                </div>
            </div>
        </>
    )
}

