import React from "react";
export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <article className="card">
            <div className="card__delete"></div>
            <img
                src={props.card.link}
                alt={props.card.name}
                className="card__image"
                onClick={handleClick}
            />

            <h2 className="card__title">{props.card.name}</h2>
            <div className="card__inner">
                <button
                    type="button"
                    aria-label="heart"
                    className="card__heart"
                ></button>
                <div className="card__count">{props.card.likes.length}</div>
            </div>
        </article>
    );
}
