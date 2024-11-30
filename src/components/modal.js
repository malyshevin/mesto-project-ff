export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClick);
}

export function closeModal(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClick);
  }
}

function handleEscClick(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"))
  }
}
