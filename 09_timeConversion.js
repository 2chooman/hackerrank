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
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {
    var timeDigits = s.slice(0, 8);
    var timeParts = s.slice(8);
    var timeArray = timeDigits.split(":");
    if (timeParts === "PM" && timeArray[0] !== "12") {
        timeArray[0] = Number(timeArray[0]) + 12;
    }
    if (timeParts === "AM" && timeArray[0] === "12") {
        timeArray[0] = String((Number(timeArray[0]) - 12)).padEnd(2, 0);
    }
    timeDigits = timeArray.join(":");
    return timeDigits;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}
