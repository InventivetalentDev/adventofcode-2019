let min = 272091;
let max = 815432;


function hasTwoAdjacentDigitsButNoMoreThanTwo(numStr) {
    let c = 0;
    let p = 0;
    let prev = "";
    for (let i = 0; i < 6; i++) {
        if (numStr[i] === prev) {
            c++;
            if (c === 1) p++;
            if (c === 2) p--;
        } else {
            prev = numStr[i];
            c = 0;
        }
    }
    return p > 0;
}

function hasNoDecrease(numStr) {
    for (let i = 1; i < 6; i++) {
        if (parseInt(numStr[i]) < parseInt(numStr[i - 1])) {
            return false;
        }
    }
    return true;
}


// Examples
console.assert(hasTwoAdjacentDigitsButNoMoreThanTwo("122345"));
console.assert(hasNoDecrease("111123"));
console.assert(hasNoDecrease("135679"));

console.assert(!hasTwoAdjacentDigitsButNoMoreThanTwo("111111"), "hasTwoAdjacentDigitsButNoMoreThanTwo(\"111111\") failed");
console.assert(hasNoDecrease("111111"));
console.assert(hasTwoAdjacentDigitsButNoMoreThanTwo("223450"));
console.assert(!hasNoDecrease("223450"));
console.assert(!hasTwoAdjacentDigitsButNoMoreThanTwo("123789"), "!hasTwoAdjacentDigitsButNoMoreThanTwo(\"123789\") failed");
console.assert(hasNoDecrease("123789"));

console.assert(hasTwoAdjacentDigitsButNoMoreThanTwo("112233"), "hasTwoAdjacentDigitsButNoMoreThanTwo(\"112233\") failed");
console.assert(hasNoDecrease("112233"), "hasNoDecrease(\"112233\") failed");
console.assert(!hasTwoAdjacentDigitsButNoMoreThanTwo("123444"), "!hasTwoAdjacentDigitsButNoMoreThanTwo(\"123444\") failed");
console.assert(hasNoDecrease("123444"), "hasNoDecrease(\"123444\") failed");
console.assert(hasTwoAdjacentDigitsButNoMoreThanTwo("111122"), "hasTwoAdjacentDigitsButNoMoreThanTwo(\"111122\") failed");
console.assert(hasNoDecrease("111122"), "hasNoDecrease(\"111122\") failed");

let valid = [];
for (let i = min; i <= max; i++) {
    let iS = "" + i;

    if (hasTwoAdjacentDigitsButNoMoreThanTwo(iS) && hasNoDecrease(iS)) {
        valid.push(i);
    }
}

// console.log(valid);
console.log(valid.length);
