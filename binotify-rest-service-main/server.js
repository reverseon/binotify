const express = require('express');
const cors = require('cors')
const routes = require('./src/routes');
const app = express();
const port = process.env.PORT || 3000;

// cors all origins
app.use(cors());
// add file limit
app.use(express.json({limit: '50mb'}));

app.get('/', (req, res) => {
    res.send('/api to use the api');
});

app.use('/api', routes);

// static files
app.use('/song', express.static('song'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});