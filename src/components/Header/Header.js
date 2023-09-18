import logo from "../../images/header__logo.svg";
import burger from "../../images/header__btn.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип. Logo." />
      <div className="header__user-info">
        <p className="header__email">olegoleg@email.ru</p>
        <a className="header__btn">Регистрация/Выйти</a>
      </div>
      <img className="header__burger-btn" src={burger} alt="бургерс" />
    </header>
  );
}

export default Header;
