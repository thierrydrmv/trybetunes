import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    apiRequest: true,
    user: '',
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const data = await getUser();
    const request = data.name;
    this.setState({
      apiRequest: false,
      user: request,
    });
  };

  render() {
    const { apiRequest, user } = this.state;
    return (
      <header data-testid="header-component">
        {apiRequest ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{`Bem vindo ${user} !`}</p>}
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}
