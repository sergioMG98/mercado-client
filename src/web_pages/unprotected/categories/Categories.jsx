import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../../components/navbar/Navbar"
import "./Categories.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../../../components/filter/Filter";

export default function Categories(params) {

    const location = useLocation();
    const navigate = useNavigate();
    
    // produits du back-end
    const [products, setProducts] = useState();
    const [filteredProduct, setFilteredProduct] = useState([]);
    // produit choisi
    const [productSelected, setProductSelected] = useState();


    // recupere les produits
    const getProducts = async() => {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "category": location.state
            }),
        }

        const response = await fetch(`http://127.0.0.1:8000/api/getProductOfCategory`, options);
        const data = await response.json();

        setProducts(data.products);
        /* console.log("product", data); */
        if (data.status == false) {
            alert(data.message);
        }
    }

    // recupere des produits en lien avec la recherche
    const getProductsBySearch = async() => {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "search": location.state['search'] 
            }),
        }

        const response = await fetch(`http://127.0.0.1:8000/api/getProductBySearch`, options);
        const data = await response.json();

        setProducts(data.products);

    }
    useEffect(() => {
        
        if (typeof(location.state) != "object" || location.state['search'] == undefined) {
            getProducts();
        } else {
            getProductsBySearch();
        }
    }, [location.state])

    // change la valeur de productSelected via le composant navbar
    function handleState (newValue) {
        setProductSelected(newValue);
    }

    const productFiltered = (arrayFiltered) => {
        console.log('array filtered', arrayFiltered);
        setFilteredProduct([])
        setFilteredProduct(arrayFiltered);
    }
    
    return (
        <div className="categorie-page page-unprotected">
            <header>
                <nav className="navbar-container">
                    <Navbar chosenProduct={productSelected} change={handleState}/>
                </nav>
            </header>

            <section className="section-categoriesPage">
                <div className="filter-container-categoriesPage">
                    <Filter products={products} afterFilter={productFiltered}/>
                </div>

                <div className="products-container-categoriesPage">
                    
                    {
                        filteredProduct?.length == 0 ?
                        
                            products?.map((element, index) => {
                            
                                return (
                                    <div className="product-categoryPage" key={index}>
                                        <div className="image-container-categoriesPage" onClick={() => navigate("/detail", { state: {key: element.id }})}>

                                        </div>
                                        <div className="body-product-categoriesPage">
                                            <div className="product-details-categoriesPage" onClick={() => navigate("/detail", { state: {key: element.id }})}>
                                                <div className="product-name-categoriesPage">
                                                    {element.name}
                                                </div>

                                                <div className="product-brands-categoriesPage">
                                                    {element.brands}
                                                </div>

                                                <div className="product-price-categoriesPage">
                                                    {element.price} €
                                                </div>

                                                <div className="product-pricePromo-categoriesPage">
                                                    {element.promo_price != null ? "promo: " + element.promo_price + " €" : null} 
                                                </div>
                                            </div>

                                            <div className="product-btn-categoriesPage">
                                                <button type="button" onClick={() => setProductSelected(element)}>cart</button>
                                            </div>
                                        </div>
                                        <span></span>
                                    </div>
                                    
                                )

                            })
                            :
                            filteredProduct?.map((element, index) => {
                                
                                return (
                                    <div className="product-categoryPage" key={index}>
                                        <div className="image-container-categoriesPage" onClick={() => navigate("/detail", { state: {key: element.id }})}>

                                        </div>
                                        <div className="body-product-categoriesPage">
                                            <div className="product-details-categoriesPage" onClick={() => navigate("/detail", { state: {key: element.id }})}>
                                                <div className="product-name-categoriesPage">
                                                    {element.name}
                                                </div>

                                                <div className="product-brands-categoriesPage">
                                                    {element.brands}
                                                </div>

                                                <div className="product-price-categoriesPage">
                                                    {element.price} €
                                                </div>

                                                <div className="product-pricePromo-categoriesPage">
                                                    {element.promo_price != null ? "promo: " + element.promo_price + " €" : null} 
                                                </div>
                                            </div>

                                            <div className="product-btn-categoriesPage">
                                                <button type="button" onClick={() => setProductSelected(element)}>cart</button>
                                            </div>
                                        </div>
                                        <span></span>
                                    </div>
                                    
                                )

                            })
                    }
                </div>
            </section>

            <footer></footer>
        </div>
    )
}