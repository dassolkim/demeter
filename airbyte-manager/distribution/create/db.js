const sourceLogic = require('../../airbyte/source/sourceLogic')
const destinationLogic = require('../../airbyte/destination/destinationLogic')
const connectionLogic = require('../../airbyte/connection/connectionLogic')

module.exports = {prepare, choice, create}

async function prepare(sourceInfo){

    const source = await sourceLogic.createLogic(sourceInfo)
    if (source == null){
        console.log("source/createLogic failed")
        return null
    }
    console.log("prepare returns: ", source)
    console.log("Table list: ", JSON.stringify(source.syncCatalog, null, 2))

    return source
}

async function choice(data, drop){

    const source = data
    const choiceData = source.syncCatalog

    const count = Object.keys(choiceData.streams).length;

    console.log("Number of Tables: ", count)
    console.log("drop table list: ", drop)

    let i = 0
    while(i<count){
        console.log(choiceData.streams[i].stream.name)
        if(drop.includes(choiceData.streams[i].stream.name) == true){
            choiceData.streams[i] = null
            console.log("drop table!")
        }
        i++
    }
    // reassign object
    let j = 0
    let a = 0
    const newData = {
        streams: []
    }
    while(j<count){
        if(choiceData.streams[j] != null){
            newData.streams[a] = choiceData.streams[j]
            a++
        }
        j++
    }
    console.log(newData)
    source.syncCatalog = newData

    return source
}

async function create(destinationInfo, connectionInfo, data){

    console.log("Start destinationLogic in choice.create")
    const destination = await destinationLogic.createLogic(destinationInfo)
    if (destination == null){
        console.log("destination/createLogic failed")
        return false
    }
    data.destinationId = destination

    const connection = data
    connection.status = connectionInfo.status
    connection.operationIds = [connectionInfo.operationId]
    const sync = connectionInfo.sync
    const url = connectionInfo.defaultUrl
    console.log("start connection logic (create and sync)")
    console.log("createConnection Input: ", connection)
    const connectionLogicReturn = await connectionLogic.createLogic(url, connection, sync)
    if (connectionLogicReturn == true){
        console.log("connection/createLogic succeeded")
        return true
    } else {
        console.log("connection/createLogic failed")
        return false
    }
}