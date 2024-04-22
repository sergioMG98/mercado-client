import "./NavbarAccount.css";
import { Link } from "react-router-dom";

export default function NavbarAccount() {
    let btn_setting = false;

    const settingsFunction = () => {

        let divSettings = document.querySelector('.navProtected-settings');

        if (btn_setting == false) {
            divSettings.classList.add('active')
            btn_setting = true
        } else {
            divSettings.classList.remove('active')
            btn_setting = false
        }
    }


    return(
        <div className="navbarAccount-component" >
            <div className="upperPartProtected">

            </div>
            <div className="lowerPartProtected">
                <nav className="lowerPartProtected-nav">
                    <div className="navProtected-lower-left">
                        <Link to={"/categoriesAdmin"} >categories</Link>
                        <Link to={"/productAdmin"} >produits</Link>
                        <Link>customers</Link>
                    </div>

                    <div className="navProtected-lower-right">
                        <button onClick={settingsFunction}>setting</button>
                    </div>

                    <div className="navProtected-settings">
                        <ul>
                            <li>profile</li>
                            <li>configuration</li>
                            <li>sign out</li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}