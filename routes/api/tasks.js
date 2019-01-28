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

router.get('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from tasks', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        }
      });
    }
  });
});

router.get('/:user', checkToken, (req, res) => {
  var id = req.params.user;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        "SELECT id_task, ref_id_user_task_status, title_task, user_task_status.name_user_task_status, ref_id_project from tasks INNER JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task INNER JOIN task_types on task_types.id_task_type=tasks.ref_id_type_task INNER JOIN aproval_task_status ON aproval_task_status.id_aproval_task_status=tasks.ref_id_aproval_task_status INNER JOIN user_task_status ON user_task_status.id_user_task_status=users_has_tasks.ref_id_user_task_status INNER JOIN projects ON tasks.ref_id_project=projects.id_project INNER JOIN billing_modes ON billing_modes.id_billing_mode=tasks.ref_id_billing_mode where tasks.concluded_task=0 AND users_has_tasks.ref_id_user= ?",
        id,
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            res.send(results);
          }
        }
      );
    }
  });
});

module.exports = router;
