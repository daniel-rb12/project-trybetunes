import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import musicsAPI from '../services/musicsAPI';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

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
    const { match } = this.props;
    const allMusics = await musicsAPI(match.params.id);
    this.setState({ artist: allMusics[0].artistName,
      albumName: allMusics[0].collectionName,
      image: allMusics[0].artworkUrl100,
      musics: allMusics.slice(1) });
  }

  handleChange = ({ target }) => {
    const { name, checked } = target;
    this.setState((estadoAnterior) => ({
      checked: { ...estadoAnterior.checked, [name]: checked },
    }));
    if (checked) {
      this.setState({ loading: true }, async () => {
        const { trackId } = this.state;
        await addSong(trackId);
        this.setState({ loading: false });
      });
    }
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
              <div>
                <img src={ image } alt={ artist } />
                <p data-testid="album-name">{albumName}</p>
                <span data-testid="artist-name">{artist}</span>
                <div>
                  <ul>
                    { musics.map((music) => (
                      <MusicCard
                        trackName={ music.trackName }
                        previewUrl={ music.previewUrl }
                        trackId={ music.trackId }
                        handleChange={ handleChange }
                        checked={ checked[music.trackId] }
                        key={ music.trackId }
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
