let input = "68936\n" +
    "53526\n" +
    "62556\n" +
    "115539\n" +
    "119659\n" +
    "77887\n" +
    "101443\n" +
    "71392\n" +
    "130327\n" +
    "56769\n" +
    "55083\n" +
    "101448\n" +
    "63985\n" +
    "60433\n" +
    "80302\n" +
    "101264\n" +
    "134416\n" +
    "112047\n" +
    "143310\n" +
    "73842\n" +
    "124020\n" +
    "50346\n" +
    "124192\n" +
    "119547\n" +
    "59351\n" +
    "122161\n" +
    "103742\n" +
    "107648\n" +
    "132879\n" +
    "65047\n" +
    "70234\n" +
    "54569\n" +
    "72785\n" +
    "120259\n" +
    "134533\n" +
    "61778\n" +
    "89183\n" +
    "144270\n" +
    "68600\n" +
    "134849\n" +
    "120221\n" +
    "126887\n" +
    "128483\n" +
    "101293\n" +
    "78066\n" +
    "141762\n" +
    "101929\n" +
    "119173\n" +
    "148580\n" +
    "142710\n" +
    "142029\n" +
    "61303\n" +
    "133204\n" +
    "120872\n" +
    "141111\n" +
    "124900\n" +
    "73600\n" +
    "73552\n" +
    "138183\n" +
    "147019\n" +
    "63157\n" +
    "127712\n" +
    "83610\n" +
    "59098\n" +
    "101675\n" +
    "57951\n" +
    "146696\n" +
    "135604\n" +
    "75158\n" +
    "140629\n" +
    "106125\n" +
    "142451\n" +
    "59468\n" +
    "69078\n" +
    "115676\n" +
    "69763\n" +
    "129999\n" +
    "97987\n" +
    "64654\n" +
    "104168\n" +
    "67894\n" +
    "92675\n" +
    "125475\n" +
    "110450\n" +
    "52738\n" +
    "87569\n" +
    "91939\n" +
    "117714\n" +
    "121018\n" +
    "140534\n" +
    "97876\n" +
    "146651\n" +
    "105741\n" +
    "140417\n" +
    "74771\n" +
    "141727\n" +
    "94957\n" +
    "145126\n" +
    "61429\n" +
    "143890";


function calcModule(mass) {
    return Math.floor(mass / 3) - 2;
}

function calcTotalModule(mass) {
    let x =0;
    let f=mass;
    while ((f = calcModule(f)) > 0) {
        x+=f;
    }
    return x;
}

/// Test examples
console.assert(calcModule(12) === 2, "first example 1 failed");
console.assert(calcModule(14) === 2, "first example 2 failed");
console.assert(calcModule(1969) === 654, "first example 3 failed");
console.assert(calcModule(100756) === 33583, "first example 4 failed");

console.assert(calcTotalModule(14) === 2, "second example 1 failed");
console.assert(calcTotalModule(1969) === 966, "second example 2 failed");
console.assert(calcTotalModule(100756) === 50346, "second example 3 failed");

let split = input.split("\n");
let total = 0;
for (let i = 0; i < split.length; i++) {
    let n = split[i];
    let m = parseInt(n);

    let f =  calcModule(m);
    total+=f;
    while ((f = calcModule(f)) > 0) {
        total+=f;
    }
}

console.log("Total: " + total);


