const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/'));

app.get('/', (req, res) => res.sendFile('index.html', {"root": __dirname + '/../client/'}));

app.listen(3000, () => console.log('Example app listening on port 3000!'));