import axios from "axios";
import baseUrl from "~/utils/baseUrl";

export const getInfoUser = async (_id) => {
    const url = `${baseUrl}/api/users/${_id}`;
    return axios.get(url);
};
