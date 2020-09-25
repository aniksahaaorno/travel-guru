import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Booking from './Components/Booking/Booking';





function App() {
  return (
          <div className="bgImage">
            
         <Router>
            <Header></Header>
              <Switch>
                  <Route path="/home">
                     <Home></Home>
                  </Route>
                  <Route path="/login">
                      <Login></Login>
                  </Route>
                  <Route path="/booking/:locationId">
                      <Booking></Booking>
                  </Route>
                  <Route path="/">
                    <Home></Home>
                  </Route>
              </Switch>
         </Router>
          </div>
 
  );
}

export default App;
