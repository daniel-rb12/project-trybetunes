import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import '../css/profile.css';

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
        <div className="profile-container">
          {profile.map(({ description, email, image, name }) => (
            <div className="profile" key={ name }>
              <img data-testid="profile-image" src={ image } alt={ name } />
              <p>{ name }</p>
              <p>{ email }</p>
              <p>{ description }</p>
              <Link
                to="profile/edit"
              >
                Editar perfil
                <FontAwesomeIcon id="search-icon" icon={ faUserPen } />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;
