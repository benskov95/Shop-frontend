import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Products.css";
import { useEffect, useState } from "react";
import orderFacade from "../facades/orderFacade";

export default function Cart({cart, setCart, removeFromCart, increaseQuantity, currentRate, setBalance, balance}) {
    const [totalUSD, setTotalUSD] = useState(0);
    const [totalDKK, setTotalDKK] = useState(0);
    const [order, setOrder] = useState({username: localStorage.getItem("user")});
    const [msg, setMsg] = useState("");

    useEffect(() =>{
        let calculatedPrice = 0;
        cart.forEach(p => calculatedPrice += (p.price * p.quantity));
        setTotalUSD(calculatedPrice);
        setTotalDKK((calculatedPrice * currentRate).toFixed(2))
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

    const placeOrder = (e) => {
        e.preventDefault();
        let cartCopy = cart.map(ol => ({...ol}));
        order.orderlines = [];
        cartCopy.forEach(ol => {
            delete ol.id;
            ol.price *= currentRate;
            order.orderlines.push(ol);
        })
        setOrder({...order});
        setCart([]);
        setBalance(balance - totalDKK);

        orderFacade.addOrder(order)
        .then(result => {setMsg(result)})
        .catch(error => setMsg(error.fullError))
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
            <button onClick={placeOrder} className="btn btn-success">Order</button>
            </div>
            ) : 
            <div className="container" style={{backgroundColor: "white"}}>
                <h4 style={{color: "green"}}>
                    {typeof msg.id !== "undefined" ? `Order (ID: ${msg.id}) successfully made. 
                    Thank you for your purchase, ${msg.username}.` : ""}
                </h4>
                <br />
                <h2>
                    Nothing here yet... add something to your cart<br />
                    on the Products page.
                </h2>    
            </div>}
        </div>
    )
}