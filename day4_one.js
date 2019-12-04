let min = 272091;
let max = 815432;


function hasTwoAdjacentDigits(numStr) {
    for (let i = 1; i < 6; i++) {
        if(numStr[i]===numStr[i-1])return true;
    }
    return false;
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
console.assert(hasTwoAdjacentDigits("122345"));
console.assert(hasNoDecrease("111123"));
console.assert(hasNoDecrease("135679"));

console.assert(hasTwoAdjacentDigits("111111"));
console.assert(hasNoDecrease("111111"));
console.assert(hasTwoAdjacentDigits("223450"));
console.assert(!hasNoDecrease("223450"));
console.assert(!hasTwoAdjacentDigits("123789"));
console.assert(hasNoDecrease("123789"));


let valid = [];
for(let i=min;i<=max;i++){
    let iS = ""+i;

    if (hasTwoAdjacentDigits(iS) && hasNoDecrease(iS)) {
        valid.push(i);
    }
}

console.log(valid);
console.log(valid.length);
