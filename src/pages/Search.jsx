import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    search: '',
    buttonDisabled: true,
    albums: [],
    render: false,
    searched: '',
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
    const { search } = this.state;
    this.setState({ searched: search, search: '' }, async () => {
      const albumsMatched = await searchAlbumsAPI(search);
      this.setState({ albums: albumsMatched, render: true });
    });
  };

  render() {
    const { buttonDisabled, search, render, albums, searched } = this.state;
    const { handleChange, searchAlbum } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            Pesquisar:
            <input
              data-testid="search-artist-input"
              type="text"
              name="search"
              id="search"
              value={ search }
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisabled }
            onClick={ searchAlbum }
          >
            Pesquisar
          </button>
        </form>
        <div>
          { render && <p>{ `Resultado de álbuns de: ${searched}` }</p> }
          <ul>
            {albums.map(({ artistName, artworkUrl100, collectionName, collectionId }) => (
              <li key={ collectionName }>
                <img src={ artworkUrl100 } alt={ artistName } />
                <p>{ collectionName }</p>
                <p>{ artistName }</p>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  Escute aqui
                </Link>
              </li>))}
          </ul>
          { render && albums.length === 0 ? <p>Nenhum álbum foi encontrado</p> : '' }
        </div>
      </div>
    );
  }
}

export default Search;
