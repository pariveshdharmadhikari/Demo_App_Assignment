import React, { Component } from 'react';
import {Router,Route,Switch} from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import history from './History'
import Dashboard from './component/Dashboard'
import CreatePost from './component/CreatePost';
import EditProfile from './component/EditProfile';
import EditPost from './component/EditPost';


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
