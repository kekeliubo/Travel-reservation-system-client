import React, { useEffect } from "react";
import DashBoard from "@/pages/dashboard";
import Hotel from "@/pages/dashboard/hotel";
import Flight from "@/pages/dashboard/flight";
import Reverse from "@/pages/dashboard/reserve";
import Bus from "@/pages/dashboard/bus";
import HomeUser from "@/pages/dashboard/user";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./index.less";
const Redirect: React.FC<{ to: string }> = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, []);
  return null;
};
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Redirect to="/home/Flight" />} />
      <Route path="/home" element={<Redirect to="/home/Flight" />} />
      <Route path="/home" element={<DashBoard />}>
        <Route path="/home/flight" element={<Flight />}></Route>
        <Route path="/home/hotel" element={<Hotel />}></Route>
        <Route path="/home/bus" element={<Bus />}></Route>
        <Route path="/home/reverse" element={<Reverse />}></Route>
        <Route path="/home/user" element={<HomeUser />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
