const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'gz-cynosdbmysql-grp-qjr10gl7.sql.tencentcdb.com',
    port: "27487",
    user: 'root',
    password: '1095731371ldy.',
    database: 'shop'
})

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = { query }