import { URL } from "../base-components/Home";
import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const orderFacade = () => {
  
    const externalConvertPrice = () => {
      return fetch(URL + "/api/orders/convert", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors);
    };

    const addOrder = (order) => {
      return fetch(URL + "/api/orders", apiFacade.makeOptions("POST", true, order))
      .then(handleHttpErrors);
    };
  
    return { 
      externalConvertPrice,
      addOrder,
     };
  };
  
  const facade = orderFacade();
  export default facade;