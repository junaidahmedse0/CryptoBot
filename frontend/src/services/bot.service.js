import api from "./api";

const getPublicContent = () => {
  return api.get("/test/all");
};

const getUserBoard = () => {
  return api.get("/WeatherForecast");
};

const getModeratorBoard = () => {
  return api.get("/test/mod");
};

const getBot = (id) => {
  return api.get("/bots/getbot?id=" + id);
};
const addBot = (strategy, cryptoPair, customerOid, isPredefined) => {
  return api
    .post("/bots/postbot", {
      strategy,
      cryptoPair,
      customerOid,
      isPredefined,
    })
    .then((response) => {
      console.log("response", response);

      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
      return error.response.data;
    });
};

const BotService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,

  addBot,
  getBot,
};

export default BotService;
