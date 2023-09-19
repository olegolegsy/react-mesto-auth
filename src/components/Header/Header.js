import logo from "../../images/header__logo.svg";
import burger from "../../images/header__btn.svg";
import closer from "../../images/header__closer.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header({ page }) {
  const [isOpen, setIsOpen] = useState(false);

  const onSignOut = () => {
    setIsOpen(false);
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    const closeMobileMenu = () => {
      if (document.documentElement.clientWidth > "767") {
        setIsOpen(false);
        window.removeEventListener("resize", closeMobileMenu);
      }

      if (isOpen) {
        window.addEventListener("resize", closeMobileMenu);
        return () => window.removeEventListener("resize", closeMobileMenu);
      }
    };
    closeMobileMenu();
  }, [isOpen]);

  return (
    <header className={`header ${isOpen ? "header_open" : ""}`}>
      <img className="header__logo" src={logo} alt="Логотип. Logo." />
      <div className="header__user-info">
        <p className="header__email">olegoleg@email.ru</p>
        <Link
          to={page === "signin" ? "/sign-up" : "sign-in"}
          className="header__btn"
        >
          {page === "signin" ? "Регистрация" : "Войти"}
        </Link>
      </div>
      <img
        className="header__burger-btn"
        onClick={() => setIsOpen((v) => !v)}
        src={isOpen ? closer : burger}
        alt="бургерс"
      />
      <menu
        className={`header__mob-menu ${isOpen ? "header__mob-menu_open" : ""}`}
      >
        <p className="header__email">olegoleg@email.ru</p>
        <Link to={"#"} className="header__btn">
          {page === "signup" ? "Регистрация" : "Выйти"}
        </Link>
      </menu>
    </header>
  );
}

export default Header;
