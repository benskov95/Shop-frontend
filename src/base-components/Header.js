import "../styles/App.css";
import "../styles/Navbar.css";
import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import { Login } from "./Login";
import Home from "./Home";
import Admin from "./Admin";
import Register from "./Register";
import NoMatch from "./NoMatch"
import PrivateRoute from "./PrivateRoute";
import Products from "../components/Products";
import Cart from "../components/Cart";
import orderFacade from "../facades/orderFacade";
import Orders from "../components/Orders";
import Refunds from "../components/Refunds";

export default function Header({ isLoggedIn, setLoginStatus, loginMsg }) {
  const [cart, setCart] = useState([]);
  const [currentRate, setCurrentRate] = useState(0);
  let user = isLoggedIn ? localStorage.getItem("user") : "";
  let roles = isLoggedIn ? `Roles: ${localStorage.getItem("roles")}` : "";
  const [balance, setBalance] = useState(parseFloat(localStorage.getItem("balance")));

  useEffect(() => {
    setCart([]);
    setBalance(parseFloat(localStorage.getItem("balance")));
    if (isLoggedIn) {
    orderFacade.externalConvertPrice()
    .then(current => setCurrentRate(current.rates.DKK));
    }
  }, [isLoggedIn])

  const addToCart = (product) => {
    let foundProduct = cart.find(p => product.id === p.id);
    if (typeof foundProduct === "undefined") {
      product["quantity"] = 1;
      cart.push(product);
    } else {
      foundProduct.quantity++;
    }
    setCart([...cart]);
  }

  const removeFromCart = (id) => {
    cart.forEach(product => {
      if (product.id === id) {
        if (product.quantity > 1) {
          product.quantity--;
          setCart([...cart]);
        } else {
        let index = cart.indexOf(product);
        cart.splice(index, 1);
        setCart([...cart]);
        }
      }
    })
  }

  const increaseQuantity = (id) => {
    cart.forEach(product => {
      if (product.id === id) {
        if (product.quantity >= 1) {
          product.quantity++;
          setCart([...cart]);
        }
      }
    })
  }

  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/products">
            Products
          </NavLink>
        </li>
        {isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/orders">
                {roles.includes("admin") ? "Orders" : "My Orders"}
              </NavLink>
            </li>
            <li style={{ float: "right", color: "white", marginRight: "20px" }}>
            {user + ", " + balance.toFixed(2) + " DKK"}
            <br />
            {roles}
            <br />
            </li>
            <li style={{float: "right", marginRight: "20px"}}>
              <NavLink activeClassName="active" to="/cart">
                Cart ({cart.length})
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {roles.includes("admin") && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/admin">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/refunds">
                Refunds
              </NavLink>
            </li>
          </React.Fragment>
        )}
        <li>
          <NavLink activeClassName="selected" to="/login">
            {loginMsg}
          </NavLink>
        </li>
        {!isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/register">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>

      <Switch>
        <Route exact path="/shop">
          <Home isLoggedIn={isLoggedIn} setBalance={setBalance}/>
        </Route>
        <Route exact path="/shop/products">
          <Products 
              isLoggedIn={isLoggedIn}
              addToCart={addToCart}
          />
        </Route>
        <PrivateRoute path="/shop/admin" isLoggedIn={isLoggedIn} component={Admin} />
        <PrivateRoute path="/shop/refunds" isLoggedIn={isLoggedIn} component={Refunds} />
        <PrivateRoute path="/shop/orders" isLoggedIn={isLoggedIn} component={Orders} 
        roles={roles}
        user={user}
        /> 
        <PrivateRoute path="/shop/cart" isLoggedIn={isLoggedIn} component={Cart} 
        cart={[...cart]}
        setCart={setCart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        currentRate={currentRate}
        setBalance={setBalance}
        balance={balance}
        />
        <Route path="/shop/login">
          <Login
            setLoginStatus={setLoginStatus}
            isLoggedIn={isLoggedIn}
            loginMsg={loginMsg}
          />
        </Route>
        <Route path="/shop/register">
          <Register />
        </Route>
        <Route>
         <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}
