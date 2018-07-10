window.onload = () => {
  document.getElementById("btn").addEventListener('click', () => {
    console.log("button")
    postData('http://localhost:8080/push/', {text: 'test'})
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => console.log(error))
  })
}

function postData(url, data) {
  // 既定のオプションには * が付いています
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}
