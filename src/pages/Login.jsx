/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/login.css';
import trybeLogo from '../images/trybe_logo.png';

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

  saveAndRedirect = () => {
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
      <div data-testid="page-login" className="page-container">
        <form className="form-container">
          <fieldset className="group-form">
            <div className="title-container">
              <img src={ trybeLogo } alt="Logo da Trybe" />
              <h1 id="h1-trybe">Trybe</h1>
              <h2 id="h2-trybe">Tunes</h2>
            </div>
            <div className="main-form">
              <label htmlFor="login">
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="login"
                  id="login"
                  placeholder="Digite seu nome"
                  value={ login }
                  onChange={ handleChange }
                  maxLength="12"
                />
              </label>
              <button
                data-testid="login-submit-button"
                id="button"
                type="button"
                disabled={ buttonDisabled }
                onClick={ () => saveAndRedirect() }
              >
                { redirect ? <Redirect to="/search" /> : 'Entrar' }
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
