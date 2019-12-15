// https://github.com/agardes/AoC-2019/blob/master/day14.js
const read = "1 JKXFH => 8 KTRZ\n" +
    "11 TQGT, 9 NGFV, 4 QZBXB => 8 MPGLV\n" +
    "8 NPDPH, 1 WMXZJ => 7 VCNSK\n" +
    "1 MPGLV, 6 CWHX => 5 GDRZ\n" +
    "16 JDFQZ => 2 CJTB\n" +
    "1 GQNQF, 4 JDFQZ => 5 WJKDC\n" +
    "2 TXBS, 4 SMGQW, 7 CJTB, 3 NTBQ, 13 CWHX, 25 FLPFX => 1 FUEL\n" +
    "3 WMXZJ, 14 CJTB => 5 FLPFX\n" +
    "7 HDCTQ, 1 MPGLV, 2 VFVC => 1 GSVSD\n" +
    "1 WJKDC => 2 NZSQR\n" +
    "1 RVKLC, 5 CMJSL, 16 DQTHS, 31 VCNSK, 1 RKBMX, 1 GDRZ => 8 SMGQW\n" +
    "2 JDFQZ, 2 LGKHR, 2 NZSQR => 9 TSWN\n" +
    "34 LPXW => 8 PWJFD\n" +
    "2 HDCTQ, 2 VKWN => 8 ZVBRF\n" +
    "2 XCTF => 3 QZBXB\n" +
    "12 NGFV, 3 HTRWR => 5 HDCTQ\n" +
    "1 TSWN, 2 WRSD, 1 ZVBRF, 1 KFRX, 5 BPVMR, 2 CLBG, 22 NPSLQ, 9 GSVSD => 5 NTBQ\n" +
    "10 TSWN => 9 VFVC\n" +
    "141 ORE => 6 MKJDZ\n" +
    "4 NPSLQ, 43 VCNSK, 4 PSJL, 14 KTRZ, 3 KWCDP, 3 HKBS, 11 WRSD, 3 MXWHS => 8 TXBS\n" +
    "8 VCNSK, 1 HDCTQ => 7 MXWHS\n" +
    "3 JDFQZ, 2 GQNQF => 4 XJSQW\n" +
    "18 NGFV, 4 GSWT => 5 KFRX\n" +
    "2 CZSJ => 7 GMTW\n" +
    "5 PHKL, 5 VCNSK, 25 GSVSD => 8 FRWC\n" +
    "30 FRWC, 17 GKDK, 8 NPSLQ => 3 CLBG\n" +
    "8 MXWHS, 3 SCKB, 2 NPSLQ => 1 JKXFH\n" +
    "1 XJSQW, 7 QZBXB => 1 LGKHR\n" +
    "115 ORE => 6 GQNQF\n" +
    "12 HTRWR, 24 HDCTQ => 1 RKBMX\n" +
    "1 DQTHS, 6 XDFWD, 1 MXWHS => 8 VKWN\n" +
    "129 ORE => 3 XCTF\n" +
    "6 GQNQF, 7 WJKDC => 5 PHKL\n" +
    "3 NZSQR => 2 LPXW\n" +
    "2 FLPFX, 1 MKLP, 4 XDFWD => 8 NPSLQ\n" +
    "4 DQTHS, 1 VKWN => 1 BPVMR\n" +
    "7 GMTW => 1 TXMVX\n" +
    "152 ORE => 8 JDFQZ\n" +
    "21 LGKHR => 9 NPDPH\n" +
    "5 CJTB, 1 QZBXB, 3 KFRX => 1 GTPB\n" +
    "1 MXWHS => 3 CWHX\n" +
    "3 PHKL => 1 NGFV\n" +
    "1 WMXZJ => 7 XDFWD\n" +
    "3 TSWN, 1 VKWN => 8 GKDK\n" +
    "1 ZVBRF, 16 PWJFD => 8 CMJSL\n" +
    "3 VCNSK, 7 GDRZ => 4 HKBS\n" +
    "20 XJSQW, 6 HTRWR, 7 CJTB => 5 WMXZJ\n" +
    "12 ZVBRF, 10 FRWC, 12 TSWN => 4 WRSD\n" +
    "16 HDCTQ, 3 GTPB, 10 NGFV => 4 KWCDP\n" +
    "3 TXMVX, 1 NPDPH => 8 HTRWR\n" +
    "9 NPDPH, 6 LPXW => 8 GSWT\n" +
    "4 MKLP => 1 TQGT\n" +
    "34 GTPB => 3 RVKLC\n" +
    "25 VFVC, 5 RVKLC => 8 DQTHS\n" +
    "7 KWCDP => 3 SCKB\n" +
    "6 LGKHR => 8 MKLP\n" +
    "39 MKJDZ => 9 CZSJ\n" +
    "2 TSWN, 1 WMXZJ => 3 PSJL\n";
let data = read.toString().split('\n').map(el => el.split('=>'));
data.pop()

let reactions = [];
let leftOvers = {}

for(let i=0;i<data.length;i++){
    let reg = /\d+/g;
    let input = data[i][0].split(', ')
    let output = data[i][1].trim().substring(data[i][1].lastIndexOf(' '))
    let nbOut = parseInt(data[i][1].match(reg)[0])
    let inputs = []
    for(const el of input){
        let nb = parseInt(el.match(reg)[0])
        let name = el.substring(el.indexOf(' ')).trim()
        inputs.push([nb,name])
    }
    let reaction = new Reaction([nbOut,output],inputs)
    reactions.push(reaction)
}

function Reaction(output,input){
    this.inputs = input;
    this.quantity = output[0];
    this.name = output[1]
    leftOvers[this.name] = 0
}
let fuel = reactions.find(el=>el.name=="FUEL")

function getOre(reaction, leftOvers, qtyWanted){
    let ore = 0;
    let name = reaction.name;
    let quantity = reaction.quantity;
    let inputs = reaction.inputs
    let qtyNeeded ;
    leftOvers[name] == 0 ? qtyNeeded = qtyWanted :
        leftOvers[name] > qtyWanted ?
            (leftOvers[name] -= qtyWanted, qtyNeeded = 0) :
            (qtyWanted-= leftOvers[name],leftOvers[name] = 0,qtyNeeded =qtyWanted)
    if(qtyNeeded==0){
        return 0
    }
    let qt = Math.ceil(qtyNeeded/quantity)
    let leftover = (qt * quantity) - qtyNeeded;
    leftOvers[name] += leftover
    inputs.forEach(([qty,inputName]) => {
        if (inputName=='ORE') {
            ore +=  qty * qt;
        } else {
            let el = reactions.find(e => e.name == inputName)
            ore += getOre(el, leftOvers, qty*qt);
        }
    });

    return ore;

}

function partTwo(){
    let trilion = 1000000000000;
    res = 0;
    i=5000;
    while(res<trilion){
        i+=10000;
        res = getOre(fuel,leftOvers,i)

    }
    res = 0;
    i -= 10000
    while(res<trilion){
        i++
        res = getOre(fuel,leftOvers,i)
    }
    return i-1
}

console.log('Part One   '   + getOre(fuel,leftOvers,1))
console.log('Part Two   ' + partTwo())
