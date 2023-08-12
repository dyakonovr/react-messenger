// import NotificationsContainer from "../components/UI/NotificationsContainer/NotificationsContainer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./HomePage/HomePage";
import Login from "./LoginPage/LoginPage";
import Register from "./RegisterPage/RegisterPage";
import { Paths } from "../enums/Paths";
import { useEffect } from "react";
import axios from '../axios';
import { useAuthStore } from "../store/authStore";

function Pages() {
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(Paths.REGISTER);
      return;
    }

    const fetchMyData = async () => {
      await axios.get("/me")
        .then(response => {
          const { email, login } = response.data;
          setUser(email, login, token);
          navigate(Paths.HOME);
        })
        .catch(error => console.log(error.response.message))
    };

    fetchMyData();
  }, []);

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