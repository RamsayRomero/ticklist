const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/ascents', require('./routes/api/ascents'));
app.use('/api/areas', require('./routes/api/areas'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
