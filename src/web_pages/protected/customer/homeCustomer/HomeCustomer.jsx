import NavbarCustomer from "../../../../components/navbarCustomer/NavBarCustomer";
import './HomeCustomer.css';

export default function HomeCustomer(params) {
    return(
        <div className="home-customerPage">
            <header className="header-navbarContainer-homeCustomer">
                <nav>
                    <NavbarCustomer/>
                </nav>
            </header>

            <section className="section-contentContainer-homeCustomer">
                <div className="headSection-homeCustomer">
                
                </div>

                <div className="bodySection-homeCustomer">
                    
                </div>
            </section>
        </div>
    )
}