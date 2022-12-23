import React, { Component } from 'react';
import Header from '../Components/Header';
import '../css/notFound.css';

class NotFound extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-not-found" className="not-found-container">
          <p>Página não encontrada!</p>
        </div>
      </>
    );
  }
}

export default NotFound;
