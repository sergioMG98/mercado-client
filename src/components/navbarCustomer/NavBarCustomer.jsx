import './NavbarCustomer.css';
import { Link, useNavigate } from "react-router-dom";

export default function NavbarCustomer() {
    let token = localStorage.getItem('TokenUserMercado');

    let navigate = useNavigate();

    let btn_setting = false;

    const settingsFunction = () => {

        let divSettings = document.querySelector('.navbarCustomer-settingsContainer');

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
        <div className="navbarCustomer-component" >
            <nav>
                <div className="navbarCustomer-productsContainer">
                    <Link to={"/productCustomer"}>products</Link>
                </div>

                <div className='navbarCustomer-settingsContainer-btn' >
                    <button onClick={settingsFunction}>setting</button>
                </div>

                <div className="navbarCustomer-settingsContainer">
                    <ul>
                        <li><Link to={"/profilCustomer"}>profile</Link></li>
                        <li><Link to={"/cardCustomer"}>card credit</Link></li>
                        <li>configuration</li>
                        <li onClick={logout}>sign out</li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}