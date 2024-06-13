import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import './Home.css';

export default function Home() {

    const [categories, setCategories] = useState();

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

    useEffect(() => {
        getCategories();
    }, [])


    return (
        <div className="home-page page-unprotected">
            <header>
                <nav className="navbar-container">
                    <Navbar/>
                </nav>
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