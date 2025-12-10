/* eslint-disable no-param-reassign */
import axios from "axios";
import store from "store/reduxStore";

// const baseurl = "http://ec2-3-219-174-154.compute-1.amazonaws.com:5000/";
  //const baseurl = "http://192.168.1.113:5001/"; // process.env.REACT_APP_API_URL;
const baseurl = process.env.REACT_APP_API_URL;

const axiosInterceptor = axios.create({
  timeout: 10000,
  baseURL: baseurl,
  "Content-Type": "application/json;charset=utf-8",
  "Access-Control-Allow-Origin": "*"
});

// Add a request interceptor
axiosInterceptor.interceptors.request.use(
  (config) => {
    if (store?.getState()?.signIn?.data?.token) {
      const token = `Bearer ${store?.getState()?.signIn?.data?.token}`;
      config.headers = { Authorization: token };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInterceptor.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInterceptor;
