import { useState, useContext, createContext } from 'react';
import Tide from './components/tide';
import Rockpool from './components/rockpool';
import Shop from './components/shop';
import PlayerHand from './components/player-hand';
import PlayerStats from './components/playerStats';
import CatchLog from './components/catchLog' ; 
import wormImage from '/home/olymarks/JS-Projects/Crab de Jour/src/assets/imgs/bait/bait-worm.png';
import GameController from './components/gameController';

import './App.css';







function App() {




// array dis 



  const [players, setPlayers] = useState(
    {
    name : 'Oly',
    coins : 5,
    heldCards : [],
    activeCards : [],
    crabs : [],
    trash : [],
    currentModifier : 0,
    selectedPools:[],
    catchLog : [],
    activePlayer : false,
    }

    // {
    //   name : 'Jade',
    //   coins : 5,
    //   heldCards : [],
    //   activeCards : [],
    //   crabs : [],
    //   trash : [],
    //   currentModifier : 0,
    //   selectedPools:[],
    //   catchLog : [],
    //   activePlayer : false,
    //   }, 
     
   

    );

      // game state 
      // round state
      // controller component 

  const [roundNumber, setRoundNumber] = useState(1)
  const [activePools, setActivePools] = useState([1, 2, 3, 4, 5, 6])


  
  const [activePlayer, setActivePLayer] = useState(0)

  const [displayToggle, setDisplayToggle] = useState('rockpool')

  const [locked, setLocked] = useState(false)
  const [hasCaught, setHasCaught] = useState(false)
    
  
  return (
    <>
    

      {/* <h1>Crab de Jour!</h1> */}
      <div className='header-container'>
      <PlayerStats 
          players={players} />

      <div className='header-btn-container'>    
      
      <button onClick={() => setDisplayToggle('rockpool')}
      className={displayToggle === 'rockpool' ? "disabled-btn" : "active-btn"}
      >  
      See Rockpools
      </button>

      <button onClick={() => setDisplayToggle('shop')}
      className={displayToggle === 'shop' ? "disabled-btn" : "active-btn"}>  
      See Shop 
      </button>

      <GameController 
    locked = {locked}
    setLocked={setLocked}
    players={players}
    setPlayers={setPlayers}
    hasCaught={hasCaught}
    setHasCaught={setHasCaught}
    roundNumber={roundNumber}
    setRoundNumber={setRoundNumber}
    
    />
      
      </div>

   

      
      </div>
      

      <div className="container">

          <div className="center-content-container">

          <div className='catch-log-container'>
          <CatchLog
          players={players} />
          </div>

          <div className="shop-pools-container" style={{display: displayToggle === 'rockpool' ? 'block' : 'none' }}>
          <Rockpool
          players={players}
          setPlayers={setPlayers}
          activePools={activePools} 
          />

          </div>

          <div className="shop-pools-container" style={{display: displayToggle === 'shop' ? 'block' : 'none' }}>
          <Shop
          players={players}
          setPlayers={setPlayers} 
          /> 
          </div>

          <div className='footer-container'>
          
          <PlayerHand
          players={players}
          setPlayers={setPlayers} 
          />
          </div>
          
          </div>
          
          

          

          
      
      </div>
    </>
  );
}

export default App;

// class Player {
  //   constructor( name, stateChange) {
  //     //pass in the same shop to all players so they all work from the same list
  //     // this.shop = shop;
  //     //can do any other dynamic setting up of the properties you want in here
  //     this.name = name;
  //     this.stateChange = stateChange
  //   }

  //   coins = 5;
  //   name = 'crabber';
  //   heldCards = [{type: 'bait', title: 'Worm', img: wormImage, description: '+1 to your catch roll this turn', cost: 1, cardEffect: (player) => player.currentModifier++},
  //   {type: 'companion', title: 'Different Worm', img: wormImage, description: '+1 to all catch rolls', cost: 3, cardEffect: (player) => player.currentModifier++} ];
  //   activeCards = [];
  //   crabs = [];
  //   trash = [];
  //   currentModifier = 0;
  //   activePlayer = false;
    
  //   // shop;
  
    
  
  //   // buyCard(card) {
  //   //   if (card.cost <= this.coins) {
  //   //     this.coins -= card.cost;
  //   //     this.heldCards.push(card);
  //   //     this.shop.replaceCard(card);
  //   //   }
  //   // }
  
  
  //   playCard(card) {
  //     console.log(true)
  //     let index = this.heldCards.findIndex((activeCard) => activeCard.title === card.title);
  //     this.heldCards.splice(index, 1);
  //     this.activeCards.push(card);
  //     setStateChange(prevState => prevState + 1);
  //   }
  // }

//   const players = [new Player('Oly', stateChange), new Player('Jade', stateChange)];
// players[0].activePlayer = true;

 // {
    // name : 'crabber',
    // coins : 5,
    // heldCards : [{type: 'bait', title: 'Worm', img: wormImage, description: '+1 to your catch roll this turn', cost: 1, cardEffect: (player) => player.currentModifier++},
    // {type: 'companion', title: 'Different Worm', img: wormImage, description: '+1 to all catch rolls', cost: 3, cardEffect: (player) => player.currentModifier++} ],
    // activeCards : [],
    // crabs : [],
    // trash : [],
    // currentModifier : 0,
    // activePlayer : true
    // }
