// A program to shoot a projectile through 3 hoops

function getString(prompt) {
    let input;
    do {
        input = window.prompt(prompt);
        if (input === null) throw new Error('Cancelled');
        if (input.trim() === "") {
            alert("Invalid input. Please enter a valid string.");
        }
    } while (input === null || input.trim() === "");
    return input;
}

function getInt(prompt) {
    let input;
    do {
        input = window.prompt(prompt);
        if (input === null) throw new Error('Cancelled');
        input = parseInt(input);
        if (isNaN(input)) {
            alert("Invalid input. Please enter a valid integer.");
        }
    } while (isNaN(input));
    return input;
}

function getFloat(prompt) {
    let input;
    do {
        input = window.prompt(prompt);
        if (input === null) throw new Error('Cancelled');
        input = parseFloat(input);
        if (isNaN(input)) {
            alert("Invalid input. Please enter a valid number.");
        }
    } while (isNaN(input));
    return input;
}

function getA(prompt) {
    let input = getString(prompt).trim().toLowerCase();
    if (input === 'g') {
        return -9.8
    } else if (!isNaN(input)) {
        return input
    } else {
        throw new Error('Invalid input')
    }
}

var v = getFloat('Initial Velocity? (m/s)')
var d = getInt('Launcher Angle?')
var a = getA('Acceleration? (m/s)')
var l = getFloat('Launcher Height? (cm)') / 100

let yx;
let xy;

var r = d * (Math.PI / 180);

var vx = (v * (Math.cos(r)));
var vy = (v * (Math.sin(r)));

var t = (-vy - vy) / a

var th = t * (1 / 3)
var hf = t * (1 / 2)
var qt = t * (3 / 4)

function y(h) {
    var s = (a * (Math.pow(h, 2)) / 2)
    yx = ((vy * h) + s)
    return yx + l
}

function x(h) {
    xy = vx * h
    return xy
}

let xv = [th, hf, qt]
let yv = [th, hf, qt]

xv.forEach((element, index) => {
    xv[index] = x(element)
})

yv.forEach((element, index) => {
    yv[index] = y(element)
})

print(xv)
print(yv)
