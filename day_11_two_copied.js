// https://github.com/antonbijl/AoC2019/blob/master/Day11p2.js

class intCode{
    constructor(inp, pausecount){
        var data = inp.split('\n');
        if(data[data.length-1]==''){data.pop();}
        this.p = data[0].split(',').map(Number);
        this.maxp = this.p.length;
        this.instruction=0;
        this.done=false;
        this.relbase = 0;
        this.pausecount=pausecount; //1 = pause after each output, 0 = no pauses, run to completion
    }

    run(rin){
        var ip1, ip2, ip3, op, oppos;
        var i, inc=4;
        var pmode1,pmode2,pmode3;
        var inst, opc, ipcount=0;
        var rout=[];
        var p=this.p;

        for(i=this.instruction;i<this.p.length;i+=inc){

            inst = p[i];
            opc=inst%100;
            pmode1 = (inst-opc)%1000/100;
            pmode2 = (inst-pmode1*100-opc)%10000/1000;
            pmode3 = (inst-pmode2*1000-pmode1*100-opc)%100000/10000;

            if(pmode1==0){ip1=p[p[i+1]]}else if(pmode1==1){ip1=p[i+1];}else{ip1=p[p[i+1]+this.relbase];}
            if(pmode2==0){ip2=p[p[i+2]]}else if(pmode2==1){ip2=p[i+2];}else{ip2=p[p[i+2]+this.relbase];}
            if(pmode3==0){ip3=p[p[i+3]]}else if(pmode3==1){ip3=p[i+3];}else{ip3=p[p[i+3]+this.relbase];}

            if(ip1==undefined){ip1=0;}
            if(ip2==undefined){ip2=0;}
            if(ip3==undefined){ip3=0;}

            if(opc==1||opc==2||opc==7||opc==8){
                if(pmode3==2){oppos=p[i+3]+this.relbase;}else{oppos=p[i+3];}
            } else if (opc==3){
                if(pmode1==2){oppos=p[i+1]+this.relbase;}else{oppos=p[i+1];}
            }

            // console.log('INPUT i='+i+': inst:'+inst+'; p[i+1]: '+p[i+1]+'; p[i+2]: '+p[i+2]+'; pmode1='+pmode1+'; pmode2='+pmode2);
            switch(opc){
                case 1:
                    op=ip1+ip2;
                    inc=4;
                    break;
                case 2:
                    op=ip1*ip2;
                    inc=4;
                    break;
                case 3:
                    op=rin[ipcount];
                    ipcount++;
                    inc=2;
                    break;
                case 4:
                    rout.push(ip1);
                    console.log('OUTPUT: p'+i+': '+ip1);
                    inc=2;
                    break;
                case 5:
                    if(ip1!=0){
                        i=ip2;
                        inc=0;
                    } else {inc=3;}
                    break;
                case 6:
                    if(ip1==0){
                        i=ip2;
                        inc=0;
                    } else {inc=3;}
                    break;
                case 7:
                    if(ip1<ip2){op=1;}else{op=0;}
                    inc=4;
                    break;
                case 8:
                    if(ip1==ip2){op=1;}else{op=0;}
                    inc=4;
                    break;
                case 9:
                    this.relbase+=ip1;
                    inc=2;
                    break;
            }

            if(opc==1||opc==2||opc==3||opc==7||opc==8){
                p[oppos]=op;
                // console.log('WRITING i='+i+': '+op+' to p['+oppos+']');
            }
            if(opc==99){
                this.done=true;
                break;
            }

            if(opc==4&&rout.length==this.pausecount){ //pause if instruction is an output and pausecount is reached
                break;
            }
        }
        this.instruction=i+=inc;
        return rout;
    }
}

class Panel {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.color=0;
        this.visits=1;
    }

    Paint(c){
        this.color=c;
        this.visits++;
    }
}

const fs = require('fs');
var ret, comp;
var robotx=0,roboty=0;
var minx=0,maxx=0,miny=0,maxy=0;
var dir = 'u',todo=[];
var panels = [];
var visited = [];
var ix, coords;

comp = new intCode('3,8,1005,8,332,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,28,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,51,1,1103,5,10,1,1104,9,10,2,1003,0,10,1,5,16,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,1001,8,0,88,1006,0,2,1006,0,62,2,8,2,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,102,1,8,121,1006,0,91,1006,0,22,1006,0,23,1006,0,1,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,155,1006,0,97,1,1004,2,10,2,1003,6,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,1002,8,1,187,1,104,15,10,2,107,9,10,1006,0,37,1006,0,39,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,102,1,8,223,2,2,17,10,1,1102,5,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,1001,8,0,253,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1002,8,1,276,1006,0,84,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,301,2,1009,9,10,1006,0,10,2,102,15,10,101,1,9,9,1007,9,997,10,1005,10,15,99,109,654,104,0,104,1,21102,1,936995738516,1,21101,0,349,0,1105,1,453,21102,1,825595015976,1,21102,1,360,0,1105,1,453,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,46375541763,1,1,21101,0,407,0,1105,1,453,21102,1,179339005019,1,21101,0,418,0,1106,0,453,3,10,104,0,104,0,3,10,104,0,104,0,21102,825012036372,1,1,21102,441,1,0,1105,1,453,21101,988648461076,0,1,21101,452,0,0,1105,1,453,99,109,2,22102,1,-1,1,21102,40,1,2,21102,484,1,3,21101,0,474,0,1106,0,517,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,479,480,495,4,0,1001,479,1,479,108,4,479,10,1006,10,511,1102,1,0,479,109,-2,2105,1,0,0,109,4,2102,1,-1,516,1207,-3,0,10,1006,10,534,21101,0,0,-3,21202,-3,1,1,22101,0,-2,2,21102,1,1,3,21102,553,1,0,1106,0,558,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,581,2207,-4,-2,10,1006,10,581,22102,1,-4,-4,1105,1,649,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21101,0,600,0,1105,1,558,21201,1,0,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,619,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,641,22102,1,-1,1,21102,1,641,0,106,0,516,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0\n', 2);

while(!comp.done){
    coords=robotx.toString()+','+roboty.toString();
    if(visited.includes(coords)){ //previously visit panel
        ix = visited.indexOf(coords);
    } else { // new panel
        panels.push(new Panel(robotx,roboty));
        visited.push(coords);
        ix = visited.length-1;
        if(ix==0){panels[ix].Paint(1);}
    }
    todo=comp.run([panels[ix].color]);
    if(todo.length!=0){
        panels[ix].Paint(todo[0]);
        if(todo[1]==0){ //left
            if(dir=='u'){dir='l';}else if(dir=='l'){dir='d';}else if(dir=='d'){dir='r';}else{dir='u';}
        } else { //right
            if(dir=='u'){dir='r';}else if(dir=='r'){dir='d';}else if(dir=='d'){dir='l';}else{dir='u';}
        }
        switch(dir){
            case 'u': roboty++; if(roboty>maxy){maxy=roboty;} break;
            case 'l': robotx--; if(robotx<minx){minx=robotx;} break;
            case 'd': roboty--; if(roboty<miny){miny=roboty;} break;
            case 'r': robotx++; if(robotx>maxx){maxx=robotx;} break;
        }
    }
}

ret='\n';
for(a=maxy;a>=miny;a--){
    for(b=minx;b<=maxx;b++){
        coords=b.toString()+','+a.toString();
        ix=visited.indexOf(coords);
        if(ix==-1){ret+=' ';}else{
            if(panels[ix].color==0){ret+=' ';}else{ret+='█';}
        }
    }
    ret+='\n';
}
console.log(ret);
