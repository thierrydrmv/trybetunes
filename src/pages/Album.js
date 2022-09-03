import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    songs: [],
    loading: true,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      songs: data,
      loading: false,
      favoriteSongs,
    });
  };

  render() {
    const { songs, loading, favoriteSongs } = this.state;
    return (

      <div data-testid="page-album">
        { loading ? <p>Carregando...</p>
          : (
            <>
              <h1 data-testid="artist-name">{songs[0].artistName}</h1>
              <p data-testid="album-name">{songs[0].collectionName}</p>
              {
                songs.map((element) => (
                  element.kind
                  && (
                    <MusicCard
                      getFavoriteSongs={ getFavoriteSongs }
                      favoriteSongs={ favoriteSongs }
                      element={ element }
                      key={ element.trackId }
                      trackId={ element.trackId }
                      trackName={ element.trackName }
                      previewUrl={ element.previewUrl }
                    />
                  )
                ))
              }
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = { match: PropTypes.shape({
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
}).isRequired,
};
