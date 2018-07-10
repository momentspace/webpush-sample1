const PUSH_API = "https://momentspace.live-on.net:8080/push/"

const preload= () => {
  document.getElementById("btn").addEventListener('click', () => {
    console.log("button")
    const text = document.getElementById("text").value
    console.log(text)
    if (text === "") {
      alert("please input payload")
      return
    }
    postData(PUSH_API, {text: text})
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => console.log(error))
  })
}
window.removeEventListener('load', preload)
window.addEventListener('load', preload, true)

function postData(url, data) {
  // 既定のオプションには * が付いています
  console.log('post data')
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
