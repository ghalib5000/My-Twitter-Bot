var gpio = require('rpi-gpio');

var count = 0;

//gpio.setup(pin, gpio.DIR_OUT, on(dela,max));

function on(pin,dela,limit) {
    if (count >= limit) {
        gpio.destroy(function() {
            console.log('Closed GPIO pin no:',pin);
        });
        return;
    }

    setTimeout(function() {
        console.log('GPIO no:',pin,'Off count: ',count);
        gpio.write(pin, 1, off(pin,dela,limit));
        count += 1;
    }, dela);
}

function off(pin,dela,limit) {
    setTimeout(function() {
        console.log('GPIO no:',pin,' On count: ',count);
        gpio.write(pin, 0, on(pin,dela,limit));
    }, dela);
}

exports.on = on;


