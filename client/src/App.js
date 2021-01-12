import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './Pages/indexPage'; 
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashBoardPage from './Pages/DashBoardPage';
import NavBar from './NavBar';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/dashboard" component={DashBoardPage} />
      </Switch>
       
    </BrowserRouter>
  );
}

export default App;
