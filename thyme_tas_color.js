/**
 * Created by Wonseok Jung in KETI on 2023-03-05.
 */

require("moment-timezone");
const moment = require('moment');
moment.tz.setDefault("Asia/Seoul");
const rgbLib = require('BBB-TCS34725');

exports.ready_for_tas = function ready_for_tas() {
    ColorConnection();
};

async function ColorConnection() {
    let rgb = rgbLib.use({
        "bus": "/dev/i2c4",
        "led_pin": "P8_14", // will be ignored if not set
        "irq_pin": "P8_26", // will be ignored if not set
        "module_id": 0x29   // hardware ID as returned by i2c module, will be ignored if not set
    });

    let ledON = false;
    rgb.on('ready', function () {

        setInterval(function () {
            rgb.getRawData(function (err, colors) {
                if (err) throw err;

                console.log('getRawData ==========================================');
                console.log('RED: ' + colors.red + ', ' + 'GREEN: ' + colors.green + ', ' + 'BLUE: ' + colors.blue);
                console.log('CLEAR:', colors.clear);
                console.log('=====================================================');
            });
            rgb.calculateColorTemperature(function (err, temp) {
                if (err) throw err;

                console.log('calculateColorTemperature ===========================');
                console.log('temp:', temp);
                console.log('=====================================================');
            });

            ledON = !ledON;
            rgb.setLED(ledON);
        }, 1000);
    })
}

