const sourceLogic = require('../../airbyte/source/sourceLogic')
const destinationLogic = require('../../airbyte/destination/destinationLogic')

module.exports = { removeSource, remove }


async function removeSource(sourceInfo, sourceId) {

    console.log("Start deleteSource")
    const delSource = await sourceLogic.removeLogic(sourceInfo, sourceId)
    if (delSource == true) {
        console.log("removeSource succeeded")
        return true
    } else {
        console.log("removeSource failed")
        return false
    }
}

async function remove(sourceInfo, sourceId, destinationInfo, destinationId) {

    const delDestination = await removeDestination(destinationInfo, destinationId)
    const delSource = await removeSource(sourceInfo, sourceId)

    if (delSource == true && delDestination == true) {
        console.log("remove succeeded")
        return true
    } else {
        console.log("remove failed")
        return false
    }
}

async function removeDestination(destinationInfo, destinationId) {

    console.log("Start deleteDestination")
    const delDestination = await destinationLogic.removeLogic(destinationInfo, destinationId)
    if (delDestination == true) {
        console.log("removeDestination succeeded")
        return true
    } else {
        console.log("removeDestination failed")
        return false
    }
}
