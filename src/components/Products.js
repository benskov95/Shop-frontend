import { useEffect, useState } from "react";
import productFacade from "../facades/productFacade";
import "../styles/Products.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function Products({isLoggedIn, addToCart}) {
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        productFacade.externalFetchProducts()
        .then(fetchedProducts => {
            setProducts([...fetchedProducts]);
        });
    }, [])

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const getProductDescription = (e) => {
        let foundProduct = products.find(
            product => parseInt(e.target.id) === product.id);

        setSelectedProduct({...foundProduct});
        toggleModal();
    }

    const addProductToCart = (e) => {
        e.preventDefault();
        let foundProduct = products.find(
            product => parseInt(e.target.id) === product.id);    
        addToCart({...foundProduct});
        setMsg(`${foundProduct.title} has been added to your cart.`);
    }

    return(
        <div className="container">
            <h1>Products</h1>
            <br />
            <p className="msg">{msg}</p>
            <br />
            {products.map(product => {
                return (
                <div className="main" key={product.id}>
                    <div className="productDiv">
                        <p className="productName">{product.title}</p>
                        <img id={product.id} 
                        onClick={getProductDescription} 
                        className="image" 
                        src={product.image}
                        alt=""
                        >
                        </img> 
                        <br /><br />
                        <p>${product.price}</p>
                        {isLoggedIn ? 
                        <button id={product.id}
                        onClick={addProductToCart} 
                        className="btn btn-success">Add to cart</button> : ""}
                    </div>
                </div>
                )
            })}
            <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            >
            <div>
                <p>
                    <strong>Name</strong><br/> {selectedProduct.title} <br/><br />
                    <strong>Description</strong><br /> {selectedProduct.description} <br /><br />
                    <strong>Category</strong><br /> {selectedProduct.category} <br/><br/>
                </p>
            </div>
            <button className="btn btn-secondary" onClick={toggleModal}>Close</button>
            </Modal>
        </div>
    );
}