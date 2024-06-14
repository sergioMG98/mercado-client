import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Burger from "../../../components/burger/burger/Burger";
import { useEffect, useState } from "react";
import './Home.css';

export default function Home() {

    const [categories, setCategories] = useState();
    const [burgerState, setBurgerState] = useState(false); // close
    // recupere les categories
    const getCategories = async() => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/getOnlyCategories`);
            const data = await response.json();
            
            let categories = data.categories;

            // met dans l'ordre alphabetique
            categories.sort(function(a, b){
                if (a[0] < b[0]) {
                    return -1;
                }
                if (a[0] > b[0]) {
                    return 1;
                }
                return 0
            })

            setCategories(categories)
            
        } catch (error) {
            alert(`problem when retrieving categories`);
        }

    }

    // 
    const burgerEtat = (value) => {
        let header = document.querySelector('.header-homePage');

        if (value == "open") {
            setBurgerState(true);
            header.classList.add('active');
        } else {
            setBurgerState(false);
            header.classList.remove('active');
        }
        console.log("burger value", value);
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className="home-page page-unprotected">
            <header className="header-homePage">

               
                <nav className="navbar-container">
                    <Navbar/>
                </nav>

                <div className="burgerContainer-homePage">
                    <Burger burgerEtat={burgerEtat}/>  
                </div>
                 
            </header>

            <section>
                
                <ul className="home-categories-container">
                    {
                        categories?.map((element, index) => {
                            return (
                                <li key={index}><Link to={"/categories"} state={element}>{element}</Link></li>
                            )
                        })
                    }
                </ul>
               
            </section>

            <footer></footer>
        </div>
    )
}