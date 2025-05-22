const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');
const summaryRoute = require('./routes/summaryRoute');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);
app.use('/summarize', summaryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
