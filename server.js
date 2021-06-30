const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config()

const usersRoutes = require('./routes/api/users');
const clientRoutes = require('./routes/api/clients');
const miscRoutes = require('./routes/api/misc');

const app = express();
const server = http.createServer(app);


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/users', usersRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/misc', miscRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000;
server.listen(port, ()=>{ console.log(`Server running on Port ${port}`); })
