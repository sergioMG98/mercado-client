import "./NavbarAccount.css";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarAccount() {
    let token = localStorage.getItem('TokenUserMercado');
    let btn_setting = false;
    let navigate = useNavigate();

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

    const logout = async() => {
        let options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/logout', options);
            const data = await response.json();
    
            console.log("logout", data);
            if (data.status == true) {
                navigate("/login");
            }
        } catch (error) {
            console.log("logout catch", error);
        }


    }

    return(
        <div className="navbarAccount-component" >
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
                            <li><Link to={"/profileAdmin"} >profile</Link></li>
                            {/* <li>configuration</li> */}
                            <li onClick={logout}>sign out</li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}