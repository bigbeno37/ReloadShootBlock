const express = require('express');
const app = express();

app.get('/', (req, res) => res.sendFile('client/index.html'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));