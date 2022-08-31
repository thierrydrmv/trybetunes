import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  render() {
    const { btnFavorite, handleSearch } = this.props;
    return (
      <div data-testid="page-search">
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            onChange={ handleSearch }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ btnFavorite }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  btnFavorite: PropTypes.bool.isRequired,
};
