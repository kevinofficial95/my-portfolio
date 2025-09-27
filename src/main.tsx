import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";

const Root = () => {
  const { theme } = useTheme();
  return (
    <Theme appearance={theme} accentColor="teal">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Theme>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </React.StrictMode>
);
