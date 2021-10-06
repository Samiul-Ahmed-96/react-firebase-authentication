import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initAuthentication from './Firebase/firebase.init';
initAuthentication();

const provider = new GoogleAuthProvider();

function App() {
  const [user,setUser] = useState({});
  const handleGoogleSignIn = () => {  
    const auth = getAuth();
    signInWithPopup(auth,provider)
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
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
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