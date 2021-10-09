const express = require('express')
const router = express.Router()
const connection = require('../../dbconnect')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()
router.use(cors())

var SECRET_KEY = process.env.SECRET_KEY
var checkToken = require('./checkToken')

router.get('/positions', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      connection.query(
        'Select * from positions',
        function (error, results, fields) {
          if (error) throw error
          res.send(results)
        }
      )
    }
  })
})

router.get('/pws/clientsinfos', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      connection.query(
        'Select * from random_pws WHERE name_pw = "clientsinfos"',
        function (error, results, fields) {
          if (error) throw error
          res.send(results)
        }
      )
    }
  })
})

router.get('/records', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403)
    } else {
      connection.query(
        'Select id_record, type_record, client_record, client_name_record, date_record, user_record, name_user from records INNER JOIN users ON records.user_record = users.id_user ORDER BY date_record DESC',
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

module.exports = router
