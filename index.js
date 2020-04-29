const readlineSync = require ('readline-sync');

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

function unique(arr) {
  return Array.from(new Set(arr));
}

function readValues(name) {
  let string = readlineSync.question (`Input the ${name} values (space separated): `);
  return string;
}

function attempt(available, allowed, preffered) {
  let arrReturns = [];
  let temp = [];

//ОПРАЦЮВАННЯ ВИПАДКІВ З 'any'

  let arrAvailableTemp = available.split(' ');
  let arrAllowedTemp = allowed.split(' ');
  let arrPrefferedTemp = preffered.split(' ');

  if ( arrPrefferedTemp.includes('any') ) {
    for (let item of arrAvailable) {
      if ( arrAllowedTemp.includes(item) ) {
        arrReturns.push(+item);
      }
    }
    return arrReturns;
  }
  if ( arrAllowedTemp.includes('any') ) {
    for (let item of arrPreffered) {
      if ( arrAvailableTemp.includes(item) ) {
        arrReturns.push(+item);
      }
    }
    return arrReturns;
  }

//ТУТ ОПРАЦЬОВУЄМО РЕЗУЛЬТАТИ !ЛИШЕ! З ЦИФРОВИМИ ЗНАЧЕННЯМИ

  let arrAvailable = arrAvailableTemp.map( item => +item ).sort(compareNumeric);
  let arrAllowed = arrAllowedTemp.map( item => +item ).sort(compareNumeric);
  let arrPreffered = arrPrefferedTemp.map( item => +item ).sort(compareNumeric);

  console.log('Available:', arrAvailable);
  console.log('Allowed:', arrAllowed);
  console.log('Preffered:', arrPreffered);

  for (let value of arrPreffered) {
    if ( arrAvailable.includes(value) && arrAllowed.includes(value) ) {
      arrReturns.push(value);
    } else {
      for (let item of arrAllowed) {
        if ( arrAvailable.includes(item) ) {
          temp.push(Number(item));
        }
      }
      if (temp.length == 0) {
        break;
      } else {
        arrReturns.push( Math.max(...temp) );
        break;
      }
    }
  }

  if (arrReturns.length == 0) {
    for ( let item of arrAllowed.reverse() ) {
      if ( arrAvailable.includes(item) ) {
        arrReturns.push(item);
        break;
      }
    }
  }

  return arrReturns;
}

function main() {
  let available = readValues("Available");
  let allowed = readValues("Allowed");
  let preffered = readValues("Preffered");

  let result = attempt(available, allowed, preffered);
  console.log('Returns:', unique( result.sort(compareNumeric) ) );
}

 main();
