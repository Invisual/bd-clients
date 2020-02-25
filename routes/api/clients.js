const express = require('express');
const router = express.Router();
const connection = require('../../dbconnect');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var moment = require('moment');
require ('moment-duration-format');
require('dotenv').config();
require('moment/locale/pt');

router.use(cors());

var SECRET_KEY = process.env.SECRET_KEY;
var checkToken = require('./checkToken');

router.get('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      totalResults={}
      connection.query(
        'SELECT id_client, name_client, monthly_hours_client FROM clients LEFT JOIN tasks ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task group by id_client ORDER BY name_client',
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.details=results
          }
        }
      );
      connection.query(
        'SELECT id_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN tasks ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task WHERE MONTH(day)=MONTH(CURDATE()) AND tasks.ref_id_billing_mode=3 group by id_client',
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.taskHours=results
          }
        }
      );
      connection.query(
        'SELECT id_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(meeting_hours.ending_hour, meeting_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN meetings ON clients.id_client=meetings.ref_id_clients LEFT JOIN meeting_hours ON meeting_hours.ref_id_meeting=meetings.id_meeting WHERE MONTH(day)=MONTH(CURDATE()) AND meetings.count_hours=2 group by id_client',
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.meetingHours=results
          }
        }
      );
      connection.query(
        'SELECT id_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(budget_hours.ending_hour, budget_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN budgets ON clients.id_client=budgets.ref_id_client LEFT JOIN budget_hours ON budget_hours.ref_id_budget=budgets.id_budget WHERE MONTH(day)=MONTH(CURDATE()) group by id_client',
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.budgetHours=results
          }
          res.send(totalResults)
        }
      );
    }
  });
});


router.get('/avencados', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      totalResults={}
      connection.query(
        'SELECT id_client, name_client, monthly_hours_client FROM clients LEFT JOIN tasks ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task WHERE monthly_hours_client != 0 group by id_client ORDER BY name_client',
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.details=results
          }
        }
      );
      connection.query(
        'SELECT id_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN tasks ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task WHERE MONTH(day)=MONTH(CURDATE()) AND tasks.ref_id_billing_mode=3 group by id_client',
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.taskHours=results
          }
        }
      );
      connection.query(
        'SELECT id_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(meeting_hours.ending_hour, meeting_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN meetings ON clients.id_client=meetings.ref_id_clients LEFT JOIN meeting_hours ON meeting_hours.ref_id_meeting=meetings.id_meeting WHERE MONTH(day)=MONTH(CURDATE()) AND meetings.count_hours=2 group by id_client',
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.meetingHours=results
          }
        }
      );
      connection.query(
        'SELECT id_client, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(budget_hours.ending_hour, budget_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN budgets ON clients.id_client=budgets.ref_id_client LEFT JOIN budget_hours ON budget_hours.ref_id_budget=budgets.id_budget WHERE MONTH(day)=MONTH(CURDATE()) group by id_client',
        function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            totalResults.budgetHours=results
          }
          res.send(totalResults)
        }
      );
    }
  });
});


router.get('/annual/:id/:year', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var totalResults = [];
      var counter = 1;
      for (var i = 1; i < 13; i++) {
        tVal = i;//some manipulation of someArr[i]
         (function(val){
           connection.query( 'SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN tasks ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task WHERE id_client=? AND MONTH(day) = ? AND YEAR(day) = ?; SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(meeting_hours.ending_hour, meeting_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN meetings ON clients.id_client=meetings.ref_id_clients LEFT JOIN meeting_hours ON meeting_hours.ref_id_meeting=meetings.id_meeting WHERE id_client=? AND MONTH(day) = ? AND meetings.count_hours=2 AND YEAR(day) = ?; SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(budget_hours.ending_hour, budget_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN budgets ON clients.id_client=budgets.ref_id_client LEFT JOIN budget_hours ON budget_hours.ref_id_budget=budgets.id_budget WHERE id_client=? AND MONTH(day) = ? AND YEAR(day) = ?',
           [req.params.id, i, req.params.year, req.params.id, i, req.params.year, req.params.id, i, req.params.year], function(err, results, fields) {
               if ( err ) {
                 console.log( err );
               } else {
                var obj = {}
                obj.mes = moment(val, 'M').format('MMMM')
                obj.mesAbrev = moment(val, 'M').format('MMM')
                taskHours = results[0][0].total_hours !== null ? 
                              moment(results[0][0].total_hours, 'HH:mm:ss').format('HH') < 01 ?
                                    moment(results[0][0].total_hours, 'HH:mm:ss').format('mm') > 01 ?
                                      parseInt(results[0][0].total_hours, 10)+1 
                                    : parseInt(results[0][0].total_hours, 10) 
                                : moment(results[0][0].total_hours, 'HH:mm:ss').format('mm') > 30 ?
                                    parseInt(results[0][0].total_hours, 10)+1 
                                    : parseInt(results[0][0].total_hours, 10) 
                            : 0
                taskExactHours = results[0][0].total_hours !== null ? 
                                    moment.duration(results[0][0].total_hours, 'hours').format('HH:mm', {
                                      forceLength: true
                                    })
                                  : 0
                meetingExactHours = results[1][0].total_hours !== null ? 
                  moment.duration(results[1][0].total_hours, 'hours').format('HH:mm', {
                    forceLength: true
                  })
                : 0

                budgetExactHours = results[2][0].total_hours !== null ? 
                  moment.duration(results[2][0].total_hours, 'hours').format('HH:mm', {
                    forceLength: true
                  })
                : 0


                meetingHours = results[1][0].total_hours !== null ? 
                                moment(results[1][0].total_hours, 'HH:mm:ss').format('HH') < 01 ?
                                      moment(results[1][0].total_hours, 'HH:mm:ss').format('mm') > 01 ?
                                        parseInt(results[1][0].total_hours, 10)+1 
                                      : parseInt(results[1][0].total_hours, 10) 
                                  : moment(results[1][0].total_hours, 'HH:mm:ss').format('mm') > 30 ?
                                      parseInt(results[1][0].total_hours, 10)+1 
                                      : parseInt(results[1][0].total_hours, 10) 
                              : 0

                budgetHours = results[2][0].total_hours !== null ? 
                  moment(results[2][0].total_hours, 'HH:mm:ss').format('HH') < 01 ?
                        moment(results[2][0].total_hours, 'HH:mm:ss').format('mm') > 01 ?
                          parseInt(results[2][0].total_hours, 10)+1 
                        : parseInt(results[2][0].total_hours, 10) 
                    : moment(results[2][0].total_hours, 'HH:mm:ss').format('mm') > 30 ?
                        parseInt(results[2][0].total_hours, 10)+1 
                        : parseInt(results[2][0].total_hours, 10) 
                : 0

                obj.horasExatas= parseInt(moment.duration(taskExactHours).add(meetingExactHours).add(budgetExactHours).format('HH:mm')) > 0 ?
                                  moment.duration(taskExactHours).add(meetingExactHours).add(budgetExactHours).format('HH:mm')
                                : 0

                obj.taskExactHours = taskExactHours
                obj.meetingExactHours = meetingExactHours
                obj.budgetExactHours = budgetExactHours

                obj.horas = taskHours + meetingHours + budgetHours               
                totalResults.push(obj)
               }
               if(val === 12){
                  sendResults(totalResults)
              }
           });
         })(tVal);
      }
      function sendResults(results){
        res.send(totalResults)
      }
    }
  });
});

router.get('/annual/avencados/:id/:year', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var totalResults = [];
      var counter = 1;
      for (var i = 1; i < 13; i++) {
        tVal = i;//some manipulation of someArr[i]
         (function(val){
          connection.query( 'SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN tasks ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task WHERE id_client=? AND MONTH(day) = ? AND YEAR(day) = ? AND ref_id_billing_mode=3; SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(meeting_hours.ending_hour, meeting_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN meetings ON clients.id_client=meetings.ref_id_clients LEFT JOIN meeting_hours ON meeting_hours.ref_id_meeting=meetings.id_meeting WHERE id_client=? AND MONTH(day) = ? AND meetings.count_hours=2 AND YEAR(day) = ?; SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(budget_hours.ending_hour, budget_hours.beginning_hour)))) AS total_hours FROM clients LEFT JOIN budgets ON clients.id_client=budgets.ref_id_client LEFT JOIN budget_hours ON budget_hours.ref_id_budget=budgets.id_budget WHERE id_client=? AND MONTH(day) = ? AND YEAR(day) = ?',
          [req.params.id, i, req.params.year, req.params.id, i, req.params.year, req.params.id, i, req.params.year], function(err, results, fields) {
              if ( err ) {
                console.log( err );
              } else {
               var obj = {}
               obj.mes = moment(val, 'M').format('MMMM')
               obj.mesAbrev = moment(val, 'M').format('MMM')
               taskHours = results[0][0].total_hours !== null ? 
                             moment(results[0][0].total_hours, 'HH:mm:ss').format('HH') < 01 ?
                                   moment(results[0][0].total_hours, 'HH:mm:ss').format('mm') > 01 ?
                                     parseInt(results[0][0].total_hours, 10)+1 
                                   : parseInt(results[0][0].total_hours, 10) 
                               : moment(results[0][0].total_hours, 'HH:mm:ss').format('mm') > 30 ?
                                   parseInt(results[0][0].total_hours, 10)+1 
                                   : parseInt(results[0][0].total_hours, 10) 
                           : 0
               taskExactHours = results[0][0].total_hours !== null ? 
                                   moment.duration(results[0][0].total_hours, 'hours').format('HH:mm', {
                                     forceLength: true
                                   })
                                 : 0
               meetingExactHours = results[1][0].total_hours !== null ? 
                 moment.duration(results[1][0].total_hours, 'hours').format('HH:mm', {
                   forceLength: true
                 })
               : 0

               budgetExactHours = results[2][0].total_hours !== null ? 
                 moment.duration(results[2][0].total_hours, 'hours').format('HH:mm', {
                   forceLength: true
                 })
               : 0


               meetingHours = results[1][0].total_hours !== null ? 
                               moment(results[1][0].total_hours, 'HH:mm:ss').format('HH') < 01 ?
                                     moment(results[1][0].total_hours, 'HH:mm:ss').format('mm') > 01 ?
                                       parseInt(results[1][0].total_hours, 10)+1 
                                     : parseInt(results[1][0].total_hours, 10) 
                                 : moment(results[1][0].total_hours, 'HH:mm:ss').format('mm') > 30 ?
                                     parseInt(results[1][0].total_hours, 10)+1 
                                     : parseInt(results[1][0].total_hours, 10) 
                             : 0

               budgetHours = results[2][0].total_hours !== null ? 
                 moment(results[2][0].total_hours, 'HH:mm:ss').format('HH') < 01 ?
                       moment(results[2][0].total_hours, 'HH:mm:ss').format('mm') > 01 ?
                         parseInt(results[2][0].total_hours, 10)+1 
                       : parseInt(results[2][0].total_hours, 10) 
                   : moment(results[2][0].total_hours, 'HH:mm:ss').format('mm') > 30 ?
                       parseInt(results[2][0].total_hours, 10)+1 
                       : parseInt(results[2][0].total_hours, 10) 
               : 0

               obj.horasExatas= parseInt(moment.duration(taskExactHours).add(meetingExactHours).add(budgetExactHours).format('HH:mm')) > 0 ?
                                  moment.duration(taskExactHours).add(meetingExactHours).add(budgetExactHours).format('HH:mm')
                                : 0

               obj.taskExactHours = taskExactHours
               obj.meetingExactHours = meetingExactHours
               obj.budgetExactHours = budgetExactHours

               obj.horas = taskHours + meetingHours + budgetHours               
               totalResults.push(obj)
              }
              if(val === 12){
                 sendResults(totalResults)
             }
          });
        })(tVal);
      }
      function sendResults(results){
        res.send(totalResults)
      }
    }
  });
});

router.get('/basic', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select id_client, name_client, monthly_hours_client from clients ORDER BY name_client ASC', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        }
      });
    }
  });
});



router.get('/basic/:client', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select id_client, name_client, monthly_hours_client from clients WHERE id_client = ?', req.params.client, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        }
        else{
          res.send('noclient')
        }
      });
    }
  });
});



router.get('/details/:client', checkToken, (req, res) => {

  var id = req.params.user;
  var client = req.params.client;
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('SELECT * FROM clients WHERE id_client=?', client, function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          totalResults.details = results;
        }
      });
      connection.query(
        "SELECT title_project, id_project, name_client, concluded_project, billed_project, COUNT(DISTINCT CASE WHEN tasks.id_task THEN id_task ELSE NULL END) AS total_tasks, COUNT(DISTINCT CASE WHEN users_has_tasks.ref_id_user_task_status=4 THEN ref_id_user_task_status ELSE NULL END) AS concluded_tasks, COUNT(DISTINCT CASE WHEN users_has_tasks.ref_id_user_task_status=4 THEN ref_id_user_task_status ELSE NULL END)/count(DISTINCT CASE WHEN tasks.id_task THEN id_task ELSE 0 END) *100 AS percentage_tasks, GROUP_CONCAT(DISTINCT CONCAT(users.id_user,',',users.name_user,',',users.avatar_user) SEPARATOR ';') as intervenientes FROM projects LEFT JOIN tasks ON projects.id_project=tasks.ref_id_project LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user LEFT JOIN clients ON projects.ref_id_client = clients.id_client WHERE projects.ref_id_client=? GROUP BY id_project",
        client,
        function(error, results, fields) {
          if (error) throw error;
          if (totalResults.details[0].id_client !== null) {
            totalResults.projects = results;
          } else {
            res.send('nodata');
          }
        }
      );
      connection.query(
        'SELECT id_task, title_task, ref_id_user_task_status, id_user, avatar_user, name_user, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS "total_hours", deadline_date_task FROM tasks LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user LEFT JOIN task_hours ON tasks.id_task=task_hours.ref_id_tasks WHERE tasks.ref_id_client=? group by id_task',
        client,
        function(error, results, fields) {
          if (error) throw error;
          totalResults.tasks = results;
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


router.post('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('INSERT INTO clients (name_client, monthly_hours_client) VALUES (?,?)',
      [req.body.clientName, req.body.clientHours],
      function(error, results, fields) {
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
      connection.query('UPDATE clients SET name_client = ?, monthly_hours_client = ? WHERE id_client = ?',
      [req.body.clientName, req.body.clientHours, req.body.id],
      function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
  });
});


router.put('/details', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('UPDATE clients SET cpanel_username_client = ?, cpanel_password_client = ?, dns_nichandle_client = ?, dns_password_client = ?, wordpress_link_client = ?, wordpress_username_client = ?, wordpress_password_client = ?, email_client = ?, others_client = ?, cpanel_link_client = ? WHERE id_client = ?',
      [req.body.cpanelUser, req.body.cpanelPass, req.body.dnsNic, req.body.dnsPass, req.body.wpLink, req.body.wpUser, req.body.wpPass, req.body.emails, req.body.others, req.body.cpanelLink, req.body.id],
      function(error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
  });
});

module.exports = router;
