const fh = require('./file-handler')

async function test(){

    const msg = 'test message'

    const sourceInfo = {
        type: 'catalog',
        name: 'test_file'
    }

    const fileWrite = fh.writeFile(msg, sourceInfo)
    console.log(fileWrite)
    if (fileWrite) {
        console.log('file-writer test is succeeded')
    } else{
        console.log('file-writer is failed')
    }

    const dir = './data/'
    const fileRead = fh.readFile(dir, sourceInfo)
    console.log(fileRead)
    if (fileRead) {
        console.log('file-reader test is succeeded')
    } else{
        console.log('file-reader is failed')
    }
}
test()