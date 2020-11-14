import { useEffect, useState } from "react";
import orderFacade from "../facades/orderFacade";
import "../styles/Products.css";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function Orders({roles, user}) {
    const [orders, setOrders] = useState([]);
    const [msg, setMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("");

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

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const getOrderDescription = (e) => {
        let foundOrder = orders.find(
            order => parseInt(e.target.id) === order.id);

        setSelectedOrder({...foundOrder});
        toggleModal();
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
                    <th>Details</th>
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
                        <td>
                            <button 
                            onClick={getOrderDescription}
                            id={order.id}
                            className="btn btn-secondary"
                            >Details
                            </button>
                        </td>
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
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            >
            <div style={{textAlign: "center", maxHeight: "800px"}}>
            <h3>Orderlines</h3><br />
                <table className="table table-bordered">
                    <thead className="thead thead-dark">
                        <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th onClick={sortPrices}>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    {typeof selectedOrder.orderlines !== "undefined" && 
                    selectedOrder.orderlines.map(orderline => {
                        return (
                        <tr>
                            <td>{orderline.productId}</td>
                        <td>{orderline.title}</td>
                        <td>{orderline.price.toFixed(2)}</td>
                        <td>{orderline.description}</td>
                        <td>{orderline.category}</td>
                        <td>{orderline.quantity}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            </Modal>
        </div>
    )
}