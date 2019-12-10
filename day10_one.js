let input = ".#......#...#.....#..#......#..##..#\n" +
    "..#.......#..........#..##.##.......\n" +
    "##......#.#..#..#..##...#.##.###....\n" +
    "..#........#...........#.......##...\n" +
    ".##.....#.......#........#..#.#.....\n" +
    ".#...#...#.....#.##.......#...#....#\n" +
    "#...#..##....#....#......#..........\n" +
    "....#......#.#.....#..#...#......#..\n" +
    "......###.......#..........#.##.#...\n" +
    "#......#..#.....#..#......#..#..####\n" +
    ".##...##......##..#####.......##....\n" +
    ".....#...#.........#........#....#..\n" +
    "....##.....#...#........#.##..#....#\n" +
    "....#........#.###.#........#...#..#\n" +
    "....#..#.#.##....#.........#.....#.#\n" +
    "##....###....##..#..#........#......\n" +
    ".....#.#.........#.......#....#....#\n" +
    ".###.....#....#.#......#...##.##....\n" +
    "...##...##....##.........#...#......\n" +
    ".....#....##....#..#.#.#...##.#...#.\n" +
    "#...#.#.#.#..##.#...#..#..#..#......\n" +
    "......#...#...#.#.....#.#.....#.####\n" +
    "..........#..................#.#.##.\n" +
    "....#....#....#...#..#....#.....#...\n" +
    ".#####..####........#...............\n" +
    "#....#.#..#..#....##......#...#.....\n" +
    "...####....#..#......#.#...##.....#.\n" +
    "..##....#.###.##.#.##.#.....#......#\n" +
    "....#.####...#......###.....##......\n" +
    ".#.....#....#......#..#..#.#..#.....\n" +
    "..#.......#...#........#.##...#.....\n" +
    "#.....####.#..........#.#.......#...\n" +
    "..##..#..#.....#.#.........#..#.#.##\n" +
    ".........#..........##.#.##.......##\n" +
    "#..#.....#....#....#.#.......####..#\n" +
    "..............#.#...........##.#.#..";

let grid=[];

let totalAsteroids = 0;

let lines = input.split("\n");
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let arr = [];
    for (let j = 0; j < line.length; j++) {
        if (line[j] === "#") {
            arr[j]=1;
            totalAsteroids++;
        }else{
            arr[j]=0;
        }
    }
    grid[i]=arr;
}
console.log(grid);
console.log("Total Asteroids: " + totalAsteroids);

function angleBetweenTwoPoints(a,b) {
   return Math.atan2(b[1] - a[1], b[0] - a[0])* 180 / Math.PI;
}

function distanceBetweenTwoPoints(a,b) {
    return Math.sqrt( Math.pow((a[0]-b[0]), 2) + Math.pow((a[1]-b[1]), 2) )
}

function removeFromArray(arr,v) {
    let i = arr.indexOf(v);
    if (i > -1) {
        arr.splice(i, 1);
    }
}

function countLineOfSight(x,y) {
    let anglesAndDistances = {};
    let canSee = [];

    for (let y1 = 0; y1 < grid.length; y1++) {
        for(let x1 = 0;x1<grid[y1].length;x1++){
            if(grid[y1][x1]===1) {
                let angle = angleBetweenTwoPoints([x, y], [x1, y1]);
                let distance = distanceBetweenTwoPoints([x, y], [x1, y1]);

                anglesAndDistances[x1+","+y1]={
                    angle:angle,
                    distance:distance
                };
                canSee.push(x1+","+y1)
            }
        }
    }

    for (let k in anglesAndDistances) {
        let angleAndDistance = anglesAndDistances[k];
        for (let k1 in anglesAndDistances) {
            let otherAngleAndDistance = anglesAndDistances[k1];

            if (angleAndDistance.angle ===  otherAngleAndDistance.angle) {
                if(angleAndDistance.distance<otherAngleAndDistance.distance){
                    removeFromArray(canSee, k1);// remove other
                }else if(otherAngleAndDistance.distance<angleAndDistance.distance){
                    removeFromArray(canSee, k);// remove first
                }else{
                    console.warn(k + " and " + k1 + " have same angle and distance from " + x + "," + y + "! ("+angleAndDistance.angle+","+angleAndDistance.distance+") Panic!");
                }
            }
        }
    }

    return canSee.length;

}

let highest = 0;
let highestPos = "0,0";
for (let y = 0; y < grid.length; y++) {
    for(let x = 0;x<grid[y].length;x++){
        if(grid[y][x]===1) {
            let c = countLineOfSight(x, y);
            if (c > highest) {
                highest = c;
                highestPos = x + "," + y;
            }
        }
    }
}

console.log(highestPos + " can see the most: " + highest);
