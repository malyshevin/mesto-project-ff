import "./pages/index.css";

import { openModal, closeModal } from "./components/modal";
import {
  createCard,
  onDeleteCallback,
  onLikeCallback,
} from "./components/cards/card";
import { getUser, getCards, patchUser, postCard, patchAvatar } from "./components/api";
import { enableValidation, clearValidation, validationConfig } from "./components/validation";

// выполнить инициализацию валидации формы
enableValidation(validationConfig);

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

// установить логику отправки формы добавления карточки
const newCardForm = document.forms["new-place"];
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

// обработчик отправки формы добавления карточки
const newCardFormName = newCardForm.elements["place-name"];
const newCardFormLink = newCardForm.elements.link;
function handleNewCardFormSubmit(event) {
  event.preventDefault();

  const previousSubmitText = event.submitter.textContent;
  event.submitter.textContent = "Добавление...";

  postCard(newCardFormName.value, newCardFormLink.value)
    .then((card) => {
      placesList.prepend(createCard(card, cardCallbacks, userId));
      closeModal(newCardPopup);
      newCardForm.reset();
    })
    .finally(() => {
      event.submitter.textContent = previousSubmitText;
    });
}

const changeAvatarForm = document.forms["edit-avatar"];
changeAvatarForm.addEventListener("submit", handleChangeAvatarFormSubmit);

const changeAvatarPopup = document.querySelector(".popup_type_avatar");
function handleChangeAvatarFormSubmit(event) {
  event.preventDefault();

  const previousSubmitText = event.submitter.textContent;
  event.submitter.textContent = "Обновление...";

  patchAvatar(changeAvatarForm.elements["avatar-link"].value)
    .then((res) => {
      avatarImage.setAttribute("style", `background-image: url('${res.avatar}')`);
      closeModal(changeAvatarPopup);
    })
    .finally(() => {
      event.submitter.textContent = previousSubmitText;
    });
}

const avatarImage = document.querySelector(".profile__image");
avatarImage.addEventListener("click", () => {
  clearValidation(changeAvatarForm, validationConfig);
  openModal(changeAvatarPopup);
});

// забиндить открытие формы добавления карточки на нажатие кнопки добавления карточки
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
newCardButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
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

// забиндить открытие формы редактирования профиля на нажатие кнопки редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
editProfileButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  prepareEditProfileForm();
  openModal(editProfilePopup);
});

// обработчик отправки формы редактирования профиля
function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  
  const previousSubmitText = event.submitter.textContent;
  event.submitter.textContent = "Сохранение...";

  patchUser(nameInput.value, jobInput.value)
    .then((user) => {
      userNameElement.textContent = user.name;
      userJobElement.textContent = user.about;

      closeModal(editProfilePopup);
    })
    .finally(() => {
      event.submitter.textContent = previousSubmitText;
    });
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

// Функция для установки информации о пользователе на страницу
let userId = "";
const userAvatarElement = document.querySelector(".profile__image");
function setUserInfo(user) {
  userNameElement.textContent = user.name;
  userJobElement.textContent = user.about;
  userAvatarElement.setAttribute(
    "style",
    `background-image: url('${user.avatar}')`
  );
  userId = user._id;
}

// Функция для рендеринга карточек на страницу
function renderCards(cards, cardCallbacks, userID) {
  placesList.innerHTML = "";
  cards.forEach((card) => placesList.appendChild(createCard(card, cardCallbacks, userID)));
  // placesList.appendChild(createCard(card, cardCallbacks, userID));
}

// Выполнение асинхронных запросов на сервер для получения информации о пользователе и карточек
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cards, cardCallbacks, user._id);
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении данных:", err);
  });
