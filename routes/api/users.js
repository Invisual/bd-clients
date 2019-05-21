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
                connection.query("Select * from users INNER JOIN positions ON users.ref_id_position = positions.id_position WHERE status_user = 1", function(error, results, fields){
                    if(err){throw err}
                    if(results.length>0){ res.send(results);}
                    else{ res.send('nodata') }
                })
            }
        })
})


router.post('/', checkToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
      var encPassword = bcrypt.hashSync(req.body.password);
      if (err) {
        //If error send Forbidden (403)
        res.sendStatus(403);
      } else {
        connection.query('INSERT INTO users (name_user, username_user, email_user, phone_user, avatar_user, password_user, status_user, ref_id_position, ref_id_role) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [req.body.name, req.body.username, req.body.email, req.body.phone, req.body.avatar, encPassword, 1, req.body.position, 1],
        function(error, results, fields) {
          if (error) throw error;
            res.send(results);
        });
      }
    });
  })


router.get('/accounts', checkToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERRO: Route Protegida');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            connection.query("Select id_user, name_user from users WHERE ref_id_position = 2", function(error, results, fields){
                if(err){throw err}
                if(results.length>0){ res.send(results);}  
            })
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


router.get('/details/:user/:start/:end', checkToken, (req, res) => {
    var user = req.params.user
    var startDate = req.params.start
    var endDate = req.params.end
    var totalResults = {}
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
        if (err) { res.sendStatus(403) }
        else{
            connection.query("SELECT * FROM users INNER JOIN positions ON users.ref_id_position = positions.id_position WHERE id_user=?", user, function(error, results, fields) {
                if (error) throw error;
                if (results.length > 0) { totalResults.details = results; }
            })
            connection.query("SELECT * FROM user_infos  WHERE ref_id_user=?", user, function(error, results, fields) {
                if (error) throw error;
                if (totalResults.details[0].id_user !== null) { totalResults.infos = results }
                else { res.send('nodata') }
            })
            connection.query("SELECT title_project, id_project, projects.ref_id_client, name_client, concluded_project, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS 'total_project_hours', GROUP_CONCAT(DISTINCT CONCAT(users.id_user,',',users.name_user,',',users.avatar_user) SEPARATOR ';') as intervenientes FROM projects LEFT JOIN tasks ON projects.id_project=tasks.ref_id_project LEFT JOIN task_hours ON tasks.id_task = task_hours.ref_id_tasks LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user LEFT JOIN clients ON projects.ref_id_client = clients.id_client WHERE ref_id_users = ? AND (day BETWEEN ? AND ?) GROUP BY id_project", [user, startDate, endDate], function(error, results, fields) {
                  if (error) throw error;
                  if (totalResults.details[0].id_user !== null) { totalResults.projects = results }
                  else { res.send('nodata') }
            })
            connection.query("SELECT id_task, title_task, ref_id_type_task, ref_id_user_task_status, id_user, ref_id_project, tasks.ref_id_client, name_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS 'total_task_hours' FROM tasks LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN task_hours ON tasks.id_task = task_hours.ref_id_tasks LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user LEFT JOIN clients ON tasks.ref_id_client = clients.id_client WHERE id_user=? AND (day BETWEEN ? AND ?) GROUP BY id_task", [user, startDate, endDate], function(error, results, fields) {
                  if (error) throw error;
                  totalResults.tasks = results;
                  if (totalResults.details[0].id_user !== null) { res.send(totalResults) }
                  else { res.send('nodata') }
            })
        }
    })
})

router.post('/info', checkToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
      if (err) {
        //If error send Forbidden (403)
        res.sendStatus(403);
      } else {
        connection.query('INSERT INTO user_infos (user_info_title, user_info_email, user_info_password, user_info_obs, ref_id_user) VALUES(?, ?, ?, ?, ?)', [req.body.infoTitle, req.body.infoEmail, req.body.infoPassword, req.body.infoObs, req.body.activeMemberId], function(error, results, fields) {
          if (error) throw error;
            res.send(results);
        });
      }
    });
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
    var encPassword = bcrypt.hashSync(req.body.password);
    connection.query("UPDATE users SET password_user = ?, reset_password_user = '' WHERE id_user = ?", [encPassword, req.body.iduser], function(error, results, fields){
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


router.put('/inactive/:user', (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
        connection.query("UPDATE users SET status_user = '0' WHERE id_user = ?", req.params.user, function(error, results, fields){
            if (error) throw error;
            res.send(results);
        })
    })
})


router.get('/:user', checkToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERRO: Route Protegida');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            connection.query("Select * from users INNER JOIN positions ON users.ref_id_position = positions.id_position WHERE status_user = 1 AND id_user = ?", req.params.user, function(error, results, fields){
                if(err){throw err}
                if(results.length>0){ res.send(results);}
                else{ res.send('nodata') }
            })
        }
    })
})



router.put('/:user', checkToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
        if(err){
            res.sendStatus(403);
        }
        else {
            if(req.body.changePassword){
                var encPassword = bcrypt.hashSync(req.body.password);
                connection.query("UPDATE users SET name_user = ?, username_user = ?, email_user = ?, phone_user = ?, avatar_user = ?, password_user = ?, ref_id_position = ? WHERE id_user = ?",
                [req.body.name, req.body.username, req.body.email, req.body.phone, req.body.avatar, encPassword, req.body.position, req.params.user],
                function(error, results, fields){
                    if(err){throw err}
                    res.send(results)  
                })
            }
            else{
                connection.query("UPDATE users SET name_user = ?, username_user = ?, email_user = ?, phone_user = ?, avatar_user = ?, ref_id_position = ? WHERE id_user = ?",
                [req.body.name, req.body.username, req.body.email, req.body.phone, req.body.avatar, req.body.position, req.params.user],
                function(error, results, fields){
                    if(err){throw err}
                    res.send(results)
                })
            }
        }
    })
})



router.delete('/:id', checkToken, (req, res) => {
    id = req.params.id;
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
      if (err) {
        //If error send Forbidden (403)
        res.sendStatus(403);
      } else {
        connection.query('UPDATE users SET status_user = 0 WHERE id_user = ?', id, function(error, results, fields) {
          if (error) throw error;
          res.send('deleted');
        });
      }
    });
  });

module.exports = router;
