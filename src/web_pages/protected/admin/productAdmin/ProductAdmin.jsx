import NavbarAccount from "../../../../components/navbarAccount/NavbarAccount";
import "./ProductAdmin.css";
import { useEffect, useState } from "react";

export default function ProductAdmin () {

    let token = JSON.parse(localStorage.getItem('TokenUserMercado'));
    
    let formStatus = false;
    const [count, setCount] = useState(0);
    const [categories, setCategories] = useState();
    const [products , setProducts] = useState();

    const [btnValue, setBtnValue] = useState();

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

        const response = await fetch("http://127.0.0.1:8000/api/getProduct");
        const data = await response.json();

        console.log("get Product", data);
        if (data.status == true) {
            setProducts(data.product);
        } else {
            alert(data.message);
        }
    }

    // cree un produit
    const addProduct = async(e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        
        const name = formData.get('newProductAdmin');
        const price = formData.get('priceProduct_create');
        const brand = formData.get('brandProduct_create'); 
        const quantity = formData.get('quantityProduct_create')
        /* ==== start checkbox ==== */
        const checkbox = e.target.element_category_product;
        
        let arrayCheckbox = [];
        
        for (let index = 0; index < checkbox.length; index++) {
            const element = checkbox[index];
            
            if (element.checked) {
                arrayCheckbox.push(element.value);
            }
        }
        /* ==== end checkbox ===== */
        
        
        
        try {
            let options= {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    price,
                    brand,
                    "checkbox" : arrayCheckbox,
                    quantity
                })
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

    // change les valeurs
    const changeValue = (e, index, key) => {
    
        const newArray = products?.map((item, i) => {
            if (index === i) {
                
                let newValue;

                switch (key) {
                    case "name":
                        newValue = item.name = e.target.value
                        break;

                    case "price":
                        newValue = item.price = e.target.value
                        break;

                    case "quantity":
                        newValue = item.quantity = e.target.value
                        break;

                    case "brands":
                        newValue = item.brands = e.target.value
                        break;

                    case "promo_price":
                        newValue = item.promo_price = e.target.value
                        break;
                    
                    default:
                        break;
                }
                
                return {...item, newValue}

            } else {
                return item;
            }
        })
        setProducts(newArray);
    }

    // supprime les categories des produits
    const deleteCategorie = (index, value) => {
        const newArray = products?.map((item, i) => {
            if (index == i) {
                let arrayCategories = item.categories;
            
                let a = arrayCategories.filter((element) => element != value);
                
                let test = item.categories = a;

                return {...item, test}
            } else {
                return item;
            }
        })
        
        setProducts(newArray);
    }

    const formulaire = async(e) => {
        e.preventDefault();

        let cat;

        products?.forEach((element, index) => {
            console.log("f", element.id);
            if (element.id == btnValue[1]) {
                cat = element.categories
            }
        });
        


        const form = e.target;

        const formData = new FormData(form);
        const name = formData.get('name-value-product-admin');
        const price = formData.get('price-value-product-admin');
        const quantity = formData.get('quantity-value-product-admin');
        const brand = formData.get('brand-value-product-admin');
        const promo_price = formData.get('promo-value-product-admin');
        const categoriesForChange = cat;
        console.log("form 1", categoriesForChange);



        if(btnValue[0] == "delete") {
            // supprime
            try {
                let options1 = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "id": btnValue[1]
                    }),
                }

                const response = await fetch(`http://127.0.0.1:8000/api/deleteProduct`, options1);
                const data = await response.json();

                alert(data.message);

                if (data.status == true) {
                    setCount(count == 3 ? 0 : count + 1);
                }

            } catch (error) {
                alert("erreur lors de la suppression")
            }

        } else {
            // modifie
            try {
                let options2 = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "id": btnValue[1],
                        "name": name,
                        "price": price,
                        "quantity": quantity,
                        "brand": brand,
                        "promo": promo_price,
                        "categories": cat

                    }),
                }
                console.log("update", categories);
                const response = await fetch(`http://127.0.0.1:8000/api/updateProduct` ,options2);
                const data = await response.json();

                console.log('modifie', data);

                if (data.status == true) {
                    setCount(count == 3 ? 0 : count + 1);
                }

            } catch (error) {
                alert("problem when modifying the product")
            }

        }

    }
    

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        getProducts();
    }, [count])

    console.log("ad",products);
    return (
        <div className="product-admin">
            <header>
                <nav>
                    <NavbarAccount/>
                </nav>
            </header>

            <section className="section-categories-admin">
                <div className="header-section">
                    <h1>product</h1>
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
                                products?.map((element, index) => {
                                    /* console.log("products", element, index); */
                                    return (
                                        <li key={index}>
                                            <form onSubmit={formulaire} method="post" className="form-element-product-admin">
                                                <div className="first-part-produit-element-admin">
                                                    <div className="update-product-container">
                                                        <input type="text" name="name-value-product-admin" id={`value-product-admin-${element.name}`} value={element.name} onChange={(e) => changeValue(e, index, "name")}/>
                                                        <label htmlFor={`value-product-admin-${element.name}`}>product</label>
                                                    </div>

                                                    <div className="update-product-container">
                                                        <input type="number" step="0.01" name="price-value-product-admin" id={`value-product-admin-${element.price}`} value={element.price} onChange={(e) => changeValue(e, index, "price")}/>
                                                        <label htmlFor={`value-product-admin-${element.price}`}>price</label>
                                                    </div>

                                                    <div className="update-product-container">
                                                        <input type="number" name="quantity-value-product-admin" id={`value-product-admin-${element.number}`} value={element.quantity} onChange={(e) => changeValue(e, index, "quantity")}/>
                                                        <label htmlFor={`value-product-admin-${element.number}`}>quantity</label>
                                                    </div>

                                                    <div className="update-product-container-btn" >
                                                        <button type="submit" name="btn-form-product-admin" onClick={() => setBtnValue(['delete', element.id])}>delete</button>
                                                    </div>

                                                    <div >details</div>

                                                </div>

                                                <div className="second-part-produit-element-admin">
                                                    <div className="update-product-container">
                                                        <input type="text" name="brand-value-product-admin" id={`value-product-admin-${element.brands}`} value={element.brands} onChange={(e) => changeValue(e, index, "brands")}/>
                                                        <label htmlFor={`value-product-admin-${element.brands}`}>brand</label>
                                                    </div>

                                                    <div className="update-product-container">
                                                        <input type="number" step="0.01" name="promo-value-product-admin" id={`value-product-admin-${element.promo_price}`} value={element.promo_price} onChange={(e) => changeValue(e, index, "promo_price")}/>
                                                        <label htmlFor={`value-product-admin-${element.promo_price}`}>promo price</label>
                                                    </div>
                                                    
                                                    <div className="update-product-container update-product-container-category">
                                                        
                                                        <div className="categories-update-admin">

                                                            <p>caregories</p>
                                                            <div className="product-categories-update-container-admin">
                                                                {
                                                                    /* console.log("elements", element["categories"]) */
                                                                    element["categories"]?.map((catego, i) => {
                                                                        return(
                                                                            <div className="categoryOfProduct-product-admin" key={i}>
                                                                                <p>{catego}</p>
                                                                                <button type="button" onClick={(e) => deleteCategorie(index, catego)}>x</button>
                                                                            </div>
                                                                        )

                                                                    })
                                                                }
                                                            </div>
                                                            <span>v</span>

                                                        </div>


                                                    </div>
                                                    
                                                    <div className="update-product-container-btn-change">
                                                        <button type="submit" onClick={() => setBtnValue(['change',element.id])}>change</button>
                                                    </div>
                                                </div>
                                            </form>

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