//Executamos um docker inspect 

'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let app = express();
let port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', (req, res) => {
    res.send('<h1>Working...</h1>');
})

app.get('/:container', (req, res) => {
    let container = req.params.container;
    let fileName = `./${container}.json`;
    fs.readFile(fileName, 'utf8', (err, content) => {
       if(err)
            res.status(500).json({ error : 'fudeu'});

        let obj = JSON.parse(content);
        let ips = obj.map(item => item.NetworkSettings.IPAddress);
        
        res.status(200).json({ container, ips }); 
    });
});

app.listen(4000, () => {
    console.log(`Listening in ${port}`);
})