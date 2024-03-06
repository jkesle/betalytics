import express from 'express';
const proxy = express();
const PORT = process.env.PROXY_PORT;

proxy.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

proxy.get('/api/v1/nba/props/:prop', async (req, res) => {
    const {prop} = req.params;
        const response = await fetch(`${process.env.REST_API_BASEURL}${prop}`);
        const html = await response.text();
        const dataScript = html.split('\n').join('').split("const pbcsData = ")[1].split("\"utc\"");
        const json = (() => eval?.(`"use strict"; const x = ${dataScript[0]} "utc"${dataScript[1].split(',')[0]}}; x;`))();
        res.send(json);
});

proxy.listen(PORT, () => {
    console.log(`Proxy listening on port: ${PORT}`);
});