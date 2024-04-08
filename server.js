require('dotenv').config();
const express = require('express');
const config = require('./config/dbConfig'); 
const userRoute = require('./routes/userRoute');
const googleRoutes = require("./routes/googleRoutes");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(req);
    next();
})
app.use("/api/v1/user/google", googleRoutes);
app.use('/api/v1/user', userRoute);

// establish  connection with DB


config.connect();

app.get('/health', (req,res) => {
    res.json({ message: 'server up and running' });
})




// app.use((req, res) => {
//     res.status(req?.appError?.status).json(req?.appError?.message);
// })

app.listen(process.env.PORT, () => {
    console.log(`listening to PORT:${process.env.PORT}`)
})