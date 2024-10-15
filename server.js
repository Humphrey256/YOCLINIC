const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const api = require('./routes/api');
const myModule = require('./myModule'); // Correct path
const bodyParser = require('body-parser'); // Ensure this is installed



mongoose.connect('MONGO_URL', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});