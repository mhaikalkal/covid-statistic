import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 
      kenapa si browser router disimpen disini?
      biar si navbar bisa nempel tanpa kondisi apapun. (gausah dimasukin route bisa ke render jadi otomatis kepasang di setiap route)
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
