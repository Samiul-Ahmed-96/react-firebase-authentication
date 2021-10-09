import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { Container } from 'react-bootstrap';
import './App.css';
import Register from './components/Register/Register';
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
//Sign Out handler
const handleSignOut = () =>{
  signOut(auth)
  .then(()=>{
    setUser({});
  })
}

  return (
    <div className="App">
     <Container>
     <Register></Register>
     <br />
     {
       !user.name ? 
       <div>
       <button onClick={handleGoogleSignIn}>Google Sign In</button>
       <button onClick={handleGithubSignIn}>Github Sign In</button>
       </div>:
       <button onClick={handleSignOut}>Sign out</button>
     }
     <br />
     {
       user.email && <div>
       <h2>{user.name}</h2>
       <p>{user.email}</p>
       <img src={user.photo} alt="" />
       </div>
     }
     </Container>
    </div>
  );
}

export default App;