import NavbarCustomer from "../../../../components/navbarCustomer/NavBarCustomer";
import Payment from "../../../../components/payment/Payment";
import './CardCreditCustomer.css';

export default function CardCreditCustomer() {
    return (
        <div className="cardCreditCustomer">
            <header className="header-cardCreditCustomer">
                <nav>
                    <NavbarCustomer/>
                </nav>
            </header>

            <section className="paymentContainer-cardCustomer">
                <Payment/>
            </section>

            <footer>

            </footer>
        </div>
    )
}