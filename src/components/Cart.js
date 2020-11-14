import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Products.css";
import orderFacade from "../facades/orderFacade";
import { useEffect, useState } from "react";

export default function Cart({cart, removeFromCart, increaseQuantity}) {
    const [totalUSD, setTotalUSD] = useState(0);
    const [totalDKK, setTotalDKK] = useState(0);

    useEffect(() =>{
        let calculatedPrice = 0;
        cart.forEach(p => calculatedPrice += (p.price * p.quantity));
        setTotalUSD(calculatedPrice);

        orderFacade.externalConvertPrice(calculatedPrice)
        .then(converted => setTotalDKK(converted.rates.DKK));
    }, [cart]);

    const removeOrAdd = (e) => {
        e.preventDefault();
        let id = parseInt(e.target.id);
        if (e.target.name.length > 1) {
            increaseQuantity(id);
        } else {
        removeFromCart(id);
        }
    }

    return (
        <div>
            <h1>My Cart</h1>
            <br />
            {cart.length >= 1 ? (
            <div className="container" style={{backgroundColor: "white"}}>
            <table className="table table-bordered">
                <thead className="thead thead-dark">
                    <tr>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
            {cart.map(orderline => {
                return (
                    <tr>
                        <td>{orderline.title}</td>
                        <td>${(orderline.price * orderline.quantity).toFixed(2)}</td>
                        <td>{orderline.quantity}</td>
                        <td><img alt="" className="imageInCart" src={orderline.image}></img></td>
                        <td>
                            <button 
                            name={orderline.title}
                            id={orderline.id} 
                            className="btn btn-success"
                            onClick={removeOrAdd}
                            >Add
                            </button>
                        </td>
                        <td>
                            <button 
                            id={orderline.id} 
                            className="btn btn-danger"
                            onClick={removeOrAdd}
                            >Remove
                            </button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            <h3><u>Total</u></h3>
            <p style={{fontSize: "30px", fontWeight: "bold"}}>
                {`$${totalUSD} --> ${totalDKK} DKK`}
            </p>
            <button className="btn btn-success">Order</button>
            </div>
            ) : 
            <div className="container" style={{backgroundColor: "white"}}>
                <h2>
                    Nothing here yet... add something to your cart<br />
                    on the Products page.
                </h2>    
            </div>}
        </div>
    )
}