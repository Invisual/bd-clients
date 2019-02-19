const express = require('express');
const router = express.Router();
const connection = require('../../dbconnect');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

router.use(cors());

var SECRET_KEY = process.env.SECRET_KEY;
var checkToken = require('./checkToken');

router.get('/:task', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from task_hours WHERE ref_id_tasks = ?', req.params.task, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        }
        else{
            res.send('nohours');
        }
      });
    }
  });
});


router.get('/active/:user', checkToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
      if (err) {
        //If error send Forbidden (403)
        res.sendStatus(403);
      } else {
        connection.query('SELECT id_task, title_task, beginning_hour, id_task_hour FROM tasks LEFT JOIN task_hours ON tasks.id_task=task_hours.ref_id_tasks WHERE ref_id_users = ? AND beginning_hour IS NOT NULL AND ending_hour IS NULL', req.params.user, function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            res.send(results);
          }
          else{
              res.send('nohours');
          }
        });
      }
    });
  });


router.post('/', checkToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, results) => {
      if (err) {
        //If error send Forbidden (403)
        res.sendStatus(403);
      } else {
        connection.query('INSERT INTO task_hours (beginning_hour, day, ref_id_users, ref_id_tasks) VALUES (?, ?, ?, ?)',
        [req.body.beginningHour, req.body.day, req.body.user, req.body.task], function(error, results, fields) {
          if (error) throw error;
          res.send(results);
        });
      }
    });
  });


router.put('/', checkToken, (req, res) => {
jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
    //If error send Forbidden (403)
    res.sendStatus(403);
    } else {
    connection.query('UPDATE task_hours SET ending_hour = ? WHERE id_task_hour = ?',
    [req.body.endingHour, req.body.idHour], function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
    }
});
});



module.exports = router;
