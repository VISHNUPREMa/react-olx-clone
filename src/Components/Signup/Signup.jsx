import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../Store/firebaseContext';
import { createUserWithEmailAndPassword , updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { auth, firestore } = useContext(FirebaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const singledata = (doc(firestore, "users", user.uid))
      console.log("singledata : ",singledata);
      await updateProfile(user, { displayName: userName });
      await setDoc(doc(firestore, "users", user.uid), {
        userName: userName,
        email: email,
        phone: phone
      });

      navigate('/login');
      console.log('User registered and saved successfully', user);
    } catch (error) {
      console.error('Error registering user', error.message);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img id='logo-img' width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a onClick={()=>{
          navigate("/login")
        }}>Login</a>
      </div>
    </div>
  );
}
