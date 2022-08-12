import { API_URL } from "../config/constant.js";

export class TaskService {
    constructor() { };

    callApi = (uri, method, data) => {
        return axios({
            url: `${API_URL}/${uri}`,
            method,
            data,
        });

    }
}