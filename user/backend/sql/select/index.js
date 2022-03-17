module.exports = {
  selectItemByOneValue(table, column, value) {
    let sqlString = `SELECT * FROM ${table} `;
    if (!column) {
      console.log(sqlString)
      return sqlString;
    } 
    else {
      sqlString += `WHERE ${column}='${value}'`;
      return sqlString;
    }
  },
  selectItemsByMultipleVals(table, column, values) {
    let vals = ``;
    values.forEach(value => {
      vals += "'" + value + "',";
    });
    let reg = new RegExp(",$");
    vals = vals.replace(reg, "");
    let sqlString = `SELECT * FROM ${table} WHERE ${column} IN (${vals})`;
    return sqlString;
  },
  selectOneColumn(table, column, col, val){
    let sqlString = `SELECT ${column} FROM ${table} `;
    if(!col){
      return sqlString
    } else {
      sqlString += `WHERE ${col}='${val}'`;
      return sqlString;
    }
  }
};
