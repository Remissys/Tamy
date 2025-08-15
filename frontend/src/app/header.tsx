'use client'

import { useEffect } from "react"

export default function MainHeader() {

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    const handleScroll = () => {
        let nav = document.getElementById('nav');
        let logo = document.getElementById('logo');

        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            if (nav) nav.classList.add("js-reduced-nav");
            if (logo) logo.classList.add("js-reduced-nav-logo");
        } 
        else {
            if (nav) nav.classList.remove("js-reduced-nav");
            if (logo) logo.classList.remove("js-reduced-nav-logo");
        }
    }

    return (
        <div className="nav">
            <div id='nav' className="nav__body">
                <div id='logo' className="nav__logo">
                    LOGO
                </div>
                <div className="nav__menu">
                    <div className="nav__menu__options" onClick={() => window.location.href="/"}>home</div>
                    <div className="nav__menu__options" onClick={() => window.location.href="/login"}>login</div>
                    <div className="nav__menu__options" onClick={() => window.location.href="/dashboard"}>dashboard</div>
                    <div className="nav__menu__options" onClick={() => window.location.href="/produtos"}>produtos</div>
                    <div className="nav__menu__options" onClick={() => window.location.href="/novo-pedido"}>novo pedido</div>
                    <div className="nav__menu__options" onClick={() => window.location.href="/pedidos"}>pedidos</div>
                </div>
            </div>
        </div>
    )
}