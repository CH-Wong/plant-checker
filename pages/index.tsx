// import { auth, db } from './config'
import Head from 'next/head'
import React from 'react'

// Import the functions you need from the SDKs you need
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, child, get } from "firebase/database";
import { auth, database } from '@/common/config'

import PlantCard from '@/components/plantcard';

console.log(new Date().getTime() - new Date().getTime())

export default function Home() {
  const [loginState, setLoginState] = React.useState(false);
  const [plants, setPlants] = React.useState(Array());
  
  React.useEffect(() => {
    console.log(loginState)
    if (loginState) {
      var tempPlants = Array();

      const dbRef = ref(database);
      get(child(dbRef, `plants/`)).then((snapshot) => {
        if (snapshot.exists()) {
          for (const name in snapshot.val()) {
            var plant = snapshot.val()[name];
            console.log("in loop:", plant)
            plant.name = name;
            tempPlants.push(plant)
          }
          setPlants(tempPlants);
          console.log(tempPlants);
          plants.map((plant) => console.log(plant))

        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

    }
  }, [loginState])

  
  function LoginComponent() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    function handleLogin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      event.preventDefault();

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoginState(true);
        setError('');
        return userCredential;
      })
      .catch((error) => {
        setLoginState(false);
        setError(error.message);
        return null
      })
    }
    
    if (!loginState) {
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
              
              <button type="submit" onClick={(event) => handleLogin(event)}>Login</button>
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

  return (
    <div className="main">
    <Head>
      <meta name="description" content="Plant watering status checker" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {loginState ? (
      <div>
        <div>Hello</div>
        <div>{plants.map((plant) => <PlantCard plantData={plant} key={plant.name}/>)}</div>
      </div>
      ) : (
        <LoginComponent />
    )}
    </div>
  )
}
