    for (var i = 0; i < b.length; i++) {
        for (var j = 0; j < firstStepNumber.length; j++) {
            if (b[i] % firstStepNumber[j] !== 0) firstStepNumber.splice(j, 1);
        }
    }