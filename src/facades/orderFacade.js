import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const orderFacade = () => {
  
    const getAllOrders = () => {
    return fetch(process.env.REACT_APP_API_URL + "/api/orders", apiFacade.makeOptions("get", true))
    .then(handleHttpErrors);
    };  
  
    const getAllOrdersByUserName = (username) => {
      return fetch(process.env.REACT_APP_API_URL + "/api/orders/" + username, apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors);
    };

    const getOrderById = (id) => {
      return fetch(process.env.REACT_APP_API_URL + "/api/orders/id/" + id, apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
    }

    const externalConvertPrice = () => {
      return fetch(process.env.REACT_APP_API_URL + "/api/orders/convert", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors);
    };

    const addOrder = (order) => {
      return fetch(process.env.REACT_APP_API_URL + "/api/orders", apiFacade.makeOptions("POST", true, order))
      .then(handleHttpErrors);
    };

    const requestRefund = (id) => {
      return fetch(process.env.REACT_APP_API_URL + "/api/orders/request/" + id, apiFacade.makeOptions("PUT", true))
      .then(handleHttpErrors);
    }

    const denyRefund = (id) => {
      return fetch (process.env.REACT_APP_API_URL + "/api/orders/deny/" + id, apiFacade.makeOptions("PUT", true))
      .then(handleHttpErrors);
    }

    const refundOrder = (id) => {
      return fetch(process.env.REACT_APP_API_URL + "/api/orders/" + id, apiFacade.makeOptions("DELETE", true))
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