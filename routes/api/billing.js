const express = require('express');
const router = express.Router();
const connection = require('../../dbconnect');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

router.use(cors());

var SECRET_KEY = process.env.SECRET_KEY;
var checkToken = require('./checkToken');

router.get('/', checkToken, (req, res) => {
  
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select id_task as id, title_task as title, "task" as type, billed_task as billed_status, name_client, conclusion_date_task as conclusion_date from tasks LEFT JOIN clients ON tasks.ref_id_client=clients.id_client WHERE billed_task=1 OR billed_task=2', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          totalResults.tasks = results;
        } else {
          totalResults.tasks = []
        }
      });
      connection.query('Select id_project as id, title_project as title, "project" as type, billed_project as billed_status, name_client, conclusion_date_project as conclusion_date from projects LEFT JOIN clients ON projects.ref_id_client=clients.id_client WHERE billed_project=1 OR billed_project=2', function(error, results, fields) {
        if (error) throw error;
        totalResults.projects = results;
        if (totalResults.tasks.length > 0 || totalResults.projects.length > 0) {
          res.send(totalResults)
        } else {
          res.send('nodata');
        }
      });
    }
  });
});


router.get('/:type/:id', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var id = req.params.id
      totalResults = {}
      if(req.params.type === 'task'){
        connection.query('SELECT id_task as id, title_task as title, "task" as type, name_client, billing_name_client, conclusion_date_task as conclusion_date, avatar_user, creation_date_task as creation_date, billed_task as billed_status, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS "total_hours", comment_billed_task as obs, name_user, user_billed_task as user_billed FROM tasks LEFT JOIN clients ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task LEFT JOIN users ON tasks.user_billed_task=users.id_user WHERE id_task=?', id, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) { totalResults.details = results }
        connection.query(
          'SELECT * FROM costs WHERE ref_id_task = ?', id, function (error, results, fields) {
            if (error) throwerror;
            if (results.length > 0) { totalResults.costs = results }
            res.send(totalResults)
          }
        );
      });
      } else {
        connection.query('SELECT id_project as id, title_project as title, "project" as type, comment_billed_project as obs, conclusion_date_project as conclusion_date, avatar_user, name_client, billing_name_client, name_user, billed_project as billed_status, user_billed_project as user_billed, (SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) from projects LEFT JOIN tasks ON projects.id_project=tasks.ref_id_project LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task WHERE id_project = ?) as total_hours FROM projects LEFT JOIN clients ON clients.id_client=projects.ref_id_client LEFT JOIN users ON projects.user_billed_project=users.id_user WHERE id_project=?', [id, id], function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) { totalResults.details = results }
        connection.query(
          'SELECT * FROM costs WHERE ref_id_task = ?', id, function (error, results, fields) {
            if (error) throwerror;
            if (results.length > 0) { totalResults.costs = results }
            res.send(totalResults)
          }
        );
        });
      }
      
    }
  });
});

router.put('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var id = req.body.id
      var billedStatus = req.body.billed_status
      var type = req.body.type
      if (type === 'task') {
        connection.query(
          'UPDATE tasks SET billed_task=? WHERE id_task=?',
          [billedStatus, id],
          function(error, results, fields) {
            if (error) throw error;
            res.send(results);
          }
        );
      }
      else {
        connection.query(
          'UPDATE projects SET billed_project=? WHERE id_project=?',
          [billedStatus, id],
          function(error, results, fields) {
            if (error) throw error;
            res.send(results);
          }
        );
      }
    }
  });
});

router.put('/conclude', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var approval = req.body.approval
      var billing = req.body.billing
      var obs = req.body.obs
      var taskId = req.body.taskId
      var projId = req.body.projId 
      var type = req.body.type

      if (type === 'task') {
        connection.query(
          'UPDATE tasks SET concluded_task=?, billed_task=?, comment_billed_task=? WHERE id_task=?',
          [approval, billing, obs, taskId],
          function(error, results, fields) {
            if (error) throw error;
            res.send(results);
          }
        );
      }
      else {
        connection.query(
          'UPDATE projects SET concluded_project=?, billed_project=?, comment_billed_project=? WHERE id_project=?',
          [approval, billing, obs, projId],
          function(error, results, fields) {
            if (error) throw error;
            res.send(results);
          }
        );
      }
    }
  });
});

module.exports = router;