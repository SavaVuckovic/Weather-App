let currentTemp = 'F';

// check if value is a number
export function isNumber(value) {
  return /^\d+$/.test(value);
}

// check if number is float
export function isFloat(n) {
  return n === +n && n !== (n|0);
}

// convert from fahrenheit to celsius
export function convertTemperature(tempToConvert) {
  let newTemp;
  if (currentTemp === 'F') {
    // fahrenheit to celsius
    newTemp = (tempToConvert - 32) * 5 / 9;
    currentTemp = 'C';
  } else {
    // celsius to fahrenheit
    newTemp = tempToConvert * 9 / 5 + 32;
    currentTemp = 'F';
  }
  // round the temperature if it is float
  if (isFloat(newTemp)) {
    newTemp = newTemp.toFixed(1);
  }

  return newTemp;
}

