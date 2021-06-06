'use strict';

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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
    var padNumber = function (num) {
        if (String(num).length == 1) {
            return (num + ".000000").slice(0, 8);
        }
        if (String(num).length < 8) {
            return (num + "00000").slice(0, 8);
        } else {
            return String(num.toFixed(6));
        }
    }
    var positive = [];
    var negative = [];
    var zero = [];
    for (var el of arr) {
        if (el > 0) positive.push(el);
        if (el < 0) negative.push(el);
        if (el == 0) zero.push(el);
    }
    console.log(padNumber(positive.length / arr.length));
    console.log(padNumber(negative.length / arr.length));
    console.log(padNumber(zero.length / arr.length));


}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr);
}
