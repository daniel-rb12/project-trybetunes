import React from 'react';
import { Route } from 'react-router-dom';
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
        <Route path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route component={ NotFound } />
      </>
    );
  }
}

export default App;
