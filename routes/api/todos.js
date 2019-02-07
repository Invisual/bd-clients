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
      connection.query('Select * from todo_lists ORDER BY id_todo_list DESC', function(error, results, fields) {
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
      connection.query('INSERT INTO todo_lists (title_list, status_list, ref_id_user) VALUES(?, ?, ?)', [req.body.todo, 0, req.body.user], function(error, results, fields) {
        if (error) throw error;
          res.send(results);
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
      connection.query('Select * from todo_lists WHERE ref_id_user=? ORDER BY id_todo_list DESC', id, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        }
      });
    }
  });
});

router.put('/userToDoStatus', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var status = req.body.status;
      var todo = req.body.todo;
      var user = req.body.user;

      connection.query(
        'UPDATE todo_lists SET status_list=? WHERE id_todo_list=? AND ref_id_user=?',
        [status, todo, user],
        function(error, results, fields) {
          if (error) throw error;
          res.send({message: status});
        }
      );
    }
  });
});

module.exports = router;