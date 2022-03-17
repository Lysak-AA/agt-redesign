module.exports = {
    deleteOneRow(table, id) {
      console.log('sql')
      return `DELETE FROM ${table} WHERE id='${id}'`;
    },
  };