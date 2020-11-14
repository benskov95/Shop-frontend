import { useState } from "react";
import { REMOTE_URL } from "../utils/settings";
import apiFacade from "../base-facades/apiFacade";

export let URL = REMOTE_URL;

export default function Home({isLoggedIn, setBalance}) {
  const [msg, setMsg] = useState("");

  const addToBalance = (e) => {
    e.preventDefault();
    apiFacade.addBalance(localStorage.getItem("user"))
    .then(res => {
      setMsg(res.msg)
      setBalance(10000)
    })
    }

  if (isLoggedIn) {
    return (
      <div>
        <h1>Home</h1><br />
        <h2>Click the button to start shopping</h2><br />
        <h4 style={{color: "green"}}>{msg}</h4><br />
        <button className="btn btn-success" onClick={addToBalance}>Give me money</button>
      </div>
    )
  } else {
  return (
    <div>
      <h1>Home</h1>
      <p>This is Benjamin's webshop client. <br />
      Feel free to browse the products in the Products section.
      </p>
      <br /><br />
      <h3>Log in or register to start shopping!</h3>
    </div>
  );
}
}

