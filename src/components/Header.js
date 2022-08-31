import React, { Component } from 'react';
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
          : <p data-testid="header-user-name">{ user }</p>}
      </header>
    );
  }
}
