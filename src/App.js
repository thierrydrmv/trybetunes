import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  state = {
    name: '',
    btnOn: true,
  };

  handleName = ({ target }) => {
    const minlength = 3;
    this.setState({
      name: target.value,
      btnOn: (target.value.length < minlength),
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={ Header } />
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (<Login
                { ...this.state }
                handleName={ this.handleName }
              />) }
            />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
