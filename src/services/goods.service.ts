import { DataGoods, GoodsType, ParamsType } from "../common/types/types";
import { instance } from "./interceptors/interceptors";

export const carsApiService = {
  getAll: (params?: ParamsType | void) =>
    instance.get<GoodsType>(`/goods`, {
      params: {
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
        offset: params?.offset,
        ORDER: params?.ORDER,
        category: params?.category,
      },
    }),
  getById: (id: string) => instance.get<DataGoods>(`/goods/${id}`),
  likeCar: (id: string) => instance.post<void>(`cars/like/${id}`),
  postCar: (data: any) =>
    instance.post<GoodsType>(
      `/cars`,
      {
        brand: data.brand,
        description: data.description,
        model: data.model,
        price: data.price,
        image: data.image,
        currency_type: "UAH",
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
};
