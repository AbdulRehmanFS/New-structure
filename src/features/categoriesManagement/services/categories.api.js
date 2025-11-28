import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoriesListApi,
  updateCategoryStatusApi
} from "@services/api/collections";

export const fetchCategoriesApi = () => getCategoriesListApi();

export const createCategoryApi = (payload) => addCategoryApi(payload);

export const updateCategoryApi = (payload) => updateCategoryStatusApi(payload);

export const removeCategoryApi = (payload) => deleteCategoryApi(payload);


