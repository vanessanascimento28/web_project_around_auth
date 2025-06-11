class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res, errorMessage) {
        if (!res.ok) {
            return Promise.reject(`${errorMessage}: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then((res) => this._checkResponse(res, "Erro ao buscar cartões"));
    }

    createCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(card),
        }).then((res) => this._checkResponse(res, "Erro ao criar cartão"));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then((res) => this._checkResponse(res, "Erro ao buscar usuário"));
    }

    updateUser({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        }).then((res) => this._checkResponse(res, "Erro ao atualizar perfil"));
    }

    setUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        }).then((res) => this._checkResponse(res, "Erro ao atualizar avatar"));
    }

    updateLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => this._checkResponse(res, "Erro ao curtir o cartão"));
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._checkResponse(res, "Erro ao remover curtida"));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._checkResponse(res, "Erro ao deletar cartão"));
    }
}

const api = new Api({
    baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
    headers: {
        authorization: "d3aaa0c6-6bf2-4359-aa87-fb4acbb3d4e8",
        "Content-Type": "application/json",
    },
});

export default api;
