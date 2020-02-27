import React, { useState } from 'react';

import './App.scss';

const list = [{number:1, name:"cucumber", provider:"this", information:"on khyl"},
{number:1, name:"cucumber", provider:"this", information:"on khyl"},
{number:2, name:"cucumber", provider:"this", information:"on khyl"},
{number:3, name:"cucumber", provider:"this", information:"on khyl"},
{number:4, name:"cucumber", provider:"this", information:"on khyl"},
{number:5, name:"cucumber", provider:"this", information:"on khyl"},
{number:7, name:"cucumber", provider:"this", information:"on khyl"}]


const NavBar = () => {
  
  return (
    <>
      <div className="nav-bar">
        <nav className="nav-con">
          <Games/>
          <Betters/>
          <About/>
        </nav>
      </div>
    </>
  );
};

const MainContainer = () => {
  return (
      <div className="main-con">
        <Matches/>
        <TopLists/>

      </div>
  );
};

const App = () => (
  <div>
    <NavBar/>
    <MainContainer/>
  </div>

);


function Games() {
  return <h2>Games</h2>;
}

function Betters() {
  return <h2>Betters</h2>;
}

function About() {
  return <h2>Statistic</h2>;
}

function Matches() {
  return (
    <div className="match-list-con">
      <ul>
        {list.map((match,i) => {
          return <Match key={i} name={match.name} provider={match.provider} information={match.information}/>
        })}
      </ul>
    </div>
  )
}

function Match(props) {
  return (
    <div className="match">
      <li>
        {props.name}
      </li>
    </div>
  )
}



function TopLists() {
  return (
    <div className="top-list-con">  
      <TopBetters/>
      <TopMatches/>
    </div>
  )
}

function TopMatches() {
  return (
    <div className="top-con">
      <h4>Highest Arbitrage of Today</h4>
    </div>
  )
}

function TopBetters() {
  return (
    <div className="top-con">
      <h4>Top Bet Providers</h4>
    </div>
  )
}

export default App;
