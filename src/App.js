import './App.css';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />

        <Redirect to='/login' />
      </Switch>
    </Router>
  );
}

export default App;
