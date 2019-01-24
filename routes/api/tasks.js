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

router.get('/:user', (req, res) => {
  var id = req.params.user;
  connection.query(
    "SELECT * from tasks INNER JOIN users_has_tasks on tasks.id_task INNER JOIN task_types on task_types.id_task_type=tasks.ref_id_type_task INNER JOIN aproval_task_status ON aproval_task_status.id_aproval_task_status=tasks.ref_id_aproval_task_status INNER JOIN user_task_status ON user_task_status.id_user_task_status=users_has_tasks.ref_id_user_task_status INNER JOIN projects ON tasks.ref_id_project=projects.id_project INNER JOIN billing_modes ON billing_modes.id_billing_mode=tasks.ref_id_billing_mode where users_has_tasks.ref_id_user= ? ", id,
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

module.exports = router;