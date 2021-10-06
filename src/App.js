import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import './App.css';
import initAuthentication from './Firebase/firebase.init';
initAuthentication();

const provider = new GoogleAuthProvider();



function App() {
  
const handleGoogleSignIn = () => {
  const auth = getAuth();
  signInWithPopup(auth,provider)
  .then((result) => {
    const user = result.user;
  }) 
}
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
