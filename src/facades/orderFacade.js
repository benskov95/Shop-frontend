import { URL } from "../base-components/Home";
import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const orderFacade = () => {
  
    const externalConvertPrice = (amount) => {
      return fetch(URL + "/api/orders/convert/" + amount, apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors);
    };
  
    return { externalConvertPrice };
  };
  
  const facade = orderFacade();
  export default facade;