import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import { AuthContext } from './Store/firebaseContext';
import {FirebaseContext} from './Store/firebaseContext'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import  CreatePage from './Pages/Create' 
import ViewPost from  './Pages/ViewPost'
import Post from './Store/postContext'

import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const { user , setUser } = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext)

  useEffect(() => {
    const auth = getAuth();
  
 
    onAuthStateChanged(auth, (user) => {
      if (user) {
     
        const uid = user.uid;
        
        setUser(user)
    
      } else {
      
        console.log("User is signed out");
      }
    });
  }, []);

  return (
    <div>
      <Post>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create' element ={<CreatePage/>} />
          <Route path='/view'  element={<ViewPost/>} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;

