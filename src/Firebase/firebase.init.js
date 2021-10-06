import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";


const initAuthentication = () => {
    const app = initializeApp(firebaseConfig);
}

export default initAuthentication;