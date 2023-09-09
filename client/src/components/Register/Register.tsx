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
  async function handleRegister(typedEmail: string, password: string, typedLogin: string) {
    const registerResponse: IAuthResponse | string = await register(typedEmail, password, typedLogin);

    if (typeof registerResponse === "string") {
      createToast(registerResponse);
      return;
    }

    const { email, login, token, _id } = registerResponse;
    setUser(email, login, token, _id);
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