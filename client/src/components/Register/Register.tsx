import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { Paths } from "../../enums/Paths";
import { useAuthStore } from "../../store/authStore";
import { createToast } from "../../utils/createToast";
import Form from "../UI/Form/Form";
import { ServerPaths } from "../../enums/ServerPaths";

function Register() {
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  // Функции
  async function handleRegister(email: string, password: string, login: string) {
    await axios.post(ServerPaths.USERS.REGISTER, { email, password, login })
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
      title="Регистрация"
      buttonText="Зарегестрироваться"
      altText="Нажмите для авторизации"
      altLink={Paths.LOGIN}
      handleClick={handleRegister}
      isRegister={true}
    />
  );
};

export default Register;