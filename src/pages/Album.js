import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    obj: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      obj: data,
      loading: false,
    });
    console.log(data);
  };

  render() {
    const { obj, loading } = this.state;
    return (

      <div data-testid="page-album">
        { loading ? <p>Carregando...</p>
          : (
            <>
              <h1 data-testid="artist-name">{obj[0].artistName}</h1>
              <p data-testid="album-name">{obj[0].collectionName}</p>
              {
                obj.map(({ trackId, trackName, previewUrl, kind }) => (
                  kind
                  && (
                    <MusicCard
                      key={ trackId }
                      trackId={ trackId }
                      trackName={ trackName }
                      previewUrl={ previewUrl }
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
