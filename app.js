const robot = require('robotjs');
const iohook = require('iohook');
const mousePos = robot.getMousePos();
const timeout = 1000;
const mouseStart = mousePos.y + 10;
const mouseEnd = mousePos.y;
let ttl = true;

/**
 * Handles moving the mouse.
 * 
 * @param flag which direction to move mouse to
 */
function jiggle(flag) {
    if (ttl) {
        robot.moveMouse(mousePos.x, flag ? mouseStart : mouseEnd);
        // Call self after timeout
        setTimeout(() => jiggle(!flag), timeout);
    }
}

/**
 * Listen onto mouse movements.
 */
iohook.addListener('mousemove', (event) => {
    if (event.y === mouseEnd || event.y === mouseStart) {
        // Do nothing
    } else {
        console.log('Jiggle stopped');
        ttl = false;
        iohook.removeAllListeners();
        process.exit();
    }
});

iohook.start();

// Start Application
jiggle(true, 0);
console.log('Jiggle Starting');