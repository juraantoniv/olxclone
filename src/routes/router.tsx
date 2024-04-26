import React from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { AdminPanel } from "../components/adminPanel/adminPanel";
import { Dashboard } from "../components/adminPanel/dashboard";
import { Goods } from "../components/adminPanel/goods";
import { CategoryComponent } from "../components/category/categoryComponent";
import { CurrentGoodInfo } from "../components/currentGoodInfo/currentGoodInfo";
import { GoodsList } from "../components/goodsList/goodsList";
import { GoodsDataTable } from "../components/goodsTable/goods";
import { CurrentDialog } from "../components/messegePanel/dialog/dialog";
import { MessagePanel } from "../components/messegePanel/messagePanel";
import { SignUp } from "../components/myAccountForm/createAccountNew";
import { UsersDataTable } from "../components/usersTable/users";
import { MainLayout } from "../pages/layouts/mainLayout";

const privateRoutes: RouteObject[] = [
  {
    path: "",
    element: <CategoryComponent />,
  },
  {
    path: "category",
    element: <GoodsList />,
  },
  {
    path: "category/info",
    element: <CurrentGoodInfo />,
  },
  {
    path: "admin",
    element: <AdminPanel />,
    children: [
      { element: <Dashboard />, index: true },
      { path: "user", element: <UsersDataTable /> },
      { path: "products", element: <GoodsDataTable /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
  {
    path: "create",
    element: <SignUp />,
  },
  {
    path: "messages/:id",
    element: <MessagePanel />,
    children: [
      { element: <CurrentDialog />, index: true },
      { path: "dialog/:id", element: <CurrentDialog /> },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
