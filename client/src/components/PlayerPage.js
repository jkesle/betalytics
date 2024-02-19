import React from 'react';
import { useParams } from 'react-router-dom';

const PlayerPage = () => {
    let { id } = useParams();

    return (
        <div>
            <h1>{/*player name here*/}</h1>
            {
                // player previous results and stats
            }
        </div>
    )
}

export default PlayerPage;