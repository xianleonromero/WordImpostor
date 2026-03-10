import './GameCard.css';

const GameCard = (props) => {
    return <div className='game-card'>
        <p>Código: {props.game.codigo}</p>
        <p>Jugadores: {props.game.jugadores}</p>
    </div>
}

export default GameCard;