const readline = require("readline-sync");

let input = "3,8,1001,8,10,8,105,1,0,0,21,42,67,84,109,126,207,288,369,450,99999,3,9,102,4,9,9,1001,9,4,9,102,2,9,9,101,2,9,9,4,9,99,3,9,1001,9,5,9,1002,9,5,9,1001,9,5,9,1002,9,5,9,101,5,9,9,4,9,99,3,9,101,5,9,9,1002,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,102,4,9,9,101,2,9,9,102,4,9,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,101,5,9,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,99";

function processSection(inp, pos, inputProvider, outputCallback) {
    let opcode = inp[pos];
    console.log(opcode);

    let o = 0;

    let action = 0;
    let modes = [0,0,0,0];
    if (opcode.length === 1) {
        action = parseInt(opcode);
    } else {
        action = parseInt(opcode.substring(opcode.length - 2));
        let j=0;
        for (let i = opcode.length - 3; i >= 0; i--) {
            modes[j++]=parseInt(opcode[i]);
        }
    }
    console.log("op: " + action);
    console.log("modes: "+modes)

    if (action === 1) {
        let a = get(inp, pos + 1, modes[0]);
        let b = get(inp, pos + 2, modes[1]);
        console.log(a + "+" + b);
        let v =  a + b;
        set(inp, pos + 3, v, modes[2]);
        return 4;
    } else if (action === 2) {
        let a = get(inp, pos + 1, modes[0]);
        let b = get(inp, pos + 2, modes[1]);
        console.log(a + "*" + b);
        let v = a*b;
        set(inp, pos + 3, v, modes[2]);
        return 4;
    } else if (action === 3) {
        let response = inputProvider();
        // let response = readline.question("[input]:");
        set(inp, pos + 1, parseInt(response), modes[0]);
        return 2;
    } else if (action === 4) {
        let v = get(inp, pos + 1, modes[0]);
        console.log("[output]: " + v);
        outputCallback(v, o++);
        return 2;
    } else if(action===5) {
        let v = get(inp, pos + 1, modes[0]);
        if (v !== 0) {
            return [get(inp, pos + 2, modes[1])];
        }
        return 3;
    }else if(action===6) {
        let v = get(inp, pos + 1, modes[0]);
        if (v === 0) {
            return [get(inp, pos + 2, modes[1])];
        }
        return 3;
    }else if(action===7) {
        let a = get(inp, pos + 1, modes[0]);
        let b = get(inp, pos + 2, modes[1]);
        if (a < b) {
            set(inp, pos + 3, 1, modes[2]);
        }else{
            set(inp, pos + 3, 0, modes[2]);
        }
        return 4;
    }else if(action===8){
        let a = get(inp, pos + 1, modes[0]);
        let b = get(inp, pos + 2, modes[1]);
        if (a === b) {
            set(inp, pos + 3, 1, modes[2]);
        }else{
            set(inp, pos + 3, 0, modes[2]);
        }
        return 4;
    }else if(action===99){
        return 0;
    }else{
        throw new Error("Invalid op: " + action + ", pos " + pos);
    }
}

function get(inp, pos, mode = 0) {
    if (mode === 0) {
        // forgot wrapping this in another parseInt first, so + just added the character to the string :facepalm:
        return parseInt(inp[parseInt(inp[parseInt(pos)])]);
    }
    if (mode === 1) {
        return parseInt(inp[pos]);
    }
    throw new Error("Invalid Get Mode: " + mode);
}

function set(inp, pos, val, mode = 0) {
    if (mode === 0) {
        inp[parseInt(inp[pos])] = ""+ val;
    } else if (mode === 1) {
        inp[pos] = ""+ val;
    } else
        throw new Error("Invalid Set Mode: " + mode);
}



function process0(input, inputParams=[]) {
    let inp = typeof input === "string" ? input.split(",") : input;

    console.log("in: " + inp.join(","));

    let i=0;
    let outp = [];

    let pos = 0;
    let v;
    while ((v = inp[pos]) != 99 && v !== undefined) {
        let r = processSection(inp, pos, function () {
            return inputParams[i++];
        },function (out, outIndex) {
            outp[outIndex]=out;
        });
        if(typeof r==="number"){// increase
            pos += r;
        }else {// jump
            pos = r[0];
        }
    }
    console.log("last pos: " + pos);
    console.log("last value: " + v);

    console.log("out: " + inp.join(","));

    return outp;
}

function process(inp) {
    let o =process0(input, inp);
    return o[0];
}

// This from https://dev.to/jbristow/advent-of-code-2019-solution-megathread-day-7-amplification-circuit-1fpl
function day7part1()
{
    let highest = 0;
    for(let a = 0; a < 5; a++)
    {
        let ainp = process([a, 0]);
        for(let b = 0; b < 5; b++)
        {
            if(b == a)
            {
                continue;
            }
            let binp = process([b, ainp]);
            for(let c = 0; c < 5; c++)
            {
                if(c == b || c == a)
                {
                    continue;
                }
                let cinp = process([c, binp]);
                for(let d = 0; d < 5; d++)
                {
                    if(d == a || d == b || d == c)
                    {
                        continue;
                    }
                    let dinp = process([d, cinp]);
                    for(let e = 0; e < 5; e++)
                    {
                        if(e == a || e == b || e == c || e == d)
                        {
                            continue;
                        }
                        let outp = parseInt(process([e, dinp]), 10);
                        if(outp > highest)
                        {
                            highest = outp;
                        }
                    }
                }
            }
        }
    }

    return highest;
}


let h =day7part1();
console.log(h);
