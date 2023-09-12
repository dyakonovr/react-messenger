import { useNavigate } from "react-router-dom";
import { Paths } from "../../enums/Paths";
import { authorization } from "../../services/UserService";
import { useAuthStore } from "../../store/authStore";
import { createToast } from "../../utils/createToast";
import Form from "../UI/Form/Form";

function Login() {
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  // Функции
  async function handleLogin(emailOrLogin: string, password: string) {
    const loginResponse = await authorization(emailOrLogin, password);

    if (typeof loginResponse === "string") {
      createToast(loginResponse);
      return;
    }

    const { email, login, token, _id } = loginResponse;
    setUser(email, login, token, _id);
    navigate(Paths.HOME);
    localStorage.setItem("token", token);
  }
  // Функции END

  return (
    <Form
      isRegister={false}
      title="Авторизация"
      buttonText="Авторизироваться"
      altText="Нажмите для регистрации"
      altLink={Paths.REGISTER}
      handleClick={handleLogin}
    />
  );
};

export default Login;