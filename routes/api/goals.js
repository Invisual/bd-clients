const express = require('express');
const router = express.Router();
const connection = require('../../dbconnect');
const mysql = require('mysql');

router.get('/', (req, res) => {
  connection.query(
    "Select * from tasks",
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});


module.exports = router;