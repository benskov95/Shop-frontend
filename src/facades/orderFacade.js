import { URL } from "../base-components/Home";
import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const orderFacade = () => {
  
    const getAllOrders = () => {
    return fetch(URL + "/api/orders", apiFacade.makeOptions("get", true))
    .then(handleHttpErrors);
    };  
  
    const getAllOrdersByUserName = (username) => {
      return fetch(URL + "/api/orders/" + username, apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors);
    };

    const getOrderById = (id) => {
      return fetch(URL + "/api/orders/id/" + id, apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
    }

    const externalConvertPrice = () => {
      return fetch(URL + "/api/orders/convert", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors);
    };

    const addOrder = (order) => {
      return fetch(URL + "/api/orders", apiFacade.makeOptions("POST", true, order))
      .then(handleHttpErrors);
    };

    const requestRefund = (id) => {
      return fetch(URL + "/api/orders/request/" + id, apiFacade.makeOptions("PUT", true))
      .then(handleHttpErrors);
    }

    const denyRefund = (id) => {
      return fetch (URL + "/api/orders/deny/" + id, apiFacade.makeOptions("PUT", true))
      .then(handleHttpErrors);
    }

    const refundOrder = (id) => {
      return fetch(URL + "/api/orders/" + id, apiFacade.makeOptions("DELETE", true))
      .then(handleHttpErrors);
    }
  
    return { 
      getAllOrders,
      getAllOrdersByUserName,
      getOrderById,
      externalConvertPrice,
      addOrder,
      requestRefund,
      denyRefund,
      refundOrder
     };
  };
  
  const facade = orderFacade();
  export default facade;