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
    const [bar, setBar] = useState(false);
    const [verify, setVerify] = useState(false);

    //----------------------------

    // zmienne pomocnicze

    const packagesSum = packages - notifications;
    const zpoSum = zpo - notifZpo;
    const {date} = props;
    const dayNow = date.getDate();
    const monthNow = date.getMonth() +1;
    const componentsWidth = verify ? "day__summary col-sm-12 col-md-4 col-lg-4" : "day__summary col-sm-12 col-md-6 col-lg-6";

    //----------------------------

    //import bazy danych

    useEffect(() => {
        GetDb();
    }, []);

    const GetDb = () => {
        fetch(`${API}/db`).then(res => res.json())
            .catch(error => {
                console.log(error);
        })
    }
    //--------------------

    //dodawanie statystyk dnia

    const AddDay = () => {
        setBar(prev => !prev);
        fetch(`${API}/db`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(day)
        }).then(res => res.json())
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
            notifications: Number(notifications) + Number(notifZpo),
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

    //weryfikacja danych

    const Verify = () => {
        setVerify(prev => !prev);
    }
    const FinishDay = () => {
        if (verify === true) {
            return (
                <div className={`${componentsWidth}`}>
                    <p>Twoja dor??czalnos?? dzisiaj to: {effectiveness}</p>
                    <p>Faktycznie zarobi??e?? dzisiaj: {salary}</p>
                    <button onClick={ e => {AddDay()}} type="submit">Zako??cz dzie??</button>
                    {EffectivenesBar()}
                </div>
            );
        } else return null
    }

    //----------------------------

    const EffectivenesBar = () => {
        if (bar === true) {
            if (effectiveness <= 90) {
                return (
                    <div className="effectiveness-bar" style={{
                        background: "red",
                        height: `${effectiveness}%`
                    }}>
                        <p className="day-bar">
                            {effectiveness}%
                        </p>
                    </div>
                )
            } if (effectiveness > 90) {
                return (
                    <div className="effectiveness-bar" style={{
                        background: "green",
                        height: `${effectiveness}%`
                    }}>
                        <p className="day-bar">
                            {effectiveness}%
                        </p>
                    </div>
                )
            }
        }
    }

    //renderowana strona

    return (
        <>

            <div className="container daily__form__container">
                <div className="row">
                <form onChange={e => {CalcExample(); CalcSalary(); CalcEffectiveness()}}
                      onSubmit={e => {SetDay(e)}}
                      className={`daily__form ${componentsWidth}`}>
                    <label className="daily__form__label">Jak?? masz stawk?? za paczk???</label>
                    <input
                        value={rate}
                        type="number"
                        onChange={e => setRate(e.target.value)}
                        placeholder="Wprowad?? stawk??"
                    />
                    <label className="daily__form__label">Ile masz paczek?</label>
                    <input
                        value={packages}
                        type="number"
                        onChange={e => setPackages(e.target.value)}
                        placeholder="Wprowad?? ilo???? paczek"
                    />
                    <label className="daily__form__label">Ile odbior??w w punkcie?</label>
                    <input
                        value={zpo}
                        type="number"
                        onChange={e => setZpo(e.target.value)}
                        placeholder="Wprowad?? ilo???? ZPO"
                    />
                    <label className="daily__form__label">Ile mia??e?? awiz?</label>
                    <input
                        value={notifications}
                        type="number"
                        onChange={e => setNotifications(e.target.value)}
                        placeholder="Wprowad?? ilo???? awiz"
                    />
                    <label className="daily__form__label">Ile awizowanych ZPO</label>
                    <input
                        value={notifZpo}
                        type="number"
                        onChange={e => setNotfiZpo(e.target.value)}
                        placeholder="Wprowad?? ilo???? awizowanych ZPO"
                    />
                    <p>Czy dane si?? zgadzaja? <button type="submit" onClick={e => {Verify(e)}}>OK</button></p>
                </form>
                    <div className={`data__input ${componentsWidth}`}>
                        <div className="data__input__container">
                        <p>Paczki do klient??w indywidualnych: {packages}</p>
                        <p>Paczki do odbioru w punkcie: {zpo}</p>
                        <p>Og??lnie dzisiaj mo??esz zarobi??: {CalcExample()}</p>
                        <br></br>
                        <p>Ilo??c awiz: {notifications}</p>
                        <p>Ilo???? awizowanych ZPO: {notifZpo}</p>
                        <br></br>
                        </div>
                   </div>
                <FinishDay></FinishDay>
                </div>
            </div>
        </>
    )
}
