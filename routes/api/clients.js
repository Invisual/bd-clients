const express = require('express')
const router = express.Router()
const connection = require('../../dbconnect')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const cors = require('cors')
var moment = require('moment')
require('moment-duration-format')
require('dotenv').config()
require('moment/locale/pt')

router.use(cors())

var SECRET_KEY = process.env.SECRET_KEY
var checkToken = require('./checkToken')

router.get('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      totalResults = {}
      connection.query(
        'SELECT id_client, name_client, monthly_hours_client FROM clients LEFT JOIN tasks ON clients.id_client=tasks.ref_id_client LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task group by id_client ORDER BY name_client',
        function (error, results, fields) {
          if (error) throw error
          if (results.length > 0) {
            totalResults.details = results
          }
          res.send(totalResults)
        }
      )
    }
  })
})

router.get('/basic', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      connection.query(
        'Select id_client, name_client from clients ORDER BY name_client ASC',
        function (error, results, fields) {
          if (error) throw error
          if (results.length > 0) {
            res.send(results)
          }
        }
      )
    }
  })
})

router.get('/basic/:client', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      connection.query(
        'Select id_client, name_client from clients WHERE id_client = ?',
        req.params.client,
        function (error, results, fields) {
          if (error) throw error
          if (results.length > 0) {
            res.send(results)
          } else {
            res.send('noclient')
          }
        }
      )
    }
  })
})

router.get('/details/:client', checkToken, (req, res) => {
  var id = req.params.user
  var client = req.params.client
  var totalResults = {}
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      connection.query(
        'SELECT * FROM clients WHERE id_client=?',
        client,
        function (error, results, fields) {
          if (error) throw error
          if (results.length > 0) {
            totalResults.details = results
          }
        }
      )
      connection.query(
        "SELECT title_project, id_project, name_client, concluded_project, billed_project, COUNT(DISTINCT CASE WHEN tasks.id_task THEN id_task ELSE NULL END) AS total_tasks, COUNT(DISTINCT CASE WHEN users_has_tasks.ref_id_user_task_status=4 THEN ref_id_user_task_status ELSE NULL END) AS concluded_tasks, COUNT(DISTINCT CASE WHEN users_has_tasks.ref_id_user_task_status=4 THEN ref_id_user_task_status ELSE NULL END)/count(DISTINCT CASE WHEN tasks.id_task THEN id_task ELSE 0 END) *100 AS percentage_tasks, GROUP_CONCAT(DISTINCT CONCAT(users.id_user,',',users.name_user,',',users.avatar_user) SEPARATOR ';') as intervenientes FROM projects LEFT JOIN tasks ON projects.id_project=tasks.ref_id_project LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user LEFT JOIN clients ON projects.ref_id_client = clients.id_client WHERE projects.ref_id_client=? GROUP BY id_project",
        client,
        function (error, results, fields) {
          if (error) throw error
          if (totalResults.details[0].id_client !== null) {
            totalResults.projects = results
          } else {
            res.send('nodata')
          }
        }
      )
      connection.query(
        'SELECT id_task, title_task, ref_id_user_task_status, id_user, avatar_user, name_user, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS "total_hours", deadline_date_task FROM tasks LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user LEFT JOIN task_hours ON tasks.id_task=task_hours.ref_id_tasks WHERE tasks.ref_id_client=? group by id_task',
        client,
        function (error, results, fields) {
          if (error) throw error
          totalResults.tasks = results
          if (totalResults.details[0].id_task !== null) {
            res.send(totalResults)
          } else {
            res.send('nodata')
          }
        }
      )
    }
  })
})

router.post('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      connection.query(
        'INSERT INTO clients (name_client) VALUES (?)',
        [req.body.clientName],
        function (error, results, fields) {
          if (error) throw error
          connection.query(
            'INSERT INTO records (type_record, user_record, client_record, client_name_record) VALUES (?, ?, ?, ?)',
            ['insert', req.body.userId, results.insertId, req.body.clientName],
            function (err) {
              if (err) throw err
            }
          )
          res.send(results)
        }
      )
    }
  })
})

router.put('/', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      connection.query(
        'UPDATE clients SET name_client = ? WHERE id_client = ?',
        [req.body.clientName, req.body.id],
        function (error, results, fields) {
          if (error) throw error
          connection.query(
            'INSERT INTO records (type_record, user_record, client_record, client_name_record) VALUES (?, ?, ?, ?)',
            ['edit', req.body.userId, req.body.id, req.body.clientName],
            function (err) {
              if (err) throw err
            }
          )
          res.send(results)
        }
      )
    }
  })
})

router.put('/details', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      let clientName
      connection.query(
        'SELECT name_client FROM clients WHERE id_client=?',
        req.body.id,
        function (error1, res) {
          if (error1) throw error1
          if (res.length > 0) {
            clientName = res[0].name_client
          }
        }
      )

      connection.query(
        'UPDATE clients SET cpanel_username_client = ?, cpanel_password_client = ?, dns_nichandle_client = ?, dns_password_client = ?, wordpress_link_client = ?, wordpress_username_client = ?, wordpress_password_client = ?, email_client = ?, others_client = ?, cpanel_link_client = ?, google_username = ?, google_password = ?, instagram_username = ?, instagram_password = ?, facebook_username = ?, facebook_password = ?, others_marketing = ? WHERE id_client = ?',
        [
          req.body.cpanelUser,
          req.body.cpanelPass,
          req.body.dnsNic,
          req.body.dnsPass,
          req.body.wpLink,
          req.body.wpUser,
          req.body.wpPass,
          req.body.emails,
          req.body.others,
          req.body.cpanelLink,
          req.body.googleUser,
          req.body.googlePass,
          req.body.instagramUser,
          req.body.instagramPass,
          req.body.facebookUser,
          req.body.facebookPass,
          req.body.othersMarketing,
          req.body.id
        ],
        function (error, results, fields) {
          if (error) throw error
          connection.query(
            'INSERT INTO records (type_record, user_record, client_record, client_name_record) VALUES (?, ?, ?, ?)',
            ['edit-info', req.body.userId, req.body.id, clientName],
            function (err) {
              if (err) throw err
            }
          )
          res.send(results)
        }
      )
    }
  })
})

router.delete('/:id/:userId', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      let clientName
      connection.query(
        'SELECT name_client FROM clients WHERE id_client=?',
        req.params.id,
        function (error1, res) {
          if (error1) throw error1
          if (res.length > 0) {
            clientName = res[0].name_client
          }
        }
      )

      connection.query(
        'DELETE FROM clients WHERE id_client=?',
        req.params.id,
        function (error, results, fields) {
          if (error) throw error
          connection.query(
            'INSERT INTO records (type_record, user_record, client_name_record) VALUES (?, ?, ?)',
            ['delete', req.params.userId, clientName],
            function (err) {
              if (err) throw err
            }
          )
          res.send('deleted')
        }
      )
    }
  })
})

module.exports = router
