const fs = require("fs");

module.exports = {
  grabAllFilesInModule(obj, path, exept) {
    return fs
      .readdirSync(path)
      .filter((file) => file !== exept)
      .forEach((file) => {
        let property = file.replace(".js", "").trim();
        Object.defineProperty(obj, property, {
          value: require(`${path}/${file}`),
          enumerable: true,
        });
      });
  },
  dateFormat(nextDay, periodLength){
    let period = {
      checkInDate: null,
      checkOutDate: null
    }
    let date = new Date();
    let day = date.getDate();
    let mounth = date.getMonth();
    let year = date.getFullYear();

    if(nextDay){
      day++;
    }

    if(day < 10){
        day = `0${day}`;
    }
    mounth++;
    if(mounth < 10){
        mounth = `0${mounth}`;
    }

    period.checkInDate = `${year}-${mounth}-${day}`;

    day = +day + periodLength;
    
    if(+mounth === 1 || +mounth === 3 || +mounth === 5 || +mounth === 7 || +mounth === 8 || +mounth === 10 || +mounth === 12){
      if(+day > 31){
        day = +day - 31;
        +mounth++;
        if(mounth < 10){
          mounth = `0${mounth}`;
        }
      }
    } else if(+mounth === 2){
      if(+day > 28){
        day = +day - 28;
        +mounth++;
        if(mounth < 10){
          mounth = `0${mounth}`;
        }
      }
    } else {
      if(+day > 30){
        day = +day - 30;
        +mounth++;
        if(mounth < 10){
          mounth = `0${mounth}`;
        }
      }
    }

    period.checkOutDate = `${year}-${mounth}-${day}`;

    return period;
  }
};
