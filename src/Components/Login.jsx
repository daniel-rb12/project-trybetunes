import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    login: '',
    buttonDisabled: true,
    redirect: false,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.activateButton();
    });
  };

  activateButton = () => {
    const { login } = this.state;
    const minimumCharacters = 3;
    if (login.length >= minimumCharacters) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  saveAndRedirect = async () => {
    const { login } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: login });
      this.setState({ redirect: true, loading: false });
    });
  };

  render() {
    const { login, buttonDisabled, redirect, loading } = this.state;
    const { handleChange, saveAndRedirect } = this;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login">
            Name
            <input
              data-testid="login-name-input"
              type="text"
              name="login"
              id="login"
              value={ login }
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ buttonDisabled }
            onClick={ () => saveAndRedirect() }
          >
            { redirect ? <Redirect to="/search" /> : 'Entrar' }
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
