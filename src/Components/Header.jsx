import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({ loading: true }, async () => {
      const userName = await getUser();
      this.setState({ loading: false, name: userName.name });
    });
  };

  render() {
    const { name, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ name }</p>
      </header>
    );
  }
}

export default Header;
