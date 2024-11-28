// Темплейт карточки
const cardTemplate = document.querySelector('#card-template')

// DOM узел для списка карточек
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData, deleteCardCallback) {
    const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteIcon = cardElement.querySelector('.card__delete-button');
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    deleteIcon.addEventListener('click', () => deleteCardCallback(cardElement));
  
    return cardElement;
  }

// Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
});
