import { useEffect, useState } from "react";
import orderFacade from "../facades/orderFacade";

export default function Refunds() {
    const [orders, setOrders] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        orderFacade.getAllOrders()
        .then(allOrders => setOrders([...allOrders]));
    }, [msg])

    const deny = (e) => {
        orderFacade.denyRefund(e.target.id)
        .then(res => setMsg(res.refundMsg));
    }
    const refund = (e) => {
        orderFacade.refundOrder(e.target.id)
        .then(res => {
            setMsg(res.refundMsg)
        });
    }

    return (
        <div>
            <h1>Refunds</h1>
            <br />
            <p style={{fontSize: "20px", color: "green"}}>{msg}</p>
            <div className="container" style={{backgroundColor: "white"}}>
            <table className="table table-bordered">
                <thead className="thead thead-dark">
                    <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Total price</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {orders.map(order => {
                if (order.hasRequestedRefund) {
                return (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.username}</td>
                        <td>{order.totalPrice.toFixed(2)} DKK</td>
                        <td>
                            <button 
                            className={"btn btn-success"}
                            onClick={refund}
                            id={order.id}
                            value={order.totalPrice}
                            > Approve
                            </button>
                        </td>                   
                        <td>
                            <button 
                            className={"btn btn-danger"}
                            onClick={deny}
                            id={order.id}
                            > Deny
                            </button>
                        </td>     
                    </tr>
                )
                }
            })}
            </tbody>
            </table>
        </div>
        </div>
    )
}