import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import musicsAPI from '../services/musicsAPI';

class Album extends Component {
  state = {
    artist: '',
    albumName: '',
    image: '',
    musics: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const allMusics = await musicsAPI(match.params.id);
    this.setState({ artist: allMusics[0].artistName,
      albumName: allMusics[0].collectionName,
      image: allMusics[0].artworkUrl100,
      musics: allMusics.slice(1) });
  }

  render() {
    const { musics, artist, albumName, image } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ image } alt={ artist } />
        <p data-testid="album-name">{albumName}</p>
        <span data-testid="artist-name">{artist}</span>
        <div>
          <ul>
            { musics.map((music) => (
              <MusicCard
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                key={ music.trackId }
              />
            )) }
          </ul>
        </div>
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
