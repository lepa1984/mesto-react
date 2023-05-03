import React from "react";
export default function PopupWithForm({
    isOpen,
    onClose,
    name,
    title,
    buttonText,
    children,
}) {
    return (
        <div className={`popup popup-${name} ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <button
                    type="button"
                    aria-label="close"
                    className="popup__close"
                    onClick={onClose}
                />
                <h2 className="popup__title">{title}</h2>
                <form
                    name={`form-${name}`}
                    className="form"
                    id={`form-${name}`}
                >
                    {children}
                    <button
                        type="submit"
                        className="form__button form__button-edit"
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}
