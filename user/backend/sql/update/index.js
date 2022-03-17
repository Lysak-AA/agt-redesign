module.exports = {
    updateOneColumn(table, column, value, where) {
      let sqlString = `UPDATE ${table} SET ${column}='${value}' WHERE ${where.column}='${where.value}'`;
      return sqlString;
    }
}