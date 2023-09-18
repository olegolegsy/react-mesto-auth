import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import Login from "./Login/Login";
import Register from "./Register/Register";

import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";

import CurrentUserContext from "./contexts/CurrentUserContext";
import api from "../utils/Api";

import { useCallback, useState, useEffect } from "react";

function App() {
  // ================================================================== handle funcs ==================================================================
  //edit avatar
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setEventListeners();
  };

  //edit prof
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setEventListeners();
  };

  //add place
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setEventListeners();
  };

  //image
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
    setEventListeners();
  };

  //confirm
  const handleConfirmClick = (idCard) => {
    setIsConfirmPopupOpen(true);
    setEventListeners();
    setDelCardId(idCard);
  };

  // closer
  const setPopupStates = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
  }, []);

  // ================================================================== side effs ==================================================================
  // on mount only
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }, []);

  const handleUpdateUser = (userData, handleReset) => {
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        handleReset();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  };

  const handleUpdateAvatar = (userData, handleReset) => {
    api
      .setAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        handleReset();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  };

  const handleConfirmSubmit = (evt) => {
    evt.preventDefault();
    api
      .removeCard(delCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== delCardId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  };

  const handleAddPlaceSubmit = (cardData, reset) => {
    api
      .setCard(cardData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  };

  // ================================================================== states ==================================================================
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // ui state
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // ui state
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // ui state
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // ui state
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false); // ui state

  // card
  const [cards, setCards] = useState([]); // app data (user's data)
  const [selectedCard, setSelectedCard] = useState({}); // app data (user's data)
  const [delCardId, setDelCardId] = useState(""); // app data (user's data)

  const [currentUser, setCurrentUser] = useState({}); // app data (user's data)

  // ================================================================== listeners ==================================================================
  const handleKeydownEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setPopupStates();
        document.removeEventListener("keydown", handleKeydownEsc);
      }
    },
    [setPopupStates]
  );

  const setEventListeners = () => {
    document.addEventListener("keydown", handleKeydownEsc);
  };

  const closeAllPopups = useCallback(() => {
    setPopupStates();
    document.removeEventListener("keydown", handleKeydownEsc);
  }, [setPopupStates, handleKeydownEsc]);

  // ================================================================================ component ================================================================================
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          onConfirm={handleConfirmClick}
          initialCards={cards}
        ></Main>

        {/* <Login /> */}
        {/* <Register /> */}

        <Footer />

        {/* ================================== profile ================================== */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* ================================== place ================================== */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* ================================== avatar ================================== */}
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        {/* ================================== confirm ================================== */}
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          button="Да"
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleConfirmSubmit}
        ></PopupWithForm>

        {/* ================================== image ================================== */}
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        ></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
