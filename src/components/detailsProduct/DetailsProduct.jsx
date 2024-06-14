import "./DetailsProduct.css"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

export default function DetailsProduct(){
    const location = useLocation();

    const [product, setProduct] = useState();

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
        
        setProduct(data.product[0]);

    }
    useEffect(() => {
        getDetailProduct();
    }, [])


    return (
        <div className="detailsProduct-component">
            <div className="image-container-detailProduct">
                <img src={product?.name_picture} alt="product image" />
            </div>

            <div className="detail-container-detailProduct">
                <div className="name-ddetailProduct"> <strong> name : {product?.name}</strong></div>

                <div className="brand-detailProduct"> brand : {product?.brands}</div>

                <div className="price-detailProduct"> price : {product?.price} €</div>

                <div className="pricePromo-detailProduct">{ product?.promo_price != null ? "promo price : " + product.promo_price + " €" : null }</div>
            </div>
        </div>
    )
}