import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../home/Home.component";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
