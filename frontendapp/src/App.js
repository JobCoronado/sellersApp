import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Intro from './components/Intro/intro';
import Header from './components/Header/Header';
import Home from './components/Home/Home'
import AddOrders from './components/AddOrders/addOrders';
import ShowOrders from './components/showOrders/showOrders';
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <PrivateRoute exact path="/orders" component={AddOrders} redirectPath="/" />
          <PrivateRoute exact path="/showorders" component={ShowOrders} redirectPath="/" />
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
