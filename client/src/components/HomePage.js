import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import DataGrid from './DataGrid';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [playersData, setPlayersData] = useState([]);
    const history = useHistory();

    const handleSearch = event => {
        event.preventDefault();
        history.push(`/player/${searchTerm}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/v1/props/player?id='); // pick a different endpoint
            }
        }
    })

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type='text' placeholder='Search by player name or team' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                <button type='submit'>Search</button>
            </form>
            {
                // data grid
            }
        </div>
    )
}

export default HomePage;