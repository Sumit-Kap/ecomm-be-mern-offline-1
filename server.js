require('dotenv').config();
const express = require('express');
const config = require('./config/dbConfig'); 
const userRoute = require('./routes/userRoute');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1',userRoute);

// establish  connection with DB


config.connect();

app.get('/health', (req,res) => {
    res.json({ message: 'server up and running' });
})




app.use((req,res) => {
    res.status(req.error.status).json(req.error.message);
})

app.listen(process.env.PORT, () => {
    console.log(`listening to PORT:${process.env.PORT}`)
})