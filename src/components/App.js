import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
    const [isEditProfilePopupOpen, profilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, addPopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, avatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    function handleEditAvatarClick() {
        avatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        profilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        addPopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function closeAllPopups() {
        addPopupOpen(false);
        profilePopupOpen(false);
        avatarPopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <div className="App">
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                />
                <Footer />
                <PopupWithForm
                    title="Редактировать профиль"
                    name="profile"
                    buttonText="Сохранить"
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                >
                    <label className="popup__label">
                        <input
                            type="text"
                            className="form__input form__input_name_value"
                            name="name"
                            id="name-input"
                            required
                            // minlength="2"
                            // maxlength="40"
                            placeholder="Имя"
                        />
                        <span className="form__input-error name-input-error">
                            Вы пропустили это поле.
                        </span>
                    </label>
                    <label className="popup__label">
                        <input
                            type="text"
                            className="form__input form__input_about_value"
                            name="about"
                            id="about-input"
                            required
                            // minlength="2"
                            // maxlength="200"
                            placeholder="О себе"
                        />
                        <span className="form__input-error about-input-error">
                            Вы пропустили это поле.
                        </span>
                    </label>
                </PopupWithForm>
                <PopupWithForm
                    title="Новое место"
                    name="add"
                    buttonText="Сохранить"
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                >
                    <label className="popup__label">
                        <input
                            type="text"
                            className="form__input form__input_location_value"
                            name="location"
                            placeholder="Название"
                            id="location-input"
                            required
                            // minlength="2"
                            // maxlength="30"
                        />
                        <span className="form__input-error location-input-error">
                            Вы пропустили это поле.
                        </span>
                    </label>
                    <label className="popup__label">
                        <input
                            type="url"
                            className="form__input form__input_link_value"
                            name="link"
                            placeholder="Ссылка на картинку"
                            id="link-input"
                            required
                        />
                        <span className="form__input-error link-input-error">
                            Введите адрес сайта.
                        </span>
                    </label>
                </PopupWithForm>
                <PopupWithForm
                    title="Обновить аватар"
                    name="avatar"
                    buttonText="Сохранить"
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                >
                    <label className="popup__label">
                        <input
                            type="url"
                            className="form__input form__input_link_value"
                            name="link"
                            placeholder="Ссылка на аватар"
                            id="avatar-input"
                            required
                        />
                        <span className="form__input-error avatar-input-error">
                            Введите адрес
                        </span>
                    </label>
                </PopupWithForm>
                <ImagePopup
                    name="img"
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={selectedCard}
                />
            </div>
        </div>
    );
}

export default App;
