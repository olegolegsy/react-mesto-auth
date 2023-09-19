import useValidation from "../hooks/useValidation";
const Login = ({ handleLogin }) => {
  const { handleChange, value } = useValidation();

  const onSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(value.password, value.email);
  };
  return (
    <section className="sign__content">
      <form className="sign__form" onSubmit={onSubmit}>
        <h2 className="sign__header">Вход</h2>
        <input
          placeholder="Email"
          className="sign__input"
          type="email"
          name="email"
          onChange={handleChange}
          value={value.email}
        />
        <input
          placeholder="Пароль"
          className="sign__input"
          type="password"
          name="password"
          onChange={handleChange}
          value={value.password}
        />
        <button className="sign__btn">Войти</button>
      </form>
    </section>
  );
};

export default Login;
