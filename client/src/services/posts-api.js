const URL = 'http://localhost:3000';

function fetchRequest(path, options) {
  return fetch(path ? URL + path : URL, options)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(error => console.error(error))
} 

export function getPosts() {
  return fetchRequest('/messages');
};
export function postOne(post) {
  return fetchRequest('/messages', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(post)
  })
};
export function deleteOne(id) {
  return fetchRequest(`/messages/${id}`, {
    method: 'DELETE'
  })
};


