import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    apiRequest: false,
    obj: [],
    artist: '',
    backupArtist: '',
    searchBtn: true,
    loading: false,
  };

  handleSearch = ({ target }) => {
    const minlength = 2;
    this.setState({
      artist: target.value,
      backupArtist: target.value,
      searchBtn: (target.value.length < minlength),
    });
  };

  fetchApi = async (value) => {
    const data = await searchAlbumsAPI(value);
    this.setState({
      apiRequest: true,
      obj: data,
      loading: false,
    });
  };

  handleButton = () => {
    this.setState({
      artist: '',
      loading: true,
    });
    const { backupArtist } = this.state;
    this.fetchApi(backupArtist);
  };

  render() {
    const { apiRequest, obj, searchBtn, artist, backupArtist, loading } = this.state;
    let render;
    if (obj.length > 1) {
      render = (
        <div>
          <p>{`Resultado de álbuns de: ${backupArtist}`}</p>
          {
            obj.map(({ collectionId, artistName, artworkUrl100, collectionName }) => (
              <div key={ collectionId }>
                <img src={ artworkUrl100 } alt={ artistName } />
                <h2>{ collectionName }</h2>
                <p>{ artistName }</p>
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  Link
                </Link>
              </div>
            ))
          }
        </div>);
    } else {
      render = <h2>Nenhum álbum foi encontrado</h2>;
    }
    return (
      <div data-testid="page-search">
        { loading && <p>Carregando...</p> }
        { apiRequest ? render
          : (
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                value={ artist }
                placeholder="Nome do Artista"
                onChange={ this.handleSearch }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ searchBtn }
                onClick={ this.handleButton }
              >
                Pesquisar
              </button>
            </form>
          )}
      </div>
    );
  }
}
