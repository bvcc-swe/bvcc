import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faHandsHelping, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import { RequestListComponent } from './components/RequestListComponent';
import { ToDoListComponent } from './components/ToDoListComponent';

library.add(faCheckCircle, faCircle, faHandsHelping, faPlusCircle, faTrash);

function App() {
  return (
    <Router>
      <div>
        <h1>The Most</h1>
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
          <Route exact path="/">
            <ToDoListComponent />
          </Route>
          <Route path="/getOrganized">
            <ToDoListComponent />
          </Route>
          <Route path="/getPaid">
            <RequestListComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
