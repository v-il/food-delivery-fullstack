import axios from "axios";

const baseURL = "http://localhost:5000"

export const axiosQuery = axios.create({
    baseURL,
    withCredentials: true
})

axiosQuery.interceptors.request.use(async config => {
    config.headers["API-KEY"] = "CUeKOImqICnGsLgy0T0x";

    return config;
})