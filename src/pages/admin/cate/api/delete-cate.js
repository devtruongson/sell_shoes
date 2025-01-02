import axios from "axios";
import baseUrl from "~/utils/baseUrl";

export const deleteCate = async (id) => {
    return axios.delete(`${baseUrl}/api/productCategory/${id}`);
};
