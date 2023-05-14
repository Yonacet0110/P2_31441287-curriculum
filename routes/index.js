const express = require('express');
const router = express.Router();


const sqlite = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


const tabla = "CREATE TABLE mensajes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50) NOT NULL, email TEXT NOT NULL, mensaje TEXT, fechahora TEXT NOT NULL, ip TEXT);", datos = "INSERT INTO mensajes (nombre, email, mensaje, fechahora, ip) VALUES(?, ?, ?, ?, ?);"

const database = new sqlite.Database(':memory:', (err)=>{
  database.run(tabla);
});

router.post('/', (req, res)=>{

  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let fechaHora = new Date();
  let fh = fechaHora.toLocaleString();
  let ip_ls = ip.split(',');
  ip = ip_ls[ip_ls.length - 1];
  
  let inputs = [req.body.nombre, req.body.email, req.body.mensaje, fh, ip];

  database.run(datos, inputs, (err)=>{
    res.render('index');
    console.log(inputs);
  });
  
});

module.exports = router;