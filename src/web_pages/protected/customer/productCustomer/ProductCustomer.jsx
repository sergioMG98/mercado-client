import { useEffect, useState } from "react";
import Filter from "../../../../components/filter/Filter";
import NavbarCustomer from "../../../../components/navbarCustomer/NavBarCustomer";
import "./ProductCustomer.css";
import Card from "../../../../components/card/Card";
import CardList from "../../../../components/cardList/CardList";

export default function ProductCustormer(){

    let token = localStorage.getItem('TokenUserMercado');

    // liste
    const [productSelected, setProductSelected] = useState();
    // liste des produits selectionné
    const [listeProduct, setListeProduct] = useState(
        JSON.parse(localStorage.getItem('shoppingListe'))
    );
    // valeur de la liste selectionné
    const [listeValue , setListeValue] = useState(
        JSON.parse(localStorage.getItem('valueListe'))
    );

    // favorite product
    const [favoriteProduct, setFavoriteProduct] = useState([])

    // produits du back-end
    const [products, setProducts] = useState();
    const [filteredProduct, setFilteredProduct] = useState([]);

    // data product
    const [dataProduct, setDataProduct] = useState();

    // states popUp
    const [stateFilter, setStateFilter] = useState(false);
    const [stateList, setStateList] = useState(false);
    const [stateFavorite, setStateFavorite] = useState(false)

    // ================ start state ====================

    // fait apparaitre / disparaitre la liste des courses
    const listState = () => {
        let List = document.querySelector(".shoppingList-productCustomer");
        let favoriteList = document.querySelector(".favoriteContainer-productCustomer");

        if (stateList == false) {
            if (stateFavorite == true) {
                favoriteList.classList.remove('active');
                setStateFavorite(false)
            }
            
            List.classList.add('active');
            setStateList(true);

        } else {
            List.classList.remove('active');
            setStateList(false);
        }
        
    }

    // fait apparaitre / disparaitre le filtre
    const filterState = () => {
        let filterList = document.querySelector(".filter-optionsContainer-productCustomer");

        if (stateFilter == false) {
            filterList.classList.add('active');
            setStateFilter(true);

        } else {
            filterList.classList.remove('active');
            setStateFilter(false);
        }
        
    }

    // fait apparaitre / disparaitre la liste des produits favories
    const favoriteState = () => {
        let favoriteList = document.querySelector(".favoriteContainer-productCustomer");
        let List = document.querySelector(".shoppingList-productCustomer");

        if (stateFavorite == false) {
            if (stateList == true) {
                List.classList.remove('active');
                setStateList(false)
            }
            favoriteList.classList.add('active');
            setStateFavorite(true);
        } else {
            favoriteList.classList.remove('active');
            setStateFavorite(false);
        }
    }

    // ================== end state ====================

    // produits filtrée
    const productFiltered = (arrayFiltered) => {
        setFilteredProduct([])
        setFilteredProduct(arrayFiltered);
    }

    // recuperé les produits
    const getProduct = async(url) => {

        const response = await fetch(url == null ?'http://127.0.0.1:8000/api/getProductPagination' : url);
        const data = await response.json();

        if(data.status == true) {
            setProducts(data.values[0].data);
            setDataProduct(data.values[0])
        }

    }

    // recupere les produits favorie de la personne
    const getFavoriteProduct = async() => {

        let options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await fetch('http://127.0.0.1:8000/api/getFavoriteProduct', options);
        const data = await response.json();

        if (data.status == true) {
            setFavoriteProduct(data.values)
        }
    }

    // ================= start liste de courses =================

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
        
    }
    // change la quantité des produits 
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

        // permet de reinitialiser la page sans perdre les valeurs
        getProduct(null);
    }
    // le produit choisie
    const cardSelected = (chosenProduct) => {
        
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

        // permet de reinitialiser la page sans perdre les valeurs
        getProduct(null);
    }


    // ================= end liste de courses ===================
    useEffect(() => {
        getProduct(null);
        getFavoriteProduct();
    }, [])

    return(
        <div className="product-customerPage">
            <header className="header-navbarContainer-homeCustomer">
                <nav>
                    <NavbarCustomer/>
                </nav>
            </header>

            <section className="section-contentContainer-homeCustomer">
                <div className="headSection-homeCustomer">
                    <div className="filterContainer-productContainer">
                        <button type="button" onClick={filterState}>filter</button>

                        <div className="filter-optionsContainer-productCustomer">
                            <Filter products={products} afterFilter={productFiltered}/>
                        </div>

                        <div className="favoriteListContainer-productCustomer">
                            <button type="button" onClick={favoriteState}>favorite</button>

                            <div className="favoriteContainer-productCustomer">
                                {
                                    favoriteProduct?.map((element, index) => {
                                        console.log('fav',element);
                                        return(
                                            
                                            <CardList element={element} changeQuantityProduct={changeQuantityProduct} favori={1} addElement={cardSelected} reloadFav={()=> getFavoriteProduct()} key={index}/>
                                            
                                        )
                                    })
                                }
                            </div>
                            
                        </div>

                        <div className="ShoppingValueContainer-productCustomer">
                            <div className="logoListContainer-productCustomer" onClick={listState}>c</div>
                            
                            <div className="value-list-productCustomer" onClick={listState}>{listeValue.value != 0 ? listeValue.value.toFixed(2) + " €" : null}</div>
                            <div className="shoppingList-productCustomer">
                                {
                                    listeProduct?.map((element, index) => {
                                        return (
                                            <CardList element={element} changeQuantityProduct={changeQuantityProduct} key={index}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bodySection-homeCustomer">
                    <div className="cardProductContainer-ProductCustomer">
                        {
                            filteredProduct?.length == 0 ?

                                products?.map((element, index) => {
                                    return(
                                        <Card element={element} key={index}/>
                                    )
                                })
                            : 
                                filteredProduct?.map((element, index) => {
                                    return(
                                        <Card element={element} key={index} cardSelected={cardSelected}/>
                                    )
                                })
                        }
                    </div>
                    <div className="btn-paginationContainer-ProductCustomer">
                        
                        {
                            dataProduct?.prev_page_url != null ?
                                <button type="button" className="previousBtn-productCustomer" onClick={() => getProduct(dataProduct.prev_page_url)}>previous</button>
                            : null
                        }
                        {
                            dataProduct?.next_page_url != null ?
                                <button type="button" className="nextBtn-productCustomer" onClick={() => getProduct(dataProduct.next_page_url)}>next</button>
                            : null
                        }
                        

                    </div>
                </div>
            </section>
        </div>
    )
}