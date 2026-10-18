// 通知の受け取り役（アプリを閉じていても通知を出す）
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
importScripts('./config.js');

firebase.initializeApp(FIREBASE_CONFIG);
firebase.messaging();   // 通知の表示はFirebaseに任せる（GASから webpush.notification で送る）

// 通知を押したら入口ページを開く（開いていればそれを前に出す）
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const w = list.find(c => c.url.startsWith(self.registration.scope));
    return w ? w.focus() : clients.openWindow('./');
  }));
});
