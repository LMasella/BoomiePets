import { useState } from "react";

const NewBoomie = (props) => {
    const { handleSubmit } = props;
    const [formData, setFormData] = useState({
        name: '',
        species: 'Dino'
    });

    const makeBoomieData = (data) => {
        // const speciesArray = ['Dino', 'Zomgurl', 'Robo', 'Jacko', 'Kitkit', 'Fufudoggy', 'Zomboi'];
        // let randomNum = Math.floor(Math.random() * speciesArray.length);
        // let randomSpecies = speciesArray[randomNum];

        const newBoomie = {
            name: data.name,
            species: data.species,
            alive: true,
            str: 0,
            spd: 0,
            hp: 0,
            hunger: 0,
            birthday: Date.now(),
            lastFed: Date.now(),
            lifespan: 1000
        }

        return newBoomie;
    }

    return (
        <div className='border border-dark p-3'>
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit(makeBoomieData(formData));}
            }>
                <div>
                    <h3>Create New Boomie:</h3>
                    <div className='row g-3 align-items-center'>
                        <div className='col-3'>
                            <label htmlFor='name'>Name:</label>
                        </div>
                        <div className='col-auto'>
                            <input onChange={e => setFormData({...formData, name: e.target.value})} className='form-control' type='text' id='name' name='name' value={formData.name} size='40' />
                        </div>
                    </div>
                    <div className='row g-3 align-items-center'>
                        <div className='col-3'>
                            <label htmlFor='species'>Species:</label>
                        </div>
                        <div className='col-auto'>
                            <select onChange={(e) => setFormData({...formData, species: e.target.value})}
                                name="species" id="species" className="form-select" value={formData.species}>
                                <option value="Dino">Dino</option>
                                <option value="Fufudoggy">Fufudoggy</option>
                                <option value="Jacko">Jacko</option>
                                <option value="Kitkit">Kitkit</option>
                                <option value="Robo">Robo</option>
                                <option value="Zomboi">Zomboi</option>
                                <option value="Zomgurl">Zomgurl</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row g-3 align-items-center mt-3'>
                        <input className='btn btn-success' style={{width: '22.5em'}} type='submit' />
                </div>  
            </form>
        </div>
    )
}

export default NewBoomie;