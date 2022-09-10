const sourceLogic = require('../../airbyte/source/sourceLogic')
const destinationLogic = require('../../airbyte/destination/destinationLogic')

module.exports = {validate, validateSource, validateDestination}

async function validate(sourceInfo){
    
    const delSource = true
    console.log("Start validation")
    // console.time("validate api call during time")
    const sourceValidate = await sourceLogic.validateLogic(sourceInfo, delSource)
    // console.log("source validateLogic return: ", sourceValidate)
    // console.timeEnd("validate api call during time")
    if(sourceValidate.streams == null){
        console.log(`validate returns sourceId: ${sourceValidate}`)
        return false
    } else {
        const count = Object.keys(sourceValidate.streams).length;
        if (count > 0) {
            console.log(sourceValidate)
            console.log(`Number of tables is ${count}`)
            return sourceValidate
        } else {
            console.log(`No tables in this source: ${count}`)
            return false
        }
    }
}

async function validateSource(sourceInfo, delSource){
    
    console.log("Start validationSource")
    // console.time("validateSource api call during time")
    const sourceValidate = await sourceLogic.validateLogic(sourceInfo, delSource)
    // console.log("source validateLogic return: ", sourceValidate)
    // console.timeEnd("validateSource api call during time")
    if(sourceValidate.streams == null){
        console.log(`validate returns sourceId with null streams: ${sourceValidate.sourceId}`)
        return sourceValidate.sourceId
    } else {
        const count = Object.keys(sourceValidate.streams).length;
        if (count > 0) {
            console.log(sourceValidate)
            console.log(`Number of tables is ${count}`)
            return sourceValidate
        } else {
            console.log(`No tables in this source: ${count}`)
            return false
        }
    }
}

async function validateDestination(destinationInfo, delDestination){

    // const delDestination = true
    console.log("Start validateDestination")
    // console.time("validateDestination api call during time")
    const destinationValidate = await destinationLogic.validateLogic(destinationInfo, delDestination)
    // console.log("destinationLogic return: ", destinationValidate)
    // console.timeEnd("validateDestination api call during time")
    if (destinationValidate == true){
        // console.log("validate distribution is successful")
        return true
    } else {
        return destinationValidate
    }
}
