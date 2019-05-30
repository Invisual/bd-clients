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
  
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select id_task as id, title_task as title, "task" as type from tasks WHERE billed_task=1', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          totalResults.tasks = results;
        } else {
          totalResults.tasks = []
        }
      });
      connection.query('Select id_project as id, title_project as title, "project" as type from projects WHERE billed_project=1', function(error, results, fields) {
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
      if(req.params.type === 'task'){
        connection.query('SELECT id_task as id, title_task as title, "task" as type, name_client, creation_date_task as creation_date, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS "total_hours", comment_billed_task as obs FROM tasks LEFT JOIN clients ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task WHERE id_task=?', id, function(error, results, fields) {
        if (error) throw error;
          res.send(results);
      });
      } else {
        connection.query('SELECT id_project as id, title_project as title, "project" as type, comment_billed_project as obs, name_client, (SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) from projects LEFT JOIN tasks ON projects.id_project=tasks.ref_id_project LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task WHERE id_project = ?) as total_hours FROM projects LEFT JOIN clients ON clients.id_client=projects.ref_id_client WHERE id_project=?', [id, id], function(error, results, fields) {
          if (error) throw error;
            res.send(results);
        });
      }
      
    }
  });
});



router.get('/types', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from task_types', function(error, results, fields) {
        if (error) throw error;
          res.send(results);
      });
    }
  });
});



router.get('/status', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from user_task_status', function(error, results, fields) {
        if (error) throw error;
          res.send(results);
      });
    }
  });
});

router.get('/internalStatus', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from budget_internal_status', function(error, results, fields) {
        if (error) throw error;
          res.send(results);
      });
    }
  });
});

router.get('/externalStatus', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from budget_external_status', function(error, results, fields) {
        if (error) throw error;
          res.send(results);
      });
    }
  });
});



router.get('/positions', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from positions', function(error, results, fields) {
        if (error) throw error;
          res.send(results);
      });
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