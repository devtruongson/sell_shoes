import axios from "axios";
import baseUrl from "~/utils/baseUrl";

export const createType = async (data) => {
    return axios.post(`${baseUrl}/api/productType/addProductType`, { ...data });
};
