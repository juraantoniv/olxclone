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
import { carsApiService } from "../services/goods.service";
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
  "cars/fetchCars",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const goods = await carsApiService.getAll(arg);

      return goods.data;
    });
  },
);
const postCar = createAppAsyncThunk<DataGoods, FormType>(
  "cars/postCar",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const goods = await carsApiService.postCar(arg);

      return goods.data;
    });
  },
);

const likeCar = createAppAsyncThunk<void, string>(
  "cars/likeCar",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await carsApiService.likeCar(arg);
    });
  },
);

export const userReducer = slice.reducer;
export const userActions = slice.actions;
export const userThunks = {
  fetchGoods,
  likeCar,
  postCar,
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
