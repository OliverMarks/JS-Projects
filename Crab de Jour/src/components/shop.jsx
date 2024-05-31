import {useState, useEffect} from 'react'
import Card from './card'
// import { actionCards, baitCards, companionCards } from './card-types'
import { allCards } from './card-types'

import PlayerHand from './player-hand';





export default function Shop ( {players, setPlayers}) {

    // let actionCardsInShop = actionCards
    // let baitCardsInShop = baitCards
    // let companionCardsInShop = companionCards

    const [shop, setShop] = useState(allCards)

 
    const buyCard = (card) => {
    if (players.coins < card.cost) {
        alert('insufficient funds')
        return
    } else {
        const updatedHeldCards = [...players.heldCards, card];
        const updatedCoins = players.coins - card.cost
        setPlayers({
            ...players,
            heldCards: updatedHeldCards,
            coins: updatedCoins
          });
        const index = shop.findIndex((activeCard) => activeCard.title === card.title);
        const updatedShop = shop.filter((activeCard, idx) => idx !== index);
        setShop(updatedShop);
        
    }
 }



 // use effect 
 // if cards in shop < 9 
 // add additional cards from all cards 




        // Function to shuffle an array
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };





    return (
        
        <div className="shop-container">
            <h2>Crabbing Supply Store - Click to buy cards!</h2>
            <div className="shop-cards-container">
                
            
            {shop.map((card, idx) =>
             
             <Card 
                onClick={() => {buyCard(card)}}
                key={idx}
                card = {card}
                disabled = {false}
                />
                
                )}


            

                </div>
        </div>
    )
}



{/* {actionCardsInShop.map((card, idx) =>
             
             <Card 
               onClick={() => {buyCard(card)}}
                key={idx}
                card = {card}
                disabled = {false} // disabled ={playerHand.active && playerHand.coin > card.coin ? false : true}
                />
                
                )}


            {companionCardsInShop.map((card, idx) =>
             
             <Card 
                onClick={() => {buyCard(card)}}
                key={idx}
                card = {card}
                disabled = {false}
                // disabled ={playerHand.active && playerHand.coin > card.coin ? false : true}
                />
                
                )} */}