import { URL } from "../base-components/Home";
import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const productFacade = () => {
  
    const externalFetchProducts = () => {
      return fetch(URL + "/api/products/fetch-products", apiFacade.makeOptions("GET"))
      .then(handleHttpErrors);
    };
  
    return { externalFetchProducts };
  };
  
  const facade = productFacade();
  export default facade;