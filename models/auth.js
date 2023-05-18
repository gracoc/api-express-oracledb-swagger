const fs = require('fs');
const oracledb = require('oracledb');
const {configdb} = require('../config/db.js');


const loginUser = async function(usr) {
    let connection, binds, options, result, sql;    

    sql = `SELECT * FROM usuario where login=:1  `; 
    try {
        connection = await oracledb.getConnection(configdb);          
        binds = [
            usr
        ];
        options = {
                outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
                // extendedMetaData: true,               // get extra metadata
                // prefetchRows:     100,                // internal buffer allocation size for tuning
                // fetchArraySize:   100                 // internal buffer allocation size for tuning
        };

        result = await connection.execute(sql, binds, options);
        return result;

    } catch (error) {
        throw new Error(error);
      } finally {
        if (connection) {
          try { await connection.close(); }
          catch (err) {         
            throw new Error(err.stack);
          }
        }
      }
} ;


module.exports = {
  loginUser
}