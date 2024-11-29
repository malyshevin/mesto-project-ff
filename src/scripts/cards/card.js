import { getCards, delCard } from "./repository.js";
import { openPopup } from "../modal.js";

const placesList = document.querySelector('.places__list');

function deleteCardCallback(node) {
  delCard(node.card)
  showCards();
}

const popupImageCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");
const buttonTypeCard = document.querySelector('.popup_type_image');

function openImagePopup(cardImg) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openPopup(buttonTypeCard);
}

export function newCardNode(card) {
  const template = document.querySelector('#card-template')
  const node = template.content.querySelector('.card').cloneNode(true);

  const image = node.querySelector('.card__image');
  image.src = card.link;
  image.alt = card.name;
  image.addEventListener("click", () => {
    openImagePopup(image);
  });

  const title = node.querySelector('.card__title');
  title.textContent = card.name;

  const deleteIcon = node.querySelector('.card__delete-button');
  deleteIcon.addEventListener('click', () => deleteCardCallback(node));

  const likeButton = node.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    handleLike(likeButton);
  });

  node.card = card;

  return node;
}

export function showCards() {
  placesList.replaceChildren()

  const cards = getCards()
  cards.forEach((card) => {
    placesList.appendChild(newCardNode(card));
  });
}

function handleLike(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}
