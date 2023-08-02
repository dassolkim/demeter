const axios = require('axios').default

module.exports = {validateLogic, createLogic, removeLogic}

function createDestination(destinationInfo) {
    const url = destinationInfo.defaultUrl + "destinations/create"
    const body = {
        workspaceId: destinationInfo.workspaceId,
        destinationDefinitionId: destinationInfo.destinationDefinitionId,
        connectionConfiguration: destinationInfo.connectionConfiguration,
        name: destinationInfo.name
    }
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
}

function getDestination(defaultUrl, destinationId){
    const url = defaultUrl + "destinations/get"
    const body = {
        destinationId: destinationId
    };
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
}

function deleteDestination(defaultUrl, destinationId) {
    const url = defaultUrl + "destinations/delete"
    const body = {
        destinationId: destinationId
    }
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        console.log("deleteDestination result: ", data)
        return true
    }).catch(function (error){
        console.log(error)
    })
    return result
}

async function validateLogic(destinationInfo, delDestination) {
    try{
        const defaultUrl = destinationInfo.defaultUrl
        const destination = await createDestination(destinationInfo)
        const destinationId = destination.destinationId
        let check
        console.log("created destinationId: ", destinationId)
        if (destinationId != null){
            const getDestinationResult = await getDestination(defaultUrl, destinationId)
            if (getDestinationResult.destinationId == destinationId){
                check = true
                console.log(getDestinationResult)
                console.log("getDestination succeeded")
                if (delDestination == true){
                    const deleteDestinationResult = await deleteDestination(defaultUrl, destinationId)
                    if (deleteDestinationResult == true){
                        console.log("deleteDestination succeeded")
                    } else {
                        console.log("deleteDestinatoin failed")
                    }
                } else {
                    console.log("do not delete destination")
            }
        } else {
            check = false
            console.log("createDestination failed")
        }
    }
    if (check == true && delDestination == true){
        return true
    } else {
        return destinationId
    }
    } catch (error) {
        console.log(error)
    }
}

async function createLogic(destinationInfo) {
    try{
        const defaultUrl = destinationInfo.defaultUrl
        const destination = await createDestination(destinationInfo)
        const destinationId = destination.destinationId
        if (destinationId != null){
            const getDestinationResult = await getDestination(defaultUrl, destinationId)
            if (getDestinationResult.destinationId == destinationId){
                console.log("created destinationId: ", destinationId)
                console.log("createDestination succeeded")
            }
            return destinationId
        } else {
            console.log("createDestination failed")
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

async function removeLogic(destinationInfo, destinationId) {
    try{
        const defaultUrl = destinationInfo.defaultUrl
        if (destinationId != null){
            const getDestinationResult = await getDestination(defaultUrl, destinationId)
            if (getDestinationResult.destinationId == destinationId){
                console.log("removed destinationId: ", destinationId)
                console.log("getDestination succeeded")
            }
            const delDestinationResult = await deleteDestination(defaultUrl, destinationId)
            if (delDestinationResult == true){
                console.log("deleteDestination succeeded")
                return true
            } else {
                console.log("deleteDestinatoin failed")
            }
        } else {
            console.log("getDestination failed")
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
