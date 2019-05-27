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

module.exports = router;