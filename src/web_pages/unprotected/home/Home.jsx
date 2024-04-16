import Navbar from "../../../components/navbar/Navbar"

export default function Home() {

    return (
        <div className="home-page page-unprotected">
            <header>
                <nav className="navbar-container">
                    <Navbar/>
                </nav>
            </header>

            <section>
                <div>home</div>
            </section>

            <footer></footer>
        </div>
    )
}