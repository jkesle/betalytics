import React from 'react';

const DataGrid = ({data}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Player ID</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Upcoming</th>
                </tr>
            </thead>
            <tbody>
                {data.map((player, index) => (
                    <tr key={index}>
                        <td>{player.id}</td>
                        <td>{player.firstname}</td>
                        <td>{player.pos}</td>
                        <td>{player.teamId}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DataGrid