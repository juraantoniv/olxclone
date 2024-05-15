import { DataGoods, GoodsType, ParamsType } from "../common/types/types";
import { DataType } from "../components/adminPanel/dashboard";
import { FormTypeForUpdateModal } from "../components/editableDialogGoods/editGoodsForModal";
import { instance } from "./interceptors/interceptors";

export const carsApiService = {
  getAll: (params?: ParamsType | void) =>
    instance.get<GoodsType>(`/goods`, {
      params: {
        page: params?.page,
        limit: params?.limit,
        search_field: params?.search,
        offset: params?.offset,
        ORDER: params?.ORDER,
        category: params?.category,
        region: params?.region,
      },
    }),
  getById: (id: string) => instance.get<DataGoods>(`/goods/${id}`),
  editGoods: (id: string, data: FormTypeForUpdateModal) =>
    instance.patch<DataGoods>(`/goods/${id}`, {
      ...data,
    }),
  getUserGoods: (id: string) => instance.get<DataGoods[]>(`/goods/user/${id}`),
  getMyGoods: () => instance.get<GoodsType>(`/goods/user/my`),
  likeCar: (id: string) => instance.post<void>(`goods/like/${id}`),
  postGoods: (data: any) =>
    instance.post<GoodsType>(
      `/goods`,
      {
        description: data.description,
        title: data.title,
        location: data.location,
        region: data.region,
        category: data.category,
        price: data.price,
        image: data.image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    ),
  orderCar: (id: string) => instance.post<void>(`cars/buy/${id}`),
  getFavorite: () => instance.get<GoodsType>(`goods/favorite/my`),
  addFavorite: (id: string) => instance.post<void>(`goods/favorite/${id}`),
  getStatics: () => instance.get<DataType[]>(`goods/statics/all`),
};
