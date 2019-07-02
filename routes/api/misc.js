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
          connection.query('INSERT INTO costs (service, provider, cost_provider, price_sale, price_difference, ref_id_task) VALUES(?, ?, ?, ?, ?, ?)',
            [req.body.services[i].input, req.body.providers[i].input, req.body.providerPrices[i].input, req.body.sellPrices[i].input, Math.round(priceDifference * 100) / 100, req.body.taskId],
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
            if (billing === 1 && approval === 2) {
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
            if (billing === 1 && approval === 2) {
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(400).send({ success: false })
                } else {
                  res.status(200).send({ success: true });
                }
              });
            }
          }
        );
        connection.query(
          'UPDATE tasks SET concluded_task=?, billed_task=?, conclusion_date_task = ? WHERE ref_id_project=?', [approval, billing, date, projId],
          function (error, results, fields) {
            if (error) throw error;
            res.send(results)
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
            to: `contabilidade@invisual.pt`,
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
              to: `nuno.carvalho@invisual.pt`,
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

router.get('/approvals', checkToken, (req, res) => {
  
  var totalResults = {};
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      connection.query('Select id_task as id, title_task as title, "task" as type, billed_task as billed_status, name_client, ref_id_user_account AS "account", id_client, conclusion_date_task as conclusion_date from tasks LEFT JOIN clients ON tasks.ref_id_client=clients.id_client WHERE concluded_task=1 AND ref_id_project IS NULL ', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          totalResults.tasks = results;
        } else {
          totalResults.tasks = []
        }
      });
      connection.query('Select id_budget as id, title_budget as title, "budget" as type, name_client, id_client, ref_id_user AS "account", conclusion_date_budget as conclusion_date from budgets LEFT JOIN clients ON budgets.ref_id_client=clients.id_client LEFT JOIN users_has_budgets ON budgets.id_budget = users_has_budgets.ref_id_budget WHERE ref_id_budget_internal_status=3', function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          totalResults.budgets = results;
        } else {
          totalResults.budgets = []
        }
      });
      connection.query('Select id_project as id, title_project as title, "project" as type, billed_project as billed_status, name_client, id_client, ref_id_user_account AS "account", conclusion_date_project as conclusion_date from projects LEFT JOIN clients ON projects.ref_id_client=clients.id_client WHERE concluded_project=1', function(error, results, fields) {
        if (error) throw error;
        totalResults.projects = results;
        if (totalResults.tasks.length > 0 || totalResults.projects.length > 0) {
          res.send(totalResults)
        } else {
          res.send('nodata');
        }
      });
    }
  });
});

router.get('/approvals/:type/:id', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var id = req.params.id
      totalResults = {}
      if(req.params.type === 'task'){
        connection.query(
          'SELECT id_task as id, "task" as type, billed_task as billed, (SELECT avatar_user FROM users INNER JOIN tasks ON users.id_user= tasks.ref_id_user_account WHERE id_task= ?) as avatar_account,(SELECT name_user FROM users INNER JOIN tasks ON users.id_user= tasks.ref_id_user_account WHERE id_task= ?) as name_account, avatar_user, name_user, title_task, title_task as title, creation_date_task, title_project, ref_id_type_task, ref_id_project, name_client, name_task_types, name_billing_mode, tasks.ref_id_billing_mode, description_task,SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) AS "total_hours" from tasks LEFT JOIN users_has_tasks on users_has_tasks.ref_id_task=tasks.id_task LEFT JOIN task_types on task_types.id_task_type=tasks.ref_id_type_task LEFT JOIN aproval_task_status ON aproval_task_status.id_aproval_task_status=tasks.ref_id_aproval_task_status LEFT JOIN user_task_status ON user_task_status.id_user_task_status=users_has_tasks.ref_id_user_task_status LEFT JOIN projects ON tasks.ref_id_project=projects.id_project LEFT JOIN billing_modes ON billing_modes.id_billing_mode=tasks.ref_id_billing_mode LEFT JOIN clients ON clients.id_client=tasks.ref_id_client LEFT JOIN users ON users.id_user=users_has_tasks.ref_id_user LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task where tasks.id_task=?',
          [id, id, id],
          function (error, results, fields) {
            if (error) throwerror;
            if (results.length > 0) { totalResults.details = results }
          }
        );
        connection.query(
          'SELECT * FROM costs WHERE ref_id_task = ?', id, function (error, results, fields) {
            if (error) throwerror;
            if (results.length > 0) { totalResults.costs = results }
          }
        );
        connection.query(
          'SELECT id_task_comment, text_comments, date_comment, name_user from task_comments INNER JOIN users ON task_comments.ref_id_user=users.id_user WHERE ref_id_task= ?',
          id,
          function (error, results, fields) {
            if (error) throwerror;
            totalResults.comments = results;
            if (totalResults.details[0].id_task !== null) { res.send(totalResults) }
            else { res.send('nodata') }
          }
        );
      } else if (req.params.type === 'budget'){
        connection.query(
          'SELECT id_budget as id, "budget" as type, avatar_user, name_user, title_budget, creation_date_budget, name_client, name_potential_client, description_budget, ref_id_budget_internal_status, ref_id_budget_external_status, SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(budget_hours.ending_hour, budget_hours.beginning_hour)))) AS "total_hours" from budgets LEFT JOIN users_has_budgets on users_has_budgets.ref_id_budget=budgets.id_budget LEFT JOIN budget_internal_status ON budget_internal_status.id_budget_internal_status=budgets.ref_id_budget_internal_status LEFT JOIN budget_external_status ON budget_external_status.id_budget_external_status=budgets.ref_id_budget_external_status LEFT JOIN clients ON clients.id_client=budgets.ref_id_client LEFT JOIN potential_clients ON potential_clients.id_potential_client=budgets.ref_id_potential_client LEFT JOIN users ON users.id_user=users_has_budgets.ref_id_user LEFT JOIN budget_hours ON budget_hours.ref_id_budget=budgets.id_budget where budgets.id_budget=?',
          id,
          function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
              totalResults.details = results;
            }
          }
        );
        connection.query(
          'SELECT id_budget_comment, text_comments, date_comment, name_user from budget_comments INNER JOIN users ON budget_comments.ref_id_user=users.id_user WHERE ref_id_budget= ?',
          id,
          function(error, results, fields) {
            if (error) throw error;
            totalResults.comments = results;
            if (totalResults.details[0].id_budget !== null) {
              res.send(totalResults);
            } else {
              res.send('nodata');
            }
          }
        );
      }
      else {
        connection.query(
          "SELECT id_project as id, title_project, title_project as title, billed_project as billed, 'project' as type, (SELECT avatar_user from users INNER join projects ON users.id_user=projects.ref_id_user_account WHERE projects.id_project=?) as avatar_user ,(SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(task_hours.ending_hour, task_hours.beginning_hour)))) from projects LEFT JOIN tasks ON projects.id_project=tasks.ref_id_project LEFT JOIN task_hours ON task_hours.ref_id_tasks=tasks.id_task WHERE id_project = ?) as total_project_hours, creation_date_project, name_client, id_project, briefing_project, deadline_project, concluded_project, projects.ref_id_billing_mode, name_billing_mode, COUNT(DISTINCT(project_comments.id_project_comment)) AS total_comments, COUNT(DISTINCT CASE WHEN tasks.id_task THEN id_task ELSE NULL END) AS total_tasks, COUNT(DISTINCT CASE WHEN users_has_tasks.ref_id_user_task_status=2 OR users_has_tasks.ref_id_user_task_status=3 THEN ref_id_user_task_status ELSE NULL END) as doing, COUNT(DISTINCT CASE WHEN users_has_tasks.ref_id_user_task_status=4 THEN ref_id_user_task_status ELSE NULL END) AS concluded_tasks, COUNT(DISTINCT CASE WHEN users_has_tasks.ref_id_user_task_status=4 THEN ref_id_user_task_status ELSE NULL END)/count(DISTINCT CASE WHEN tasks.id_task THEN id_task ELSE 0 END) *100 AS percentage_tasks, group_concat(DISTINCT users_has_tasks.ref_id_user SEPARATOR ',') as 'user', GROUP_CONCAT(DISTINCT CONCAT(users.id_user,',',users.name_user,',',users.avatar_user) SEPARATOR ';') as intervenientes, group_concat(DISTINCT categories.name_category SEPARATOR ',') as categories FROM projects LEFT JOIN tasks ON projects.id_project=tasks.ref_id_project LEFT JOIN billing_modes ON billing_modes.id_billing_mode=projects.ref_id_billing_mode LEFT JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task LEFT JOIN project_comments ON projects.id_project=project_comments.ref_id_project LEFT JOIN projects_has_categories ON projects.id_project= projects_has_categories.ref_id_project LEFT JOIN categories ON projects_has_categories.ref_id_category = categories.id_category LEFT JOIN users ON users_has_tasks.ref_id_user= users.id_user LEFT JOIN clients ON projects.ref_id_client = clients.id_client WHERE projects.id_project=?", [id, id, id],
          function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
              totalResults.details = results;
            }
          }
        );
        connection.query(
          'SELECT id_project_comment, text_comment, date_comment, name_user from project_comments INNER JOIN users ON project_comments.ref_id_user=users.id_user WHERE ref_id_project= ?',
          id,
          function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
              totalResults.comments = results;
            }
          }
        );
        connection.query(
          'SELECT * FROM costs WHERE ref_id_project = ?', id, function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) { totalResults.costs = results }
          }
        );
        connection.query(
          'SELECT id_task, title_task, ref_id_user_task_status, id_user, avatar_user, name_user FROM tasks INNER JOIN users_has_tasks ON tasks.id_task=users_has_tasks.ref_id_task INNER JOIN users ON users_has_tasks.ref_id_user= users.id_user INNER JOIN projects ON tasks.ref_id_project = projects.id_project WHERE projects.id_project=?',
          id,
          function(error, results, fields) {
            if (error) throw error;
            totalResults.tasks = results;
            if (totalResults.details[0].id_project !== null) {
              res.send(totalResults);
            } else {
              res.send('nodata');
            }
          }
        );
      }
      
    }
  });
});

router.put('/approvals', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var id = req.body.id
      var type = req.body.type
      var billing = req.body.billing
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
          link = id
          break;
        case 'project':
          subject = 'Novo Projeto para Faturação'
          body = `O Projeto '${title}' foi processado e definido como '${mode}'.`
          link = id
          
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
          'UPDATE tasks SET concluded_task=2, date_approved_task = ?, user_approved_task = ? WHERE id_task=?',
          [date, user, id],
          function(error, results, fields) {
            if (error) throw error;
            if (billing === 1 ) {
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
      else if (type === 'project'){
        connection.query(
          'UPDATE projects SET concluded_project=2, date_approved_project = ?, user_approved_project = ? WHERE id_project=?',
          [date, user, id],
          function(error, results, fields) {
            if (error) throw error;
            connection.query(
              'UPDATE tasks SET concluded_task=2, date_approved_task = ?, user_approved_task = ? WHERE ref_id_project=?', [date, user, id],
              function (error, results, fields) {
                if (error) throw error;
              }
            )
            if (billing === 1 ) {
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
          'UPDATE budgets SET ref_id_budget_internal_status=4, date_approved_budget = ?, user_approved_budget = ? WHERE id_budget=?',
          [date, user, id],
          function(error, results, fields) {
            if (error) throw error;
            res.send(results);
          }
        );
      }
    }
  });
});

router.put('/approvals/reject', checkToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, results) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var id = req.body.id
      var type = req.body.type
      if (type === 'task') {
        connection.query(
          'UPDATE tasks SET concluded_task=0, billed_task=NULL, comment_billed_task=NULL, user_billed_task = NULL, conclusion_date_task = NULL WHERE id_task=?', id,
          function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
              res.send(results);
            } else {
              res.send('nodata');
            }
          }
        );
      }
      else if (type === 'project'){
        connection.query(
          'UPDATE projects SET concluded_project=0, billed_project=NULL, comment_billed_project=NULL, user_billed_project = NULL, conclusion_date_project = NULL WHERE id_project=?', id,
          function (error, results, fields) {
            if (error) throw error;
            connection.query(
              'UPDATE tasks SET concluded_task=0, conclusion_date_task = NULL WHERE ref_id_project=?', id,
              function (error, results, fields) {
                if (error) throw error;
                res.send(results)
              }
            );
          }
        );
      }
      else {
        connection.query(
          'UPDATE budgets SET ref_id_budget_internal_status=1 WHERE id_budget=?',
          id,
          function(error, results, fields) {
            if (error) throw error;
            res.send(results);
          }
        );
      }
    }
  });
});



module.exports = router;