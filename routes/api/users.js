const express = require('express');
const router = express.Router();
const connection = require('../../dbconnect');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const nodeMailer = require('nodemailer');
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
                    if(results.length>0){ res.send(results);}  
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
            jwt.sign({user}, SECRET_KEY, (err, token)=>{
                if(err){console.log(err)}
                res.send({token: token, user: user});
            })
        }
        else{
            res.send('badpassword')
        }
        //res.send(user);
      }
      else{
          res.send('badusername')
      }
    }
  );
});


router.post('/requestpassword', (req, res) => {
    connection.query("Select * from users WHERE email_user = ?", req.body.email, function(error, results, fields){
        if (error) throw error;
        if (results.length > 0) {
           
            function makeRandomString() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
            }

            var idUser = results[0].id_user;
            var randomString = makeRandomString();

            connection.query("UPDATE users SET reset_password_user = ? WHERE id_user = ?", [randomString, idUser],  function(error, results, fields){
                if (error) throw error;
                const transporter = nodeMailer.createTransport({
                    host: 'sv01.invisual.pt',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'tarefas@invisual.pt',
                        pass: 'lausivni#tarefas'
                    }
                });
    
                const mailOptions = {
                    from: '"TAREFAS INVISUAL" <tarefas@invisual.pt>',
                    to: `${req.body.email}`,
                    subject: 'Novo Pedido de Reposição de Password',
                    html: `
                        <h4>Tarefas - Invisual</h4>
                        <br>
                        <p>Fizeste um pedido de reposição de Password?</p>
                        <p>Se sim clica no link em baixo, caso contrário ignora este email.</p>
                        <br>
                        <a href="http://localhost:3000/respasstar/${idUser}/${randomString}">Repôr Password</a>
                        `
                };
    
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.status(400).send({success: false})
                    } else {
                        res.status(200).send({success: true});
                    }
                });
            });

        }
        else{
            res.send('bademail')
        }
    })
})


router.get('/verifyrandomstring', (req, res) => {
    connection.query("Select reset_password_user from users WHERE id_user = ?", req.body.iduser, function(error, results, fields){
        if (error) throw error;
        if (results.length > 0) {
            results[0].reset_password_user === req.body.randomstring ? res.send('correctstring') : res.send('badstring')
        }
        else{
            res.send('baduser')
        }
    })
})



router.put('/changepassword', (req, res) => {
    connection.query("UPDATE users SET password_user = ? WHERE id_user = ?", [req.body.password, req.body.iduser], function(error, results, fields){
        if (error) throw error;
        res.send(results);
    })
})



router.post('/getrandomstring', (req, res) => {
    connection.query("SELECT reset_password_user FROM users WHERE id_user = ?", req.body.iduser, function(error, results, fields){
        if (error) throw error;
        if (results.length > 0) {
            results[0].reset_password_user === req.body.randomstring ? res.send(true) : res.send(false);
        }
        else{
            res.send('nostring')
        }
    })
})

module.exports = router;
