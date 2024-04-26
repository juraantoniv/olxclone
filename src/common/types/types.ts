import { CommonMessagesType } from "../scrips/commonMessages";

export type ITokensForRefresh = {
  accessToken: string;
  refreshToken: string;
};

export type GoodsType = {
  page: number;
  limit: number;
  total: number;
  data: DataGoods[];
};

export type UserInfoType = {
  id: string;
  name?: string;
  city?: string;
  age?: string;
  avatar?: string;
  email: string;
  active: string;
  role: string;
  userPremiumRights: string;
  created: Date;
};

export type DataGoods = {
  id: string;
  title: string;
  location: string;
  region: string;
  user_id: string;
  description: string;
  image?: string;
  views?: [];
  likes?: [];
  active: string;
  price: string;
  created: Date;
  updatedAt: string;
  boughtBy?: string;
};

export type ParamsType = {
  page?: string;
  limit?: string;
  price?: number;
  search?: string;
  offset?: string;
  ORDER?: string;
  category?: string | null;
};

export type ITokensPair = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    email: string;
    name: string;
    role: string;
    messages: CommonMessagesType[];
    sendedMessages: CommonMessagesType[];
  };
};
