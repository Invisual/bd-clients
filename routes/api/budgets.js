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
      connection.query('Select * from budgets', function(error, results, fields) {
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
      if (req.body.potentialClient){
        var potentialClient;
        connection.query('INSERT INTO potential_clients (name_potential_client) VALUES (?)', req.body.potentialClient , function(error, results, fields) {
          if (error) throw error;
          potentialClient = results.insertId
          insert(potentialClient)
        });
      } else {
        insert()
      }

      function insert (potentialClient=null) {connection.query(
        'INSERT INTO budgets (title_budget, description_budget, ref_id_client, ref_id_potential_client) VALUES (?,?,?,?)',
        [
          req.body.title,
          req.body.description,
          req.body.client,
          potentialClient
        ],
        function(error, results, fields) {
          if (error) throw error;
          connection.query(
            'INSERT INTO users_has_budgets (ref_id_user, ref_id_budget) VALUES (?,?)',
            [req.body.account, results.insertId],
            function(error, results2, fields) {
              if (error) throw error;
            }
          );
          res.send(results);
        }
      );
      }
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
        'CREATE TEMPORARY TABLE tmptable SELECT * FROM tasks WHERE id_task = ?; UPDATE tmptable SET id_task = NULL, title_task = IFNULL (CONCAT( title_task , " - Duplicada" ), " - Duplicada"); INSERT INTO tasks SELECT * FROM tmptable; DROP TEMPORARY TABLE IF EXISTS tmptable;', id,
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
      console.log(req.body)
      if (req.body.potentialClient){
        if (req.body.changePotentialClient){
          var potentialClient;
        connection.query('INSERT INTO potential_clients (name_potential_client) VALUES (?)', req.body.potentialClient , function(error, results, fields) {
          if (error) throw error;
          potentialClient = results.insertId
          update(potentialClient)
        });
        }else {
          update(req.body.potentialClientId)
        }
        
      } else {
        update()
      }
      function update (potentialClient=null) {
          connection.query(
          'UPDATE budgets SET title_budget = ?, description_budget = ?, ref_id_client = ?, ref_id_potential_client = ? WHERE id_budget = ?',
          [
            req.body.title,
            req.body.description,
            req.body.client,
            potentialClient,
            req.body.id
          ],
          function(error, results, fields) {
            if (error) throw error;
            if (req.body.changeAccount) {
              connection.query(
                'DELETE FROM users_has_budgets WHERE ref_id_user = ? AND ref_id_budget = ?',
                [req.body.oldAccount, req.body.id],
                function(error, results2, fields) {
                  if (error) throw error;
                  connection.query(
                    'INSERT INTO users_has_budgets (ref_id_user, ref_id_budget) VALUES (?,?)',
                    [req.body.account, req.body.id],
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
      connection.query('DELETE FROM budgets WHERE id_budget=?', id, function(error, results, fields) {
        if (error) throw error;
        res.send('deleted');
      });
    }
  });
});

router.put('/internalBudgetStatus', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var status = req.body.status;
      var budget = req.body.budget;

      connection.query(
        'UPDATE budgets SET ref_id_budget_internal_status=? WHERE id_budget=?',
        [status, budget],
        function(error, results, fields) {
          if (error) throw error;
          res.send({ message: status });
        }
      );
    }
  });
});

router.put('/externalBudgetStatus', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var status = req.body.status;
      var budget = req.body.budget;

      connection.query(
        'UPDATE budgets SET ref_id_budget_external_status=? WHERE id_budget=?',
        [status, budget],
        function(error, results, fields) {
          if (error) throw error;
          res.send({ message: status });
        }
      );
    }
  });
});


router.get('/all', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'SELECT id_budget, ref_id_budget_internal_status, ref_id_budget_external_status, title_budget, budget_internal_status.name_budget_internal_status, budget_external_status.name_budget_external_status, creation_date_budget, conclusion_date_budget, ref_id_client, ref_id_potential_client, ref_id_user from budgets LEFT JOIN budget_internal_status ON budgets.ref_id_budget_internal_status=budget_internal_status.id_budget_internal_status LEFT JOIN budget_external_status ON budgets.ref_id_budget_external_status=budget_external_status.id_budget_external_status LEFT JOIN users_has_budgets ON budgets.id_budget = users_has_budgets.ref_id_budget ORDER BY budgets.id_budget ASC',
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


router.get('/:user', checkToken, (req, res) => {
  var id = req.params.user;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'SELECT id_task, ref_id_user_task_status, title_task, user_task_status.name_user_task_status, starting_date_task, deadline_date_task, tasks.ref_id_client, ref_id_type_task, tasks.ref_id_billing_mode, ref_id_project, users_has_tasks.order, users_has_tasks.ref_id_user from tasks LEFT JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task LEFT JOIN task_types on task_types.id_task_type=tasks.ref_id_type_task LEFT JOIN aproval_task_status ON aproval_task_status.id_aproval_task_status=tasks.ref_id_aproval_task_status LEFT JOIN user_task_status ON user_task_status.id_user_task_status=users_has_tasks.ref_id_user_task_status LEFT JOIN projects ON tasks.ref_id_project=projects.id_project LEFT JOIN billing_modes ON billing_modes.id_billing_mode=tasks.ref_id_billing_mode where tasks.concluded_task=0 AND users_has_tasks.ref_id_user= ? ORDER by users_has_tasks.order DESC, tasks.id_task ASC',
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


router.get('/comments/:budget', checkToken, (req, res) => {
  var budget = req.params.budget;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'SELECT id_budget_comment, text_comments, date_comment, name_user from budget_comments INNER JOIN users ON budget_comments.ref_id_user=users.id_user WHERE ref_id_budget= ?',
        budget,
        function(error, results, fields) {
          if (error) throw error;
          res.send(results);
        }
      );
    }
  });
});

router.post('/comments/:budget', checkToken, (req, res) => {
  var budget = req.params.budget;
  var comment = {
    text_comments: req.body.text_comment,
    ref_id_user: req.body.id_user,
    ref_id_budget: budget
  };
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('INSERT INTO budget_comments SET ?', comment, function(error, results, fields) {
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
        'SELECT id_task, avatar_user, name_user, title_task, creation_date_task, title_project, ref_id_project, name_client, name_task_types, name_billing_mode, description_task,SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS "total_hours" from tasks LEFT JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task LEFT JOIN task_types on task_types.id_task_type=tasks.ref_id_type_task LEFT JOIN aproval_task_status ON aproval_task_status.id_aproval_task_status=tasks.ref_id_aproval_task_status LEFT JOIN user_task_status ON user_task_status.id_user_task_status=users_has_tasks.ref_id_user_task_status LEFT JOIN projects ON tasks.ref_id_project=projects.id_project LEFT JOIN billing_modes ON billing_modes.id_billing_mode=tasks.ref_id_billing_mode LEFT JOIN clients ON clients.id_client=tasks.ref_id_client LEFT JOIN users ON users.id_user=users_has_tasks.ref_id_user LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task where tasks.id_task=?',
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

router.get('/basic/:budget', checkToken, (req, res) => {
  var budget = req.params.budget;
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'SELECT * FROM budgets INNER JOIN users_has_budgets ON budgets.id_budget = users_has_budgets.ref_id_budget LEFT JOIN potential_clients ON budgets.ref_id_potential_client=potential_clients.id_potential_client WHERE id_budget=?',
        budget,
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            res.send(results);
          } else {
            res.send('nobudget');
          }
        }
      );
    }
  });
});

router.get('/content/:budget', checkToken, (req, res) => {
  var budget = req.params.budget;
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query(
        'SELECT id_budget, avatar_user, name_user, title_budget, creation_date_budget, name_client, name_potential_client, description_budget, ref_id_budget_internal_status, ref_id_budget_external_status, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(budget_hours.ending_hour, budget_hours.beginning_hour)))) AS "total_hours" from budgets LEFT JOIN users_has_budgets on users_has_budgets.ref_id_budget=budgets.id_budget LEFT JOIN budget_internal_status ON budget_internal_status.id_budget_internal_status=budgets.ref_id_budget_internal_status LEFT JOIN budget_external_status ON budget_external_status.id_budget_external_status=budgets.ref_id_budget_external_status LEFT JOIN clients ON clients.id_client=budgets.ref_id_client LEFT JOIN potential_clients ON potential_clients.id_potential_client=budgets.ref_id_potential_client LEFT JOIN users ON users.id_user=users_has_budgets.ref_id_user LEFT JOIN budget_hours ON budget_hours.ref_id_budget=budgets.id_budget where budgets.id_budget=?',
        budget,
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.details = results;
          }
        }
      );
      connection.query(
        'SELECT id_budget_comment, text_comments, date_comment, name_user from budget_comments INNER JOIN users ON budget_comments.ref_id_user=users.id_user WHERE ref_id_budget= ?',
        budget,
        function(error, results, fields) {
          if (error) throw error;
          totalResults.comments = results;
          if (totalResults.details[0].id_budget !== null) {
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
