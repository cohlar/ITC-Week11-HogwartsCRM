import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard.js'
import Students from './pages/Students.js'
import ViewStudent from './pages/ViewStudent'
import AddStudent from './pages/AddStudent.js'
import Header from './components/Header.js'
import SideNav from './components/SideNav.js'
import Inexisting from './components/Inexisting.js'

function App() {
  return (
    <div className='App'>
      <Router>

        <Header />

        <section id='content'>
          <SideNav />

          <Switch>
            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route path='/students'>
              <Students />
            </Route>
            <Route path='/view-student'>
              <ViewStudent />
            </Route>
            <Route path='/add-student'>
              <AddStudent />
            </Route>
            <Route path='/*'>
              <Inexisting />
            </Route>
          </Switch>

        </section>

      </Router>
    </div>
  );
}

export default App;
