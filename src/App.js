import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './Components/Album';
import Favorites from './Components/Favorites';
import Login from './Components/Login';
import Search from './Components/Search';
import Profile from './Components/Profile';
import ProfileEdit from './Components/ProfileEdit';
import NotFound from './Components/NotFound';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
