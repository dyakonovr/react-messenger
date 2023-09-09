import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotificationsContainer from "../components/UI/NotificationsContainer/NotificationsContainer";
import { Paths } from "../enums/Paths";
import { getMe } from "../services/UserService";
import { useAuthStore } from "../store/authStore";
import { createToast } from "../utils/createToast";
import Home from "./HomePage/HomePage";
import Login from "./LoginPage/LoginPage";
import Register from "./RegisterPage/RegisterPage";

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

    const getMyData = async () => {
      const getMeResponse: IAuthResponse | string = await getMe(); 
      if (typeof getMeResponse === "string") {
        createToast(getMeResponse);
        return;
      }

      const { email, login, _id } = getMeResponse;
      setUser(email, login, token, _id);
      navigate(Paths.HOME);
    };

    getMyData();
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