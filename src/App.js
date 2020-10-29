import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/login/Login';
import Phases from './components/phases/Phases';
import { db, auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user logged out
        setUser(null);
      }
    });

    return () => {
      //perform cleanup
      unsubscribe();
    };
  }, [user]);

  return (
    <Router>
      <Route exact path="/">
        {user?<Phases/>:<Login/>}
      </Route>
    </Router>
  );
}

export default App;
