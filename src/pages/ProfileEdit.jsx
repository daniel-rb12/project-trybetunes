import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../css/profileEdit.css';

class ProfileEdit extends Component {
  state = {
    profile: [],
    name: '',
    image: '',
    description: '',
    email: '',
    loading: false,
    disabled: true,
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    this.setState({ loading: true });
    const prof = await getUser();
    this.setState({ profile: [prof] }, () => {
      const { profile } = this.state;
      this.setState({
        name: profile[0].name,
        image: profile[0].image,
        description: profile[0].description,
        email: profile[0].email,
        loading: false });
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.activateButton();
  };

  activateButton = () => {
    const { email, name, image, description } = this.state;
    const regexEmailValidator = /\S+@\S+\.\S+/;
    const emailValidator = regexEmailValidator.test(email);

    const lengthValidator = name.length > 0 && image.length > 0 && description.length > 0;

    if (emailValidator && lengthValidator) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  userUpdate = () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    this.setState({ loading: true }, async () => {
      await updateUser({ name, email, image, description });
      history.push('/profile');
    });
  };

  render() {
    const { name, email, description, image, loading, disabled } = this.state;
    const { handleChange, userUpdate } = this;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading ? <Loading />
            : (
              <form className="edit-container">
                <div className="edit-profile">
                  <img data-testid="profile-image" src={ image } alt={ name } />
                  <label htmlFor="image">
                    <p>Foto</p>
                    <input
                      data-testid="edit-input-image"
                      type="text"
                      name="image"
                      id="image"
                      value={ image }
                      placeholder="Insira o link de sua foto"
                      onChange={ handleChange }
                    />
                  </label>
                  <label htmlFor="name">
                    <p>Nome</p>
                    <input
                      data-testid="edit-input-name"
                      type="text"
                      name="name"
                      id="name"
                      value={ name }
                      placeholder="Digite seu nome"
                      onChange={ handleChange }
                    />
                  </label>
                  <label htmlFor="email">
                    <p>Email</p>
                    <input
                      data-testid="edit-input-email"
                      type="email"
                      name="email"
                      id="email"
                      value={ email }
                      placeholder="Insira seu email"
                      onChange={ handleChange }
                    />
                  </label>
                  <label htmlFor="description">
                    <p>Descrição</p>
                    <textarea
                      data-testid="edit-input-description"
                      name="description"
                      id="description"
                      onChange={ handleChange }
                      value={ description }
                      placeholder="Escreva um pouco sobre você"
                      maxLength="150"
                    >
                      { description }
                    </textarea>
                  </label>
                  <button
                    data-testid="edit-button-save"
                    type="button"
                    onClick={ userUpdate }
                    disabled={ disabled }
                  >
                    Editar perfil
                  </button>
                </div>
              </form>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
export default ProfileEdit;
