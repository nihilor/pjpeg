# pjpeg

Identifies the offsets of every single image of a progressive encoded JPEG image.

Pure, dependency-free!

## Installation

Simply pull the package from npm.

```
$ npm install pjpeg --save
```

## How to use

PJPEG follows the Unix philosopy of doing only one job and do this very good. In this case, it just searches for every image in a progressive JPEG. It then returns the offsets as an array or false if an error occured.

PJPEG does not interact with the file system. It's completely dependency free. So it expects the image provided as a [Buffer](https://nodejs.org/api/buffer.html).

```js
var fs = require('fs');
var pjpeg = require('pjpeg');
console.log( pjpeg( fs.readFileSync('image.jpg') ) );
```

That's it. The returned offsets are the offsets as bytewise index.

You may activate the debug mode via the `options` object.

```js
pjpeg( data, { debug: true } );
```

## License

Copyright (c) 2019 Mark Lubkowitz (https://mlu.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.