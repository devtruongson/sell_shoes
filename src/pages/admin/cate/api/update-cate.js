import axios from "axios";
import baseUrl from "~/utils/baseUrl";

export const updateCate = async (data) => {
    return axios.put(`${baseUrl}/api/productCategory/update`, { ...data });
};
