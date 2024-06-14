import { useEffect } from 'react';
import './CardList.css';

export default function CardList({element, changeQuantityProduct, favori, addElement}) {
    /* console.log("entre card list"); */
    let token = localStorage.getItem('TokenUserMercado');
    
    const addToList = () => {
        addElement(element)
    }
    
    const favoriteStatus = async() => {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                "id": element.id
            })
        }

        const response = await fetch('http://127.0.0.1:8000/api/favoriteProduct', options);
        const data = await response.json()

        if (data.status == true) {
            window.location.reload()
        }
        
    }
    console.log("cardList", element);
    return (
        <div className="cardList">
            <div className="upper-CardList">
                <div className="img-container-CardList">
                    <img src={element?.name_picture} alt="product's picture" />
                </div>
                <div className="info-container-CardList">
                    <div className="nameProduct-CardList"><strong>{element.name}</strong> </div>
                    <div className="brandProduct-CardList">{element.brands}</div>
                    <div className="priceProduct-CardList">{element.price} €</div>
                    <div className="promo_priceProduct-CardList">{element.promo_price != null ? element.promo_price + " €" : null}</div>
                </div>
            </div>

            <div className="lower-CardList">

                {
                    favori == 1 ?
                        <button type="button" onClick={addToList}>add to the list</button>
                    :
                        <div className='ShoppingList-quantity-cardList'>
                            <div className="quantityProduct-CardList">
                                <div className="btn-downValue-CardList" onClick={() => changeQuantityProduct("-", element)}>-</div>
                                <div className="quantity-CardList">{element.quantityProductChose}</div>
                                <div className="btn-upValue-CardList" onClick={() => changeQuantityProduct("+", element)}>+</div>
                            </div>

                            <div className="valueParoduct-CardList">{element.valueProductChose + " €"}</div>
                        </div>

                }



            </div>

            <div className='checkFavori'>
                {
                    favori != 1 ?
                        <div className='star-cardList' onClick={favoriteStatus}>☆</div>
                    :
                        <div className='star-cardList' onClick={favoriteStatus}>⭐️</div>
                }
                
            </div>
        </div>
    )
}