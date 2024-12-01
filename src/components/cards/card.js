export function onDeleteCallback(node) {
  node.remove();
}

export function onLikeCallback(node) {
  const likeButton = node.querySelector(".card__like-button");
  likeButton.classList.toggle("card__like-button_is-active");
}

const template = document.querySelector("#card-template");

export function createCard(card, callbacks) {
  const node = template.content.querySelector(".card").cloneNode(true);

  const image = node.querySelector(".card__image");
  image.src = card.link;
  image.alt = card.name;
  image.addEventListener("click", () => callbacks.onZoom(card.name, card.link));

  const title = node.querySelector(".card__title");
  title.textContent = card.name;

  const deleteIcon = node.querySelector(".card__delete-button");
  deleteIcon.addEventListener("click", () => callbacks.onDelete(node));

  const likeButton = node.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => callbacks.onLike(node));

  return node;
}
