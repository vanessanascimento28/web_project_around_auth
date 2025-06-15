import vectorIcon from "../../images/Vector.svg";


function Header({ email, handleLogout} ) {
  return (
    <header className="header">
      <div className="header__content">
        <img
          className="header__logo"
          src={vectorIcon}
          alt="escrita Around The U.S."
        />
        <p className="header__email">{email}</p>
        <button className="header__logout" onClick={handleLogout}>Logout</button>
      </div>
      <hr className="header__line" />
    </header>
  );
}

export default Header;
