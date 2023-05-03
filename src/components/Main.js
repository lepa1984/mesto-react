import React from "react";
import api from "../utils/Api";
import Card from "./Card.js";
export default function Main(props) {
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((err) => {
                console.log(`Ошибка сервера ${err}`);
            });
        api.getCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(`Ошибка сервера ${err}`);
            });
    }, []);

    return (
        <>
            <main className="main">
                <section className="profile">
                    <div
                        className="profile__avatar-wrapper"
                        onClick={props.onEditAvatar}
                    >
                        <img
                            src={userAvatar}
                            alt="Жак-Ив Кусто"
                            className="profile__avatar"
                        />
                    </div>
                    <div className="profile__wrapper">
                        <div className="profile__inner">
                            <h1 className="profile__title">{userName}</h1>
                            <button
                                type="button"
                                aria-label="profile"
                                className="profile__button-edit"
                                onClick={props.onEditProfile}
                            ></button>
                        </div>

                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                    <button
                        type="button"
                        aria-label="add-card"
                        className="profile__button-add"
                        onClick={props.onAddPlace}
                    ></button>
                </section>
                <section className="cards"></section>
            </main>
            <section className="cards">
                {cards.map((card) => {
                    return (
                        <Card
                            className="card"
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                        />
                    );
                })}
            </section>
        </>
    );
}
