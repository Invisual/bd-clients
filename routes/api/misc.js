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

router.get('/billing', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from billing_modes', function(error, results, fields) {
        if (error) throw error;
          res.send(results);
      });
    }
  });
});


router.get('/categories', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from categories', function(error, results, fields) {
        if (error) throw error;
          res.send(results);
      });
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



router.get('/pws/clientsinfos', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from random_pws WHERE name_pw = "clientsinfos"', function(error, results, fields) {
        if (error) throw error;
          res.send(results);
      });
    }
  });
});


router.post('/costs', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {res.sendStatus(403)}
    else {
      if(req.body.type === 'task'){
        for(var i=0, count=req.body.services.length; i<count;i++){
          var countRows = 0
          var priceDifference = req.body.sellPrices[i].input -  req.body.providerPrices[i].input
          connection.query('INSERT INTO costs (service, provider, cost_provider, price_sale, price_difference, ref_id_task, type_cost) VALUES(?, ?, ?, ?, ?, ?, ?)', 
          [req.body.services[i].input, req.body.providers[i].input, req.body.providerPrices[i].input, req.body.sellPrices[i].input, Math.round(priceDifference * 100) / 100, req.body.taskId,  req.body.costTypes[i].input],
          function(error, results, fields) {
            countRows ++
            if (error) throw error
            if(countRows === count){res.send(results)}
          });
        }
      }
      else{
        for(var i=0, count=req.body.services.length; i<count;i++){
          var countRows = 0
          var priceDifference = req.body.sellPrices[i].input -  req.body.providerPrices[i].input
          connection.query('INSERT INTO costs (service, provider, cost_provider, price_sale, price_difference, ref_id_project, type_cost) VALUES(?, ?, ?, ?, ?, ?, ?)', 
          [req.body.services[i].input, req.body.providers[i].input, req.body.providerPrices[i].input, req.body.sellPrices[i].input, Math.round(priceDifference * 100) / 100, req.body.projId,  req.body.costTypes[i].input],
          function(error, results, fields) {
            countRows ++
            if (error) throw error;
            if(countRows === count){res.send(results)}
          });
        }
      }
    }
  });
})


router.delete('/costs/:id', checkToken, (req, res) => {
  var id = req.params.id;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {res.sendStatus(403)}
    else {
      connection.query('DELETE FROM costs WHERE id_cost=?', id, function(error, results, fields) {
        if (error) throw error;
        res.send('deleted');
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


router.get('/notifications/:user', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('SELECT id_notification, type_notification, ref_id_task, ref_id_user, notifications.ref_id_project, ref_id_meeting, seen, opened, creation_date_notification, title_task, title_project, title_meeting, date_meeting FROM notifications LEFT JOIN tasks ON notifications.ref_id_task = tasks.id_task LEFT JOIN projects ON notifications.ref_id_project = projects.id_project LEFT JOIN meetings ON notifications.ref_id_meeting = meetings.id_meeting WHERE ref_id_user=? ORDER BY id_notification DESC LIMIT 10', req.params.user, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        } else {
          res.send('nodata');
        }
      });
    }
  });
});


router.put('/notifications/seen', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {res.sendStatus(403)}
    else {
      for(var i=0, count=req.body.notifications.length; i<count; i++){
        connection.query('UPDATE notifications SET seen=1 WHERE id_notification = ?', req.body.notifications[i], function(error, results, fields) {
          if (error) throw error;
        });
      }
      res.send('done')
    }
  });
});



router.put('/notifications/opened', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {res.sendStatus(403)}
    else {
      connection.query('UPDATE notifications SET opened=1 WHERE id_notification = ?', req.body.id, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
    }
  });
});

module.exports = router;