const sourceLogic = require('../../airbyte/source/sourceLogic')

module.exports = { validateWithDiscover, validateWithoutDiscover, validateWithCheckConnection, validateFinal }

async function validateWithDiscover(sourceInfo) {
    
    const sourceId = await sourceLogic.odlValidatewithDiscover(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (sourceId == null) {
        console.log("source/OpenDataLakeLogic failed")
        return null
    }
    return sourceId
}

async function validateWithoutDiscover(sourceInfo) {
    
    const sourceId = await sourceLogic.odlValidatewithoutDiscover(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (sourceId == null) {
        console.log("source/OpenDataLakeLogic failed")
        return null
    }
    return sourceId
}

async function validateWithCheckConnection(sourceInfo) {
    
    const checkResult = await sourceLogic.odlValidatewithCheckConnection(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (checkResult == null) {
        console.log("source/OpenDataLakeLogic failed")
        return null
    }
    return true
}

async function validateFinal(sourceInfo){

    const sourceId = await sourceLogic.odlValidateFinal(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (sourceId == null) {
        console.log("source/OpenDataLakeLogic failed")
        return null
    }
    return sourceId
}