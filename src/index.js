import "./pages/index.css";

import { openModal, closeModal } from "./components/modal";
import {
  createCard,
  onDeleteCallback,
  onLikeCallback,
} from "./components/cards/card";
import { getCards } from "./components/cards/cards";

// получить ноду со списком карточек
const placesList = document.querySelector(".places__list");

// сформировать объект с коллбеками для карточки
const cardCallbacks = {
    onDelete: onDeleteCallback,
    onLike: onLikeCallback,
    onZoom: onZoomCallback,
}

// коллбек зума карточки
const popupZoomCaption = document.querySelector(".popup__caption");
const popupZoomImage = document.querySelector(".popup__image");
const popupZoom = document.querySelector(".popup_type_image");
function onZoomCallback(name, link) {
  popupZoomImage.src = link;
  popupZoomImage.alt = name;
  popupZoomCaption.textContent = name;

  openModal(popupZoom);
};

// забиндить открытие формы добавления карточки на нажатие кнопки добавления карточки
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
newCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

// установить логику отправки формы добавления карточки
const newCardForm = document.forms["new-place"];
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

// обработчик отправки формы добавления карточки
const newCardFormName = newCardForm.elements["place-name"];
const newCardFormLink = newCardForm.elements.link;
function handleNewCardFormSubmit(event) {
  event.preventDefault();

  placesList.prepend(
    createCard(
      {
        name: newCardFormName.value,
        link: newCardFormLink.value,
      },
      cardCallbacks
    )
  );

  closeModal(newCardPopup);
}

// забиндить открытие формы редактирования профиля на нажатие кнопки редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
editProfileButton.addEventListener("click", () => {
  prepareEditProfileForm();
  openModal(editProfilePopup);
});

// установить логику отправки формы редактирования профиля
const editProfileForm = document.forms["edit-profile"];
editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

// предобработчик формы редактирования профиля
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const userNameElement = document.querySelector(".profile__title");
const userJobElement = document.querySelector(".profile__description");
function prepareEditProfileForm() {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}

// обработчик отправки формы редактирования профиля
function handleEditProfileFormSubmit(event) {
  event.preventDefault();

  userNameElement.textContent = nameInput.value;
  userJobElement.textContent = jobInput.value;

  closeModal(editProfilePopup);
}

// забиндить все попапы на закрытие при нажатии на оверлей или кнопку закрытия
const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);

  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(popup));
});

// обработчик закрытия по нажатию на оверлей
function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

// отобразить дефолтные карточки
getCards().forEach((card) => {
  placesList.appendChild(createCard(card, cardCallbacks));
});
