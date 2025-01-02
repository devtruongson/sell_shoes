import axios from "axios";
import baseUrl from "~/utils/baseUrl";

export const createCate = async (data) => {
    return axios.post(`${baseUrl}/api/productCategory/create`, { ...data });
};
