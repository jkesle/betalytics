import React, { useState, useEffect } from 'react';
import Pagination from './Pagination.jsx';

const BoxScoreTable = () => {
    const [boxScores, setBoxScores] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [filterAttribute, setFilterAttribute] = useState('playerId');
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const data = await window.api.fetchBoxscoreData();
            setBoxScores(data);
        };

        fetchData();

        const removeListener = window.api.onBoxscoreData((updates) => {
            setBoxScores(updates);
        });

        return removeListener;
    }, []);

    const filteredBoxScores = boxScores.filter(score => {
        return score[filterAttribute].toString().toLowerCase().startsWith(filterValue.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBoxScores.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <div>
                <label>
                    Items per page:
                    <select value={itemsPerPage} onChange={evt => setItemsPerPage(Number(evt.target.value))}>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </label>
                <input 
                    type="text" 
                    placeholder={`Filter by ${filterAttribute}`} 
                    value={filterValue} 
                    onChange={(e) => setFilterValue(e.target.value)} 
                />
                <div>
                    <label>
                        <input 
                            type="radio" 
                            name="filterAttribute" 
                            value="playerId" 
                            checked={filterAttribute === 'playerId'}
                            onChange={(e) => setFilterAttribute(e.target.value)}
                        /> Player ID
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="filterAttribute" 
                            value="playerName" 
                            checked={filterAttribute === 'playerName'}
                            onChange={(e) => setFilterAttribute(e.target.value)}
                        /> Player Name
                    </label>
                </div>
            </div>
            <table className='boxscore-table'>
                <thead>
                    <tr>
                        <th>Player ID</th>
                        <th>Player Name</th>
                        <th>Team</th>
                        <th>Game ID</th>
                        <th>Game Date</th>
                        <th>Matchup</th>
                        <th>Win/Lose</th>
                        <th>Points</th>
                        <th>Assists</th>
                        <th>Rebounds</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((score, index) => (
                        <tr key={index}>
                            <td>{score.playerId}</td>
                            <td>{score.playerName}</td>
                            <td>{score.team}</td>
                            <td>{score.gameId}</td>
                            <td>{score.gameDate}</td>
                            <td>{score.matchup}</td>
                            <td>{score.wl}</td>
                            <td>{score.pts}</td>
                            <td>{score.ast}</td>
                            <td>{score.reb}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredBoxScores.length}
                paginate={paginate}
                currentPate={currentPage}
            />
        </div>
    );
};

export default BoxScoreTable;