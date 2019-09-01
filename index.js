const PJPEG_DHT = String.fromCharCode(0xFF, 0xC4),
    PJPEG_SOS = String.fromCharCode(0xFF, 0xDA),
    PJPEG_JPG = String.fromCharCode(0xFF, 0xD8, 0xFF),
    PJPEG_END = String.fromCharCode(0xFF, 0xD9),
    PJPEG_ENC = 'binary'

module.exports = function pjpeg (buf, options = {}) {
    function log (msg) {
        if (debug) console.debug('[pjpeg]', msg)
    }
    
    function error (msg) {
        if (debug) throw new Error(`[pjpeg] ${msg}`)
    }

    if (!Buffer.isBuffer(buf))
        error('Expecting a Buffer as parameter.')

    let { debug } = options
    
    let jpeg = Buffer.from(buf)
    if (jpeg.length === 0)
        error('Empty Buffer')
    else
        log(`buffer size ${jpeg.length}`)

    //  check for jpeg signature at the beginning
    if (jpeg.toString(PJPEG_ENC, 0, 3) !== PJPEG_JPG)
        error(`Wrong or unknown file header: ${jpeg.toString('hex', 0, 3)}`)
    else
        log(`file header ${jpeg.toString('hex', 0, 3)}`)

    //  check for jpeg signature at the end
    if (jpeg.toString(PJPEG_ENC, jpeg.length - PJPEG_END.length) !== PJPEG_END)
        error(`Wrong or unknown file ending: ${jpeg.toString('hex', jpeg.length - PJPEG_END.length)}`)
    else
        log(`file ending: ${jpeg.toString('hex', jpeg.length - PJPEG_END.length)}`)

    //  find the offsets
    let offsets = []
    let offset = jpeg.indexOf(PJPEG_DHT, PJPEG_ENC)

    while (offset !== -1) {
        //  this is necessary, because a scan may be missing after a huffman table (see tinyjpg example)
        if (jpeg.indexOf(PJPEG_SOS, offset, PJPEG_ENC) < jpeg.indexOf(PJPEG_DHT, offset + PJPEG_DHT.length, PJPEG_ENC))
            offsets.push(offset + PJPEG_DHT.length)
        offset = jpeg.indexOf(PJPEG_DHT, offset + PJPEG_DHT.length, PJPEG_ENC)
    }
    log(`sequence offsets: ${offsets}`)

    return offsets
}