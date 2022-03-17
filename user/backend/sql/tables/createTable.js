const createTable = function (name, fields, primary = "id", unique, foreign) {
  let tableFields = "";

  let register_date = `register_date DATETIME, `;
  let update_date = `update_date DATETIME`;
  let primaryKey = `PRIMARY KEY (${primary})`;
  let uniqueKey = `UNIQUE KEY (${unique})`;
  let foreignKey;
  if (foreign) {
    foreignKey = `FOREIGN KEY(${foreign.key}) REFERENCES ${foreign.references}`;
  }

  fields.forEach((el) => {
    if (el.specialCondition) {
      let str = el.name + " " + el.type + " " + el.specialCondition + ", ";
      tableFields += str;
    } else {
      let str = el.name + " " + el.type + ", ";
      tableFields += str;
    }
  });

  tableFields += register_date;
  tableFields += update_date;

  if (primary) {
    tableFields += `, ${primaryKey}`;
    if (unique) {
      tableFields += ", " + uniqueKey;
    }
    if (foreign) {
      tableFields += ", " + foreignKey;
    }
  } else {
    tableFields += `, ${uniqueKey}`;
  }

  let sqlStringStart = `CREATE TABLE IF NOT EXISTS ${name}(${tableFields})`;

  return sqlStringStart;
};

module.exports = createTable;
