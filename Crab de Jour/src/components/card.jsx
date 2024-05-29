






export default function Card ({card, onClick, inHand}) {
    const cardTypeClass = `card-type card-type-${card.type.toLowerCase()}`;
   
//    const changeLocation = (card) => {
//         if (disabled) {
//             return
//         }

//         let currentLocation = card.location
//         // find idex(name), splice index etc
//         // set$'currentLocation'array(prev => ...prev, card)
//          if (card.location === 'hand') {
//             console.log('triggered')
//              card.location = 'activeHand' 
                
//             } else {
//             card.location = 'hand'
//             }
//             console.log(card.location)
//         // push to appropriate card.location array
//         // set$'playerHand.active/hand'array(prev => ...prev, card)

//     }
const handleClick = () => {
    onClick(card); // Call the onClick callback with the card as argument
  };


    return (

        <div className="card" onClick={handleClick}> 
            
            <h3 className={cardTypeClass}>{card.type}</h3>
            <h1 className="card-title">{card.title}</h1>
            <img className="card-image" src={card.img} alt={card.title}  />
            <p className="card-description">{card.description}</p>
            {!inHand ? 
            <p className="card-cost">{card.cost}</p> : null }
        
        </div>
    )
}