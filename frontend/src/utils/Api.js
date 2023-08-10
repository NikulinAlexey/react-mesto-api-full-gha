const BASE_URL = 'http://localhost:3001';
const headers = {
  'Content-Type': 'application/json',
}
const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export function getProfileInfo() {
  return fetch(`${BASE_URL}/users/me`, {
    headers,
    credentials: 'include',
  })
    .then(checkResponse)
}


export function getInitialCards() {
  return fetch(`${BASE_URL}/cards`, {
    headers,
    credentials: 'include',
  })
    .then(checkResponse)
}

export function editProfileInfo(userData) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name: `${userData.name}`,
      about: `${userData.about}`
    }),
    credentials: 'include',
  })
    .then(checkResponse)
}

export function addNewCard(cardData) {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: `${cardData.place}`,
      link: `${cardData.link}`
    }),
    credentials: 'include',
  })
    .then(checkResponse)
}

export function deleteCard(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  })
    .then(checkResponse)
}

export function addLike(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers,
    credentials: 'include',
  })
    .then(checkResponse)
}

export function removeLike(cardId) {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  })
    .then(checkResponse)
}
export function changeLikeCardStatus(id, isLiked) {
  return (
    isLiked ? (
      removeLike(id)
    ) : (
      addLike(id)
    )
  )
}

export function changeAvatar(inputValue) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar: `${inputValue}`,
    }),
    credentials: 'include',
  })
    .then(checkResponse)
}