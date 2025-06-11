import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../utils/auth";
import vectorIcon from "../../../images/Vector.svg";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("Start loading");
      const response = await register({ email, password });
      if (response.status == 400) {
        const message = await response.json();
        throw new Error(message.error);
      }
      const returnData = await response.json();
      if (!returnData.data.email || !returnData.data._id) {
        throw new Error(`Data not found ${returnData}`);
      }
      navigate("/login");
    } catch (error) {
      alert("Erro no registro");
      console.log("[REGISTER] - Erro", error);
    } finally {
      console.log("Stop loading");
    }
  }

  return (
    <div className="register">
      <header className="register__header">
        <div className="register__header-left">
          <img
            className="header__logo"
            src={vectorIcon}
            alt="escrita Around The U.S."
          />
        </div>
        <div className="register__header-right">
          <Link to="/login" className="register__login-link">
            Faça o login
          </Link>
        </div>
        <hr className="header__line" />
      </header>

      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Inscrever-se</h2>
        <input
          type="email"
          placeholder="E-mail"
          className="register__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="register__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="register__button-container">
          <button type="submit" className="register__button">
            Inscrever-se
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>Já é um membro?</p>
        <Link to="/login" className="register__signin-link">
          Faça o login aqui!
        </Link>
      </div>
    </div>
  );
}

export default Register;
