// Import the functions you need from the SDKs you need
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence, Auth, signOut } from "firebase/auth";
import React from 'react'

type loginComponentProps = {
    loginState: boolean;
    setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
    auth: Auth;
  }
  
function LoginComponent(props: loginComponentProps) {
const {loginState, setLoginState, auth} = props;

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [error, setError] = React.useState('');

function handleLogin(event: React.SyntheticEvent) {
    event.preventDefault();
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return (
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
        setLoginState(true);
        setError('');
        })
        .catch((error) => {
        setLoginState(false);
        setError(error.message);
        })
    )
    })
    .catch((error) => {
    setError(error.message);
    });

    }
    if (!loginState) {
        return (
        <div className = "LoginScreen">
            <h1>Login</h1>
            <div>
            <form onSubmit={handleLogin}>
                <label>
                <p>E-mail</p>
                <input type="text" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                
                <button type="submit">Login</button>
            </form>
            <div>{error}</div>
            </div>
        </div>
        );
    }
    else {
        return <div/>
    }
};


type logOutProps = {
    loginState: boolean;
    setLoginState: React.Dispatch<React.SetStateAction<boolean>>;
    auth: Auth;
  }
  
  function LogoutComponent(props:logOutProps) {
    const {loginState, setLoginState, auth} = props;
  
    function handleLogout(event: React.SyntheticEvent) {
      signOut(auth)
      .then(() => {
        setLoginState(false);
      })
      .catch((error) => {
        console.log(error.message)
      });
    };
  
    if (loginState) {
      return (
        <div className = "LoginScreen">
          <button onClick={e => handleLogout(e)}>Sign-out</button>
        </div>
      );
    }
    else {
      return <div/>
    }
  };
  

export {LoginComponent, LogoutComponent}