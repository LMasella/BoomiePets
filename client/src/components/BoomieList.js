
const BoomieList = (props) => {
    const { boomies, setView, setBoomieDetailIdx } = props;

    return (
        <>
            <button onClick={e => setView('none')} className='btn btn-link'>Close Boomie List</button>
            <table className='table table-striped table-bordered myTable'>
                <thead className='table-dark'>
                    <tr>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {boomies.filter((boomie, i) => {
                        boomie.boomieIndex = i;
                        return true //boomie.species === "Dino";
                    }).map((filteredBoomie, j) => {
                        return (
                            <tr key={j}>
                                <td><span onClick={e => {
                                    setBoomieDetailIdx(filteredBoomie.boomieIndex);
                                    setView('boomieDetail');
                                }}className='btn btn-link'>{filteredBoomie.name}</span></td>
                                <td>{filteredBoomie.species}</td>
                                <td>
                                    {new Date(filteredBoomie.birthday).toLocaleString()}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default BoomieList;