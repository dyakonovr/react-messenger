import { Paths } from "../../enums/Paths";
import Form from "../UI/Form/Form";

function Login() {
  // Функции
  function handleLogin() {
    console.log('login');
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