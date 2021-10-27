const URL = 'http://localhost:3000/messages';

export function getPosts() {
  return fetch(URL)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(error => console.error(error))
};


