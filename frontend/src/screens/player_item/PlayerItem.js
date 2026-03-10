import './PlayerItem.css';

const PlayerItem = (props) => {
    return <div className='player-item'>
        <p>{props.player.username}</p>
    </div>
}

export default PlayerItem;