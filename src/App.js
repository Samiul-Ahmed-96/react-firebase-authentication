import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initAuthentication from './Firebase/firebase.init';
initAuthentication();
//google provider
const googleProvider = new GoogleAuthProvider();
//github provider
const githubProvider = new GithubAuthProvider();
//auth from firebase
const auth = getAuth();
function App() {
  //user state
  const [user,setUser] = useState({});
  //Google authentication handler
  const handleGoogleSignIn = () => {  
    signInWithPopup(auth,googleProvider)
    .then((result) => {
      const userLogged = result.user;
      console.log(userLogged);
      const loggedInUser = {
        name : userLogged.displayName,
        email : userLogged.email,
        photo : userLogged.photoURL
      };
      setUser(loggedInUser);
    })
    .catch((error) => {
      console.log(error);
    })
  }

//Github authentication handler
const handleGithubSignIn = () =>{
  signInWithPopup(auth,githubProvider)
    .then((result) => {
      const userLogged = result.user;
      console.log(userLogged);
      const loggedInUser = {
        name : userLogged.displayName,
        email : userLogged.email,
        photo : userLogged.photoURL
      };
      setUser(loggedInUser);
    })
    .catch((error) => {
      console.log(error);
    })
}
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleGithubSignIn}>Github Sign In</button>
      <br />
      {
        user.email && <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;