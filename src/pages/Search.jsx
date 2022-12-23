import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../css/search.css';

class Search extends Component {
  state = {
    search: '',
    buttonDisabled: true,
    albums: [],
    render: false,
    searched: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.activateButton();
    });
  };

  activateButton = () => {
    const { search } = this.state;
    const minimumCharacters = 2;
    if (search.length >= minimumCharacters) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  searchAlbum = () => {
    const { search, albums } = this.state;
    this.setState({ searched: search, search: '' }, async () => {
      const albumsMatched = await searchAlbumsAPI(search);
      this.setState({ albums: albumsMatched, render: true, loading: true });
      if (albums) {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { buttonDisabled, search, render, albums, searched, loading } = this.state;
    const { handleChange, searchAlbum } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="search-form">
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              type="text"
              name="search"
              id="search"
              className="fa-solid fa-magnifying-glass"
              placeholder="Digite o nome do artista"
              value={ search }
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            id="search-button"
            disabled={ buttonDisabled }
            onClick={ searchAlbum }
          >
            <FontAwesomeIcon icon={ faSearch } />
          </button>
        </form>
        { loading ? <Loading /> : (
          <div>
            { render && <p id="result-p">{ `Resultado de álbuns de: ${searched}` }</p> }
            <ul className="album-container">
              {albums.map(({ artistName, artworkUrl100, collectionName, collectionId,
              }) => (
                <li className="album" key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <p id="collection-name">{ collectionName }</p>
                  <p>{ artistName }</p>
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    Escute aqui
                  </Link>
                </li>))}
            </ul>
            { render && albums.length === 0
              ? <p id="not-found">Nenhum álbum foi encontrado</p> : '' }
          </div>
        )}
      </div>
    );
  }
}

export default Search;
