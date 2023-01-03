import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NewBoomie from "../components/NewBoomie";
import Animation from "../components/Animation";
import BoomieList from "../components/BoomieList";
import BoomieDetail from "../components/BoomieDetail";

const Main = (props) => {
    const userId = localStorage.getItem('bpuid');
    const [loggedIn, setLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [activeBoomie, setActiveBoomie] = useState(false);
    const [needNewBoomie, setNeedNewBoomie] = useState(false); // ----- make this into a view?
    const [time, setTime] = useState(new Date().toLocaleString());
    const [view, setView] = useState('none');
    const [boomieDetailIdx, setBoomieDetailIdx] = useState(0); // ----- gotta be a better way to pass this from the detail page?
    const [age, setAge] = useState('');
    const [buttonsEnabled, setButtonsEnabled] = useState(true);

    const navigate = useNavigate();

    const handleDeath = () => {
        alert('your boomie about to die lol');
        let boomiesCopy = user.boomies;
        boomiesCopy[boomiesCopy.length - 1] = {...activeBoomie, alive: false};
        axios.put(`http://localhost:8000/api/users/${userId}`, {...user, boomies: boomiesCopy})
        .then(res => { 
                const tempData = res.data;
                setTimeout((res) => {
                    setButtonsEnabled(true);
                    setAge(0);
                    setActiveBoomie(false);
                    setUser(tempData);
            }, 5000);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        console.log('main useEffect --');
        console.log('user:', user);

        if (!user._id) { // if there is no user we will fetch it but if someone navigates away from page it should persist them
            console.log('fetching user data...');
            axios.get(`http://localhost:8000/api/users/${userId}`, {withCredentials: true})
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.log(err)
                    setLoggedIn(false);
                });
        }

            // if there isn't an active boomie and there is a user loaded we set the active boomie to the last one in the boomie array if its alive
        if (!activeBoomie && user._id) {
            if (user.boomies.length > 0 && user.boomies[user.boomies.length - 1].alive === true) {
                let newActiveBoomie = {...user.boomies[user.boomies.length - 1]};
                setActiveBoomie(newActiveBoomie);
            }
            else {
                setNeedNewBoomie(true);
            }
        }

        const myInterval = setInterval(() => { // one second tick interval
            setTime(new Date().toLocaleTimeString());
            let newAge = Date.now() - new Date(activeBoomie.birthday);
            let secs = Math.floor(newAge / 1000);
            activeBoomie.birthday && setAge(`${secs} secs`);

            // REACTIVATE DEATH WHEN DONE DEBUGGING

            if (activeBoomie) {
                if (Date.now() - new Date(activeBoomie.birthday) > 60000) {
                    setButtonsEnabled(false);
                    clearInterval(myInterval);
                    handleDeath();
                }
            }
        }, 1000);

        return () => {
            clearInterval(myInterval);
        };
        
    }, [userId, user, activeBoomie]);

    const logout = () => {
        axios.get('http://localhost:8000/api/users/logout', {withCredentials: true})
            .then(res => {
                console.log(res);
                localStorage.removeItem('bpuid');
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    const createNewBoomie = (newBoomie) => {
        axios.put(`http://localhost:8000/api/users/${userId}`, {...user, boomies: [...user.boomies, newBoomie
            ]})
            .then(res => {
                setUser(res.data);
                setActiveBoomie(res.data.boomies[res.data.boomies.length - 1]);
                setNeedNewBoomie(false);
            })
            .catch(err => console.error(err));
    }

    const handleFeed = () => {
        let boomiesCopy = user.boomies;
        boomiesCopy[boomiesCopy.length - 1] = {...activeBoomie, lastFed: Date.now()};
        axios.put(`http://localhost:8000/api/users/${userId}`, {...user, boomies: boomiesCopy})
            .then(res => {
                setUser(res.data);
                setActiveBoomie(res.data.boomies[res.data.boomies.length - 1]);
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='container my-4'>
            {loggedIn ?
                <>
                    <nav className='d-flex justify-content-between'>
                        <p>Current Time: {time}</p>
                        <div>
                        {user._id &&
                            <>
                            <p style={{marginBottom: '0'}}>Logged in as <span style={{color:'green'}}>{user.username}</span>.</p>
                            <div className='d-flex justify-content-end'>
                                <button onClick={e => logout()} className='mb-3 btn btn-link'>Logout</button>
                            </div>
                            </>
                        }
                        </div>
                    </nav>
            {view === 'none' &&
                <>
                    {activeBoomie &&
                        <>
                            <div className='d-flex gap-5'>
                                <div className='p-3'>
                                    <h3>Active Boomie: <span className='fw-bold'>{activeBoomie.name}</span></h3>
                                    <div className='p-3'>
                                        <p><span className='fw-bold'>Species:</span> {activeBoomie.species}</p>
                                        <p><span className='fw-bold'>Birthday:</span> {new Date(activeBoomie.birthday).toLocaleString()}</p>
                                        <p><span className='fw-bold'>Last Fed:</span> {new Date(activeBoomie.lastFed).toLocaleString()}</p>
                                        <p><span className='fw-bold'>Age:</span> {age}</p>
                                    </div>
                                </div>
                                <Animation category={activeBoomie.species} flipX={true} />
                            </div>
                            {Date.now() - activeBoomie.lastFed > 10000 ?
                                <h1 className='text-right'>I'M <span style={{color: 'red'}}>HUNGRY!!!!</span></h1> : <h3>we chillin...</h3>
                            }
                            <div className='mb-2'>
                                {buttonsEnabled ?
                                    <button onClick={e => handleFeed()} className='btn btn-success'>Feed {activeBoomie.name}</button>
                                    :
                                    <button className='btn btn-success' disabled>Feed {activeBoomie.name}</button>
                                }
                            </div>
                        </>
                    }
                    {needNewBoomie &&
                        <NewBoomie handleSubmit={createNewBoomie} />
                    }
                        <button onClick={e => setView('boomieList')} className='btn btn-primary'>See Boomie List</button>
                </>
            }
                    {view === 'boomieList' &&
                        <BoomieList boomies={user.boomies} setView={setView} setBoomieDetailIdx={setBoomieDetailIdx} />
                    }
                    {view === 'boomieDetail' &&
                        <BoomieDetail boomie={user.boomies[boomieDetailIdx]} setView={setView} user={user} />
                    }
                </>

            :

                <>
                    <p>You are not logged in!</p>
                    <Link to='/'>Login</Link> or <Link to='/register'>Register</Link>
                </>
            }
        </div>
    );
}

export default Main;