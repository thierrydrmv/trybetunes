import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    loading: true,
    waitApi: false,
  };

  handleChange = async () => {
    const { name } = this.props;
    this.setState({
      loading: false,
    }, async () => {
      await createUser({ name });
      this.setState({
        waitApi: true,
      });
    });
  };

  redirectPage = () => {
    const { waitApi } = this.state;
    const value = <Redirect to="/search" />;
    if (waitApi) {
      return value;
    }
  };

  render() {
    const { handleName, btnOn } = this.props;
    const { loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? (
          <form>
            <input
              type="text"
              data-testid="login-name-input"
              placeholder="Nome"
              onChange={ handleName }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ btnOn }
              onClick={ this.handleChange }
            >
              Entrar
            </button>
          </form>
        ) : (<p>Carregando...</p>)}
        { this.redirectPage() }
      </div>
    );
  }
}

Login.propTypes = {
  handleName: PropTypes.func.isRequired,
  btnOn: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
