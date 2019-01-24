const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config()

const clientRoutes = require('./routes/api/clients');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/clients', clientRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000;
app.listen(port, ()=>{ console.log(`Server running on Port ${port}`); })