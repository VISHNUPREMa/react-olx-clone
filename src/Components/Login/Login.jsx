
import React , {useState , useContext} from 'react';
import {FirebaseContext} from '../../Store/firebaseContext'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");

  const firebase = useContext(FirebaseContext)
  const handleLogin = (e)=>{
    e.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log("sample 1");
      const user = userCredential.user;
      console.log("User signed in: ", user);
      navigate("/")

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in: ", errorMessage);
    });
    
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img id='img' width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{
          navigate("/signup")
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;