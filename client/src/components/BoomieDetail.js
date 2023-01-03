import { useState } from "react";
import Animation from "./Animation";
import Battle from "../views/Battle";


function randomString(x) {
    const characters = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let randString = '';
    for (let i = 0; i < x; i++) {
        randString += characters[Math.floor(Math.random() * characters.length)];
    }
    return randString;
}

const BoomieDetail = (props) => {
    const { boomie, setView, user } = props;
    const [detailView, setDetailView] = useState('default');
    const [room, setRoom] = useState('');
    const [randStr] = useState(randomString(5));

    return (
        <>
        

        {detailView === 'default' &&
            <div className='detailDefault'>
                <button onClick={e => setView('boomieList')} className='btn btn-link'>Close Boomie Details</button>
                <h2>{boomie.name} Details:</h2>
                <div className='d-flex gap-5'>
                    <div>
                        <p><span className='fw-bold'>Species:</span> {boomie.species}</p>
                        <p><span className='fw-bold'>Birthday:</span> {new Date(boomie.birthday).toLocaleString()}</p>
                        <p><span className='fw-bold'>Last Feeding:</span> {new Date(boomie.lastFed).toLocaleString()}</p>
                        <p><span className='fw-bold'>Strength:</span> {boomie.str}</p>
                        <p><span className='fw-bold'>Speed:</span> {boomie.spd}</p>
                        <p><span className='fw-bold'>Stamina:</span> {boomie.hp}</p>
                        <p><span className='fw-bold'>Alive:</span> {boomie.alive ? 'Yes' : 'No'}</p>
                        <div className='d-flex justify-content-center gap-3'>
                            <div>
                            <button onClick={e => {
                                        setDetailView('hostRoom');
                                    }} className='btn btn-warning my-3'>Create Battle</button>
                            <form onSubmit={(e) => {
                                        e.preventDefault();
                                        setDetailView('joinRoom');
                                    }}>
                                <button className='btn btn-warning my-3'>Join Battle:</button>
                                <input type='text' onChange={e => setRoom(e.target.value)} value={room} />
                            </form>
                            </div>
                        </div>
                    </div>
                    <Animation category={boomie.species} flipX={true} />
                </div>
            </div>
        }

        {detailView === 'joinRoom' &&
            <Battle user={user} boomie={boomie} room={room} setView={setView} />
        }

        {detailView === 'hostRoom' &&
            <Battle user={user} boomie={boomie} room={randStr} setView={setView} />
        }
        </>
    );
}

export default BoomieDetail;