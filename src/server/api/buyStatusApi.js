//userApi.js
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()


var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json({code: 20000, data: ret})
  }
}


router.get('/search', (req, res) => {
  var sql = $sql.status.search
  var params = req.query
  var start = (params.pageNumber - 1) * params.pageSize
  conn.query(sql, [parseInt(params.uid), parseInt(start), parseInt(params.pageSize)], function (err, result) {

    if (err) {
      console.log(err)
    }
    if (result) {

      var data = {}
      data.row = result

      //查询条数
      var sql = $sql.status.count
      conn.query(sql, [parseInt(params.uid)], function (err, result) {

        if (err) {
          console.log(err)
        }
        if (result) {
          console.log(result)
          data.total = result[0].total
          console.log(data)
          jsonWrite(res, data)

        }
      })

    }
  })
})


module.exports = router
