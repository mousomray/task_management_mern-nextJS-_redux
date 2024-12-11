const express = require('express'); // Import For Express
const morgan = require('morgan');
const dotenv = require('dotenv'); // For .env file 
const cors = require('cors'); // For to run different server when I run use React with node 
const connectDB = require('./app/config/db.js'); // Connect Database

dotenv.config(); // .env with config
const app = express();
connectDB()

// Morgan setup: Logs HTTP requests in 'dev' format
app.use(morgan('dev'));

app.use(express.json()); // use Express
app.use((cors())); // Use Cors 

// Task router
const taskrouter = require('./app/router/taskrouter');
app.use('/api', taskrouter)

const port = 3004
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});