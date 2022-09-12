import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const productFacade = () => {
  
    const externalFetchProducts = () => {
      return fetch(process.env.REACT_APP_API_URL + "/api/products/fetch-products", apiFacade.makeOptions("GET"))
      .then(handleHttpErrors);
    };
  
    return { externalFetchProducts };
  };
  
  const facade = productFacade();
  export default facade;