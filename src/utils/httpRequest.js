import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

httpRequest.interceptors.response.use(
    function (response) {
        return response.data || { statusCode: response.status };
    },
    function (error) {
        return Promise.reject(error);
    }
);

// export const get = async (path, options = {}) => {
//     const response = await httpRequest.get(path, options);
//     return response.data;
// };

export default httpRequest;
