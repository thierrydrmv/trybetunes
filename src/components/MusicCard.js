import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: true,
  };

  handleFavorite = async ({ target }) => {
    if (target.checked) {
      await addSong(target.id);
    // this.setState({
    //   loading: false,
    // });
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    return (
      <div>
        {!loading ? <p>Carregando...</p>
          : (
            <div>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  onClick={ this.handleFavorite }
                  data-testid={ `checkbox-music-${trackId}` }
                />
              </label>
            </div>) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
