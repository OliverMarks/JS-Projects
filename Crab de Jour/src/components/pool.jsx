

export default function Pool ({onClick, pool, className}) {

    const handleClick = () => {
        onClick(pool); // Call the onClick callback with the card as argument
      };

    return (
        <div className={className} onClick={handleClick}>
        
            
            {pool}
        </div>
    )
}