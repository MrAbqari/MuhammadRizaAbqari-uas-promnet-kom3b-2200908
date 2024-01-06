import React from 'react';
import './components/Style.css'
import {BrowserRouter as Router, Route, Switch} 
      from 'react-router-dom'
import Header from './components/header';
import ListData from './components/ListData';
import Footer from './components/Footer';
import CreateData from './components/CreateData';
import ViewData from './components/ViewData';

function App() {
  return (
    <div>
        <Router>
              <Header />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component =
                              {ListData}></Route>
                          <Route path = "/users" component = 
                              {ListData}></Route>
                          <Route path = "/add-user/:id" component = 
                              {CreateData}></Route>
                          <Route path = "/view-user/:id" component = 
                              {ViewData}></Route>
                         </Switch>
                </div>
                <Footer/>
        </Router>
    </div>
    
  );
}

export default App;
