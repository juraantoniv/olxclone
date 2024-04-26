import "./index.css";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { App } from "./App";
import { persistor, store, themeValue } from "./store/store";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
const Root = () => {
  const darkMode = useSelector(themeValue);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background: darkMode ? "dark !important" : "white !important",
            backgroundImage: "none",
            boxShadow: "none",
            borderRadius: "10px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "dark !important" : "white !important",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "5px",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> <App />
    </ThemeProvider>
  );
};

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="80293698923-jc5jl8qndb6tatgq8pgkeb011hps229v.apps.googleusercontent.com">
        <Root />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>,
);
