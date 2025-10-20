import axiosSecure from "../utils/axiosSecure";

const baseUrl = "http://localhost:3001/login/me";

const getUser = async () => {
    const res = await axiosSecure.get(baseUrl);
    return res.data;
};

export default { getUser }