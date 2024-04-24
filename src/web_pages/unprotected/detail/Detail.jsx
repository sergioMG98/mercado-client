import { useLocation } from "react-router-dom"
import Navbar from "../../../components/navbar/Navbar";
import "./Detail.css";
import { useEffect, useState } from "react";

export default function Detail(params) {

    const location = useLocation();

    const [product, setProduct] = useState();

    // produit choisi
    const [productSelected, setProductSelected] = useState();


    const getDetailProduct = async() => {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": location.state.key,
            }),
        }

        const response = await fetch(`http://127.0.0.1:8000/api/specificProduct`, options);
        const data = await response.json();

        setProduct(data.product);

    }


    useEffect(() => {
        getDetailProduct();
    }, [])
    return(
        <div className="detail-page page-unprotected">
            <header>
                <nav className="navbar-container">
                    <Navbar chosenProduct={productSelected}/>
                </nav>
            </header>

            <section>
                <div className="detailsParent-container-detailPage">
                    <div className="image-container-detailPage">
                        <img src="/" alt="product image" />
                    </div>

                    <div className="detail-container-detailPage">
                        <div className="name-detailPage"> <strong>{product?.name}</strong></div>

                        <div className="brand-detailPage">{product?.brands}</div>

                        <div className="price-detailPage">{product?.price} €</div>

                        <div className="pricePromo-detailPage">{ product?.promo_price != null ? product.promo_price + " €" : null }</div>

                        <div className="btn-detailPage">
                            <button type="button" onClick={() => setProductSelected(product)}>cart</button>
                        </div>
                    </div>
                </div>
            </section>

            <footer></footer>

        </div>
    )
}