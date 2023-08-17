import { Link } from "react-router-dom";
// import PasswordIsHiddenIcon from "../../assets/sprites/PasswordIsHiddenIcon";
// import PasswordIsVisibleIcon from "../../assets/sprites/PasswordIsVisibleIcon";
import classes from "./Form.module.scss";
import { FieldValues, useForm } from "react-hook-form";

type handleClickTypeWithoutLogin = (email: string, password: string) => Promise<void>;
type handleClickTypeWithLogin = (email: string, password: string, login: string) => Promise<void>;

interface IFormProps {
  isRegister: boolean
  title: string,
  buttonText: string,
  altText: string,
  altLink: string,
  handleClick: handleClickTypeWithLogin & handleClickTypeWithoutLogin;
}

function Form({ isRegister, title, buttonText, altText, altLink, handleClick }: IFormProps) {
  const { register, handleSubmit } = useForm();

  // Функции
  function handleFormSubmit(data: FieldValues) {
    if (isRegister) handleClick(data.email, data.password, data.login);
    else handleClick(data.emailOrLogin, data.password);
  }
  // Функции END

  return (
    <form className={classes.form} onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
      <h1 className={classes.form_title}>{title}</h1>
      {
        isRegister &&
          <input 
            className={["input", classes.form_input].join(' ')} 
            {...register("login")}
            placeholder="Логин"
            type="text"
          />
      }
      <input 
        className={["input", classes.form_input].join(' ')} 
        {...register(isRegister ? "email" : "emailOrLogin")}
        placeholder={isRegister ? "Почта" : "Почта или логин"}
        type="text"
      />
      <div className={classes.form_password_wrapper}>
        <input 
          className={["input", classes.form_input, classes.form_input_password].join(' ')} 
          {...register("password")}
          placeholder="Пароль"
        />
        {/* <button
          className={classes.form_show}
          onClick={() => setPasswordIsVisible(!passwordIsVisible)}
        >
          {passwordIsVisible ? <PasswordIsHiddenIcon size="20px" /> : <PasswordIsVisibleIcon size="20px" /> }
        </button> */}
      </div>
      <button className={["button", classes.form_button].join(' ')}>{buttonText}</button>
      <Link className={classes.form_link} to={altLink}>{altText}</Link>
    </form>
  );
};

export default Form;