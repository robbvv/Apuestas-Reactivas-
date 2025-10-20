import axiosSecure from "../utils/axiosSecure";

const baseUrl = "/api/login/me";

const getUser = async () => {
    const res = await axiosSecure.get(baseUrl);
    return res.data;
};



export default { getUser }