const sourceLogic = require('../../airbyte/source/sourceLogic')
const destinationLogic = require('../../airbyte/destination/destinationLogic')
const connectionLogic = require('../../airbyte/connection/connectionLogic')

module.exports = { create, createWithSource }

async function create(sourceInfo, destinationInfo, connectionInfo) {
    const source = await sourceLogic.odlLogic(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (source == null) {
        console.log("source/OpenDataLakeLogic failed")
        return false
    }
    // console.log("Start destinationLogic")
    let destination
    if(destinationInfo.exist == true){
        destination = destinationInfo.destinationId
    } else{
        destination = await destinationLogic.createLogic(destinationInfo)
        // console.log("destinationLogic return: ", destination)
        if (destination == null){
            console.log("destination/createLogic failed")
            return false
        }
    }

    const connection = source
    connection.destinationId = destination
    connection.status = connectionInfo.status
    connection.operationIds = [connectionInfo.operationId]
    // connection.config = { syncMode: 'full_refresh', destinationSyncMode: 'overwrite'}
    const sync = connectionInfo.sync
    const url = connectionInfo.defaultUrl
    // console.log("start connection logic (create and sync)")
    const connectionLogicReturn = await connectionLogic.createLogic(url, connection, sync)
    // console.timeEnd("distribution/create api call during time")
    if (connectionLogicReturn == true) {
        console.log("connection/OpenDataLakeLogic succeeded")
        return true
    } else {
        console.log("connection/OpenDataLakeLogic failed")
        return false
    }
}

async function createWithSource(sourceInfo, destinationInfo, connectionInfo) {
    const source = await sourceLogic.odlCreateWithSource(sourceInfo)
    if (source == null) {
        console.log("createWithSource for OpenDataLake is failed")
        return false
    }
    let destination
    if(destinationInfo.exist == true){
        destination = destinationInfo.destinationId
    } else{
        destination = await destinationLogic.createLogic(destinationInfo)
        // console.log("destinationLogic return: ", destination)
        if (destination == null){
            console.log("destination/createLogic failed")
            return false
        }
    }

    const connection = source
    connection.destinationId = destination
    connection.status = connectionInfo.status
    connection.operationIds = [connectionInfo.operationId]
    // connection.config = { syncMode: 'full_refresh', destinationSyncMode: 'overwrite'}
    const sync = connectionInfo.sync
    const url = connectionInfo.defaultUrl
    // console.log("start connection logic (create and sync)")
    const connectionLogicReturn = await connectionLogic.createLogic(url, connection, sync)
    // console.timeEnd("distribution/create api call during time")
    if (connectionLogicReturn == true) {
        console.log("connection/OpenDataLakeLogic succeeded")
        return true
    } else {
        console.log("connection/OpenDataLakeLogic failed")
        return false
    }
}