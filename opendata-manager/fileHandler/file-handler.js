const fs = require('fs')
const path = require('path')
const dataDir = path.join('C:/Users/kimds/nodeProject', 'data/')

module.exports = { writeCatalog, readCatalog, writeUrls, readUrls, writeCols,
    readCols, writeVals, readVals, writeSourceIds, readSourceIds, removeSourceList, readDirs, readIdFile, removeIdFiles }

function writeCatalog(data, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher
        // console.log(`directory path: ${dir}`)
        const exist = fs.existsSync(dir)
        // console.log(exist)
        if (!exist) fs.mkdirSync(dir)
        
        const file = dir + '/' + 'p_' + sourceInfo.page + '_'+ sourceInfo.name + '.rdf'
        console.log(`file path: ${file}`)
        fs.writeFileSync(file, data)
        if (fs.existsSync(file)) {
            return true
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}


function readCatalog(dataDir, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher
        // const dir = dataDir + type
        const exist = fs.existsSync(dir)
        // console.log(exist)
        if (!exist) fs.mkdirSync(dir)
        // console.log(`directory path: ${dir}`)
        const file = dir + '/' + 'p_' + sourceInfo.page + '_' + sourceInfo.name + '.rdf'
        console.log(`file path: ${file}`)

        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            console.log(typeof (data))
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}

function writeUrls(data, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher + '/' + sourceInfo.format
        // console.log(`directory path: ${dir}`)
        const exist = fs.existsSync(dir)
        if (!exist) fs.mkdirSync(dir)
        // console.log(exist)
        const file = dir + '/' + 'p_' + sourceInfo.page + '_' + sourceInfo.format + '_' + sourceInfo.name + '_url.txt'
        console.log(`file path: ${file}`)
        const urls = {
            info: sourceInfo,
            url: data
        }
        fs.writeFileSync(file, JSON.stringify(urls))
        if (fs.existsSync(file)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}

function readUrls(dataDir, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher + '/' + sourceInfo.format
        // const dir = dataDir + type
        const exist = fs.existsSync(dir)
        if (!exist) fs.mkdirSync(dir)
        // console.log(exist)
        // console.log(`directory path: ${dir}`)
        const file = dir + '/' + 'p_' + sourceInfo.page + '_' + sourceInfo.format + '_' + sourceInfo.name + '_url.txt'
        console.log(`file path: ${file}`)

        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            // console.log(typeof (data))
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}

function writeCols(data, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = sourceInfo.path + type + publisher
        // console.log(`directory path: ${dir}`)
        const exist = fs.existsSync(dir)
        if (!exist) fs.mkdirSync(dir)
        // console.log(exist)
        const file = dir + '/' + sourceInfo.name + '_cols.txt'
        console.log(`file path: ${file}`)
        const cols = {
            cols: data
        }
        fs.writeFileSync(file, JSON.stringify(cols))
        if (fs.existsSync(file)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}

function readCols(dataDir, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher
        // const dir = dataDir + type
        const exist = fs.existsSync(dir)
        if (!exist) fs.mkdirSync(dir)
        // console.log(exist)
        // console.log(`directory path: ${dir}`)
        const file = dir + '/' + sourceInfo.name + '_cols.txt'
        console.log(`file path: ${file}`)

        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            console.log(typeof (data))
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}

function writeVals(data, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher
        // const dir = sourceInfo.path + type
        // console.log(`directory path: ${dir}`)
        const exist = fs.existsSync(dir)
        if (!exist) fs.mkdirSync(dir)
        // console.log(exist)
        const file = dir + '/' + sourceInfo.name + '_values.txt'
        console.log(`file path: ${file}`)

        fs.writeFileSync(file, JSON.stringify(data))
        if (fs.existsSync(file)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}

function readVals(dataDir, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher
        // const dir = dataDir + type
        const exist = fs.existsSync(dir)
        if (!exist) fs.mkdirSync(dir)
        // console.log(exist)
        // console.log(`directory path: ${dir}`)
        const file = dir + '/' + sourceInfo.name + '_values.txt'
        console.log(`file path: ${file}`)

        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            console.log(typeof (data))
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}

function writeSourceIds(data, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher + '/' + sourceInfo.format + '/sourceList/' + sourceInfo.dirType
        // console.log(`directory path: ${dir}`)
        const exist = fs.existsSync(dir)
        if (!exist) fs.mkdirSync(dir)
        // console.log(exist)
        const file = dir + '/' + 'p_' + sourceInfo.page + '_' + sourceInfo.format + '_' + sourceInfo.name + '_sourceList.txt'
        console.log(`file path: ${file}`)
        const sources = {
            info: sourceInfo,
            sourceList: data
        }
        fs.writeFileSync(file, JSON.stringify(sources))
        if (fs.existsSync(file)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}

function readSourceIds(dataDir, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher + '/' + sourceInfo.format + '/sourceList/' + sourceInfo.dirType
        // const dir = dataDir + type
        const exist = fs.existsSync(dir)
        if (!exist) fs.mkdirSync(dir)
        // console.log(exist)
        // console.log(`directory path: ${dir}`)
        const file = dir + '/' + 'p_' + sourceInfo.page + '_' + sourceInfo.format + '_' + sourceInfo.name + '_sourceList.txt'
        console.log(`file path: ${file}`)

        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            // console.log(typeof (data))
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}

function readIdFile(dataDir, sourceInfo, fileName) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher + '/' + sourceInfo.format + '/sourceList/' + sourceInfo.dirType
      
        const file = dir + '/' + fileName
        console.log(`file path: ${file}`)

        if (fs.existsSync(file)) {
            const data = fs.readFileSync(file, 'utf-8')
            // console.log(typeof (data))
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}

function readDirs(dataDir, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher + '/' + sourceInfo.format + '/sourceList/' + sourceInfo.dirType

        // const file = dir + '/' + 'p_' + sourceInfo.page + '_' + sourceInfo.format + '_' + sourceInfo.name + '_sourceList.txt'
        // console.log(`file path: ${file}`)

        if (fs.existsSync(dir)) {
            const data = fs.readdirSync(dir)
            // const length = data.length
            // console.log(typeof (data))
            return data
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}

function removeSourceList(dataDir, sourceInfo) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher + '/' + sourceInfo.format + '/sourceList/' + sourceInfo.dirType
        const file = dir + '/' + 'p_' + sourceInfo.page + '_' + sourceInfo.format + '_' + sourceInfo.name + '_sourceList.txt'
    
        if (fs.existsSync(file)) {
            const data = fs.unlinkSync(file)
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}

function removeIdFiles(dataDir, sourceInfo, fileName) {

    try {
        const type = sourceInfo.type
        const publisher = sourceInfo.publisher
        const dir = dataDir + type + '/' + publisher + '/' + sourceInfo.format + '/sourceList/' + sourceInfo.dirType
      
        const file = dir + '/' + fileName
        console.log(`file path: ${file}`)

        if (fs.existsSync(file)) {
            const data = fs.unlinkSync(file)
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}