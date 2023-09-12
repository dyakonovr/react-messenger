import { useNavigate } from "react-router-dom";
import { Paths } from "../../enums/Paths";
import { register } from "../../services/UserService";
import { useAuthStore } from "../../store/authStore";
import { createToast } from "../../utils/createToast";
import Form from "../UI/Form/Form";

function Register() {
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  // Функции
  async function handleRegister(email: string, password: string, login: string) {
    const registerResponse = await register(email, password, login);

    if (typeof registerResponse === "string") {
      createToast(registerResponse);
      return;
    }

    const { email: responseEmail, login: responseLogin, token, _id } = registerResponse;
    setUser(responseEmail, responseLogin, token, _id);
    navigate(Paths.HOME);
    localStorage.setItem("token", token);
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