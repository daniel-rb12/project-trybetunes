import React, { Component } from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../css/favorites.css';

class Favorites extends Component {
  state = {
    favorites: [],
    loading: false,
    checked: true,
  };

  componentDidMount() {
    this.restoreFavorites();
  }

  handleChange = ({ target }) => {
    const { name, checked } = target;
    if (!checked) {
      this.setState({ loading: true }, async () => {
        const { favorites } = this.state;
        const songs = favorites.find((song) => song.trackId === +name);
        await removeSong(songs);
        const teste = await getFavoriteSongs();
        this.setState({ favorites: teste, loading: false });
      });
    }
  };

  restoreFavorites = async () => {
    this.setState(({ loading: true }), async () => {
      const box = await getFavoriteSongs();
      this.setState({ favorites: box, loading: false });
    });
  };

  render() {
    const { favorites, loading, checked } = this.state;
    return (
      <div data-testid="page-favorites" className="favorites-container">
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
                <ul className="musics-fav">
                  { favorites.map((favorite) => (
                    <MusicCard
                      trackName={ favorite.trackName }
                      previewUrl={ favorite.previewUrl }
                      trackId={ favorite.trackId }
                      handleChange={ this.handleChange }
                      checked={ checked }
                      key={ favorite.trackId }
                      loading={ loading }
                    />
                  )) }
                </ul>
              </div>
            )
        }
      </div>
    );
  }
}

export default Favorites;
