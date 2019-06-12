const express = require('express');
const router = express.Router();
const connection = require('../../dbconnect');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodeMailer = require('nodemailer');
require('dotenv').config();
var moment = require('moment');
router.use(cors());

var SECRET_KEY = process.env.SECRET_KEY;
var checkToken = require('./checkToken');

router.get('/billing', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select * from billing_modes', function (error, results, fields) {
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
      connection.query('Select * from categories', function (error, results, fields) {
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
      connection.query('Select * from task_types', function (error, results, fields) {
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
      connection.query('Select * from user_task_status', function (error, results, fields) {
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
      connection.query('Select * from budget_internal_status', function (error, results, fields) {
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
      connection.query('Select * from budget_external_status', function (error, results, fields) {
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
      connection.query('Select * from positions', function (error, results, fields) {
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
      connection.query('Select * from random_pws WHERE name_pw = "clientsinfos"', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
      });
    }
  });
});


router.post('/costs', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      if (req.body.type === 'task') {
        for (var i = 0, count = req.body.services.length; i < count; i++) {
          var countRows = 0
          var priceDifference = req.body.sellPrices[i].input - req.body.providerPrices[i].input
          connection.query('INSERT INTO costs (service, provider, cost_provider, price_sale, price_difference, ref_id_task, type_cost) VALUES(?, ?, ?, ?, ?, ?, ?)',
            [req.body.services[i].input, req.body.providers[i].input, req.body.providerPrices[i].input, req.body.sellPrices[i].input, Math.round(priceDifference * 100) / 100, req.body.taskId, req.body.costTypes[i].input],
            function (error, results, fields) {
              countRows++
              if (error) throw error
              if (countRows === count) { res.send(results) }
            });
        }
      }
      else {
        for (var i = 0, count = req.body.services.length; i < count; i++) {
          var countRows = 0
          var priceDifference = req.body.sellPrices[i].input - req.body.providerPrices[i].input
          connection.query('INSERT INTO costs (service, provider, cost_provider, price_sale, price_difference, ref_id_project, type_cost) VALUES(?, ?, ?, ?, ?, ?, ?)',
            [req.body.services[i].input, req.body.providers[i].input, req.body.providerPrices[i].input, req.body.sellPrices[i].input, Math.round(priceDifference * 100) / 100, req.body.projId, req.body.costTypes[i].input],
            function (error, results, fields) {
              countRows++
              if (error) throw error;
              if (countRows === count) { res.send(results) }
            });
        }
      }
    }
  });
})


router.delete('/costs/:id', checkToken, (req, res) => {
  var id = req.params.id;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('DELETE FROM costs WHERE id_cost=?', id, function (error, results, fields) {
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
      var title = req.body.title
      var mode = req.body.mode
      var user = req.body.user
      var date = req.body.date
      var subject
      var body
      var link
      switch (type) {
        case 'task':
          subject = 'Nova Tarefa para Faturação'
          body = `A Tarefa '${title}' foi Processada e definida como '${mode}'.`
          link = taskId
          break;
        case 'project':
          subject = 'Novo Projeto para Faturação'
          body = `O Projeto '${title}' foi processado e definido como '${mode}'.`
          link = projId
          
      }
      const transporter = nodeMailer.createTransport({
        host: 'sv01.invisual.pt',
        port: 465,
        secure: true,
        auth: {
          user: 'tarefas@invisual.pt',
          pass: 'lausivni#tarefas'
        }
      });
      const mailOptions = {
        from: '"TAREFAS INVISUAL" <tarefas@invisual.pt>',
        to: 'tiago.ribeiro@invisual.pt',
        subject: `${subject}`,
        html: `
          <h4>Tarefas - Invisual</h4>
          <br>
          <p>${body}</p>
          <p>Pode visualiza-la e fatura-la <a href="http://localhost:3000/billing/${type}/${link}">aqui</a>.</p>
          <br>
          `
      };
      if (type === 'task') {
        connection.query(
          'UPDATE tasks SET concluded_task=?, billed_task=?, comment_billed_task=?, user_billed_task = ?, conclusion_date_task = ? WHERE id_task=?',
          [approval, billing, obs, user, date, taskId],
          function (error, results, fields) {
            if (error) throwerror;
            if (billing === 1) {
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(400).send({ success: false })
                } else {
                  res.status(200).send({ success: true });
                }
              });
            }
            res.send(results);
          }
        );
      }
      else {
        connection.query(
          'UPDATE projects SET concluded_project=?, billed_project=?, comment_billed_project=?, user_billed_project = ?, conclusion_date_project = ? WHERE id_project=?',
          [approval, billing, obs, user, date, projId],
          function (error, results, fields) {
            if (error) throwerror;
            if (billing === 1) {
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(400).send({ success: false })
                } else {
                  console.log('entrou na query')
                  res.status(200).send({ success: true });
                }
              });
            }
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
      connection.query('SELECT id_notification, type_notification, ref_id_task, ref_id_user, notifications.ref_id_project, ref_id_meeting, seen, opened, creation_date_notification, title_task, title_project, title_meeting, date_meeting FROM notifications LEFT JOIN tasks ON notifications.ref_id_task = tasks.id_task LEFT JOIN projects ON notifications.ref_id_project = projects.id_project LEFT JOIN meetings ON notifications.ref_id_meeting = meetings.id_meeting WHERE ref_id_user=? ORDER BY id_notification DESC LIMIT 10', req.params.user, function (error, results, fields) {
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
    if (err) { res.sendStatus(403) }
    else {
      for (var i = 0, count = req.body.notifications.length; i < count; i++) {
        connection.query('UPDATE notifications SET seen=1 WHERE id_notification = ?', req.body.notifications[i], function (error, results, fields) {
          if (error) throw error;
        });
      }
      res.send('done')
    }
  });
});



router.put('/notifications/opened', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('UPDATE notifications SET opened=1 WHERE id_notification = ?', req.body.id, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
    }
  });
});



router.get('/vacations', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    var currYear = new Date().getFullYear()
    if (err) { res.sendStatus(403) }
    else {
      connection.query('SELECT * from vacations INNER JOIN users ON vacations.ref_id_user = users.id_user INNER JOIN positions ON users.ref_id_position = positions.id_position WHERE start_date LIKE "%?%" AND management_approval = 2 ORDER BY start_date ASC', currYear, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
    }
  });
});



router.get('/vacations/:id', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('SELECT * from vacations INNER JOIN users ON vacations.ref_id_user = users.id_user WHERE id_vacation = ?', req.params.id, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
    }
  });
});



router.delete('/vacations/:id', checkToken, (req, res) => {
  var id = req.params.id;
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('DELETE FROM vacations WHERE id_vacation=?', id, function (error, results, fields) {
        if (error) throw error;
        res.send('deleted');
      });
    }
  });
});




router.post('/vacations', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('INSERT INTO vacations (start_date, end_date, type_single_day, type_vacation, ref_id_user, accounting_approval, management_approval) VALUES(?, ?, ?, ?, ?, ?, ?)',
        [req.body.startDate, req.body.endDate, req.body.dayType, req.body.type, req.body.user, 1, 1],
        function (error, results, fields) {
          if (error) throw error;

          var dayType = ''
          switch (Number(req.body.dayType)) {
            case 1:
              dayType = 'todo o dia'
              break
            case 2:
              dayType = 'apenas de manhã'
              break
            case 3:
              dayType = 'apenas de tarde'
              break
            default:
              dayType = 'todo o dia'
          }

          const transporter = nodeMailer.createTransport({
            host: 'sv01.invisual.pt',
            port: 465,
            secure: true,
            auth: {
              user: 'tarefas@invisual.pt',
              pass: 'lausivni#tarefas'
            }
          });

          const mailOptions = {
            from: '"TAREFAS INVISUAL" <tarefas@invisual.pt>',
            to: `eduardo.araujo@invisual.pt`,
            subject: 'Pedido de Férias para Aprovação',
            html: `
                <h4>Tarefas - Invisual</h4>
                <br>
                <p>O utilizador '${req.body.nameUser}' fez um pedido de férias.</p>
                <br>
                <p>O dia pedido é o dia ${moment(req.body.startDate).format('ll')}, ${dayType}.</p>
                <p>Veja aqui o estado atual das férias de todos utilizadores: <a href="http://localhost:3000/vacations/${moment(req.body.startDate)}">Ver Férias</a></p>
                <br>
                <br>
                <p>Aprove aqui: <strong><a href="http://localhost:3000/approvevacations/accounting/${results.insertId}">Aprovar</a></strong></p>
                <br>
                <p>Rejeite aqui: <strong><a href="http://localhost:3000/rejectvacations/accounting/${results.insertId}">Rejeitar</a></strong></p>
                <br><br>
                <p><strong>Invisual Branding Solutions</strong></p>
                `
          };

          if (Number(req.body.type) === 2) {
            mailOptions.html = `
            <h4>Tarefas - Invisual</h4>
            <br>
            <p>O utilizador ${req.body.nameUser} fez um pedido de férias.</p>
            <br>
            <p>O período pedido é do dia ${moment(req.body.startDate).format('ll')} até ${moment(req.body.endDate).format('ll')}.</p>
            <p>Veja aqui o estado atual das férias de todos utilizadores: <a href="http://localhost:3000/vacations">Ver Férias</a></p>
            <br>
            <br>
            <p>Aprove aqui: <strong><a href="http://localhost:3000/approvevacations/accounting/${results.insertId}">Aprovar</a></strong></p>
            <br>
            <p>Rejeite aqui: <strong><a href="http://localhost:3000/rejectvacations/accounting/${results.insertId}">Rejeitar</a></strong></p>
            <br><br>
            <p><strong>Invisual Branding Solutions</strong></p>
            `
          }

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(400).send({ success: false })
            } else {
              res.status(200).send({ success: true });
            }
          });
          res.send(results)
        });
    }
  });
})


router.put('/approvevacation/accounting', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('UPDATE vacations SET accounting_approval = ? WHERE id_vacation = ?',
        [req.body.approv, req.body.id],
        function (error, results, fields) {
          if (error) throw error;

          if (Number(req.body.approv) === 2) {
            var dayType = ''
            switch (Number(req.body.dayType)) {
              case 1:
                dayType = 'todo o dia'
                break
              case 2:
                dayType = 'apenas de manhã'
                break
              case 3:
                dayType = 'apenas de tarde'
                break
              default:
                dayType = 'todo o dia'
            }

            const transporter = nodeMailer.createTransport({
              host: 'sv01.invisual.pt',
              port: 465,
              secure: true,
              auth: {
                user: 'tarefas@invisual.pt',
                pass: 'lausivni#tarefas'
              }
            });

            const mailOptions = {
              from: '"TAREFAS INVISUAL" <tarefas@invisual.pt>',
              to: `eduardo.araujo@invisual.pt`,
              subject: 'Pedido de Férias para Aprovação',
              html: `
                  <h4>Tarefas - Invisual</h4>
                  <br>
                  <p>O utilizador '${req.body.nameUser}' fez um pedido de férias.</p>
                  <br>
                  <p>O dia pedido é o dia ${moment(req.body.startDate).format('ll')}, ${dayType}.</p>
                  <p>Este pedido já foi aprovado pela Contabilidade.</p>
                  <br>
                  <br>
                  <p>Aprove aqui: <strong><a href="http://localhost:3000/approvevacations/management/${req.body.id}">Aprovar</a></strong></p>
                  <br>
                  <p>Rejeite aqui: <strong><a href="http://localhost:3000/rejectvacations/management/${req.body.id}">Rejeitar</a></strong></p>
                  <br><br>
                  <p><strong>Invisual Branding Solutions</strong></p>
                  `
            };

            if (Number(req.body.type) === 2) {
              mailOptions.html = `
              <h4>Tarefas - Invisual</h4>
              <br>
              <p>O utilizador ${req.body.nameUser} fez um pedido de férias.</p>
              <br>
              <p>O período pedido é do dia ${moment(req.body.startDate).format('ll')} até ${moment(req.body.endDate).format('ll')}.</p>
              <p>Este pedido já foi aprovado pela Contabilidade.</p>
              <br>
              <br>
              <p>Aprove aqui: <strong><a href="http://localhost:3000/approvevacations/management/${req.body.id}">Aprovar</a></strong></p>
              <br>
              <p>Rejeite aqui: <strong><a href="http://localhost:3000/rejectvacations/management/${req.body.id}">Rejeitar</a></strong></p>
              <br><br>
              <p><strong>Invisual Branding Solutions</strong></p>
              `
            }

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                res.status(400).send({ success: false })
              } else {
                res.status(200).send({ success: true });
              }
            });
          }
          else if (Number(req.body.approv) === 0) {
            connection.query('UPDATE vacations SET management_approval = 0 WHERE id_vacation = ?', req.body.id,
              function (error, results, fields) {
                if (error) throw error;
              });
          }

          res.send(results)
        });
    }
  });
})



router.put('/approvevacation/management', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('UPDATE vacations SET management_approval = ? WHERE id_vacation = ?',
        [req.body.approv, req.body.id],
        function (error, results, fields) {
          if (error) throw error;
          if (Number(req.body.approv) === 2) {
            connection.query('UPDATE users SET free_days_user = free_days_user -1 WHERE id_user = ?', req.body.idUser,
              function (error, results, fields) {
                if (error) throw error;

                const transporter = nodeMailer.createTransport({
                  host: 'sv01.invisual.pt',
                  port: 465,
                  secure: true,
                  auth: {
                    user: 'tarefas@invisual.pt',
                    pass: 'lausivni#tarefas'
                  }
                });
    
                const mailOptions = {
                  from: '"TAREFAS INVISUAL" <tarefas@invisual.pt>',
                  to: `${req.body.emailUser}`,
                  subject: 'Pedido de Férias Aprovado !',
                  html: `
                      <h4>Tarefas - Invisual</h4>
                      <br>
                      <p>O seu pedido de férias foi aprovado pela Administração.</p>
                      <p>Boas Férias!</p>
                      <br><br>
                      <p><strong>Invisual Branding Solutions</strong></p>
                      `
                };

                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error);
                    res.status(400).send({ success: false })
                  } else {
                    res.status(200).send({ success: true });
                  }
                });

              });
          }
          else if(Number(req.body.approv) === 0){

            const transporter = nodeMailer.createTransport({
              host: 'sv01.invisual.pt',
              port: 465,
              secure: true,
              auth: {
                user: 'tarefas@invisual.pt',
                pass: 'lausivni#tarefas'
              }
            });

            const mailOptions = {
              from: '"TAREFAS INVISUAL" <tarefas@invisual.pt>',
              to: `${req.body.emailUser}`,
              subject: 'Pedido de Férias Não Aprovado !',
              html: `
                  <h4>Tarefas - Invisual</h4>
                  <br>
                  <p>Lamentamos, mas o seu pedido de férias não foi aprovado pela Administração.</p>
                  <br><br>
                  <p><strong>Invisual Branding Solutions</strong></p>
                  `
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                res.status(400).send({ success: false })
              } else {
                res.status(200).send({ success: true });
              }
            });

          }
          res.send(results)
        });
    }
  });
})



router.get('/vehicles', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    var currYear = new Date().getFullYear()
    if (err) { res.sendStatus(403) }
    else {
      connection.query('SELECT * from vehicles WHERE inactive = 0', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
    }
  });
});


router.get('/trips', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    var currYear = new Date().getFullYear()
    if (err) { res.sendStatus(403) }
    else {
      connection.query('SELECT * from trips INNER JOIN vehicles ON trips.ref_id_vehicle = vehicles.id_vehicle INNER JOIN users ON trips.ref_id_user = users.id_user ORDER BY date_trip ASC', function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        } else {
          res.send('notrips');
        }
      });
    }
  });
});


router.get('/trips/:id', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    var currYear = new Date().getFullYear()
    if (err) { res.sendStatus(403) }
    else {
      connection.query('SELECT * from trips WHERE id_trip = ?', req.params.id, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.send(results);
        } else {
          res.send('notrip');
        }
      });
    }
  });
});


router.post('/trips', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      var kmsDifference = req.body.endKms-req.body.startKms
      connection.query('INSERT INTO trips (start_hour, end_hour, start_kms, end_kms, kms_trip, description_trip, date_trip, ref_id_vehicle, ref_id_user) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.startHour, req.body.endHour, req.body.startKms, req.body.endKms,  Math.round(kmsDifference * 100) / 100, req.body.description, req.body.date, req.body.vehicle, req.body.user],
        function (error, results, fields) {
          if (error) throw error
          res.send(results)
      });
    }
  });
})


router.put('/trips', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      var kmsDifference = req.body.endKms-req.body.startKms
      connection.query('UPDATE trips SET start_hour = ?, end_hour = ?, start_kms = ?, end_kms = ?, kms_trip = ?, description_trip = ?, date_trip = ?, ref_id_vehicle = ? WHERE id_trip = ?',
        [req.body.startHour, req.body.endHour, req.body.startKms, req.body.endKms, Math.round(kmsDifference * 100) / 100, req.body.description, req.body.date, req.body.vehicle, req.body.idTrip],
        function (error, results, fields) {
          if (error) throw error
          res.send(results)
      });
    }
  });
})



router.delete('/trips/:id', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) { res.sendStatus(403) }
    else {
      connection.query('DELETE FROM trips WHERE id_trip=?', req.params.id, function (error, results, fields) {
        if (error) throw error;
        res.send('deleted');
      });
    }
  });
});


module.exports = router;