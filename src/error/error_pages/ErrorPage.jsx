import Navbar from "../../components/navbar/Navbar"
import './ErrorPage.css';

export default function ErrorPage () {
    return (
        <div className="error-page page-unprotected">
            <header>
                <nav className="navbar-container">
                    <Navbar/>
                </nav>
            </header>
            
            <section className="section-errorPage">
                <p>error</p>
            </section>
        </div>
    )
}