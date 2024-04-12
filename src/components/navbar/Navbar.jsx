
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(params) {

    return (
        <div className="navbar-component">
            <div className="upperPart">
                <div className="nav-upper-left">
                    <nav className="nav-logo">
                        <Link to={"/"} >Mercado</Link>
                    </nav>

                    <div className="nav-search">
                        <form action="" method="get" className="form-nav-search-page">
                            <div className="input-search-nav-pages">
                                <input type="search" name="nav-search-page" id="nav-search-page" required/>
                                <label htmlFor="nav_search_page" className="label-nav-pages">what you are looking for ?</label>
                            </div>

                            <button type="submit"> send </button>
                        </form>
                    </div>
                </div>

                <div className="nav-upper-right">
                    <nav className="nav-login">
                        <Link to={"/login"} >Login / Register</Link>
                    </nav>
                </div>

            </div>

            <div className="lowerPart">

            </div>

        </div>
    )
}