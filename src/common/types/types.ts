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
  age?: number;
  avatar?: string;
  email: string;
  active: "active" | "banned";
  role: string;
  userPremiumRights: string;
  created: Date;
  phone: string;
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
  price: number;
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
  region?: string | null;
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
