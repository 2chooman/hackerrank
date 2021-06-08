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
 * Complete the 'breakingRecords' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY scores as parameter.
 */

function breakingRecords(scores) {
    var minScores = [scores[0]];
    var maxScores = [scores[0]];
    for (var score of scores) {
        minScores.sort(function(a, b) {
            return b - a;
        });
        if (score < minScores[minScores.length - 1]) minScores.push(score);
    }
    for (var score of scores) {
        maxScores.sort(function(a, b) {
            return a - b;
        });
        if (score > maxScores[maxScores.length - 1]) maxScores.push(score);
    }
    return [
        maxScores.slice(1, maxScores.length).length, 
        minScores.slice(1, minScores.length).length
    ];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const scores = readLine().replace(/\s+$/g, '').split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const result = breakingRecords(scores);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
