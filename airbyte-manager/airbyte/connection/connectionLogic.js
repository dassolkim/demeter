const axios = require('axios').default

module.exports = {createLogic, connectionSync}

function createConnection(defaultUrl, data) {
    const url = defaultUrl + "connections/create"
    const result = axios.post(url, data)
    .then(function (response){
        const data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

function connectionSync(defaultUrl, connectionId) {
    const url = defaultUrl + "connections/sync"
    const data = {
        connectionId: connectionId
    }
    const result = axios.post(url, data)
    .then(function (response){
        const data = response.data
        return data

    }).catch(function (error){
        console.log(error)
        return null
    })
    return result
}

function getConnection(defaultUrl, connectionId) {
    const url = defaultUrl + "connections/get"
    const data = {
        connectionId: connectionId
    }
    const result = axios.post(url, data)
    .then(function (response){
        const data = response.data
        return data

    }).catch(function (error){
        console.log(error)
        return null
    })
    return result
}

function fetchConnection(connectionId){
    const url = configInfo.defaultUrl + "state/get"
    const data = {
        connectionId: connectionId
    }
    const result = axios.post(url, data)
    .then(function (response){
        const data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

async function createLogic(url, data, sync){
    try{
        const defaultUrl = url
        const connection = await createConnection(defaultUrl, data)
        const connectionId = connection.connectionId
        const getConnectionResult = await getConnection(defaultUrl, connectionId)
        if (getConnectionResult.connectionId == connectionId){
            console.log("getConnection succeeded")
        } else {
            console.log("getConnection failed")
        }
        // console.log(connection)
        console.log('createConnection succeeded')
        if (getConnectionResult.connectionId != null && sync == true){
            const syncResult = await connectionSync(defaultUrl, connectionId)
            if (syncResult != null){
                console.log(syncResult)
                console.log('syncConnection succeeded')
                return true
            } else {
                console.log("syncConnection failed")
                return false
            }
        }
    } catch (error) {
        console.log(error.response)
    }   
}
