import { useEffect, useState } from "react";

export default function CardProductAdmin({element, index, changeProduct, product, count, co}) {
    let token = localStorage.getItem('TokenUserMercado');

    const [btnValue, setBtnValue] = useState();

    const [productDetail ,setProductDetail] = useState([])
    const [categoStatus , setCategoStatus] = useState(false);


    // fait apparaitre / disparaitre les categories
    const categoryState = (number) => {
        let catego = document.querySelector(`.catego-${number}`);
        let span = document.querySelector(`.span-catego-${number}`);
        if (categoStatus == false) {
            catego.classList.add('active');
            span.classList.add('active');
            setCategoStatus(true);
        } else {
            catego.classList.remove('active');
            span.classList.remove('active');
            setCategoStatus(false)
        }
    }


    const allInformationProduct = (element) => {
        
        let product = document.querySelector(`.form-element-selected-${element}`);
        
        if (productDetail.indexOf(element) == -1) {
            product.classList.add('form-product-selected-admin');
            productDetail.push(element)
        } else {
            product.classList.remove('form-product-selected-admin');
            let filtred = productDetail.filter(el => el != element);
            setProductDetail(filtred)
        }
    }


    // change les valeurs
    const changeValue = (e, index, key) => {

        const newArray = product?.map((item, i) => {
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
        changeProduct(newArray);
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
    /* ===================================  */

    // liste des produits
    const formulaire = async(e) => {
        e.preventDefault();

        let cat;

        product?.forEach((element, index) => {
            
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
        
        if(btnValue[0] == "delete") {
            // supprime
            try {
                let options1 = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "id": btnValue[1]
                    }),
                }

                const response = await fetch(`http://127.0.0.1:8000/api/deleteProduct`, options1);
                const data = await response.json();

                alert(data.message);

                if (data.status == true) {
                    co(count == 3 ? 0 : count + 1);
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
                        Authorization: `Bearer ${token}`,
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
                
                const response = await fetch(`http://127.0.0.1:8000/api/updateProduct` ,options2);
                const data = await response.json();

                alert(data.message)

                if (data.status == true) {
                    co(count == 3 ? 0 : count + 1);
                }

            } catch (error) {
                alert("problem when modifying the product")
                console.log("error", error);
            }

        }

    }
    
    
    return (
        <form onSubmit={formulaire} method="post" className={`form-element-product-admin form-element-selected-${index}`}>
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

                <div onClick={() => allInformationProduct(index)}>details</div>

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
                        <div className={`catego-${index} product-categories-update-container-admin`}>
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
                        <span className={`span-catego-${index}`} onClick={() => categoryState(index)} >v</span>

                    </div>


                </div>
                
                <div className="update-product-container-btn-change">
                    <button type="submit" onClick={() => setBtnValue(['change',element.id])}>change</button>
                </div>
            </div>
        </form>
    )
}