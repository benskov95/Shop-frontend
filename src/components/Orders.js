import { useEffect, useState } from "react";
import orderFacade from "../facades/orderFacade";

export default function Orders({roles, user}) {
    const [orders, setOrders] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (roles.includes("admin")) {
            orderFacade.getAllOrders()
            .then(allOrders => setOrders([...allOrders]));
        } else {
            orderFacade.getAllOrdersByUserName(user)
            .then(userOrders => setOrders([...userOrders]));
        }
    }, [msg, roles, user]);

    const getOrder = (e) => {
        if (e.key === "Enter") {
            orderFacade.getOrderById(e.target.value)
            .then(order => {
                let foundOrder = [];
                foundOrder.push({...order});
                setOrders([...foundOrder])
            })
            .catch(prom => {
                prom.fullError.then(error => {
                    if (error.code === 500) {
                        setMsg("No order with this ID")
                    } else {
                    setMsg(error.message)
                    }
                })
            })
        }
    }

    const refund = (e) => {
        e.preventDefault();
        let id = e.target.id;
        orderFacade.requestRefund(id)
        .then(response => setMsg(response.refundMsg))
    }

    const sortPrices = () => {
        orders.sort((a, b) => - parseFloat(a.totalPrice)- parseFloat(b.totalPrice));
        setOrders([...orders])
    }

    const refresh = () => {
        setMsg("");
        if (roles.includes("admin")) {
            orderFacade.getAllOrders()
            .then(allOrders => setOrders([...allOrders]));
        } else {
            orderFacade.getAllOrdersByUserName(user)
            .then(userOrders => setOrders([...userOrders]));
        }
    }
    
    return (
        <div>
            <h1>{roles.includes("admin") ? "Orders" : "My orders"}</h1>
            <br />
            <p style={{fontSize: "20px", color: "green"}}>{msg}</p>
            <input type="number" onKeyDown={getOrder} placeholder="Enter ID"/>
            <button className="btn btn-secondary" style={{marginLeft: "5px"}} onClick={refresh}>
                Refresh
            </button>
            <br /><br />
            <div className="container" style={{backgroundColor: "white"}}>
            <table className="table table-bordered">
                <thead className="thead thead-dark">
                    <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th onClick={sortPrices}>Total price</th>
                    {!roles.includes("admin") && 
                    <th>Refund</th>
                    }
                    </tr>
                </thead>
                <tbody>
            {orders.map(order => {
                return (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.username}</td>
                        <td>{order.totalPrice.toFixed(2)} DKK</td>
                        {roles.includes("admin") ? "" :
                        <td>
                            <button 
                            id={order.id} 
                            disabled={order.hasRequestedRefund} 
                            onClick={refund} 
                            className="btn btn-secondary"
                            > {order.hasRequestedRefund ? "Pending" : "Refund"}
                            </button>
                        </td>                   
                        }
                    </tr>
                )
            })}
            </tbody>
            </table>
        </div>
        </div>
    )
}