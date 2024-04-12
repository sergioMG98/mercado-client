import Navbar from "../../components/navbar/Navbar"

export default function ErrorPage () {
    return (
        <div className="error-page page-unprotected">
            <nav className="navbar-container">
                <Navbar/>
            </nav>

            <div>
                error
            </div>
        </div>
    )
}