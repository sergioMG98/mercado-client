import CardProductAdmin from "../../../../components/cardProductAdmin/CardProductAdmin";
import Filter from "../../../../components/filter/Filter";
import NavbarAccount from "../../../../components/navbarAccount/NavbarAccount";
import "./ProductAdmin.css";
import { useEffect, useState } from "react";

export default function ProductAdmin () {

    let token = localStorage.getItem('TokenUserMercado');
    
    let formStatus = false;
    // actualise les produits 
    const [count, setCount] = useState(0);
    const [categories, setCategories] = useState();
    const [products , setProducts] = useState();

    const [filterStatus , setFilterStatus] = useState(false);
    const [filteredProduct, setFilteredProduct] = useState([]);

    // fait apparaitre le formulaire 
    const newCategoryForm = () => {
        let form = document.querySelector('.addProduct-form');

        if (formStatus == false) {
            form.classList.add('active');
            formStatus = true;
        } else {
            form.classList.remove('active');
            formStatus = false;
        }
    }

    // fait apparaitre / disparaitre le filtre
    const filterState = () => {
        
        let filter = document.querySelector('.filterProduct-productAdmin')

        if (filterStatus == false) {
            filter.classList.add('active');
            setFilterStatus(true);
        } else {
            filter.classList.remove('active');
            setFilterStatus(false)
        }
    }

    /* ===================================== */
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
    // recupere les produits
    const getProducts = async() => {

        let options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const response = await fetch("http://127.0.0.1:8000/api/getProduct", options);
        const data = await response.json();
        
        if (data.status == true) {
            setProducts(data.product);
        } else {
            alert(data.message);
        }
    }

    /* ===== change les produits ======= */

    // cree un produit
    const addProduct = async(e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        
/*         const name = formData.get('newProductAdmin');
        const price = formData.get('priceProduct_create');
        const brand = formData.get('brandProduct_create'); 
        const quantity = formData.get('quantityProduct_create');
        const picture = formData.get('fileProduct_create'); */
        /* ==== start checkbox ==== */
        const checkbox = e.target.element_category_product;
        
        let arrayCheckbox = [];
        
        for (let index = 0; index < checkbox.length; index++) {
            const element = checkbox[index];
            
            if (element.checked) {
                arrayCheckbox.push(element.value);
            }
        }

/*         if (checkbox.checked) {
            
            arrayCheckbox.push(checkbox.value)
        } */
        /* ==== end checkbox ===== */
        formData.append('checkbox', arrayCheckbox);
        try {
            let options= {
                method: "POST",
                headers: {
                    
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
                    /* name,
                    price,
                    brand,
                    "checkbox" : arrayCheckbox,
                    quantity,
                    picture, */
            };

            const response = await fetch(`http://127.0.0.1:8000/api/addNewProduct`, options);
            const data = await response.json();

            alert(data.message);

            if (data.status == true) {
                // ferme le formulaire
                newCategoryForm(),
                // rest l'input
                form.reset()
                
                setCount(count == 3 ? 0 : count + 1);
            }

        } catch (error) {
            alert("error when creating product");
        }
          
    }

    /* ========= filtre =============== */
    // produits filtrée
    const productFiltered = (arrayFiltered) => {
        setFilteredProduct([])
        if (arrayFiltered != undefined) {
            setFilteredProduct(arrayFiltered);
        }
        
    }
    const productChange = (newP) => {
        setProducts(newP);
    }
    const changeCount = (c) => {
        setCount(c)
    }

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        getProducts();
    }, [count])

    return (
        <div className="product-admin">
            <header className="header-productAdmin">
                <nav>
                    <NavbarAccount/>
                </nav>
            </header>

            <section className="section-categories-admin">
                <div className="header-section">
                    <h1>product</h1>

                    <button type="button" className="filterProductAdmin" onClick={filterState}>filter</button>
                    <div className="filterProduct-productAdmin">
                        <Filter products={products} afterFilter={productFiltered} />
                    </div>

                    <button type="button" className="addProduct" onClick={newCategoryForm}>add product</button>
                    <form onSubmit={addProduct} method="post" className="addProduct-form">
                        <div className="input-container-newProduct">

                            <div className="textInputContainerProduct-admin">

                                <div className="newProductName-container">
                                    <input type="text" name="newProductAdmin" id="newProductAdmin" required/>
                                    <label htmlFor="newProductAdmin"> new product</label>
                                </div>
                        
                                <div className="newProductName-container">
                                    <input type="numbet" step="0.01" name="priceProduct_create" id="priceProduct_admin" required/>
                                    <label htmlFor="priceProduct_admin">price product</label>
                                </div>

                                <div className="newProductName-container">
                                    <input type="text" name="brandProduct_create" id="brandProduct_create" required/>
                                    <label htmlFor="brandProduct_create"> brand product</label>
                                </div>

                                <div className="newProductName-container">
                                    <input type="number" name="quantityProduct_create" id="quantityProduct_create" required/>
                                    <label htmlFor="quantityProduct_create"> quantity product</label>
                                </div>

                                <div className="newProductName-container">
                                    <input type="file" name="fileProduct_create" id="fileProduct_create" required/>
                                    <label htmlFor="fileProduct_create"> file product</label>
                                </div>

                            </div>


                            <div className="categoryForProduct-container">
                                { categories?.length != 0 ? 
                                    categories?.map((element, index) => {
                                        
                                        return(
                                            <div key={index} className="category-element-admin" >
                                                <input type="checkbox" name="element_category_product" id={`element-add-${element}`} value={element} />
                                                <label htmlFor={`element-add-${element}`}>{element}</label>
                                                <span></span>
                                            </div>
                                        )
                                        
                                    })
                                    :
                                    <div className="no-product-admin">no product</div>
                                }
                            </div>
                        </div>


                        <button type="submit">validate</button>
                    </form>
                </div>       

                <div className="section-product-container-admin" >
                    <div className="product-elements-container-admin">
                       
                        <ul>
                            {
                                filteredProduct?.length != 0 ?
                                    filteredProduct?.map((element, index) => {
                                        
                                        return (
                                            <li key={index}>
                                                <CardProductAdmin element={element} index={index} changeProduct={productChange} product={products} count={count} co={changeCount}/>
                                            </li>
                                        )
                                    })
                                
                                :

                                products?.map((element, index) => {
                                    
                                    return (
                                        <li key={index}>
                                            <CardProductAdmin element={element} index={index} changeProduct={productChange} product={products} count={count} co={() => setCount()}/>
                                        </li>
                                    )
                                })
                            }

                        </ul>

                    </div>
                </div>
            </section>
        </div>
    )
}