import api from "./api";
import TokenService from "./token.service";

const register = (name, email, password) => {
  return api
    .post("/account/register", {
      name,
      email,
      password,
    })
    .then((response) => {
      console.log("sign up", response);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const login = (email, password) => {
  console.log(" User ");
  return api
    .post("/account/login", {
      email,
      password,
    })
    .then((response) => {
      console.log("response", response);
      if (response?.data?.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
