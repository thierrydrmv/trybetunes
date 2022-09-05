import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    obj: [],
    loading: true,
    name: '',
    email: '',
    description: '',
    image: '',
    btnOn: true,
    waitApi: false,
  };

  componentDidMount() {
    this.fetchApi();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { state } = this;
      const min = 0;
      const minLength = state.name.length > min && state.email.length > min
      && state.description.length > min && state.image.length > min;
      if (minLength) {
        this.setState({
          btnOn: false,
        });
      }
    });
  };

  handleButton = async () => {
    const { name, email, description, image } = this.props;
    this.setState({
      loading: false,
    }, async () => {
      await updateUser({ name, email, description, image });
      this.setState({
        waitApi: true,
      });
    });
  };

  redirectPage = () => {
    const { waitApi } = this.state;
    const value = <Redirect to="/profile" />;
    if (waitApi) {
      return value;
    }
  };

  fetchApi = async () => {
    const data = await getUser();
    this.setState({
      loading: false,
      obj: data,
    }, () => {
      const { obj } = this.state;
      this.setState({
        name: obj.name ? obj.name : '',
        email: obj.email ? obj.email : '',
        description: obj.description ? obj.description : '',
        image: obj.image ? obj.image : '',
      });
    });
  };

  render() {
    const { loading, name, email, description, image, btnOn } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {
          loading ? <h2>Loading...</h2> : (
            <form>
              <label htmlFor="nome">
                Nome
                <input
                  type="text"
                  name="name"
                  data-testid="edit-input-name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                E-mail
                <input
                  type="text"
                  name="email"
                  data-testid="edit-input-email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="descricao">
                Descrição
                <input
                  type="text"
                  name="description"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="image">
                Imagem
                <input
                  type="text"
                  name="image"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ btnOn }
                onClick={ this.handleButton }
              >
                Salvar
              </button>
            </form>
          )
        }
        { this.redirectPage() }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

ProfileEdit.defaultProps = {
  name: '',
  email: '',
  description: '',
  image: '',
};
