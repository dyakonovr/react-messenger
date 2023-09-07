import NotificationsContainer from "../components/UI/NotificationsContainer/NotificationsContainer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./HomePage/HomePage";
import Login from "./LoginPage/LoginPage";
import Register from "./RegisterPage/RegisterPage";
import { Paths } from "../enums/Paths";
import { useEffect } from "react";
import axios from '../axios';
import { useAuthStore } from "../store/authStore";
import { createToast } from "../utils/createToast";
import { ServerPaths } from "../enums/ServerPaths";

interface IRoute {
  path: string,
  element: JSX.Element
}

function Pages() {
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  const routes: IRoute[] = [
    { path: Paths.HOME, element: <Home /> },
    { path: Paths.REGISTER, element: <Register /> },
    { path: Paths.LOGIN, element: <Login /> }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(Paths.REGISTER);
      return;
    }

    const fetchMyData = async () => {
      await axios.get(ServerPaths.USERS.GET_ME)
        .then(response => {
          const { email, login, _id } = response.data;
          setUser(email, login, token, _id);
          navigate(Paths.HOME);
        })
        .catch(error => createToast(error.response.data.message))
    };

    fetchMyData();
  }, []);

  return (
    <>
      <Routes>
        {routes.map((route, index) => <Route path={route.path} element={route.element} key={index} />)}
      </Routes>
      <NotificationsContainer />
    </>
  );
};

export default Pages;