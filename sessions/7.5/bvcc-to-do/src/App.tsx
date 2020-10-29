import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import {ToDoList} from './components/ToDoList';
import {RequestList} from './components/RequestList';
import './App.css';
import "./styles/todoList.css";

function App() {
  return (
    <Router>
      <div>
      <div>The Most</div>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/getOrganized">Get Organized</Link>
            </li>
            <li>
              <Link to="/getPaid">Get Paid</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/getOrganized">
            <ToDoList />
          </Route>
          <Route path="/getPaid">
            <RequestList />
          </Route>
        </Switch>
      </div>

    {/* <div>
      <div>The Most</div>
      <nav>
        <button>Get Organized</button>
        <button>Get Paid</button>
      </nav>
      <div className="tab">
        <ToDoList/>
      </div>
      <div className="tab">

      </div>
    </div> */}
    </Router>
  );
 
}

export default App;
