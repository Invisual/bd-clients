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

router.post('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'INSERT INTO tasks (title_task, description_task, deadline_date_task, ref_id_client, ref_id_billing_mode, ref_id_project, ref_id_type_task, ref_id_user_account ) VALUES (?,?,?,?,?,?,?,?)',
        [
          req.body.title,
          req.body.description,
          req.body.deadline,
          req.body.client,
          req.body.billing,
          req.body.project,
          req.body.type,
          req.body.account
        ],
        function(error, results, fields) {
          if (error) throw error;
          connection.query(
            'INSERT INTO users_has_tasks (ref_id_user, ref_id_task, ref_id_user_task_status ) VALUES (?,?,?)',
            [req.body.user, results.insertId, 1],
            function(error, results2, fields) {
              if (error) throw error;
            }
          );
          console.log(req.body.deadline);
          res.send(results);
        }
      );
    }
  });
});

router.post('/:id', checkToken, (req, res) => {
  id = req.params.id;
  user = req.params.user;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'CREATE TEMPORARY TABLE tmptable SELECT * FROM tasks WHERE id_task = ?; UPDATE tmptable SET id_task = NULL; INSERT INTO tasks SELECT * FROM tmptable; DROP TEMPORARY TABLE IF EXISTS tmptable;', id,
        function(error, results, fields) {
          if (error) throw error;
          connection.query(
            'CREATE TEMPORARY TABLE tmptable_1 SELECT * FROM users_has_tasks WHERE ref_id_task = ?; UPDATE tmptable_1 SET ref_id_task = ?; INSERT INTO users_has_tasks SELECT * FROM tmptable_1; DROP TEMPORARY TABLE IF EXISTS tmptable_1;',
            [id, results[2].insertId],
            function(error, results2, fields) {
              if (error) throw error;
            }
          );
          res.send(results);
        }
      );
    }
  });
});

router.put('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'UPDATE tasks SET title_task = ?, description_task = ?, deadline_date_task = ?, ref_id_client = ?, ref_id_billing_mode = ?, ref_id_project = ?, ref_id_type_task = ?, ref_id_user_account = ? WHERE id_task = ?',
        [
          req.body.title,
          req.body.description,
          req.body.deadline,
          req.body.client,
          req.body.billing,
          req.body.project,
          req.body.type,
          req.body.account,
          req.body.id
        ],
        function(error, results, fields) {
          if (error) throw error;
          if (req.body.changeUser) {
            connection.query(
              'DELETE FROM users_has_tasks WHERE ref_id_user = ? AND ref_id_task = ?',
              [req.body.oldUser, req.body.id],
              function(error, results2, fields) {
                if (error) throw error;
                connection.query(
                  'INSERT INTO users_has_tasks (ref_id_user, ref_id_task, ref_id_user_task_status ) VALUES (?,?,?)',
                  [req.body.user, req.body.id, 1],
                  function(error, results3, fields) {
                    if (error) throw error;
                  }
                );
              }
            );
          }
          res.send(results);
        }
      );
    }
  });
});

router.delete('/:id', checkToken, (req, res) => {
  id = req.params.id;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('DELETE FROM tasks WHERE id_task=?', id, function(error, results, fields) {
        if (error) throw error;
        res.send('deleted');
      });
    }
  });
});

router.put('/userTaskStatus', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var status = req.body.status;
      var task = req.body.task;
      var user = req.body.user;

      connection.query(
        'UPDATE users_has_tasks SET ref_id_user_task_status=? WHERE ref_id_task=? AND ref_id_user=?',
        [status, task, user],
        function(error, results, fields) {
          if (error) throw error;
          res.send({ message: status });
        }
      );
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
        'SELECT id_task, ref_id_user_task_status, title_task, user_task_status.name_user_task_status, ref_id_project, users_has_tasks.order from tasks LEFT JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task LEFT JOIN task_types on task_types.id_task_type=tasks.ref_id_type_task LEFT JOIN aproval_task_status ON aproval_task_status.id_aproval_task_status=tasks.ref_id_aproval_task_status LEFT JOIN user_task_status ON user_task_status.id_user_task_status=users_has_tasks.ref_id_user_task_status LEFT JOIN projects ON tasks.ref_id_project=projects.id_project LEFT JOIN billing_modes ON billing_modes.id_billing_mode=tasks.ref_id_billing_mode where tasks.concluded_task=0 AND users_has_tasks.ref_id_user= ? ORDER by users_has_tasks.order DESC, tasks.id_task ASC',
        id,
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            res.send(results);
          } else {
            res.send('nodata');
          }
        }
      );
    }
  });
});

router.get('/comments/:task', checkToken, (req, res) => {
  var task = req.params.task;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'SELECT id_task_comment, text_comments, date_comment, name_user from task_comments INNER JOIN users ON task_comments.ref_id_user=users.id_user WHERE ref_id_task= ?',
        task,
        function(error, results, fields) {
          if (error) throw error;
          res.send(results);
        }
      );
    }
  });
});

router.post('/comments/:task', checkToken, (req, res) => {
  var task = req.params.task;
  var comment = {
    text_comments: req.body.text_comment,
    ref_id_user: req.body.id_user,
    ref_id_task: task
  };
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('INSERT INTO task_comments SET ?', comment, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
  });
});

router.get('/link/:task', checkToken, (req, res) => {
  var task = req.params.task;
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'SELECT id_task, avatar_user, title_task, creation_date_task, title_project, ref_id_project, name_client, name_task_types, name_billing_mode, description_task,SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS "total_hours" from tasks LEFT JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task LEFT JOIN task_types on task_types.id_task_type=tasks.ref_id_type_task LEFT JOIN aproval_task_status ON aproval_task_status.id_aproval_task_status=tasks.ref_id_aproval_task_status LEFT JOIN user_task_status ON user_task_status.id_user_task_status=users_has_tasks.ref_id_user_task_status LEFT JOIN projects ON tasks.ref_id_project=projects.id_project LEFT JOIN billing_modes ON billing_modes.id_billing_mode=tasks.ref_id_billing_mode LEFT JOIN clients ON clients.id_client=tasks.ref_id_client LEFT JOIN users ON users.id_user=projects.ref_id_user_account LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task where tasks.id_task=?',
        task,
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.details = results;
          }
        }
      );
      connection.query(
        'SELECT id_task_comment, text_comments, date_comment, name_user from task_comments INNER JOIN users ON task_comments.ref_id_user=users.id_user WHERE ref_id_task= ?',
        task,
        function(error, results, fields) {
          if (error) throw error;
          totalResults.comments = results;
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

router.get('/basic/:task', checkToken, (req, res) => {
  var task = req.params.task;
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'SELECT * FROM tasks INNER JOIN users_has_tasks ON tasks.id_task = users_has_tasks.ref_id_task WHERE id_task=?',
        task,
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            res.send(results);
          } else {
            res.send('notask');
          }
        }
      );
    }
  });
});

router.get('/:user/:task', checkToken, (req, res) => {
  var id = req.params.user;
  var task = req.params.task;
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'SELECT id_task, avatar_user, title_task, creation_date_task, title_project, ref_id_project, name_client, name_task_types, name_billing_mode, description_task,SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS "total_hours" from tasks LEFT JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task LEFT JOIN task_types on task_types.id_task_type=tasks.ref_id_type_task LEFT JOIN aproval_task_status ON aproval_task_status.id_aproval_task_status=tasks.ref_id_aproval_task_status LEFT JOIN user_task_status ON user_task_status.id_user_task_status=users_has_tasks.ref_id_user_task_status LEFT JOIN projects ON tasks.ref_id_project=projects.id_project LEFT JOIN billing_modes ON billing_modes.id_billing_mode=tasks.ref_id_billing_mode LEFT JOIN clients ON clients.id_client=tasks.ref_id_client LEFT JOIN users ON users.id_user=projects.ref_id_user_account LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task where users_has_tasks.ref_id_user=? AND tasks.id_task=?',
        [id, task],
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.details = results;
          }
        }
      );
      connection.query(
        'SELECT id_task_comment, text_comments, date_comment, name_user from task_comments INNER JOIN users ON task_comments.ref_id_user=users.id_user WHERE ref_id_task= ?',
        task,
        function(error, results, fields) {
          if (error) throw error;
          totalResults.comments = results;
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

//SELECT text_comments, date_comment, name_user from task_comments INNER JOIN users ON task_comments.ref_id_user=users.id_user WHERE ref_id_task=3

// SELECT avatar_user, title_task, creation_date_task, title_project, name_client, name_task_types, name_billing_mode, description_task, text_comments, date_comment, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS '' from tasks LEFT JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task LEFT JOIN task_types on task_types.id_task_type=tasks.ref_id_type_task LEFT JOIN aproval_task_status ON aproval_task_status.id_aproval_task_status=tasks.ref_id_aproval_task_status LEFT JOIN user_task_status ON user_task_status.id_user_task_status=users_has_tasks.ref_id_user_task_status LEFT JOIN projects ON tasks.ref_id_project=projects.id_project LEFT JOIN billing_modes ON billing_modes.id_billing_mode=tasks.ref_id_billing_mode LEFT JOIN clients ON clients.id_client=tasks.ref_id_client LEFT JOIN users ON users.id_user=projects.ref_id_user LEFT JOIN task_comments on task_comments.ref_id_task=tasks.id_task LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task where tasks.concluded_task=0 AND users_has_tasks.ref_id_user=2 AND tasks.id_task=3
module.exports = router;
