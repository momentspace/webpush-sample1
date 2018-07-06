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
  var res = await fetch('/keys', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                  }).then((res) => res.json())
  console.log(res)
  return res.publicKey
}

async function subscribe(option) {
  var reg = await navigator.serviceWorker.ready
  var sub = await reg.pushManager.subscribe(option)
  return sub
}


window.addEventListener('load', async () => {
  navigator.serviceWorker.register('./serviceworker.js')
  var sub = await getSubscription()
  if (!sub) {
    askPermission()
  }
  console.log(sub)
})

function askPermission() {
  var permission = Notification.requestPermission()
  new Notification('WebPushの設定をしました')
  if (permission === 'denied') {
    return alert('ブラウザの通知設定をONにしてください')
  } else {
    console.log('permission ok')
  }
}


