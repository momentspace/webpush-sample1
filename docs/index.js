const KEY_API = 'https://momentspace.live-on.net:8080/key/'
const SUB_API = 'https://momentspace.live-on.net:8080/sub/'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function getSubscription() {
  var reg = await navigator.serviceWorker.ready
  var sub = await reg.pushManager.getSubscription()
  return sub
}

async function getPublicKey() {
  var res = await fetch(KEY_API, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                  }).then((res) => res.json())
  console.log(res)
  return urlBase64ToUint8Array(res.publicKey)
}

async function subscribe(option) {
  var reg = await navigator.serviceWorker.ready
  var sub = await reg.pushManager.subscribe(option)
  return sub
}

async function putSubscription(subscription) {
  console.log(JSON.stringify(subscription))
  var res = await fetch(SUB_API, {
                    method: 'POST',
                    body: JSON.stringify(subscription),
                    headers: { 'Content-Type': 'application/json' }
                  }).then((res) => res.json())
  console.log(res)
}

const onload = async () => {
  navigator.serviceWorker.register('./serviceworker.js')
  var sub = await getSubscription()
  console.log(sub)
  if (!sub) {
    askPermission()
    const key = await getPublicKey()
    console.log(key)
    const option = {
      userVisibleOnly: true,
      applicationServerKey: key
    }
    sub = await subscribe(option)
  }
  await putSubscription(sub)
}
window.removeEventListener('load', onload)
window.addEventListener('load', onload, true)

function askPermission() {
  const f = async () => {
    const permission = await Notification.requestPermission()

    console.log(permission)
    if (permission === 'denied') {
      alert('ブラウザの通知設定をONにしてください')
    } else {
      new Notification('WebPushの設定をしました')
      console.log('permission ok')
    }
  }

  f()
}


