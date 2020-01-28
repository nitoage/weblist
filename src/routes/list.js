var express = require('express');
var router = express.Router();
var mssql = require('mssql');

/* DataBase接続情報 */
var config = {
  user: 'sa',
  password: 'XXXX',
  server: 'ホスト名\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
  database: 'Sample001',
  stream: true, // You can enable streaming globally

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
}

/* GET home page. */
router.get('/list', function(req, res, next) {
  mssql.connect(config).then(() => {
    return mssql.query`select * from mytable where id = ${value}`
  }).then(result => {
      let tables = [];
      for (let row in result ){
        tables.push(
          {
            id:"B0000000",
            table_name:"BAS_COP_CPL_LINE",
            status:"00",
            job_date:"2020/01/25"
          }
        );
      }
      res.render('list', { tables: tables});
  }).catch(err => {
      // ... error checks
      console.log(err);
      res.render('list', { tables: []});
  });
  
  mssql.on('error', err => {
      // ... error handler
      console.log(err);
      res.render('list', { tables: []});
  });
});

/* reRun API. */
router.get('/list/rerun/:tableName', function(req, res, next) {
  let tableName = req.params.tableName;
  mssql.connect(config).then(() => {
    let tran = new mssql.Transaction();
    tran.begin(function(err) {
      var request = new mssql.Request(tran); // or: var request = connection.request();
      request.query('UPDATE XXX SET status = "00" where tablename = ' + tableName);//UPDATE文に書き換え
      request.on('done', function(returnValue) {
          console.log(returnValue);
          tran.commit(function(err, ret) { // or rollback
            console.log('Transaction Commit Update Succses.');
            res.redirect('/list');
          });
      });
      request.on('error', err => {
        tran.rollback();
        console.log('Transaction Commit Update Faild.');
        console.log(err);
        res.redirect('/list');
      });
    });
  }).catch(err => {
    // ... error checks
    console.log(err);
    res.render('list', { tables: []});
  });
});

module.exports = router;