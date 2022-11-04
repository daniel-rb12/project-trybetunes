import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  state = {
    search: '',
    buttonDisabled: true,
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

  render() {
    const { buttonDisabled } = this.state;
    const { handleChange } = this;
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
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
