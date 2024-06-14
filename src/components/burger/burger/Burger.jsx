import { useState } from "react";
import "./Burger.css";

export default function Burger({burgerEtat}) {

    const [burgerStatus, setBurgerStatus] = useState(false);

    const burgerOpen = () => {
        let burger = document.querySelector('.burger');

        if (burgerStatus == false) {
            burger.classList.add('active');
            setBurgerStatus(true);
            burgerEtat('open');
        } else {
            burger.classList.remove('active');
            setBurgerStatus(false);
            burgerEtat('close');
        }

    }

    return (
        <div className="burger" onClick={burgerOpen}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}