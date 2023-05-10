

export default function GameOver () {

    const handleResetGame = () => {
        // Refresh the page to reset the game
        window.location.reload();
      };

    return (
        <dialog open>
            <div>
                <h1>Congrats you've solved the week!</h1>
                <button onClick={handleResetGame}>Play Again</button>

            </div>
        </dialog>
    )
}