import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./components/page/LoginPage";
import SigninPage from "./components/page/SigninPage";
import Todo from "./components/page/todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "register", element: <SigninPage /> },
      { path: "todo/:user_id", element: <Todo /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);