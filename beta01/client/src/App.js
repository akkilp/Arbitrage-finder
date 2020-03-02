import React, { useState, useEffect} from 'react';
import axios from 'axios'
import './App.scss';





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

// REACT ROUTER NÄILLE -->
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

function fetchData(){
  console.log('fetchData function executed')
  axios.get('http://localhost:3500/matches')
       .then(response => {
        console.log(response.data)
        setMatches(response.data.matchData)
      }
  )
}

  useEffect(() => {
    console.log("Component did mount")
    fetchData()
    },[]);

  const [matches, setMatches] = useState(null);

  return (
    <div className="match-list-con">
      <ul>
        {matches ? (
          matches.map((match,i) => {
            return (
              <Match 
              key={i}
              time={match.date}
              event={match.event}
              arbitrage={match.arbitrage}
              />
            )
          })
        )
        : null
        }
      </ul>
    </div>
  )
}

function Match(props) {
  return (
    <table className="match">
        <tr>
          <th>{props.time}</th>
          <th>{props.event}</th>
          <th>{props.arbitrage}</th>
        </tr>
    </table>
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
