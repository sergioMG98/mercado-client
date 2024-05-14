import { useNavigate } from 'react-router-dom';
import './Card.css';

export default function Card({element, cardSelected}) {

    const navigate = useNavigate()
    /* console.log('card', element.name); */


    return (
        <div className="card">
                    
            <div className="image-container-card" onClick={() => navigate("/detail", { state: {key: element.id }})}>

            </div>
            <div className="body-product-card">
                <div className="product-details-card" onClick={() => navigate("/detail", { state: {key: element.id }})}>
                    <div className="product-name-card">
                        {element.name}
                    </div>

                    <div className="product-brands-card">
                        {element.brands}
                    </div>

                    <div className="product-price-card">
                        {element.price} €
                    </div>

                    <div className="product-pricePromo-card">
                        {element.promo_price != null ? "promo: " + element.promo_price + " €" : null} 
                    </div>
                </div>

                <div className="product-btn-card">
                    <button type="button" onClick={() => cardSelected(element)}>cart</button>
                </div>
            </div>
            <span></span>
                                    
        </div>
    )
}