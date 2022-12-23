import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserTie, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../css/header.css';
import trybeLogo from '../images/trybe_logo.png';

class Header extends Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({ loading: true }, async () => {
      const userName = await getUser();
      this.setState({ loading: false, name: userName.name });
    });
  };

  render() {
    const { name, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="header-container">
        <header data-testid="header-component" className="header">
          <p data-testid="header-user-name" className="name">{ name }</p>
          <div className="link-container">
            <Link
              to="/search"
              data-testid="link-to-search"
            >
              <p>Pesquisar</p>
              <FontAwesomeIcon id="search-icon" icon={ faSearch } />
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              <p>Músicas Favoritas</p>
              <FontAwesomeIcon id="search-icon" icon={ faHeart } />
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              <p>Meu Perfil</p>
              <FontAwesomeIcon id="search-icon" icon={ faUserTie } />
            </Link>
          </div>
          <div className="logo-container">
            <img src={ trybeLogo } alt="Logo da Trybe" />
            <h1 id="h1-trybe">Trybe</h1>
            <h2 id="h2-trybe">Tunes</h2>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
