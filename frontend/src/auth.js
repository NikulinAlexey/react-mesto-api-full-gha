export const BASE_URL = 'http://localhost:3001';

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email }),
    credentials: 'include',
  })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};
export function authorize(password,email ) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email }),
    credentials: 'include',
  })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)) 
}