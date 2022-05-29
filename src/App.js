import React from "react";
import Navbar from "./Component/Navbar/Navbar";
import Country from "./Countries/Countries";
import CountryTest from "./Countries/Countries.test";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CountryTest />} />
        <Route path="countries" element={<Country />} />

        <Route path="*" element={<h1>NotFound</h1>} />
      </Routes>
    </>
  );
}

export default App;
