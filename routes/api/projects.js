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
      connection.query('Select id_project, title_project, ref_id_client from projects', function(error, results, fields) {
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
      connection.query('INSERT INTO projects (title_project, briefing_project, deadline_project, ref_id_billing_mode, ref_id_client, ref_id_user) VALUES (?, ?, ?, ?, ?, ?)',
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

router.get('/:user', checkToken, (req, res) => {
  var id = req.params.user;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        //"SELECT *, group_concat(DISTINCT users_has_tasks.ref_id_user SEPARATOR ',') as 'intervenientes' from tasks INNER JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task INNER JOIN projects ON tasks.ref_id_project=projects.id_project group by projects.id_project HAVING  FIND_IN_SET( ? , intervenientes)",

        "SELECT title_project, name_client, id_project, concluded_project, SUM(CASE WHEN tasks.id_task THEN 1 ELSE 0 END) AS total_tasks, SUM(case WHEN tasks.concluded_task=1 THEN 1 ELSE 0 END) AS concluded_tasks, SUM(case WHEN tasks.concluded_task=1 THEN 1 ELSE 0 END)/count(*) *100 AS percentage_tasks, group_concat(DISTINCT users_has_tasks.ref_id_user SEPARATOR ',') as 'intervenientes' from tasks INNER JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task INNER JOIN projects ON tasks.ref_id_project=projects.id_project INNER JOIN clients ON clients.id_client=projects.ref_id_client group by projects.id_project HAVING FIND_IN_SET(?, intervenientes)",
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

module.exports = router;
