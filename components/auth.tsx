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
            <div>
                <form action="" className="log-in" onSubmit={handleLogin}> 
                <h4><span>Sign-in</span></h4>
                <p>Check-up on your plants!</p>
                <div className="floating-label">
                    <input placeholder="Email" type="text" name="email" id="email" onChange={e => setEmail(e.target.value)}/>
                    <label>Email:</label>
                </div>
                <div className="floating-label">
                    <input placeholder="Password" type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
                    <label>Password:</label>
                </div>
                <div>{error}</div>
                <button type="submit">Log in</button>
                </form>
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
          <button onClick={e => handleLogout(e)}>Sign out</button>
        </div>
      );
    }
    else {
      return <div/>
    }
  };
  

export {LoginComponent, LogoutComponent}