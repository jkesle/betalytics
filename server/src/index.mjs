import express from 'express';
import updateDb from './prop-service.mjs';
const app = express();
const port = 6969;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log('Server running on port 6969');
})

setInterval(updateDb, 1800000);
