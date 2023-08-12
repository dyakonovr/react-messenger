import { Link } from "react-router-dom";
// import PasswordIsHiddenIcon from "../../assets/sprites/PasswordIsHiddenIcon";
// import PasswordIsVisibleIcon from "../../assets/sprites/PasswordIsVisibleIcon";
import classes from "./Form.module.scss";
import { useForm } from "react-hook-form";

interface IFormProps {
  title: string,
  buttonText: string,
  altText: string,
  altLink: string,
  handleClick: (email: string, password: string) => void,
}

function Form({ title, buttonText, altText, altLink, handleClick }: IFormProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form className={classes.form} onSubmit={handleSubmit((data) => { console.log(data); })}>
      <h1 className={classes.form_title}>{title}</h1>
      <input 
        className={["input", classes.form_input].join(' ')} 
        {...register("email")}
        placeholder="Почта"
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