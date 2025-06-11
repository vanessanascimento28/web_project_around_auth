import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import EditAvatar from "./Main/components/Popup/EditAvatar/EditAvatar";
import EditProfile from "./Main/components/Popup/EditProfile/EditProfile";
import ConfirmDeletePopup from "./Main/components/Popup/RemoveCard/RemoveCard";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "Vanessa",
    about: "Web Developer",
  });
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar cartões:", err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error("Erro ao buscar usuário:", err));
  }, []);

  function handleOpenAddCard() {
    setIsAddCardOpen(true);
  }

  function handleCloseAddCard() {
    setIsAddCardOpen(false);
  }

  function handleEditUserPopup() {
    setIsEditProfileOpen((prev) => !prev);
  }

  function handleUpdateUserInfo(updatedUser) {
    api
      .updateUser({
        name: updatedUser.name,
        about: updatedUser.about,
      })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsEditProfileOpen(false);
      })
      .catch((err) => console.error("Erro ao atualizar usuário:", err));
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .createCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddCardOpen(false);
      })
      .catch((err) => console.error("Erro ao adicionar novo cartão:", err));
  }

  function handleOpenEditAvatar() {
    setIsEditAvatarOpen(true);
  }

  function handleCloseEditAvatar() {
    setIsEditAvatarOpen(false);
  }

  function handleUpdateAvatar(avatarUrl) {
    return api
      .setUserAvatar(avatarUrl)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditAvatarOpen(false);
      })
      .catch((err) => console.error("Erro ao atualizar avatar:", err));
  }

  function handleCardLike(card) {
    const request = card.isLiked
      ? api.removeLike(card._id)
      : api.updateLike(card._id);

    request
      .then((updatedCard) => {
        console.log("Resposta da API ao curtir/descurtir:", updatedCard);

        if (!updatedCard) {
          throw new Error("Resposta inválida da API ao atualizar curtida.");
        }

    setCards((prev)=>
    prev.map((c) => (c._id === card._id ? updatedCard : c))
    );
      })
      .catch((err) => console.error("Erro ao atualizar like:", err));
  }

  function handleTrashClick(card) {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  }

  function handleConfirmDelete() {
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardToDelete._id));
        setIsConfirmPopupOpen(false);
        setCardToDelete(null);
      })
      .catch((err) => console.error("Erro ao deletar card:", err));
  }

  function handleCloseConfirmPopup() {
    setIsConfirmPopupOpen(false);
    setCardToDelete(null);
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUserInfo, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header />

        <Main
          handleEditUserPopup={handleEditUserPopup}
          handleOpenAddCard={handleOpenAddCard}
          handleCloseAddCard={handleCloseAddCard}
          isAddCardOpen={isAddCardOpen}
          handleOpenEditAvatar={handleOpenEditAvatar}
          handleCardLike={handleCardLike}
          handleDeleteCard={handleTrashClick}
          cards={cards}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <EditProfile
          isOpen={isEditProfileOpen}
          onClose={handleEditUserPopup}
          onUpdateUser={handleUpdateUserInfo}
        />

        <EditAvatar isOpen={isEditAvatarOpen} onClose={handleCloseEditAvatar} />

        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpen}
          onClose={handleCloseConfirmPopup}
          onConfirm={handleConfirmDelete}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
