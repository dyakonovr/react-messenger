import { useNavigate } from "react-router-dom";
import { Paths } from "../../enums/Paths";
import { useAuthStore } from "../../store/authStore";
import Form from "../UI/Form/Form";
import axios from "../../axios";

function Login() {
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  // Функции
  async function handleLogin(email: string, password: string) {
    await axios.post("/login", { email, password })
      .then(response => {
        const { email, login, token } = response.data;
        setUser(email, login, token);
        navigate(Paths.HOME);
        localStorage.setItem("token", token);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  }
  // Функции END

  return (
    <Form
      title="Авторизация"
      buttonText="Авторизироваться"
      altText="Нажмите для регистрации"
      altLink={Paths.REGISTER}
      handleClick={handleLogin}
    />
  );
};

export default Login;