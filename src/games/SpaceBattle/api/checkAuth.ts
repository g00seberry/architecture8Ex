import axios from "axios";

export const checkAuth = async (data) => {
  const { gId, login, pass } = data;
  const isAuthorized = await axios.post("http://localhost:5000/api/autorize", {
    email: `${login}.${gId}`,
    password: pass,
  });
  return isAuthorized;
};
