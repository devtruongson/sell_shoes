import axios from "axios";
import baseUrl from "~/utils/baseUrl";

export const deleteType = async (id) => {
    return axios.delete(`${baseUrl}/api/productType/deleteProductType/${id}`);
};
