import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getMessaging } from 'firebase/messaging'
import { firebaseCredentials } from "../assets/constant";


const app = initializeApp(firebaseCredentials);

//tools ng firebase
export const auth = getAuth(app);

export const messaging = getMessaging(app)
