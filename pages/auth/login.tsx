import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../config'
import React from 'react'

export default function LoginPage({token}) {
  const [email, setEmail] = React.useState("w.chunheung@gmail.com");
  const [password, setPassword] = React.useState("F4zCd3HzUdHfGg38HiP24YsByV");
  const [error, setError] = React.useState('');


  function handleLogin(event: Event) {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log(userCredential);
      setToken(userCredential.user.accessToken);
      setError('');
      return userCredential;
    })
    .catch((error) => {
      console.log(error.message);
      setToken('');
      setError(error.message);
      return null
    })

  }

    return (
      <div className = "LoginScreen">
        <h1>Login</h1>
        <div>
          <form>
            <label>
              <p>E-mail</p>
              <input type="text" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            
            <button type="submit" onClick={handleLogin}>Login</button>
          </form>
          <div>{error}</div>
        </div>
      </div>
    );
};
  



