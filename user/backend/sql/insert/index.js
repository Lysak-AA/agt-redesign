module.exports = {
  insertOneRow(table, valuesObj) {
    let keys = "";
    let values = "";

    for (key in valuesObj) {
      keys += key + ", ";
    }

    keys += "register_date, update_date";

    for (key in valuesObj) {
      values += `'${valuesObj[key]}', `;
    }

    values += "now(), now()";

    let sqlString = `INSERT INTO ${table} (${keys}) VALUES (${values})`;

    return sqlString;
  },
  insertMultipleRows(table, arrayOfInserts) {
    let keys = "";
    let arrayOfValues = [];

    for (key in arrayOfInserts[0]) {
      keys += key + ", ";
    }

    keys += "register_date, update_date";

    arrayOfInserts.forEach((obj) => {
      let value = "";
      for (key in obj) {
        value += `'${obj[key]}', `;
      }
      value += "now(), now()";
      arrayOfValues.push(`(${value})`);
      value = "";
    });

    let stringFromArrayOfValues = "";

    arrayOfValues.forEach((obj, index) => {
      if (arrayOfValues.length - index < 2) {
        stringFromArrayOfValues += obj;
      } else {
        stringFromArrayOfValues += obj + ", ";
      }
    });

    let sqlString = `INSERT INTO ${table} (${keys}) VALUES ${stringFromArrayOfValues};`;

    return sqlString;
  },
};
