import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    name: '',
    btnOn: true,
    loading: true,
  };

  handleName = ({ target }) => {
    const minlength = 3;
    this.setState({
      name: target.value,
      btnOn: (target.value.length < minlength),
    });
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      loading: false,
    }, async () => {
      await createUser({ name });
      history.push('/search');
    });
  };

  render() {
    const { loading, btnOn } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? (
          <form>
            <input
              type="text"
              data-testid="login-name-input"
              placeholder="Nome"
              onChange={ this.handleName }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ btnOn }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        ) : (<p>Carregando...</p>)}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.arrayOf({}).isRequired,
};
