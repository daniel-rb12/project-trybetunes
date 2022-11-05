import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, handleChange, checked, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ trackId }
            id={ trackId }
            checked={ checked }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  handleChange: PropTypes.func,
  checked: PropTypes.bool,
}.isRequired;

export default MusicCard;
