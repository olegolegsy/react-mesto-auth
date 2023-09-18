const Register = () => {
  return (
    <section className="sign__content">
      <form className="sign__form">
        <h2 className="sign__header">Регистрация</h2>
        <input placeholder="Email" className="sign__input" type="email" />
        <input placeholder="Пароль" className="sign__input" type="password" />
        <button className="sign__btn">Зарегистрироваться</button>
        <a className="sign__link" href="*">
          Уже зарегистрированы? Войти
        </a>
      </form>
    </section>
  );
};

export default Register;
