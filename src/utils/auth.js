const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// Registro
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(`Erro: ${res.status}`)));
};

// Login
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(`Erro: ${res.status}`)));
};

// Validação do token
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => (res.ok ? res.json() : Promise.reject(`Erro: ${res.status}`)));
};
