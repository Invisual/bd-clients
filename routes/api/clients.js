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
      connection.query(
        'SELECT id_client, name_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS total_hours, monthly_hours_client FROM clients LEFT JOIN tasks ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task group by id_client',
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

router.get('/basic', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select id_client, name_client, monthly_hours_client from clients', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        }
      });
    }
  });
});



router.get('/basic/:client', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select id_client, name_client, monthly_hours_client from clients WHERE id_client = ?', req.params.client, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        }
        else{
          res.send('noclient')
        }
      });
    }
  });
});



router.get('/details/:client', checkToken, (req, res) => {

  var id = req.params.user;
  var client = req.params.client;
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('SELECT * FROM clients WHERE id_client=?', client, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          totalResults.details = results;
        }
      });
      connection.query(
        "SELECT title_project, id_project, name_client, concluded_project, SUM(CASE WHEN tasks.id_task THEN 1 ELSE 0 END) AS total_tasks, COUNT(DISTINCT(tasks.concluded_task=1)) AS concluded_tasks, SUM(case WHEN tasks.concluded_task=1 THEN 1 ELSE 0 END)/count(*) *100 AS percentage_tasks, GROUP_CONCAT(DISTINCT CONCAT(users.id_user,',',users.name_user,',',users.avatar_user) SEPARATOR ';') as intervenientes FROM projects LEFT JOIN tasks ON projects.id_project=tasks.ref_id_project LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user LEFT JOIN clients ON projects.ref_id_client = clients.id_client WHERE projects.ref_id_client=? GROUP BY id_project",
        client,
        function(error, results, fields) {
          if (error) throw error;
          if (totalResults.details[0].id_client !== null) {
            totalResults.projects = results;
          } else {
            res.send('nodata');
          }
        }
      );
      connection.query(
        'SELECT id_task, title_task, ref_id_user_task_status, id_user, avatar_user, name_user FROM tasks LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user WHERE tasks.ref_id_client=?',
        client,
        function(error, results, fields) {
          if (error) throw error;
          totalResults.tasks = results;
          if (totalResults.details[0].id_task !== null) {
            res.send(totalResults);
          } else {
            res.send('nodata');
          }
        }
      );
    }
  });
});


router.post('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('INSERT INTO clients (name_client, monthly_hours_client) VALUES (?,?)',
      [req.body.clientName, req.body.clientHours],
      function(error, results, fields) {
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
      connection.query('UPDATE clients SET name_client = ?, monthly_hours_client = ? WHERE id_client = ?',
      [req.body.clientName, req.body.clientHours, req.body.id],
      function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
  });
});

module.exports = router;
