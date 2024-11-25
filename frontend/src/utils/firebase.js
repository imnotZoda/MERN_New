// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getMessaging } from 'firebase/messaging'
// import { firebaseCredentials } from "../assets/constant";


// const app = initializeApp(firebaseCredentials);

// //tools ng firebase
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider(); 




import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';  // Import additional Firebase authentication tools
import { firebaseCredentials } from "../assets/constant";

const app = initializeApp(firebaseCredentials);

// Firebase auth tools
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();  // Initialize GoogleAuthProvider
export const messaging = getMessaging(app)