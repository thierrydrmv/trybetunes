import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: true,
    songs: [],
  };

  componentDidMount() {
    this.handleFavoriteSongs();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { songs } = this.state;
    if (prevState.songs !== songs) {
      this.handleFavoriteSongs();
    }
  }

  handleFavoriteSongs = async () => {
    const data = await getFavoriteSongs();
    this.setState({
      songs: data,
      loading: false,
    });
  };

  render() {
    const { loading, songs } = this.state;
    return (
      <div data-testid="page-favorites">
        <div>
          <h2>Músicas favoritas:</h2>
          {
            loading ? <h1>loading...</h1> : (
              songs.map((element) => (
                <MusicCard
                  getFavoriteSongs={ getFavoriteSongs }
                  element={ element }
                  key={ element.trackId }
                  trackId={ element.trackId }
                  trackName={ element.trackName }
                  previewUrl={ element.previewUrl }
                  handleFavoriteSongs={ this.handleFavoriteSongs }
                />
              ))
            )
          }
        </div>
      </div>
    );
  }
}
