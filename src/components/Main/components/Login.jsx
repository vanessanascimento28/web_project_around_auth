import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authorize } from "../../../utils/auth";
import vectorIcon from "../../images/Vector.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
      e.preventDefault();
      try {
        console.log("Start loading");
        const response = await authorize({ email, password });
        if (response.status == 400 || response.status == 401) {
          const message = await response.json();
          throw new Error(message);
        }
        const returnData = await response.json();
        if (!returnData.token) {
          throw new Error(`Data not found ${returnData}`);
        }
        localStorage.setItem("jwt", JSON.stringify(returnData))
        navigate("/");
      } catch (error) {
        alert("Erro no registro");
        console.log("[LOGIN] - Erro", error);
      } finally {
        console.log("Stop loading");
      }
    }


   return (
    <div className="login__page">
      <header className="login__header">
        <div className="login__header-left">
          <img
            className="header__logo"
            src={vectorIcon}
            alt="escrita Around The U.S."
          />
        </div>
        <div className="login__header-right">
          <Link to="/signin" className="login__link">
            Entrar
          </Link>
        </div>
        <hr className="header__line" />
      </header>

      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Entrar</h2>
        <input
          type="email"
          placeholder="E-mail"
          className="login__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="login__button-container">
          <button type="submit" className="login__button">
            Entrar
          </button>
        </div>
      </form>
      <div className="login__signin">
        <p>Ainda não é membro?</p>
        <Link to="/signup" className="login__signup-link">
          Inscreva-se aqui!
        </Link>
      </div>
    </div>
  );
}

export default Login;
