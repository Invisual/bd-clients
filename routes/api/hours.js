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


router.get('/id/:hour', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from task_hours WHERE id_task_hour = ?', req.params.hour, function(error, results, fields) {
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

  
router.get('/active/budget/:user', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('SELECT id_budget, title_budget, beginning_hour, id_budget_hour FROM budgets LEFT JOIN budget_hours ON budgets.id_budget=budget_hours.ref_id_budget WHERE ref_id_user = ? AND beginning_hour IS NOT NULL AND ending_hour IS NULL', req.params.user, function(error, results, fields) {
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


router.get('/:user/:date', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
      if (err) { res.sendStatus(403) }
      else{
          connection.query("SELECT id_task_hour, id_task, beginning_hour, ending_hour, day, title_task, id_client, name_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(ending_hour, beginning_hour)))) as difference from task_hours INNER JOIN tasks ON task_hours.ref_id_tasks = tasks.id_task INNER JOIN clients ON tasks.ref_id_client = clients.id_client WHERE ref_id_users = ? AND day = ? GROUP BY id_task_hour ORDER BY id_task_hour ASC", [req.params.user, req.params.date], function(error, results, fields) {
              if (error) throw error;
              if (results.length > 0) { res.send(results) }
              else { res.send('nodata') }
          })
      }
  })
})


router.get('/budgets/:user/:date', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
      if (err) { res.sendStatus(403) }
      else{
          connection.query("SELECT id_budget_hour, id_budget, beginning_hour, ending_hour, day, title_budget, id_client, name_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(ending_hour, beginning_hour)))) as difference from budget_hours INNER JOIN budgets ON budget_hours.ref_id_budget = budgets.id_budget INNER JOIN clients ON budgets.ref_id_client = clients.id_client WHERE ref_id_user = ? AND day = ? GROUP BY id_budget_hour ORDER BY id_budget_hour ASC", [req.params.user, req.params.date], function(error, results, fields) {
              if (error) throw error;
              if (results.length > 0) { res.send(results) }
              else { res.send('nodata') }
          })
      }
  })
})


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


router.post('/manual', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('INSERT INTO task_hours (beginning_hour, ending_hour, day, ref_id_users, ref_id_tasks) VALUES (?, ?, ?, ?, ?)',
      [req.body.beginningHour, req.body.endingHour, req.body.day, req.body.user, req.body.task], function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
  });
});


router.put('/manual/:id', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('UPDATE task_hours SET beginning_hour = ?, ending_hour = ?, day = ?, ref_id_users = ?, ref_id_tasks = ? WHERE id_task_hour = ?',
      [req.body.beginningHour, req.body.endingHour, req.body.day, req.body.user, req.body.task, req.params.id], function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
  });
});


router.post('/budget', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('INSERT INTO budget_hours (beginning_hour, day, ref_id_user, ref_id_budget) VALUES (?, ?, ?, ?)',
      [req.body.beginningHour, req.body.day, req.body.user, req.body.budget], function(error, results, fields) {
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

router.put('/budget', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
      if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
      } else {
      connection.query('UPDATE budget_hours SET ending_hour = ? WHERE id_budget_hour = ?',
      [req.body.endingHour, req.body.idHour], function(error, results, fields) {
          if (error) throw error;
          res.send(results);
      });
      }
  });
});
  


router.delete('/:id', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('DELETE FROM task_hours WHERE id_task_hour = ?', req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
  });
});


module.exports = router;
