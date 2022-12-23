import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Loading from '../pages/Loading';
import '../css/musicCard.css';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, handleChange, checked, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="card-container">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label className="desc-checkbox" htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ trackId }
            id={ trackId }
            className="checkbox"
            checked={ checked }
            onChange={ handleChange }
          />
          <span
            className="heart"
          >
            <FontAwesomeIcon id="search-icon" icon={ faHeart } />
          </span>
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
