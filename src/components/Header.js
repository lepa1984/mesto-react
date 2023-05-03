import logo from "../images/logo.svg";
import React from "react";
export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="logo" />
        </header>
    );
}
