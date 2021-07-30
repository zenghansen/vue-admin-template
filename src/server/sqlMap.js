//sqlMap.js
var sqlMap = {
  //buyStatus
  status: {
    search: 'SELECT\n' +
      'ids_id,\n' +
      'sum( IF ( is_succ = 1, 1, 0 ) ) AS succ,\n' +
      'sum( IF ( is_succ = 0, 1, 0 ) ) AS fail,\n' +
      'sum(buy_snum) as num,\n' +
      'sum(buy_snum * (0.5+(seting_price - act_price))) AS gain,\n' +
      'DATE_FORMAT( create_time, \'%Y-%m-%d\' ) AS d \n' +
      'FROM\n' +
      'dnf_buylog \n' +
      'WHERE\n' +
      'ids_id = ? \n' +
      'GROUP BY\n' +
      'DATE_FORMAT( create_time, \'%Y-%m-%d\' ) \n' +
      'ORDER BY\n' +
      'id DESC \n' +
      'limit ?,?', //查找读者信息
    count:'SELECT\n' +
      'count( 1 ) as total\n' +
      'FROM\n' +
      '( SELECT count( 1 ) FROM dnf_buylog WHERE ids_id = ? GROUP BY DATE_FORMAT( create_time, \'%Y-%m-%d\' ) ) a'
  },
  priceTread:{
    search:'SELECT *,DATE_FORMAT(create_time,\'%H:%i\') as  h from (SELECT * from dnf_pricetrend where gzone_id = ?  order by id desc  limit ?) a  order by id '
  }
}
module.exports = sqlMap;
