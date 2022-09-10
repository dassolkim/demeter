const destinationLogic = require('./destinationLogic')

async function testDestination(delDestination) {
    try{
        console.time('api call during time')
        const destination = await destinationLogic.createDestination()
        if (destination != null){
            const destinationId = destination.destinationId
            console.log("destinationId: ", destinationId)
            const getDestinationResult = await destinationLogic.getDestination(destinationId)
            console.log(getDestinationResult)
            console.log("destination lookup is done")
        } else { console.log("get destination api does not work")}
        if (getDestinationResult != null && delDestination == true){
            var deleteDestinationResult = await destinationLogic.deleteDestination(destinationId)
            console.log(deleteDestinationResult)
            console.log("destination deletion is done")
        } else { console.log("delete destination api does not work")}
        console.timeEnd('api call during time')
        if (delDestination != true) {
            return destinationId
        }
        else {
            return getDestinationResult
        }
    } catch (error) {
        console.log(error)
    }
}
// var delDestination = true
testDestination(true)

