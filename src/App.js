import React from 'react';
import Home from './Pages/Home'
import './App.css';
import { Route, BrowserRouter as Router, Routes as Switch} from 'react-router-dom'

const App = ()=> {
  return (
    <div className="App">
      <Router forceRefresh={false}>
  <Switch>
    <Route path="/" element={<Home/>}/>
    
  </Switch>
  </Router>
    </div>
  );
}

export default App;
