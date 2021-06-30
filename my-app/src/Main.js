import React, {useState, useEffect} from "react";

const API = "http://localhost:3000";


export const Main = () => {

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

    const [db, setDb] = useState([]);
    const [rate, setRate] = useState("");
    const [packages, setPackages] = useState("");
    const [zpo, setZpo] = useState("");
    const [notifications, setNotifications] = useState("");
    const [notifZpo, setNotfiZpo] = useState("");
    const [effectiveness, setEffectiveness] = useState("");

    const packagesSum = packages - notifications;
    const zpoSum = zpo - notifZpo;

    const CalcExample = () => {
        return (rate * (Number(packages) + Number(zpo / 2))).toFixed(2);
    }

    const CalcSalary = () => {
        return (rate * (Number(packagesSum) + Number(zpoSum / 2))).toFixed(2);
    }

    const CalcEffectiveness = () => {
        setEffectiveness( (((Number(packagesSum)  + Number(zpoSum)) * 100) / (Number(packages) + Number(zpo))).toFixed(2));
        console.log(packagesSum)
        console.log(zpoSum)
        console.log(Number(packages))
        console.log(Number(zpo))
        console.log(Number(notifZpo))
        console.log(Number(notifications))
    }

    return (
        <>
            <div className="container daily__example__container">
                <form className="example__form">
                    <label className="daily__example__label">Jaką masz stawkę za paczkę?</label>
                    <input
                        value={rate}
                        type="number"
                        onChange={e => setRate(e.target.value)}
                        placeholder="Wprowadź stawkę"
                    />
                    <label className="daily__example__label">Ile masz paczek?</label>
                    <input
                        value={packages}
                        type="number"
                        onChange={e => setPackages(e.target.value)}
                        placeholder="Wprowadź ilość paczek"
                    />
                    <label className="daily__example__label">Ile odbiorów w punkcie?</label>
                    <input
                        value={zpo}
                        type="number"
                        onChange={e => setZpo(e.target.value)}
                        placeholder="Wprowadź ilość ZPO"
                    />
                </form>
                <div>
                    <p>Paczki do klientów indywidualnych: {packages}</p>
                    <p>Paczki do odbioru w punkcie: {zpo}</p>
                    <p>Ogólnie dzisiaj możesz zarobić: {CalcExample()}</p>
                </div>
            </div>

            <div className="container daily__form__container">
                <form className="daily__form" onChange={CalcEffectiveness}>
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
                <div>
                    <p>Ilośc awiz: {notifications}</p>
                    <p>Ilość awizowanych ZPO: {notifZpo}</p>
                    <p>Twoja doręczalnosć dzisiaj to: {effectiveness}</p>
                    <p>Faktycznie zarobiłeś dzisiaj: {CalcSalary()}</p>
                </div>
            </div>
        </>
    )
}

