import { openModal, closeModal } from "../modal";

const profileEditButton = document.querySelector(".profile__edit-button");
const editForm = document.querySelector('.popup_type_edit');

export function initProfileEditButton() {
  profileEditButton.addEventListener("click", () => {
    setInitialEditProfileFormValues()
    openModal(editForm);
  });

  editForm.addEventListener("submit", handleFormSubmit);
}

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const userNameElement = document.querySelector('.profile__title');
const userJobElement = document.querySelector('.profile__description');

function setInitialEditProfileFormValues() {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}

function handleFormSubmit(event) {
  event.preventDefault();

  userNameElement.textContent = nameInput.value;
  userJobElement.textContent = jobInput.value;

  closeModal(editForm);
}
