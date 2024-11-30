import "./pages/index.css";

import { openModal, closeModal } from "./components/modal";
import {
  appendCard,
  prependCard,
  createCard,
  defaultCardCallbacks,
} from "./components/cards/card";
import { getCards } from "./components/cards/cards";

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

  prependCard(
    createCard({
      name: newCardFormName.value,
      link: newCardFormLink.value,
    })
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

// получить дефолтные коллбеки для карточки
const cardCallbacks = defaultCardCallbacks();

// перегрузить дефолтный коллбек зума карточки
const popupZoomCaption = document.querySelector(".popup__caption");
const popupZoomImage = document.querySelector(".popup__image");
const popupZoom = document.querySelector(".popup_type_image");
cardCallbacks.onZoom = (node) => {
  const image = node.querySelector(".card__image");

  popupZoomImage.src = image.src;
  popupZoomImage.alt = image.alt;
  popupZoomCaption.textContent = image.alt;

  openModal(popupZoom);
};

// отобразить дефолтные карточки
getCards().forEach((card) => {
  appendCard(createCard(card, cardCallbacks));
});
