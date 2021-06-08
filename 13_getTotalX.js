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
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function getTotalX(a, b) {
    var distance = [];
    
    // get the distance between arrays
    for (var i = 0; i < a.length; i++) {
        var j = 1;
        var rankMultiplied = 0;
        do {
            rankMultiplied = a[i] * j;
            distance.push(rankMultiplied);
            j++;
        } while (rankMultiplied < b[0]);
    }

    // sort the distance
    distance.sort(function(a, b) {
        return a - b;
    });

    // remove duplicates from the distance
    for (var i = 0; i < distance.length; i++) {
        var elemIndex = distance.indexOf(distance[i]);
        if (elemIndex > -1 && elemIndex !== i) {
            distance.splice(elemIndex, 1);
            i--;
        }
    }
    
    var verifyFactor = function (divider, divident, step) {
        var nonFactors = [];
        for (var i = 0; i < divident.length; i++) {
            for (var j = 0; j < divider.length; j++) {
                if (divident[i] % divider[j] !== 0) nonFactors.push(step == 1 ? divident[i] : divider[j]);
            }
        }
        // remove non-factor numbers from output array
        var factors = function (array) {
            return array.filter(function (elem) {
                return nonFactors.indexOf(elem) < 0;
            });
        };
        
        return factors(step == 1 ? divident : divider);
    };

    distance = verifyFactor(a, distance, 1);
    return verifyFactor(distance, b, 2).length;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total = getTotalX(arr, brr);

    ws.write(total + '\n');

    ws.end();
}
