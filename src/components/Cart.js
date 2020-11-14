import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Products.css";

export default function Cart({cart, removeFromCart, increaseQuantity}) {
    
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
                        <td>${Math.round(orderline.price * orderline.quantity)}</td>
                        <td>{orderline.quantity}</td>
                        <td><img className="imageInCart" src={orderline.image}></img></td>
                        <td>
                            <button 
                            id={orderline.id} 
                            className="btn btn-danger"
                            onClick={removeOrAdd}
                            >Remove
                            </button>
                        </td>
                        <td>
                            <button 
                            name={orderline.title}
                            id={orderline.id} 
                            className="btn btn-success"
                            onClick={removeOrAdd}
                            >Add
                            </button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            <h3>Total</h3>
            <p>Insert here</p>
            </div>
        </div>
    )
}