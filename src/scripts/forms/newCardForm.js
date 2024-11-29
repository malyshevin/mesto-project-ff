import { addCard } from "../cards/repository";
import { showCards } from "../cards/card";
import { openPopup, closePopup } from "../modal";
import { handleSubmit } from "../submit";

const profileAddButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector('.popup_type_new-card');

export function initProfileAddButton() {
  profileAddButton.addEventListener("click", () => {
    openPopup(newCardForm);
  });

  newCardForm.addEventListener("submit", handleFormSubmit);
}

const newPlaceFormElement = document.forms["new-place"];
const newPlaceNameInput = newPlaceFormElement.elements["place-name"];
const newLinkInput = newPlaceFormElement.elements.link;

function handleFormSubmit(event) {
  handleSubmit(event, () => {
    const card = {
      name: newPlaceNameInput.value,
      link: newLinkInput.value,
    };
  
    addCard(card, true);
    showCards();

    closePopup(newCardForm);
  });
}
