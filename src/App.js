import React,{useState, useEffect} from 'react'
import './App.css';
import {HashRouter as Router,Switch , Route} from 'react-router-dom';
import Login from './components/LogInWin'
import Game from './components/Game'
import Finish from './components/Finish'
function App() {

const [player,setPlayer] = useState({fullName:'',wins:0,loses:0,numberOfGames:0,cards:[],loggedIn:false});
const [deck, setDeck] = useState({success: false});

const [isLoaded, setIsLoaded] = useState(false);

useEffect(()=>{
  fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
  .then(response => response.json())
  .then(deck => {
                  setDeck(deck);
                }
        )},[])

const logPlayer = ()=>{ // logging in the player
  setPlayer((prevState) =>{
    return({...prevState, loggedIn: true,})})
  }

  const updateDeck = (newDeck)=>{
    setPlayer((prevState)=>{
      return({...prevState,cards: newDeck,})
    })
  }

  const updateName = (playerName)=>{ //update user name from imput
    setPlayer((prevState)=>{
      return({...prevState,fullName: playerName,})
    })
  }

  const updateStats = (result)=>{//function update win/lose and num of games stats
    setPlayer((prevState)=>{
      let winNum=prevState.wins+1;
      let loseNum=prevState.loses+1;
      let gameNum=prevState.numberOfGames+1;
      if(result){
      setPlayer({...prevState,wins: winNum,numberOfGames: gameNum});
      }else{
        setPlayer({...prevState,loses: loseNum,numberOfGames: gameNum});
      }
    })
  }


  return (
    <div className="App">
      <Router>
        <Switch>
        
          <Route exact path='/' component={()=><Login player={player} logPlayer={logPlayer} updateName={updateName}/>} />
          <Route exact path='/game' component={()=><Game updateStats={updateStats} deck={deck} />}/>
          <Route exact path='/finish' component={()=><Finish player={player} />}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
