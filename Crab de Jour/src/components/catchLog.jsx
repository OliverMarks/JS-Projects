


export default function CatchLog ({players}) {





return (

        
  
            <div>
             <h2>  Crab Log </h2>
            {players.catchLog.map((entry, idx) => (
             <p key={idx}>{entry}</p>
            ))}
            </div>
    

)


}