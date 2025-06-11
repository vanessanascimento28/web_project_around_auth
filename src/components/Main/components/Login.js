import React, { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-form__title">Entrar</h2>
            <input
                type="email"
                placeholder="Email"
                className="auth-form__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                className="auth-form__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="auth-form__submit-button">Entrar</button>
        </form>
    );
}

export default Login;
