import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    profile: [],
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    const prof = await getUser();
    this.setState({ profile: [prof] });
  };

  render() {
    const { profile } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {profile.map(({ description, email, image, name }) => (
          <div key={ name }>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <p>{ name }</p>
            <p>{ email }</p>
            <p>{ description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Profile;
