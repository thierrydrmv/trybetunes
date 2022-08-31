import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    apiRequest: false,
    obj: [],
    favorite: '',
    btnFavorite: true,
  };

  handleSearch = ({ target }) => {
    const minlength = 2;
    this.setState({
      favorite: target.value,
      btnFavorite: (target.value.length < minlength),
    });
  };

  fetchApi = async (value) => {
    const data = await searchAlbumsAPI(value);
    this.setState({
      apiRequest: true,
      obj: data,
    });
  };

  render() {
    const { apiRequest, obj, btnFavorite, favorite } = this.state;
    let render = <p>Carregando...</p>;
    if (obj.length > 1) {
      render = (
        <div>
          <p>{`Resultado de álbuns de: ${favorite}`}</p>
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
        { apiRequest ? render
          : (
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do Artista"
                onChange={ this.handleSearch }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ btnFavorite }
                onClick={ () => this.fetchApi(favorite) }
              >
                Pesquisar
              </button>
            </form>
          )}
      </div>
    );
  }
}
