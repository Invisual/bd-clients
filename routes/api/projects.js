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
      connection.query('Select * from projects', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        }
      });
    }
  });
});


router.get('/basic', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select id_project, title_project, ref_id_client, ref_id_billing_mode from projects', function(error, results, fields) {
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
      connection.query('INSERT INTO projects (title_project, briefing_project, deadline_project, ref_id_billing_mode, ref_id_client, ref_id_user_account) VALUES (?, ?, ?, ?, ?, ?)',
        [req.body.title, req.body.briefing, req.body.deadline, req.body.billing, req.body.client, req.body.account],
        function(error, results, fields) {
        if (error) throw error;
          for(var i=0, count=req.body.categories.length; i<count; i++){
            connection.query('INSERT INTO projects_has_categories (ref_id_project, ref_id_category) VALUES (?,?)', [results.insertId, req.body.categories[i]],
            function(error, results2, fields){
              if (error) throw error;
            })
          }
          res.send(results)
      });
    }
  });
})

router.delete('/:id', checkToken, (req, res) => {
  id = req.params.id;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('DELETE FROM projects WHERE id_project=?', id, function(error, results, fields) {
        if (error) throw error;
        res.send('deleted');
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
        //"SELECT *, group_concat(DISTINCT users_has_tasks.ref_id_user SEPARATOR ',') as 'intervenientes' from tasks INNER JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task INNER JOIN projects ON tasks.ref_id_project=projects.id_project group by projects.id_project HAVING  FIND_IN_SET( ? , intervenientes)",

        "SELECT title_project, id_client, name_client, id_project, creation_date_project, group_concat(DISTINCT projects_has_categories.ref_id_category SEPARATOR ',') as 'categories', projects.ref_id_billing_mode, concluded_project, projects.ref_id_user_account, SUM(CASE WHEN tasks.id_task THEN 1 ELSE 0 END) AS total_tasks, SUM(case WHEN users_has_tasks.ref_id_user_task_status=2 THEN 1 ELSE 0 END) as doing, SUM(case WHEN tasks.concluded_task=1 THEN 1 ELSE 0 END) AS concluded_tasks, SUM(case WHEN tasks.concluded_task=1 THEN 1 ELSE 0 END)/count(*) *100 AS percentage_tasks, group_concat(DISTINCT users_has_tasks.ref_id_user SEPARATOR ',') as 'intervenientes' from tasks INNER JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task INNER JOIN projects ON tasks.ref_id_project=projects.id_project INNER JOIN clients ON clients.id_client=projects.ref_id_client LEFT JOIN projects_has_categories ON projects.id_project=projects_has_categories.ref_id_project WHERE concluded_project = 0 group by projects.id_project HAVING FIND_IN_SET(?, intervenientes)",
        id,
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            res.send(results);
          } else {
            res.send('nodata')
          }
        }
      );
    }
  });
});


router.get('/basic/:id', checkToken, (req, res) => {
  var id = req.params.id;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        "SELECT *, GROUP_CONCAT(DISTINCT projects_has_categories.ref_id_category SEPARATOR ',') as 'categories' FROM projects INNER JOIN projects_has_categories ON projects.id_project = projects_has_categories.ref_id_project WHERE id_project = ?",
        id,
        function(error, results, fields) {
          if (error) throw error;
          if (results[0].id_project === null) {
            res.send('noproject');
          } else {
            res.send(results);
          }
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
      connection.query('UPDATE projects SET title_project = ?, briefing_project = ?, deadline_project = ?, ref_id_billing_mode = ?, ref_id_client = ?, ref_id_user_account = ? WHERE id_project = ?',
      [req.body.title, req.body.briefing, req.body.deadline, req.body.billing, req.body.client, req.body.account, req.body.id],
      function(error, results, fields) {
        if (error) throw error;
        connection.query('DELETE FROM projects_has_categories WHERE ref_id_project = ?', req.body.id,
        function(error, results2, fields){
          if (error) throw error;
          for(var i=0, count=req.body.categories.length; i<count; i++){
            connection.query('INSERT INTO projects_has_categories (ref_id_project, ref_id_category) VALUES (?,?)', [req.body.id, req.body.categories[i]],
            function(error, results2, fields){
              if (error) throw error;
            })
          }
        })
        res.send(results);
      });
    }
  });
});


router.get('/details/:project', checkToken, (req, res) => {
  var id = req.params.user;
  var project = req.params.project;
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        "SELECT title_project, (SELECT avatar_user from users INNER join projects ON users.id_user=projects.ref_id_user_account WHERE projects.id_project=?) as avatar_user , creation_date_project, name_client, id_project, briefing_project, deadline_project, concluded_project,  COUNT(DISTINCT(project_comments.id_project_comment)) AS total_comments, COUNT( DISTINCT(tasks.id_task)) AS total_tasks, COUNT(DISTINCT (users_has_tasks.ref_id_user_task_status=2)) as doing, COUNT(DISTINCT(tasks.concluded_task=1)) AS concluded_tasks, SUM(case WHEN tasks.concluded_task=1 THEN 1 ELSE 0 END)/count(*) *100 AS percentage_tasks, group_concat(DISTINCT users_has_tasks.ref_id_user SEPARATOR ',') as 'user', GROUP_CONCAT(DISTINCT CONCAT(users.id_user,',',users.name_user,',',users.avatar_user) SEPARATOR ';') as intervenientes, group_concat(DISTINCT categories.name_category SEPARATOR ',') as categories FROM projects LEFT JOIN tasks ON projects.id_project=tasks.ref_id_project LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN project_comments ON projects.id_project=project_comments.ref_id_project LEFT JOIN projects_has_categories ON projects.id_project= projects_has_categories.ref_id_project LEFT JOIN categories ON projects_has_categories.ref_id_category = categories.id_category LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user LEFT JOIN clients ON projects.ref_id_client = clients.id_client WHERE projects.id_project=?", [project, project],
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.details = results;
          }
        }
      );
      connection.query(
        'SELECT id_project_comment, text_comment, date_comment, name_user from project_comments INNER JOIN users ON project_comments.ref_id_user=users.id_user WHERE ref_id_project= ?',
        project,
        function(error, results, fields) {
          if (error) throw error;
          if (totalResults.details[0].project !== null) {
            totalResults.comments = results
          } else {
            res.send('nodata');
          }
        }
      );
      connection.query(
        'SELECT id_task, title_task, ref_id_user_task_status, id_user, avatar_user, name_user FROM tasks INNER JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task INNER JOIN users ON users_has_tasks.ref_id_user= users.id_user INNER JOIN projects ON tasks.ref_id_project = projects.id_project WHERE projects.id_project=?',
        project,
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

router.post('/comments/:project', checkToken, (req, res) => {
  var project = req.params.project;
  var comment = {
    text_comment: req.body.text_comment,
    ref_id_user: req.body.id_user,
    ref_id_project: project
  };
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('INSERT INTO project_comments SET ?', comment, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
  });
});



module.exports = router;
