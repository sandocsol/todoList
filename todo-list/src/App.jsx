import React from "react";
import { Outlet } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import LoginPage from "./components/page/LoginPage";

function App(){
    return (
        <>
        <GlobalStyle />
        {/* <Outlet/> */}
          <LoginPage/>
        </>
    )
}

export default App;