import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false,
  };

  componentDidMount() {
    this.renderFavoriteSongs();
  }

  renderFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
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
      loading: false,
    });
  };

  handleFavorite = async ({ target }) => {
    const { favoriteSongs } = this.props;
    const { favorite } = this.state;
    const id = JSON.parse(target.id);
    this.setState({
      loading: true,
      favorite: !favorite,
    }, async () => {
      const alreadyFav = favoriteSongs
        .map((song) => song.trackId)
        .some((e) => e === parseInt(target.value, 10));
      if (!alreadyFav && !favorite) {
        await addSong(id);
        this.setState({
          loading: false,
        });
      } else {
        this.handleRemoveSong(id);
      }
    });
  };

  handleRemoveSong = async (id) => {
    const { getFavoriteSongs } = this.props;
    await removeSong(id);
    await getFavoriteSongs();
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl, element, trackId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        {loading ? <p>Carregando...</p>
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
              <label htmlFor={ JSON.stringify(element) }>
                Favorita
                <input
                  id={ JSON.stringify(element) }
                  type="checkbox"
                  onClick={ this.handleFavorite }
                  data-testid={ `checkbox-music-${trackId}` }
                  defaultChecked={ favorite }
                />
              </label>
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
