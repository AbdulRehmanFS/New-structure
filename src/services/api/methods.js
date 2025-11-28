import axiosInterceptor from "../axios.config";

export const postApi = async (url, data) => {
  try {
    const result = await axiosInterceptor.post(url, data);
    return result?.data;
  } catch (e) {
    return e?.response?.data;
  }
};

export const deleteApi = async (url, data) => {
  try {
    const result = await axiosInterceptor.delete(url, { params: data });
    return result?.data;
  } catch (e) {
    return e?.response?.data;
  }
};

export const getApi = async (url, params = {}) => {
  try {
    const result = await axiosInterceptor.get(url, { params });
    return result?.data;
  } catch (e) {
    return e?.response?.data;
  }
};
export const putApi = async (url, data) => {
  try {
    const result = await axiosInterceptor.put(url, data);
    return result?.data;
  } catch (e) {
    return e?.response?.data;
  }
};

export const patchApi = async (url, data) => {
  try {
    const result = await axiosInterceptor.patch(url, data);
    return result?.data;
  } catch (e) {
    return e?.response?.data;
  }
};
