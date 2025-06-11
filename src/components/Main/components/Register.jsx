import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }

    return (
        <div className="register">
            <header className="register__header">
                <h1 className="register__logo">Around<span className="register__logo-accent">The U.S.</span></h1>
                <Link to="/signin" className="register__login-link">Faça o login</Link>
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
                <button type="submit" className="register__button">Inscrever-se</button>
                <p className="register__text">
                    Já é um membro? <Link to="/signin" className="register__link">Faça o login aqui!</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
