import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import musicsAPI from '../services/musicsAPI';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../css/album.css';

class Album extends Component {
  state = {
    artist: '',
    albumName: '',
    image: '',
    musics: [],
    loading: false,
    checked: {},
  };

  async componentDidMount() {
    await this.getMusics();
  }

  getMusics = async () => {
    const { match } = this.props;
    const allMusics = await musicsAPI(match.params.id);
    this.setState({ artist: allMusics[0].artistName,
      albumName: allMusics[0].collectionName,
      image: allMusics[0].artworkUrl100,
      musics: allMusics.slice(1) }, () => {
      this.restoreFavorites();
    });
  };

  handleChange = ({ target }) => {
    const { name, checked } = target;
    this.setState((estadoAnterior) => ({
      checked: { ...estadoAnterior.checked, [name]: checked },

    }));
    if (checked) {
      this.setState({ loading: true }, async () => {
        const { musics } = this.state;
        const songs = musics.find((song) => song.trackId === +name);
        await addSong(songs);
        this.setState({ loading: false });
      });
    }
    if (!checked) {
      this.setState({ loading: true }, async () => {
        const { musics } = this.state;
        const songs = musics.find((song) => song.trackId === +name);
        await removeSong(songs);
        this.setState({ loading: false });
      });
    }
  };

  restoreFavorites = () => {
    this.setState(({ loading: true }), async () => {
      const box = await getFavoriteSongs();
      box.forEach((music) => {
        this.setState((estadoAnterior) => ({
          checked: { ...estadoAnterior.checked, [music.trackId]: true },
        }));
      });
      this.setState({ loading: false });
    });
  };

  render() {
    const { musics, artist, albumName, image, loading, checked } = this.state;
    const { handleChange } = this;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading ? <Loading />
            : (
              <div className="music-container">
                <div className="music-title-container">
                  <img src={ image } alt={ artist } />
                  <p data-testid="album-name">{albumName}</p>
                  <p data-testid="artist-name">{artist}</p>
                </div>

                <div>
                  <ul className="musics-card-container">
                    { musics.map((music) => (
                      <MusicCard
                        trackName={ music.trackName }
                        previewUrl={ music.previewUrl }
                        trackId={ music.trackId }
                        handleChange={ handleChange }
                        checked={ checked[music.trackId] }
                        key={ music.trackId }
                        loading={ loading }
                      />
                    )) }
                  </ul>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
