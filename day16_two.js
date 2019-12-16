let input = "59766977873078199970107568349014384917072096886862753001181795467415574411535593439580118271423936468093569795214812464528265609129756216554981001419093454383882560114421882354033176205096303121974045739484366182044891267778931831792562035297585485658843180220796069147506364472390622739583789825303426921751073753670825259141712329027078263584903642919122991531729298497467435911779410970734568708255590755424253797639255236759229935298472380039602200033415155467240682533288468148414065641667678718893872482168857631352275667414965503393341925955626006552556064728352731985387163635634298416016700583512112158756656289482437803808487304460165855189";
let basePattern = [0, 1, 0, -1];

// let process = require("process");

function proc(inp,n=100, m = 1) {
    let length = inp.length*m;
    let phase = [];
    let lastPhase = [];
    for (let j = 0; j < n; j++) {
        console.log("#"+j)

        for (let i = 0; i < length; i++) {
            // process.stdout.cursorTo(0);
            process.stdout.write(i+"/"+length+"\r");


            let pattern = [];
            for (let k = 0; k <basePattern.length; k++) {
                for (let l = 0; l < i + 1; l++) {
                    pattern.push(basePattern[k]);
                }
            }
            // pattern.shift();

            // console.log("Pattern: "+pattern);
            // console.log("Phase: "+phase);
            let p =0;
            for (let k = 0; k < length; k++) {
                // console.log(inp[k%inp.length]+" * "+pattern[((1+k)%pattern.length)])
                let m = inp[k%inp.length]*pattern[((1+k)%pattern.length)];
                p+=m;
            }

            let x = p + "";
            let x1 = x[x.length - 1];
            phase[i] = parseInt(x1);
            // console.log(phase[i]);

        }
        process.stdout.write("\n"); // end the line


        console.log(phase.join(""));

        inp = phase;
        lastPhase = phase;
        phase = []
    }

    return lastPhase.join("");
}

function processWithOffset(inp, n=100, m=1) {
    let s = inp.join("").substring(0, 7);
    console.log(s)
    let offset = parseInt(s);
    console.log("offset: "+offset)

    let p = proc(inp, n, m);
    console.log(p);


    return p.substring(offset);
}

// console.assert(process("12345678".split("").map(Number), 1) === "48226158");
// console.assert(process("12345678".split("").map(Number), 2) === "34040438");
// console.assert(process("12345678".split("").map(Number), 3) === "03415518");
// console.assert(process("12345678".split("").map(Number), 4) === "01029498");
//
// console.assert(process("80871224585914546619083218645595".split("").map(Number), 100).substring(0, 8) === "24176176");
// console.assert(process("19617804207202209144916044189917".split("").map(Number), 100).substring(0, 8) === "73745418");
// console.assert(process("69317163492948606335995924319873".split("").map(Number), 100).substring(0, 8) === "52432133");

let n = processWithOffset("03036732577212944063491565474664".split("").map(Number),100,10000)
console.log(n)

// TODO: multi-thread

// let inp = input.split("").map(Number);
// let p = process(inp, 100);
// console.log(p);
// console.log(p.substring(0, 8));
