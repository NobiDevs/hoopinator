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
        return -9.8;
    } else if (!isNaN(input)) {
        return parseFloat(input);
    } else {
        do {
            alert('Invalid input. Please enter a valid number.');
            input = getString(prompt).trim().toLowerCase();
        } while (isNaN(input) && input !== 'g');
        return input === 'g' ? -9.8 : parseFloat(input);
    }
}

function y(h, vy, a, l) {
    var s = (a * (Math.pow(h, 2)) / 2);
    return (((vy * h) + s) + l) * 100;
}

function x(h, vx) {
    return (vx * h) * 100;
}

function getRes(xv, yv) {
    const tb = `
    <table id="res-table">
        <tr>
            <th></th>
            <th>Δx<br> (cm)</th>
            <th>Δy<br> (cm)</th>
        </tr>
        <tr>
            <th>H1</th>
            <td>${xv[0].toFixed(2)}</td>
            <td>${yv[0].toFixed(2)}</td>
        </tr>
        <tr>
            <th>H2</th>
            <td>${xv[1].toFixed(2)}</td>
            <td>${yv[1].toFixed(2)}</td>
        </tr>
        <tr>
            <th>H3</th>
            <td>${xv[2].toFixed(2)}</td>
            <td>${yv[2].toFixed(2)}</td>
        </tr>
    </table>
    `;

    return tb;
}

function getInp(v, d, a, l) {
    const tb = `
    <table id="input-table">
        <tr>
            <th></th>
            <th>V<sub>i</sub></th>
            <th>&#952;</th>
            <th>a</th>
            <th>&#8616;</th>
        </tr>
        <tr>
            <th>input</th>
            <td>${v}</td>
            <td>${d}</td>
            <td>${a}</td>
            <td>${l}</td>
        </tr>
    </table>
    `;

    return tb;
}

function hoopinate() {
    var v = getFloat('Initial Velocity? (m/s)');
    var d = getInt('Launcher Angle?');
    var a = getA('Acceleration?');
    var l = getFloat('Launcher Height? (cm)') / 100;

    var r = d * (Math.PI / 180);

    var vx = (v * (Math.cos(r)));
    var vy = (v * (Math.sin(r)));

    var t = (-vy - vy) / a;

    var th = t * (1 / 3);
    var hf = t * (1 / 2);
    var qt = t * (3 / 4);

    let xv = [th, hf, qt].map(h => x(h, vx));
    let yv = [th, hf, qt].map(h => y(h, vy, a, l));

    const res = document.getElementById('res-table');
    const inp = document.getElementById('input-table');

    res.innerHTML = getRes(xv, yv);
    inp.innerHTML = getInp(v, d, a, l);
}

window.onload = hoopinate;