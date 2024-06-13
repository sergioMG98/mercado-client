import NavbarAccount from "../../../../components/navbarAccount/NavbarAccount";
import "./HomeAdmin.css";

export default function HomeAdmin(params) {
    return (
        <div className="admin-home">
            <header>
                <nav>
                    <NavbarAccount/>
                </nav>
            </header>

            <section>
                <p>welcome dear admin</p>
            </section>
        </div>
    )
}