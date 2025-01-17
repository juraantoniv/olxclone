import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AxiosError } from "axios";

import {
  DataGoods,
  GoodsType,
  ParamsType,
  UserInfoType,
} from "../common/types/types";
import { FormType } from "../components/loginComponent/loginComponentNew";
import { CreateGoodsType } from "../components/postGoodsForm/postGood";
import { goodsApiService } from "../services/goods.service";
import { createAppAsyncThunk } from "./create-app-thunk";
import { AppDispatch, AppRootStateType } from "./store";

const initialState = {
  data: {} as GoodsType,
  user: {} as UserInfoType,
  owner: {} as UserInfoType,
  id: "",
  offset: 0,
  count: 10,
  loading: "",
  goodId: "",
  darkMode: false,
  sort: true,
  lang: "eng",
  category: null,
  region: null,
  range: [] as Array<string>,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrenUser: (state, action) => {
      state.user = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    logOff: (state, action) => {
      state.data = action.payload;
    },
    setGoodId: (state, action) => {
      state.goodId = action.payload;
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setGoodOwner: (state, action) => {
      state.owner = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setRange: (state, action) => {
      state.range = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addMatcher(isPending(userThunks.fetchGoods), (state) => {
      state.loading = "loading";
    });
    builder.addMatcher(isRejected(userThunks.fetchGoods), (state) => {
      state.loading = "fulfilled";
    });
    builder.addMatcher(isFulfilled(userThunks.fetchGoods), (state) => {
      state.loading = "fulfilled";
    });
  },
});

const fetchGoods = createAppAsyncThunk<GoodsType, ParamsType | void>(
  "goods/fetchGoods",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const goods = await goodsApiService.getAll(arg);

      return goods.data;
    });
  },
);
const postGood = createAppAsyncThunk<DataGoods, CreateGoodsType>(
  "goods/postGood",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const goods = await goodsApiService.postGoods(arg);

      return goods.data;
    });
  },
);

const likeGood = createAppAsyncThunk<void, string>(
  "goods/likeGood",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await goodsApiService.likeCar(arg);
    });
  },
);

export const userReducer = slice.reducer;
export const userActions = slice.actions;
export const userThunks = {
  fetchGoods,
  likeGood,
  postGood,
};

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<
    AppRootStateType,
    any,
    AppDispatch,
    null | ResponseType
  >,
  logic: Function,
) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e?.response?.data.messages);
    }
  }
};
