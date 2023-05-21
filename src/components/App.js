import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";

import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default function App() {
    const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        api.getCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(`Ошибка сервера ${err}`);
            });
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => console.log(err));
    }, []);

    function handleEditAvatarClick() {
        setAvatarPopupOpen(true);
    }
    function handleEditProfileClick(e) {
        setProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setAddPopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        if (isLiked) {
            api.removeLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => console.log(err));
        } else {
            api.addLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => console.log(err));
        }
    }

    function handleCardDelete(card) {
        api.deleteCards(card._id)
            .then(() => {
                setCards((state) =>
                    state.filter((item) => item._id !== card._id)
                );
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateUser(data) {
        api.updateUserInfo(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatar) {
        api.updateAvatarInfo(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(data) {
        api.newCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function closeAllPopups() {
        setAddPopupOpen(false);
        setProfilePopupOpen(false);
        setAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Header />
                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onLikeClick={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />
                    <Footer />

                    <ImagePopup
                        name="img"
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isOpen={selectedCard}
                    />
                    <EditProfilePopup
                        name="profile"
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <EditAvatarPopup
                        name="avatar"
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                        name="add"
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}
