
import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/add" component={AddUser} />
          <Route path="/edit/:id" component={EditUser} />
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
