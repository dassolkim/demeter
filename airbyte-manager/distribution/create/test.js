const configInfo = require('../../../config/connectConfig')
const validate = require('../validate/validate')
const create = require('./create')

// get datasetId from SODAS+
// const datasetId = uuidv1()
// console.log("datasetId: ", datasetId)

async function main(){
    const csvSourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.csvConnectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.csvSourceDefinitnionId,
        name: "csvSource_test"
    }
    const dbSourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.sourceDefinitionId,
        name: 'dbSource_test1'
    }
    const destinationInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectDestination,
        workspaceId: configInfo.workspaceId,
        destinationDefinitionId: configInfo.destinationDefinitionId,
        name: "createTest_destination"
    }
    const connectionInfo = {
        defaultUrl: configInfo.defaultUrl,
        status: configInfo.status,
        operationId: configInfo.operationId,
        sync: true
    }

    /**
     * dstribution/create test
     */
    const dbType = 'db'
    if(dbType == 'file'){
        let catalog = await validate.validate(csvSourceInfo)
        console.log("######### CSV File to Postgres Migration Test #########")
        console.log(`Validate results: ${catalog}`)
        const connection = await create.create(csvSourceInfo, destinationInfo, connectionInfo, catalog)
        if (connection == true){
            console.log("distribution/create succeeded")
        } else {
            console.log("distribution/create failed")
        }
    } else {
        let catalog = await validate.validate(dbSourceInfo)
        const drop = ["covid_data"]
        const choiceData = await create.choice(catalog, drop)
        console.log("######### Postgres to Postgres Migration Test with table selection #########")
        console.log(`Validate results: ${choiceData}`)
        const connection = await create.create(dbSourceInfo, destinationInfo, connectionInfo, choiceData)
        if (connection == true){
            console.log("distribution/create succeeded")
        } else {
            console.log("distribution/create failed")
        }
    }
    /**
     * dstribution/create db source test
     */
}
if (require.main == module){
    main()
}