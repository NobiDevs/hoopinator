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
        return -(Math.abs(parseFloat(input)));
    } else {
        do {
            alert('Invalid input. Please enter a valid number.');
            input = getString(prompt).trim().toLowerCase();
        } while (isNaN(input) && input !== 'g');
        return input === 'g' ? -9.8 : -(Math.abs(parseFloat(input)));
    }
}

function temp() {
    return {
        getItem(key) {
            let res = JSON.parse(window.localStorage.getItem(key));
            if (res) {
                if (res.expireTime <= Date.now()) {
                    window.localStorage.removeItem(key);
                    return null;
                }
                return res.data;
            }
            return null;
        },
        setItem(key, value, time) {
            time *= 60000;
            let res = {
                data: value
            };
            if (time) {
                res.expireTime = Date.now() + time;
            }
            window.localStorage.setItem(key, JSON.stringify(res));
        },
        removeItem(key) {
            window.localStorage.removeItem(key);
        },
        clear() {
            window.localStorage.clear();
        }
    };
}

window.temp = temp();

function y(h, vy, a, l) {
    var s = (a * (Math.pow(h, 2)) / 2);
    return (((vy * h) + s) + l);
}

function x(h, vx) {
    return (vx * h);
}

function getRes(xv, yv) {
    const tb = `
    <table id="res-table" class="styled-table">
        <tr>
            <th></th>
            <th>Δx<br> (m)</th>
            <th>Δy<br> (m)</th>
        </tr>
        <tr>
            <th class="cell">
                <div class="t-position"><sup>1</sup>&frasl;<sub>3</sub></div>
                <div class="t-number">T1</div>
            </th>
            <td>${xv[0].toFixed(2)}</td>
            <td>${yv[0].toFixed(2)}</td>
        </tr>
        <tr>
            <th class="cell">
                <div class="t-position"><sup>1</sup>&frasl;<sub>2</sub></div>
                <div class="t-number">T2</div>
            </th>
            <td>${xv[1].toFixed(2)}</td>
            <td>${yv[1].toFixed(2)}</td>
        </tr>
        <tr>
            <th class="cell">
                <div class="t-position"><sup>3</sup>&frasl;<sub>4</sub></div>
                <div class="t-number">T3</div>
            </th>
            <td>${xv[2].toFixed(2)}</td>
            <td>${yv[2].toFixed(2)}</td>
        </tr>
        <tr>
            <th class="cell">
                <div class="t-position">T</div>
                <div class="t-number">F</div>
            </th>
            <td colspan="2">${xv[3].toFixed(2)}</td>
        </tr>
    </table>
    `;
    return tb;
}

function getInp(v, d, a, l) {
    const tb = `
    <table id="input-table" class="styled-table">
        <tr>
            <th></th>
            <th>V<sub>i</sub></th>
            <th>&#952;</th>
            <th>a</th>
            <th>&#8613;</th>
        </tr>
        <tr>
            <th>Input</th>
            <td>${v}</td>
            <td>${d}&deg;</td>
            <td>${a}</td>
            <td>${l}m</td>
        </tr>
    </table>
    `;
    return tb;
}

const res = document.getElementById('res-table');
const inp = document.getElementById('input-table');

let v, d, a, l;
let xv, yv;
let loadTime;

function hoopinate() {
    v = getFloat('Initial Velocity? (m/s)');
    d = getInt('Launcher Angle?');
    a = getA('Acceleration?');
    l = getFloat('Launcher Height? (m)');

    var r = d * (Math.PI / 180);

    var vx = (v * (Math.cos(r)));
    var vy = (v * (Math.sin(r)));

    var t = (-vy - vy) / a;

    var th = t * (1 / 3);
    var hf = t * (1 / 2);
    var qt = t * (3 / 4);

    xv = [th, hf, qt, t].map(h => x(h, vx));
    yv = [th, hf, qt, t].map(h => y(h, vy, a, l));

    load(true)
}


function load(c) {
    const element = document.getElementById('load')
    loadTime = Math.random() * (5000 - 2000) + 2000

    if (c) {
        element.style.display = 'flex'
        res.style.display = 'none'
        inp.style.display = 'none'

        setTimeout(readRes, loadTime)
    } else {
        element.style.display = 'none'
        res.style.display = 'flex'
        inp.style.display = 'flex'
    }

}

function readRes() {
    load(false)

    res.innerHTML = getRes(xv, yv);
    inp.innerHTML = getInp(v, d, a, l);

    temp.setItem('tempR', getRes(xv, yv), 10 + loadTime)
    temp.setItem('tempI', getInp(v, d, a, l), 10 + loadTime)
}

const tempR = temp.getItem('tempR');
const tempI = temp.getItem('tempI');

if (tempR && tempI != null) {
    res.innerHTML = tempR
    inp.innerHTML = tempI
}

function printContainer(containerId) {
    const container = document.getElementById(containerId);

    const style = document.createElement('style');
    style.textContent = `
        @media print {
            @page {
                margin: 0;
                size: auto;
            }
            body * {
                visibility: hidden;
            }
            #${containerId}, #${containerId} * {
                visibility: visible;
            }
            #${containerId} {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
            }

            #${containerId} * {
                color: black !important;
            }
        }
    `;
    document.head.appendChild(style);

    window.print();

    document.head.removeChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    const calc = document.getElementById('cButton');
    calc.addEventListener('click', hoopinate);

    const print = document.getElementById('pButton');
    print.addEventListener('click', function() {
        printContainer('cont');
    });
    
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const moonIcon = darkModeToggle.querySelector('.moon-icon');
    const sunIcon = darkModeToggle.querySelector('.sun-icon');
    
    darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        darkModeToggle.setAttribute('aria-label', 'Activate light mode');
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        darkModeToggle.setAttribute('aria-label', 'Activate dark mode');
    }
    });
});
