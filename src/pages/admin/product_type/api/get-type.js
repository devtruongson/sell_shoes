import axios from "axios";
import { urlType } from "~/constants/type";

export const getType = async () => {
    return axios.get(urlType);
};
