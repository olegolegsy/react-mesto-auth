const Login = () => {
  return (
    <section className="sign__content">
      <form className="sign__form">
        <h2 className="sign__header">Вход</h2>
        <input placeholder="Email" className="sign__input" type="email" />
        <input placeholder="Пароль" className="sign__input" type="password" />
        <button className="sign__btn">Войти</button>
      </form>
    </section>
  );
};

export default Login;
