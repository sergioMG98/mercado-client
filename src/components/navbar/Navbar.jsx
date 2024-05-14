import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({chosenProduct, change}) {

    const navigate = useNavigate();

    // categories du back-end
    const [categories, setCategories] = useState();
    
    // etats du des boutons
    const [categoryState, setCategoryState] = useState(false);
    const [listeState, setListeState] = useState(false);

    // liste des produits selectionné
    const [listeProduct, setListeProduct] = useState(
        JSON.parse(localStorage.getItem('shoppingListe'))
    );
    // valeur de la liste selectionné
    const [listeValue , setListeValue] = useState(
        JSON.parse(localStorage.getItem('valueListe'))
    );

    // fait apparraitre la liste des categories
    const listCategories = () => {
        let liste = document.querySelector('.categories-container-navbar');
        
        if (categoryState == false) {
            liste.classList.add('active');
            setCategoryState(true);
        } else {
            liste.classList.remove('active');
            setCategoryState(false);
        }

    }

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

    // calcule la valeur de la liste
    const calculListeValue = () => {
        
        let valueTemp = 0;

        for (let index = 0; index < listeProduct.length; index++) {

            let valueProductChose = listeProduct[index].valueProductChose;

            
            valueTemp = valueTemp + parseInt(valueProductChose)
        }
        listeValue.value = valueTemp;
        localStorage.setItem('shoppingListe', JSON.stringify(listeProduct));
        localStorage.setItem('valueListe', JSON.stringify({value: valueTemp}));
        
        // met chosenProduct a undefined
        change(undefined)
    }
    

    // ouvre / ferme liste
    const liste = () => {

        let liste = document.querySelector('.liste-container-navbar')

        if (listeState == false) {
            liste.classList.add('active');
            setListeState(true);
        } else {
            liste.classList.remove('active');
            setListeState(false);
        }
    }

    // calcul la valeur lorsqu'on change la quantité
    const changeQuantityProduct = (operateur, element) => {
        
        for (let index = 0; index < listeProduct.length; index++) {
            
            if (listeProduct[index].id == element.id) {
                // augment soit diminue quantite du produit choisi
                if (operateur == "+") {
                    listeProduct[index].quantityProductChose += 1
                } else {
                    listeProduct[index].quantityProductChose -= 1

                }

                // calcule la valeur du produit choisi en rapport avec la quantité
                if (listeProduct[index].promo_price == null) {
                    listeProduct[index].valueProductChose = listeProduct[index].quantityProductChose * listeProduct[index].price
                } else {
                    listeProduct[index].valueProductChose = listeProduct[index].quantityProductChose * listeProduct[index].promo_price
                }

                // supprime les produit dont la quantite == 0
                if (listeProduct[index].quantityProductChose == 0) {
                    
                    let newListe = listeProduct.filter((element, i) => listeProduct[index] != element)
                    setListeProduct(newListe);

                }
            }
        }
        calculListeValue();
    }

    // search bar
    const searchNavbar = (e) => {
        console.log("entre");
        e.preventDefault();
        const form = e.target;
        
        const formData = new FormData(form);
        const search = formData.get('nav-search-page');
        console.log("search", search);
        navigate('/categories', { state: {search} })
    }

    // liste de course
    if (listeProduct.length == 0 && chosenProduct != undefined) {
        
        let object = {
            id: chosenProduct.id,
            name: chosenProduct.name,
            price: chosenProduct.price,
            brands: chosenProduct.brands,
            quantity: chosenProduct.quantity,
            promo_price: chosenProduct.promo_price,
            quantityProductChose: 1,
            valueProductChose: chosenProduct.promo_price != null ? chosenProduct.promo_price : chosenProduct.price
        }

        listeProduct.push(object);
        calculListeValue();
    } else {
    
        if (listeProduct.length != 0 && chosenProduct != undefined) {
            if (listeProduct.some(element => element.id == chosenProduct.id) != true) {
                
                let object = {
                    id: chosenProduct.id,
                    name: chosenProduct.name,
                    price: chosenProduct.price,
                    brands: chosenProduct.brands,
                    quantity: chosenProduct.quantity,
                    promo_price: chosenProduct.promo_price,
                    quantityProductChose: 1,
                    valueProductChose: chosenProduct.promo_price != null ? chosenProduct.promo_price : chosenProduct.price
                }

                listeProduct.push(object);

                calculListeValue();
            }

        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className="navbar-component">
            <div className="upperPart">
                <div className="nav-upper-left">
                    <nav className="nav-logo">
                        <Link to={"/"} >Mercado</Link>
                    </nav>

                    <div className="nav-search">
                        <form onSubmit={searchNavbar} method="get" className="form-nav-search-page">
                            <div className="input-search-nav-pages">
                                <input type="search" name="nav-search-page" id="nav-search-page" required/>
                                <label htmlFor="nav_search_page" className="label-nav-pages">what you are looking for ?</label>
                            </div>

                            <button type="submit">send</button>
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
                <div className="categories-div-navbar">
                    <div className="btn-container-navbar">
                        <button onClick={listCategories}>categories</button>
                    </div>

                    <div className="categories-container-navbar">
                        <ul>
                            {categories?.map((element, index) => {
                                return(
                                    <li key={index} onClick={() => navigate('/categories',  {state:{element}})}>
                                        {element}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="cart-div-navbar" onClick={liste}>
                    <div className="logo-cart-container-navbar">
                        c
                    </div>
                    <div className="value-cart-container-navbar">
                        {listeValue.value != 0 ? listeValue.value.toFixed(2) + " €" : null}
                    </div>

                    <div className="liste-container-navbar">
                            {
                                listeProduct?.map((element, index) => {
                                    return(
                                        <div className="productListe-chose-navbar" key={index}>
                                            <div className="upper-list-navbar">
                                                <div className="img-container-list-navbar"></div>
                                                <div className="info-container-list-navbar">
                                                    <div className="nameProduct-list-navbar"> <strong>{element.name}</strong> </div>
                                                    <div className="brandProduct-list-navbar">{element.brands}</div>
                                                    <div className="priceProduct-list-navbar">{element.price}</div>
                                                    <div className="promo_priceProduct-list-navbar">{element.promo_price}</div>
                                                </div>
                                            </div>

                                            <div className="lower-list-navbar">
                                                <div className="quantityProduct-list-navbar">
                                                    <div className="btn-downValue-list-navbar" onClick={() => changeQuantityProduct("-", element)}>-</div>
                                                    <div className="quantity-list-navbar">{element.quantityProductChose}</div>
                                                    <div className="btn-upValue-list-navbar" onClick={() => changeQuantityProduct("+", element)}>+</div>
                                                </div>
                                                <div className="valueParoduct-list-navbar">{element.valueProductChose + " €"}</div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                    </div>
                </div>

            </div>

        </div>
    )
}