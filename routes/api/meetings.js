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
      connection.query('Select * from meetings', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        }
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
        'SELECT * from meetings INNER JOIN meetings_has_users ON meetings_has_users.ref_id_meeting=meetings.id_meeting WHERE ref_id_user=?',
        id,
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            res.send(results);
          }
        }
      );
    }
  });
});

module.exports = router;
