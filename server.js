require('dotenv').config();
const express = require('express');
const app = express();


app.get('/health', (req,res) => {
    res.json({ message: 'server up and running' });
})



app.listen(process.env.PORT, () => {
    console.log(`listening to PORT:${process.env.PORT}`)
})