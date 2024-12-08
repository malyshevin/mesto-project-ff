const BASE_URL = "https://nomoreparties.co/v1/cohort-mag-4";

// Объект с маршрутами API
const apiRoutes = {
  user: "users/me",
  cards: "cards",
  likes: "likes",
};

// Заголовки запроса
const headers = {
  Authorization: "be0b098d-a8a7-47b7-99ce-90a4e2401ac8",
  "Content-Type": "application/json",
};

// Функция для проверки данных
const checkData = (data) => {
  if (data.ok) {
    return data.json();
  } else {
    return Promise.reject(`Error: ${data.status}`);
  }
};

// Функция для отправки запроса
function request(endpoint, options) {
  return fetch(`${BASE_URL}/${endpoint}`, options).then(checkData);
}

// Получение всех карточек
export function getCards() {
  return request(apiRoutes.cards, {
    method: "GET",
    headers,
  });
};

// Добавление новой карточки
export function postCard(name, link) {
  return request(apiRoutes.cards, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
};

// Удаление карточки по идентификатору
export function deleteCardApi(id) {
  return request(`${apiRoutes.cards}/${id}`, {
    method: "DELETE",
    headers,
  });
};

// Получение информации о пользователе
export function getUser() {
  return request(apiRoutes.user, {
    method: "GET",
    headers,
  });
};

// Обновление информации о пользователе
export function patchUser(name, about) {
  return request(apiRoutes.user, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
};

// Добавление лайка карточке
export function addLikeCard(id) {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "PUT",
    headers
  });
};

// Удаление лайка с карточки
export function deleteLikeCard(id) {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "DELETE",
    headers,
  });
};

// Обновление аватара пользователя
export function patchAvatar(avatar) {
  return request(`${apiRoutes.user}/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ avatar: avatar }),
  });
};
