import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: true,
    renderFavorite: false,
    favorite: false,
  };

  handleFavorite = async (event) => {
    const { favorite } = this.state;
    this.setState({
      renderFavorite: true,
      favorite: !favorite,
    });
    await addSong(event.target.id);
    this.setState({
      renderFavorite: false,
    });
  };

  render() {
    const { trackName, previewUrl, element, trackId } = this.props;
    const { loading, renderFavorite, favorite } = this.state;
    return (
      <div>
        {!loading ? <p>Carregando...</p>
          : (
            <div>
              {
                renderFavorite ? <p>Carregando...</p> : (
                  <>
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
                        id={ element }
                        type="checkbox"
                        onClick={ this.handleFavorite }
                        data-testid={ `checkbox-music-${trackId}` }
                        defaultChecked={ favorite }
                      />
                    </label>
                  </>
                )
              }
            </div>) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  element: PropTypes.shape({}).isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
