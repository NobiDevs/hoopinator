// A program to shoot a projectile through 3 hoops
// V(initial) = 4.15 m/s

function init() {
    
}

var v = readFloat('Initial Velocity?')
var d = readInt('Launcher Angle?')
var a = readA('Acceleration?')
var h = readFloat('Launcher Height?')

let yx;
let xy;
function readA(prompt) {
        let input = readLine(prompt).trim().toLowerCase();
        if (['g'].includes(input)) {
            return -9.8
        } else if (!isNaN(input)){
            return input
        } else {
            throw new Error('Invalid input')
        }
}


// var a = readFloat('Acceleration?')

var dr = d * (Math.PI / 180);

var vx = (v * (Math.cos(dr)));
var vy = (v * (Math.sin(dr)));

var t = (-vy - vy) / a

var p = t * (1 / 3)
var u = t * (1 / 2)
var l = t * (3 / 4)

function y(h) {
    yx = ((vy * h) + (1/2) * (a)* (h ** 2))
    return yx
}

function x(h) {
    xy = vx * h
    return xy
}

/*
console.log(dr)
console.log(vy)
console.log(vx)
console.log(t)
*/
