// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)

const firebaseCredentials = {
    apiKey: "AIzaSyAGr0mCDcfB2H27lAey5NiRhz41YQrswP0",
    authDomain: "mern-296a3.firebaseapp.com",
    projectId: "mern-296a3",
    storageBucket: "mern-296a3.firebasestorage.app",
    messagingSenderId: "648481398954",
    appId: "1:648481398954:web:114a9ce62cdc0d2f61f0d3",
    measurementId: "G-MS5FHQQ42D"
}

firebase.initializeApp(firebaseCredentials)


// eslint-disable-next-line no-undef

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(payload)
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});