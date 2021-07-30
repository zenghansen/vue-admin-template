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
  var sql = $sql.priceTread.search
  var params = req.query
  conn.query(sql, [parseInt(params.gzone_id), parseInt(params.limit)], function (err, result) {

    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)

      var data = {}
      var h = result.map((item, index) => {
        return item.h+"->"+item.price1
      })
      var count1 = result.map((item, index) => {
        return parseInt(item.count1/10000)
      })
      var count2 = result.map((item, index) => {
        return parseInt(item.count2/10000)
      })
      var count3 = result.map((item, index) => {
        return parseInt(item.count3/10000)
      })
      var count4 = result.map((item, index) => {
        return parseInt(item.count4/10000)
      })
      var price = result.map((item, index) => {
        return {name: '年最高', value: item.price1, xAxis: 6000, yAxis:index }
      })
      data.xAxisData = h
      data.price1Data = count1
      data.price2Data = count2
      data.price3Data = count3
      data.price4Data = count4
      data.price = price
      jsonWrite(res, data)


    }
  })
})


module.exports = router
