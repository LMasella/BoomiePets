import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Animation from "../components/Animation";


const Battle = (props) => {
    const { user, boomie, room, setView } = props;

    const [socket] = useState(() => io(':8000'));
    const [gameState, setGameState] = useState({});

    useEffect(() => {
        console.log("Battle useEffect running");
        socket.emit('join-room', user.username, boomie, room);

        socket.on('update-game-state', (state) => {
            console.log('receiving message?');
            console.log(state);
            setGameState(state);
        });

        return () => {
            socket.off('update-game-state');
            socket.disconnect();
        }


    }, []);

    return (
        <>
            <button className='btn btn-link' onClick={e => setView('none')}>Leave Battle</button>
            <h1 className='text-center'>Battle!</h1>
            <h3 className='text-center'>Room Name: {room}</h3>
            <div className='d-flex justify-content-around mt-4'>
                {gameState.p1 ?
                    <div className='d-flex'>
                        <div>
                            <h3>Player 1: <span style={{color: 'deeppink'}}>{gameState.p1.username}</span></h3>
                            <p>Boomie Name: {gameState.p1.boomie.name}</p>
                            <p>Boomie Species: {gameState.p1.boomie.species}</p>
                            <p>Boomie Strength: {gameState.p1.boomie.str}</p>
                        </div>
                        <div className='d-flex align-items-end justify-content-around'>
                            <div className='col-6'><Animation category={gameState.p1.boomie.species} scale={50} /></div>
                            {gameState.p2 && <div><Animation category={gameState.p2.boomie.species} flipX={true} scale={50} /></div>}
                        </div>
                    </div>
                :
                    <div>
                        <h3>Player 1: Loading...</h3>
                    </div>
                }

                {gameState.p2 ?
                    <div>
                        <h3>Player 2: <span style={{color: 'indigo'}}>{gameState.p2.username}</span></h3>
                        <p>Boomie Name: {gameState.p2.boomie.name}</p>
                        <p>Boomie Species: {gameState.p2.boomie.species}</p>
                        <p>Boomie Strength: {gameState.p2.boomie.str}</p>
                    </div>
                :
                    <div>
                        <h3>Player 2: Loading...</h3>
                    </div>
                }
            </div>
                
        </>
    )
}

export default Battle;


// <Animation category={boomie.species} />