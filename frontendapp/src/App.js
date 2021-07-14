import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Intro from './components/Intro/intro';
import Header from './components/Header/Header';
import Home from './components/Home/Home'
import AddOrders from './components/AddOrders/addOrders';
import ShowOrders from './components/showOrders/showOrders';
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Intro/>
          </Route>
          <Route path="/test">
            <Home/>
          </Route>
          <Route path="/orders">
            <AddOrders/>
          </Route>
          <Route path="/showorders">
            <ShowOrders/>
          </Route>

        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
