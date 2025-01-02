import axios from "axios";
import baseUrl from "~/utils/baseUrl";

export const updateType = async (data) => {
    return axios.patch(`${baseUrl}/api/productType/editProductType`, { ...data });
};
