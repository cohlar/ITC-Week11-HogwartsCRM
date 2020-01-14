import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard.js';
import Students from './pages/Students.js';
import StudentProfile from './pages/StudentProfile.js';
import CreateStudent from './pages/CreateStudent.js';
import Header from './components/Header.js';
import SideNav from './components/SideNav.js';
import Inexisting from './components/Inexisting.js';

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
            <Route path='/student-profile/:id'>
              <StudentProfile />
            </Route>
            <Route path='/create-student'>
              <CreateStudent />
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
