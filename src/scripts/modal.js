const popupsArray = Array.from(document.querySelectorAll(".popup"));

export function initPopups() {
  popupsArray.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");
    popup.addEventListener("click", handleOverlayClick);
    closeButton.addEventListener("click", handleCloseButtonClick);
  });
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClick);
}

export function closePopup(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClick);
  }
}

function handleEscClick(evt) {
  if (evt.key === "Escape") {
    const openedPopup = popupsArray.find((popup) =>
      popup.classList.contains("popup_is-opened")
    );
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function handleCloseButtonClick(evt) {
  const button = evt.target;
  const popup = button.closest(".popup");
  closePopup(popup);
}
