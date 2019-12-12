let input = "<x=14, y=2, z=8>\n" +
    "<x=7, y=4, z=10>\n" +
    "<x=1, y=17, z=16>\n" +
    "<x=-4, y=-1, z=1>";

let axes = ["x", "y", "z"]

let moons = [
    {
        pos: {
            x: 14,
            y: 2,
            z: 8
        }
    },
    {
        pos: {
            x: 7,
            y: 4,
            z: 10
        }
    },
    {
        pos: {
            x: 1,
            y: 17,
            z: 16
        }
    },
    {
        pos: {
            x: -4,
            y: -1,
            z: 1
        }
    }
];

for (let i = 0; i < moons.length; i++) {
    moons[i].k=moons[i].pos.x+","+moons[i].pos.y+","+moons[i].pos.z;
    moons[i].vel = {
        x: 0, y: 0, z: 0
    }
}


function applyGravity(step) {
    for (let i = 0; i < moons.length; i++) {
        let a = moons[i];
        for (let j = 0; j < moons.length; j++) {
            let b = moons[j];

            if(a.k===b.k)continue;

            for (let axi = 0; axi < axes.length; axi++) {
                let ax = axes[axi];
                if (a.pos[ax] > b.pos[ax]) {
                    a.vel[ax] -= 1;
                    b.vel[ax] += 1;
                } else if (a.pos[ax] < b.pos[ax]) {
                    a.vel[ax] += 1;
                    b.vel[ax] -= 1;
                }
            }

        }
    }

}

function applyVelocity(step) {
    for (let i = 0; i < moons.length; i++) {
        let m = moons[i];
        for (let axi = 0; axi < axes.length; axi++) {
            let ax = axes[axi];
            m.pos[ax] += m.vel[ax];
        }
    }
}

function potentialEnergy(moon) {
    let sum =0;
    for (let axi = 0; axi < axes.length; axi++) {
        let ax = axes[axi];
        sum += Math.abs(moon.pos[ax]);
    }
    return sum;
}


function kineticEnergy(moon) {
    let sum =0;
    for (let axi = 0; axi < axes.length; axi++) {
        let ax = axes[axi];
        sum += Math.abs(moon.vel[ax]);
    }
    return sum;
}

function systemEnergy() {
    let t = 0;
    for (let i = 0; i < moons.length; i++) {
        let pot = potentialEnergy(moons[i]);
        let kin = kineticEnergy(moons[i]);

        t+=pot*kin;
    }
    return t;
}


function sim(step) {
    console.log("Step #" + step);

    applyGravity(step);
    applyVelocity(step);

    // console.log(moons);

    console.log("System Energy: " + systemEnergy());
    console.log(JSON.stringify(moons));
    console.log("")
}

console.assert(potentialEnergy({pos: {x: 8, y: -12, z: 9}}) === 29,"potential energy calculation 1 failed");
console.assert(potentialEnergy({pos: {x: 13, y: 16, z: -3}}) === 32,"potential energy calculation 2 failed");

console.assert(kineticEnergy({vel: {x: -7, y: 3, z: 0}}) === 10, "kinetic energy calculation 1 failed");
console.assert(kineticEnergy({vel: {x: 3, y: -11, z: -5}}) === 19, "kinetic energy calculation 2 failed");

console.assert(systemEnergy() === 0, "Start system energy is not 0!");


console.log("Start System Energy: " + systemEnergy());
console.log(JSON.stringify(moons));
console.log("")

for (let i = 0; i <= 1000; i++) {
    sim(i);
}

console.log("End System Energy: " + systemEnergy());
console.log(JSON.stringify(moons));

// 3312 (step 998) too low
// 1842 (step 999) too low
// 2876 (step 1000) too low

// Ended up solving it with https://repl.it/repls/LikelyDisgustingLoopfusion since my numbers were always too low :/
