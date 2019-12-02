let input = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,9,19,23,1,13,23,27,1,5,27,31,2,31,6,35,1,35,5,39,1,9,39,43,1,43,5,47,1,47,5,51,2,10,51,55,1,5,55,59,1,59,5,63,2,63,9,67,1,67,5,71,2,9,71,75,1,75,5,79,1,10,79,83,1,83,10,87,1,10,87,91,1,6,91,95,2,95,6,99,2,99,9,103,1,103,6,107,1,13,107,111,1,13,111,115,2,115,9,119,1,119,6,123,2,9,123,127,1,127,5,131,1,131,5,135,1,135,5,139,2,10,139,143,2,143,10,147,1,147,5,151,1,151,2,155,1,155,13,0,99,2,14,0,0";

function processSection(inp, pos) {
    let action = parseInt(inp[pos]);
    let inAPos = parseInt(inp[pos + 1]);
    let inBPos = parseInt(inp[pos + 2]);
    let outPos = parseInt(inp[pos + 3]);
    let inA = parseInt(inp[inAPos]);
    let inB = parseInt(inp[inBPos]);

    if (action === 1) {
        inp[outPos] = inA + inB;
    } else if (action === 2) {
        inp[outPos] = inA * inB;
    }else{
        // console.warn("unknown action: "+action)
    }

    return inp;
}


function process(input) {
    let inp = typeof input === "string" ? input.split(",") : input;

    console.log("in: " + inp.join(","));

    let pos = 0;
    let v;
    while ((v = inp[pos]) !== 99&&v!==undefined) {
        processSection(inp, pos);
        // console.log(pos);
        // console.log(v);
        // console.log(inp.join(","));
        pos += 4;
    }

    console.log("out: " + inp.join(","));

    return inp;
}

function processAndGetResult(input, resultPos) {
    return process(input)[resultPos];
}


// Examples
console.assert(processAndGetResult("1,0,0,0,99", 0) === 2);
console.assert(processAndGetResult("2,3,0,3,99", 3) === 6);
console.assert(processAndGetResult("2,4,4,5,99,0", 5) === 9801);
console.assert(processAndGetResult("1,1,1,4,99,5,6,0,99", 0) === 30);


for (let i = 0; i < 99; i++) {
    for (let j = 0; j < 99; j++) {
        let inputSplit = input.split(",");
        inputSplit[1] = ""+i;
        inputSplit[2] = ""+j;

        let out = processAndGetResult(inputSplit, 0);
        if (out === 19690720) {
            console.log("i: "+i)
            console.log("j: "+j);
            console.log("out: " + out);

            console.log(100 * i + j);
            return;
        }
    }
}
