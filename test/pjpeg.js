//  just a simplified test suite

var pjpeg = require('../index');
var fs = require('fs');

//  as buffer
console.log('--- TEST progressive.jpg as buffer ---');
let asBuffer = fs.readFileSync('./progressive.jpg');
let offsets = pjpeg(asBuffer, { debug: true });
if (offsets.length === 6 && offsets.toString() === '175,2853,3751,14600,18296,28811')
    console.log('Success!')

//  as string
console.log('--- TEST progressive.jpg as string ---');
let asString = fs.readFileSync('./progressive.jpg', { encoding: 'binary' });
try {
    pjpeg(asString);
} catch (e) {
    console.log('Failed! (expected)');
}

//  as buffer
console.log('--- TEST progressive-tinyfied.jpg as buffer ---');
let tinyfiedAsBuffer = fs.readFileSync('./progressive-tinyfied.jpg');
let tinyfiedOffsets = pjpeg(tinyfiedAsBuffer);
if (tinyfiedOffsets.length === 5 && tinyfiedOffsets.toString() === '209,3539,6627,14994,24584')
    console.log('Success!')