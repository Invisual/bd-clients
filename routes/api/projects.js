const express = require('express');
const router = express.Router();
const connection = require('../../dbconnect');
const mysql = require('mysql');

router.get('/', (req, res) => {
  connection.query(
    "Select * from projects",
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

router.get('/:user', (req, res) => {
  var id = req.params.user;
  connection.query(
    "SELECT *, group_concat(DISTINCT users_has_tasks.ref_id_user SEPARATOR ',') as 'intervenientes' from tasks INNER JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task INNER JOIN projects ON tasks.ref_id_project=projects.id_project group by projects.id_project where users_has_tasks.ref_id_user=? ", id,
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

module.exports = router;