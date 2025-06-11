import vectorIcon from "../../images/Vector.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <img
          className="header__logo"
          src={vectorIcon}
          alt="escrita Around The U.S."
        />
      </div>
      <hr className="header__line" />
    </header>
  );
}

export default Header;
