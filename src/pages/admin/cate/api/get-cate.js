import axios from "axios";
import { urlCate } from "~/constants/cate";

export const getCate = async () => {
    return axios.get(urlCate);
};
