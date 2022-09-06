import React, { Component } from 'react';
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
  };

  componentDidMount() {
    this.fetchApi();
    this.validate();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validate());
  };

  validate = () => {
    const { state } = this;
    const min = 0;
    const minLength = state.name.length > min
&& state.description.length > min && state.image.length > min;
    const emailValid = /\S+@\S+\.\S+/.test(state.email);
    if (minLength && emailValid) {
      this.setState({
        btnOn: false,
      });
    } else {
      this.setState({
        btnOn: true,
      });
    }
  };

  handleButton = async () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await updateUser({ name, email, description, image });
    history.push('/profile');
  };

  fetchApi = async () => {
    const data = await getUser();
    this.setState({
      loading: false,
      obj: data,
    }, () => this.getPerfilData());
  };

  getPerfilData = () => {
    const { obj } = this.state;
    this.setState({
      name: obj.name ? obj.name : '',
      email: obj.email ? obj.email : '',
      description: obj.description ? obj.description : '',
      image: obj.image ? obj.image : '',
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
                Editar perfil
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.arrayOf({}).isRequired,
};
