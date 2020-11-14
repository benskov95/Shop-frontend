import { useEffect, useState } from "react";
import { LOCAL_URL, REMOTE_URL } from "../utils/settings";
import apiFacade from "../base-facades/apiFacade";

export let URL = "";

export default function Home({isLoggedIn, setBalance}) {
  const [currentURL, setCurrentURL] = useState(
    URL === LOCAL_URL ? "Local API" : URL === REMOTE_URL ? "Remote API" : "none"
  );
  const [msg, setMsg] = useState("");

  useEffect(() => {}, [currentURL]);

  const changeURL = (e) => {
    URL = e.target.value;
    if (URL === LOCAL_URL) {
      setCurrentURL("Local API");
    } else {
      setCurrentURL("Remote API");
    }
  };

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
      </p><br />
      <p style={{ fontWeight: "bold" }}>
        Select which API to use <br />
        Currently using: {currentURL}
      </p>
      <select onChange={changeURL}>
        <option value="">Choose...</option>
        <option value={LOCAL_URL}>Local API</option>
        <option value={REMOTE_URL}>Remote API</option>
      </select>
      <br /><br />
      <h3>Log in or register to start shopping!</h3>
    </div>
  );
}
}

