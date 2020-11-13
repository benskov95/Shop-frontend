import { useEffect, useState } from "react";
import { LOCAL_URL, REMOTE_URL } from "../utils/settings";

export let URL = "";

export default function Home() {
  const [currentURL, setCurrentURL] = useState(
    URL === LOCAL_URL ? "Local API" : URL === REMOTE_URL ? "Remote API" : "none"
  );

  useEffect(() => {}, [currentURL]);

  const changeURL = (e) => {
    URL = e.target.value;
    if (URL === LOCAL_URL) {
      setCurrentURL("Local API");
    } else {
      setCurrentURL("Remote API");
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <p>This is Benjamin's webshop client</p>
      <br />
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
      <p>
      </p>
    </div>
  );
}
