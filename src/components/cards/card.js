import { deleteLikeCard, addLikeCard, deleteCardApi } from "../api";

export function onDeleteCallback(node, cardID) {
  deleteCardApi(cardID)
    .then(() => {
      node.remove();
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении карточки:", err);
    });
}

export function onLikeCallback(node, cardID) {
  const likeButton = node.querySelector(".card__like-button");
  const likeCounter = node.querySelector(".card__like-counter");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardID)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при удалении лайка:", err);
      });
  } else {
    addLikeCard(cardID)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при добавлении лайка:", err);
      });
  }
}

const template = document.querySelector("#card-template");

export function createCard(card, callbacks, userId) {
  const node = template.content.querySelector(".card").cloneNode(true);

  const image = node.querySelector(".card__image");
  image.src = card.link;
  image.alt = card.name;
  image.addEventListener("click", () => callbacks.onZoom(card.name, card.link));

  const title = node.querySelector(".card__title");
  title.textContent = card.name;

  const deleteIcon = node.querySelector(".card__delete-button");
  if (userId !== card.owner._id) {
    deleteIcon.style.display = "none";
  } else {
    deleteIcon.addEventListener("click", () => {
      callbacks.onDelete(node, card._id)
    });
  }

  const likeButton = node.querySelector(".card__like-button");
  const liked = card.likes.some((like) => like._id === userId);
  if (liked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () => {
    callbacks.onLike(node, card._id)
  });

  const likeCounter = node.querySelector(".card__like-counter");
  likeCounter.textContent = card.likes.length;

  return node;
}
