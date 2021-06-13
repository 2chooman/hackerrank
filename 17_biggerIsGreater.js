'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */

Array.prototype.equals = function (array) {
    if (!array) return false;
  
    if (this.length != array.length) return false;
  
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].equals(array[i])) return false;
      } else if (this[i] != array[i]) {
        return false;
      }
    }
    return true;
  };
  
  var a = 96;
  var charArray = {};
  for (var i = 1; i < 27; i++) charArray[i] = String.fromCharCode(a + i);
  
  function shuffle(array, word) {
    var fact = function (num) {
      var value = 1;
      for (var i = 2; i <= num; i++) {
        value *= i;
      }
      return value;
    };
  
    var arrayToNum = Number(array.join(""));
    var arrayUniqueNums = array.slice(0);
  
    for (var i = 0; i < arrayUniqueNums.length; i++) {
      var elemIndex = arrayUniqueNums.indexOf(arrayUniqueNums[i]);
      if (elemIndex > -1 && elemIndex !== i) {
        arrayUniqueNums.splice(elemIndex, 1);
        i--;
      }
    }
  
    var repeatedNumbers =
      array.length - arrayUniqueNums.length === 0
        ? 0
        : array.length - arrayUniqueNums.length + 1;
    var lengthToShuffle = fact(array.length) / fact(repeatedNumbers);
  
    var shuffleList = [];
    var step = 0;
    while (shuffleList.length < lengthToShuffle) {
      var m = array.length,
        t,
        i;
  
      while (m) {
        i = Math.floor(Math.random() * m--);
  
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
  
      if (
        !shuffleList.some(function (elem) {
          return elem.equals(array);
        })
      ) {
        shuffleList[step] = array.slice(0);
        step++;
      }
    }
  
    var shuffleAssoc = {};
    for (var elem of shuffleList) {
      shuffleAssoc[
        elem
          .map(function (num) {
            return charArray[num];
          })
          .join("")
      ] = elem;
    }
  
    var sortedKeys = Object.keys(shuffleAssoc).sort();
    var sortedAssoc = [];
    for (var key of sortedKeys) {
      var obj = {};
      obj[key] = shuffleAssoc[key];
      sortedAssoc.push(obj);
    }
  
    for (var i = 0; i < sortedAssoc.length; i++) {
      if (sortedAssoc[i][word] && i < sortedAssoc.length - 1)
        for (var key in sortedAssoc[i + 1]) return key;
    }
  
    return "no answer";
  }
  
  function biggerIsGreater(w) {
    var array = [];
    for (var letter of w.split("")) {
      for (var char of Object.keys(charArray)) {
        if (charArray[char] === letter) array.push(Number(char));
      }
    }
    return shuffle(array, w);
  }


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        const result = biggerIsGreater(w);

        ws.write(result + '\n');
    }

    ws.end();
}
