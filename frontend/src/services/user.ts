import axios from "axios";
import axiosSecure from "../utils/axiosSecure";

type UserRegister = {
  email: string;
  username: string;
  password: string;
};

const baseUrl = "/api/login/me";
const registerUrl = "/api/users"

const getUser = async () => {
    const res = await axiosSecure.get(baseUrl);
    return res.data;
};

const createUser = async (credentials: UserRegister) => {
  const res = await axios.post(registerUrl, credentials);
  return res
}

export default { getUser, createUser }