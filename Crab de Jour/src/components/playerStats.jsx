
import crabImage from '/home/olymarks/JS-Projects/Crab de Jour/src/assets/imgs/crabs/crab.png'

export default function PlayerStats({players}) {
    let caughtCrabs = players.crabs;

    return (
        <div className="playerStats-container">
            <h3>Active Player: {players.name}</h3>
            <h3>Coins: {players.coins}</h3>
            <h3>Current Modifier: {players.currentModifier}</h3>
            <h3>Crab Count: {players.crabs}</h3>

            {/* <div>
                <h2>Crab Haul</h2>
                {caughtCrabs.map((crab, index) => (
                    <img key={index} src={crabImage} alt={crab} className='playerStats-crab-img' />
                ))}
            </div> */}
        </div>
    );
}
