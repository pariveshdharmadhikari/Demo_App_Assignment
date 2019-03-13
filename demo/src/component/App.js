import React, { Component } from 'react';
import {Router,Route,Switch} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import history from './History'
import Dashboard from './Dashboard'
import CreatePost from './CreatePost';
import EditProfile from './EditProfile';
import EditPost from './EditPost';


class App extends Component {

  render() {

    return (
      <div className="text container"  >        
          <Router history={history}>
            <div>
              <Switch>
              <Route path="/" exact component={Login} ></Route>
              <Route path="/Signup" exact component={Signup}></Route>
              <Route path="/Dashboard" exact component={Dashboard}></Route>
              <Route path="/CreatePost" exact component={CreatePost}></Route>
              <Route path="/EditProfile/:id" exact component={EditProfile}></Route>
              <Route path="/EditPost/:id" exact component={EditPost}></Route>
              </Switch>
            </div>
          </Router>   
      </div>
    );
  }
}

export default App;
