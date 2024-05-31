
import Card from './card'
import { useEffect, useState } from 'react';


export default function PlayerHand ({players, setPlayers, locked}) {
    
    // TODO 
    // Remove active cards back down to held cards once clicked?
    // once the player has crabbed they should not be allowed to add cards to active otherwise they will lose them when going to nxt round


    const playCard = (card) => {
        // move player cards from their hand to the active card area 
        if (!locked) {
        const index = players.heldCards.findIndex((activeCard) => activeCard.title === card.title);
          const updatedHeldCards = [...players.heldCards.slice(0, index), ...players.heldCards.slice(index + 1)];
          const updatedActiveCards = [...players.activeCards, card];
          console.log(players)
          setPlayers({
            ...players,
            heldCards: updatedHeldCards,
            activeCards: updatedActiveCards
          });
        } else {
        // stop players playing cards when they have locked in
        return alert('You have locked in already') }
      };
      
     

        

        
    

    return (
       
        
        
        
        <div className="playerHand-container">

            Active Cards
            <div className='playerHand-active' style={{border: players.activeCards.length > 0 ? 'green solid 5px' : 'none' }}>
               
            {players.activeCards.map((card, idx) =>
             
             <Card 
                key={idx}
                card = {card}
                inHand = {true}
          
                />
                
                )}
                </div>

                Held Cards
                <div className='playerHand-held'>
                {players.heldCards.map((card, idx) => (
                <Card  
                onClick={() => {playCard(card)}}
                key={idx}
                card={card}
                inHand = {true}
                /> ))}

                

                
               
            </div>
            
            Crab Orders
                <div className="playerHand-orders">
                  
                  </div>
   
        </div>
        
    )
}