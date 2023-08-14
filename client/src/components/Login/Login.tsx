import { useNavigate } from "react-router-dom";
import { Paths } from "../../enums/Paths";
import { useAuthStore } from "../../store/authStore";
import Form from "../UI/Form/Form";
import axios from "../../axios";
import { createToast } from "../../utils/createToast";

function Login() {
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  // Функции
  async function handleLogin(emailOrLogin: string, password: string) {
    await axios.post("/login", { emailOrLogin, password })
      .then(response => {
        const { email, login, token } = response.data;
        setUser(email, login, token);
        navigate(Paths.HOME);
        localStorage.setItem("token", token);
      })
      .catch(error => createToast(error.response.data.message));
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