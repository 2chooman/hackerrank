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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
    var arrOfSum = [];
    for (var i = 0; i < arr.length; i++) {
        var iterSum = 0;
        for (var el of arr) {
            iterSum += el;
        }
        arrOfSum.push(iterSum - arr[i]);
    }
    arrOfSum.sort(function(a, b) {
        return b - a;
    });
    console.log(arrOfSum[arrOfSum.length - 1], arrOfSum[0]);
}

function main() {

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
