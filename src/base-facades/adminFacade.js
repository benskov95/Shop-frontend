import apiFacade, { handleHttpErrors } from "./apiFacade";

const adminFacade = () => {
  const getUsers = () => {
    return fetch(process.env.REACT_APP_API_URL + "/api/users", apiFacade.makeOptions("GET", true)).then(
      handleHttpErrors
    );
  };

  const deleteUser = (userName) => {
    return fetch(
      process.env.REACT_APP_API_URL + `/api/users/${userName}`,
      apiFacade.makeOptions("DELETE", true)
    ).then(handleHttpErrors);
  };
  return { getUsers, deleteUser };
};

const facade = adminFacade();
export default facade;
