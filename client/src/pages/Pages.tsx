// import NotificationsContainer from "../components/UI/NotificationsContainer/NotificationsContainer";
import { Routes, Route } from "react-router-dom";
import Home from "./HomePage/HomePage";
import Login from "./LoginPage/LoginPage";
import Register from "./RegisterPage/RegisterPage";
import { Paths } from "../enums/Paths";
// import { Paths } from "../enums/Paths";

function Pages() {
  return (
    <>
      <Routes>
        <Route path={Paths.HOME} element={<Home />} />
        <Route path={Paths.REGISTER} element={<Register />} />
        <Route path={Paths.LOGIN} element={<Login />} />
      </Routes>
      {/* <NotificationsContainer /> */}
    </>
  );
};

export default Pages;