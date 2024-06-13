import { useEffect, useState } from "react";
import "./Filter.css";

export default function Filter({products, afterFilter}) {

    const [categoriesProduct, setCategoriesProduct] = useState([]);
    const [brandsProduct, setBrandsProduct] = useState([]);
    const [promoProduct, setPromoProduct] = useState(0);

    const [categoryChose, setCategoryChose] = useState([]);
    const [priceChose, setPriceChose] = useState([]);
    const [brandChose, setBrandChose] = useState([]);

    const [productsFilteredArray , setProdutsFilteredArray] = useState([]);
    const [temporary , setTemporary] = useState([]);
    const [temp , setTemp] = useState([]);

    // filtre les produits
    const filterCategories = (category, brand, price) => {
        
        setProdutsFilteredArray([])
        setTemporary([]);

        if (category != null) {
            if (categoryChose.indexOf(category) == -1) {
                categoryChose.push(category)
            } else {
                let i = categoryChose.indexOf(category);
                categoryChose.splice(i, 1);
            }
        }
        
        if (brand != null) {
            if (brandChose.indexOf(brand) == -1) {
                brandChose.push(brand);
            } else {
                let i = brandChose.indexOf(brand);
                brandChose.splice(i, 1);
            }
        }

        if (price != null) {
            if (priceChose[0] != price) {
                priceChose.push(price)
            } else {
                priceChose.pop();
            }
        }

        // verifie que le prix est entre valeur a et b
        function firstPriceFilter (produit, a, b) {
            
            if (produit.promo_price == null ) {
                if (parseFloat(produit.price) > a && parseFloat(produit.price) < b) {
                    productsFilteredArray.push(produit)
                }
            } else {
                if (parseFloat(produit.promo_price) > a && parseFloat(produit.promo_price) < b) {
                    productsFilteredArray.push(produit)
                }
            }
        }

        // verifie que le prix est entre valeur a et b
        function priceFilter (produit, a, b) {
           
            if (produit.promo_price == null ) {
                if (parseFloat(produit.price) > a && parseFloat(produit.price) < b) {
                    temporary.push(produit)
                }
            } else {
                if (parseFloat(produit.promo_price) > a && parseFloat(produit.promo_price) < b) {
                    temporary.push(produit)
                }
            }
        }

        // premier filtre
        for (let index = 0; index < products.length; index++) {
            if (brandChose.length != 0) {
                if (brandChose?.indexOf(products[index].brands) != -1) {
                    productsFilteredArray.push(products[index]);
                    continue;
                }
            }
            if (categoryChose.length != 0) {
                if (categoryChose?.some(cat => products[index].categories?.includes(cat)) == true) {
                    productsFilteredArray.push(products[index]);
                    continue;
                }
            }
            if (priceChose.length != 0) {
                switch (priceChose[0]) {
                    case "lvl_1":
                        firstPriceFilter(products[index], 0, 1.99);
                        break;
                    
                    case "lvl_2":
                        firstPriceFilter(products[index], 2, 3.99);
                        break;
    
                    case "lvl_3":
                        firstPriceFilter(products[index], 4, 5.99);
                        break;
    
                    case "lvl_4":
                        firstPriceFilter(products[index], 6, 9.99);
                        break;
    
                    case "lvl_5":
                        if (products[index].promo_price == null ) {
                            if (parseFloat(products[index].price) > 10) {
                                productsFilteredArray.push(products[index])
                            }
                        } else {
                            if (parseFloat(products[index].promo_price) > 10 ) {
                                productsFilteredArray.push(products[index])
                            }
                        }
                        break;
                
                    default:
                        break;
                }
                continue;
            }
        }
        
        for (let index = 0; index < productsFilteredArray.length; index++) {
            
            if (brandChose.length != 0) {
                // cherche la marque
                if (brandChose?.indexOf(productsFilteredArray[index].brands) != -1) {
                    if (categoryChose.length != 0) {
                        // cherche categories
                        if (categoryChose?.some(cat => productsFilteredArray[index].categories?.includes(cat)) == true) {
                            if (priceChose.length != 0) {
                                // cherche par rapport au prix
                                switch (priceChose[0]) {
                                    case "lvl_1":
                                            priceFilter(productsFilteredArray[index], 0, 1.99);
                                        break;
                                    
                                    case "lvl_2":
                                            priceFilter(productsFilteredArray[index], 2, 3.99);
                                        break;
                    
                                    case "lvl_3":
                                            priceFilter(productsFilteredArray[index], 4, 5.99);
                                        break;
                    
                                    case "lvl_4":
                                            priceFilter(productsFilteredArray[index], 6, 9.99);
                                        break;
                    
                                    case "lvl_5":
                                        if (productsFilteredArray[index].promo_price == null ) {
                                            if (parseFloat(productsFilteredArray[index].price) > 10) {
                                                temporary.push(productsFilteredArray[index])
                                            }
                                        } else {
                                            if (parseFloat(productsFilteredArray[index].promo_price) > 10 ) {
                                                temporary.push(productsFilteredArray[index])
                                            }
                                        }
                                        break;
                                
                                    default:
                                        break;
                                }
                            } else {
                                temporary.push(productsFilteredArray[index])
                            }
                        }
                        
                    } else {
                        if (priceChose.length != 0) {
                            switch (priceChose[0]) {
                                case "lvl_1":
                                        priceFilter(productsFilteredArray[index], 0, 1.99);
                                    break;
                                
                                case "lvl_2":
                                        priceFilter(productsFilteredArray[index], 2, 3.99);
                                    break;
                
                                case "lvl_3":
                                        priceFilter(productsFilteredArray[index], 4, 5.99);
                                    break;
                
                                case "lvl_4":
                                        priceFilter(productsFilteredArray[index], 6, 9.99);
                                    break;
                
                                case "lvl_5":
                                    if (productsFilteredArray[index].promo_price == null ) {
                                        if (parseFloat(productsFilteredArray[index].price) > 10) {
                                            temporary.push(productsFilteredArray[index])
                                        }
                                    } else {
                                        if (parseFloat(productsFilteredArray[index].promo_price) > 10 ) {
                                            temporary.push(productsFilteredArray[index])
                                        }
                                    }
                                    break;
                            
                                default:
                                    break;
                            }
                        } else {
                            temporary.push(productsFilteredArray[index])
                        }
                    }
                    
                }
            
            } else {
                
                if (categoryChose.length != 0) {
                   
                    // cherche categories
                    if (categoryChose?.some(cat => productsFilteredArray[index].categories?.includes(cat)) == true) {
                        
                        if (priceChose.length != 0) {
                            
                            // cherche par rapport au prix
                            switch (priceChose[0]) {
                                case "lvl_1":
                                        priceFilter(productsFilteredArray[index], 0, 1.99);
                                    break;
                                
                                case "lvl_2":
                                        priceFilter(productsFilteredArray[index], 2, 3.99);
                                    break;
                
                                case "lvl_3":
                                        priceFilter(productsFilteredArray[index], 4, 5.99);
                                    break;
                
                                case "lvl_4":
                                        priceFilter(productsFilteredArray[index], 6, 9.99);
                                    break;
                
                                case "lvl_5":
                                    if (productsFilteredArray[index].promo_price == null ) {
                                        if (parseFloat(productsFilteredArray[index].price) > 10) {
                                            temporary.push(productsFilteredArray[index])
                                        }
                                    } else {
                                        if (parseFloat(productsFilteredArray[index].promo_price) > 10 ) {
                                            temporary.push(productsFilteredArray[index])
                                        }
                                    }
                                    break;
                            
                                default:
                                    break;
                            }
                        } else {
                            
                            temporary.push(productsFilteredArray[index])
                        }
                    }
                    
                } else {
                    if (priceChose.length != 0) {
                        switch (priceChose[0]) {
                            case "lvl_1":
                                    priceFilter(productsFilteredArray[index], 0, 1.99);
                                break;
                            
                            case "lvl_2":
                                    priceFilter(productsFilteredArray[index], 2, 3.99);
                                break;
            
                            case "lvl_3":
                                    priceFilter(productsFilteredArray[index], 4, 5.99);
                                break;
            
                            case "lvl_4":
                                    priceFilter(productsFilteredArray[index], 6, 9.99);
                                break;
            
                            case "lvl_5":
                                if (productsFilteredArray[index].promo_price == null ) {
                                    if (parseFloat(productsFilteredArray[index].price) > 10) {
                                        temporary.push(productsFilteredArray[index])
                                    }
                                } else {
                                    if (parseFloat(productsFilteredArray[index].promo_price) > 10 ) {
                                        temporary.push(productsFilteredArray[index])
                                    }
                                }
                                break;
                        
                            default:
                                break;
                        }
                    } else {
                        temporary.push(productsFilteredArray[index])
                    }
                }
            }      
        } 
        
        if (temporary.length == 0) {
            afterFilter([])
        } else {
            afterFilter(temporary);
        }
       
    }

    useEffect(() => {
        products?.forEach(element => {
            if ( brandsProduct.indexOf(element.brands) == -1) {
                brandsProduct.push(element.brands)
                /* brandChose.push(element.brands) */
            }
            if ( element.promo_price != null) {
                promoProduct + 1
            }
            
            element.categories?.forEach(item => {

                if ( categoriesProduct.indexOf(item) == -1) {
                    categoriesProduct.push(item);
                   /*  categoryChose.push(item) */
                }
            })

        });

        afterFilter(products);
    }, [products])

    return (
        <div className="filter-component">
            <div className="filter-categories-container">
                <h2>categories</h2>
                <ul>
                    {
                        categoriesProduct.map((element, index) => {
                            return(
                                <li key={index}>
                                    <button type="button" className={categoryChose.indexOf(element) != -1 ? "categorySelected" : null}  onClick={() => filterCategories(element, null, null)}>{element}</button>
                                </li>
                            )
                        })  
                    }
                </ul>
            </div>
            <div className="filter-brands-container">
                <h2>brands</h2>
                <ul>
                    {
                        brandsProduct.map((element, index) => {
                            return(
                                <li key={index}>
                                    <button type="button" className={brandChose.indexOf(element) != -1 ? "categorySelected" : null} onClick={() => filterCategories(null, element, null)}>{element}</button>
                                </li>
                            )
                        })  
                    }
                </ul>
            </div>
{/*             <div className="filter-promo-container">
                <button type="button">promo</button>
            </div> */}
            <div className="filter-price-container">
                <h2>prices</h2>
                <ul>
                    <li>
                        <button type="button" className={priceChose.indexOf("lvl_1") != -1 ? "categorySelected" : null} onClick={() => filterCategories(null, null, "lvl_1")}>0 € - 1,99 €</button>
                    </li>
                    <li>
                        <button type="button" className={priceChose.indexOf("lvl_2") != -1 ? "categorySelected" : null} onClick={() => filterCategories(null, null, "lvl_2")}>2 € - 3,99 €</button>
                    </li>
                    <li>
                        <button type="button" className={priceChose.indexOf("lvl_3") != -1 ? "categorySelected" : null} onClick={() => filterCategories(null, null, "lvl_3")}>4 € - 5,99 €</button>
                    </li>
                    <li>
                        <button type="button" className={priceChose.indexOf("lvl_4") != -1 ? "categorySelected" : null} onClick={() => filterCategories(null, null, "lvl_4")}>6 € - 9,99 €</button>
                    </li>
                    <li>
                        <button type="button" className={priceChose.indexOf("lvl_5") != -1 ? "categorySelected" : null} onClick={() => filterCategories(null, null, "lvl_5")}>+ 10 €</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}