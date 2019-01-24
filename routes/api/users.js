const express = require('express');
const router = express.Router();
const connection = require('../../dbconnect');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
require('dotenv').config();

router.use(cors());

var SECRET_KEY = process.env.SECRET_KEY;
var checkToken = require('./checkToken')


router.get('/', checkToken, (req, res) => {
        jwt.verify(req.token, SECRET_KEY, (err, results) => {
            if(err){
                //If error send Forbidden (403)
                console.log('ERRO: Route Protegida');
                res.sendStatus(403);
            } else {
                //If token is successfully verified, we can send the autorized data 
                connection.query("Select * from users INNER JOIN positions ON users.ref_id_position = positions.id_position", function(error, results, fields){
                    if(err){throw err}
                    if(results.length>0){ res.send(results); }  
                })
                console.log('SUCCESSO: Conectado a Route Protegida');
            }
        })
})







router.post('/login', (req, res) => {
  connection.query( "Select * from users INNER JOIN positions ON users.ref_id_position = positions.id_position WHERE username_user = ?", req.body.username, function(error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        var user = results[0];
        if(bcrypt.compareSync(req.body.password, user.password_user)){
            jwt.sign({user}, SECRET_KEY, {expiresIn: '8h'}, (err, token)=>{
                if(err){console.log(err)}
                res.send(token)
            })
        }
        else{
            res.send('Wrong Password')
        }
        //res.send(user);
      }
      else{
          res.send('User does not exist')
      }
    }
  );
});


module.exports = router;
