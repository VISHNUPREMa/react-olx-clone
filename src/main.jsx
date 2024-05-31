import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {FirebaseContext} from './Store/firebaseContext.jsx'
import Context from './Store/firebaseContext.jsx'
import  {app,auth , firestore}  from './Firebase/Config.jsx'





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{app,auth , firestore}}>
      <Context>
      <App />
      </Context>

    
   
    </FirebaseContext.Provider>
    
 
  </React.StrictMode>,
)
