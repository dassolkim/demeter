const connectionLogic = require('./connectionLogic')
const sourceLogic = require('../source/sourceLogic')
const configInfo = require('../../../config/connectConfig')

const data = {
    sourceId: "614e3799-a0b1-4018-9ab9-44b425b13153",
    destinationId: "f9115d2b-6ec3-428c-a815-40b9b785b680",
    operationIds: [configInfo.operationId],
    status: configInfo.status
}

async function testConnection(){
    try{
        var sourceCatalog = await sourceLogic.discoverSource(data.sourceId)
        var catalog = sourceCatalog.catalog
        data.syncCatalog = catalog
        var connection = await connectionLogic.createConnection(data)
        if (connection != null){
            console.log('this test is complete')
            console.log(connection)
        }
        // console.timeEnd('api call during time')
    } catch (error) {
        console.log('this test occurs an error')
        console.log(error.response)
    }
}

testConnection()

