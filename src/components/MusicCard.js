import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: true,
    renderFavorite: false,
    favorite: false,
    checkbox: true,
  };

  componentDidMount() {
    this.renderFavoriteSongs();
  }

  renderFavoriteSongs = async () => {
    const { getFavoriteSongs, trackId } = this.props;
    const data = await getFavoriteSongs();
    const render = data.map((e) => e.trackId)
      .some((e) => e === parseInt(trackId, 10));
    if (render) {
      this.setState({
        favorite: true,
      });
    }
    this.setState({
      checkbox: false,
    });
  };

  handleFavorite = async (event) => {
    const { favoriteSongs } = this.props;
    const { favorite } = this.state;
    this.setState({
      renderFavorite: true,
      favorite: !favorite,
    }, async () => {
      const alreadyFav = favoriteSongs
        .map((song) => song.trackId)
        .some((e) => e === parseInt(event.target.value, 10));
      if (!alreadyFav && !favorite) {
        await addSong(JSON.parse(event.target.id));
        this.setState({
          renderFavorite: false,
        });
      } else {
        await removeSong(JSON.parse(event.target.id));
        this.setState({
          renderFavorite: false,
        });
      }
    });
  };

  render() {
    const { trackName, previewUrl, element, trackId } = this.props;
    const { loading, renderFavorite, favorite, checkbox } = this.state;
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
                    <label htmlFor={ JSON.stringify(element) }>
                      Favorita
                      { checkbox ? <p>Carregando...</p>
                        : (
                          <input
                            id={ JSON.stringify(element) }
                            type="checkbox"
                            onClick={ this.handleFavorite }
                            data-testid={ `checkbox-music-${trackId}` }
                            defaultChecked={ favorite }
                          />
                        )}
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
  favoriteSongs: PropTypes.arrayOf(PropTypes.shape({})),
  getFavoriteSongs: PropTypes.func.isRequired,
};

MusicCard.defaultProps = {
  favoriteSongs: [{}],
};
