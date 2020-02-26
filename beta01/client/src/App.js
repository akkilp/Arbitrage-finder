import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import ThemeSwitcher from 'react-bootrap/ThemeSwitcher'

import './App.css';

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">Arbitraasi kalkulaattori</strong>
        </Toast.Header>

        <Toast.Body>{children}</Toast.Body>
        <Button onClick={() => toggleShow(true)}>BEST BETS</Button>
      </Toast>

    </>
  );
};

const Markku = ({ children }) => {
  return (
    <>
      <Container>
        // CONTAINER
      </Container>
    </>
  );
};

const App = () => (
  <Container className="p-3">

    // JUMBOTRON 
    <Jumbotron>

      //HEADER 1
      <h1 className="header">HLTV torakka</h1>

      <ExampleToast className="toast">
        Nää parhaat kertoimet tuleville E-Sports peleille
      </ExampleToast>

    </Jumbotron>

    <ThemeSwitcher/>

      <Markku />
  </Container>
);

export default App;
