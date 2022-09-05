import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: true,
    profileData: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const data = await getUser();
    console.log(data);
    this.setState({
      loading: false,
      profileData: data,
    });
  };

  render() {
    const { loading, profileData } = this.state;
    return (
      <div data-testid="page-profile">
        {
          loading ? <h2>Loading...</h2> : (
            <div>
              <button type="button">
                <Link to="/profile/edit"><p>Editar perfil</p></Link>
              </button>
              <div>
                <h2>Nome</h2>
                <p>{profileData.name}</p>
              </div>
              <div>
                <h2>Email</h2>
                <p>{profileData.email}</p>
              </div>
              <div>
                <h2>Descrição</h2>
                <p>{profileData.description}</p>
              </div>
              <div>
                <img
                  data-testid="profile-image"
                  src={ profileData.image }
                  alt="Profile"
                />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
