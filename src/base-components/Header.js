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
import Example from "../components/Example";
import Admin from "./Admin";
import Register from "./Register";
import NoMatch from "./NoMatch"
import PrivateRoute from "./PrivateRoute";
import Products from "../components/Products";
import Cart from "../components/Cart"

export default function Header({ isLoggedIn, setLoginStatus, loginMsg }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart([]);
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

  let user = isLoggedIn ? `Logged in as: ${localStorage.getItem("user")}` : "";
  let roles = isLoggedIn ? `Roles: ${localStorage.getItem("roles")}` : "";

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
            <li style={{ float: "right", color: "white", marginRight: "20px" }}>
            {user}
            <br />
            {roles}
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
                Admin
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
      {/* for deployment */}
        <Route path="/ben-ca3">
          <Redirect to="/" />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <Products 
              isLoggedIn={isLoggedIn}
              addToCart={addToCart}
          />
        </Route>
        <PrivateRoute path="/example" isLoggedIn={isLoggedIn} component={Example} />
        <PrivateRoute path="/admin" isLoggedIn={isLoggedIn} component={Admin} />
        <PrivateRoute path="/cart" isLoggedIn={isLoggedIn} component={Cart} 
        cart={[...cart]}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        />
        <Route path="/login">
          <Login
            setLoginStatus={setLoginStatus}
            isLoggedIn={isLoggedIn}
            loginMsg={loginMsg}
          />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route>
         <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}
