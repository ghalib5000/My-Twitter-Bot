
                                                    
var gpio = require('rpi-gpio');

const led = require('./led');

//var pin = 7;
//var delay = 1000;
//max=30;

const led_start = (pin,delay,max) => {
console.log("starting leds");
gpio.setup(pin,
 gpio.DIR_OUT, 
led.on(pin,delay,max) ); 
};
module.exports = led_start;

