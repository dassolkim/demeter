const configInfo = require('../../../config/connectConfig')
const validate = require('../validate/validate')
const db = require('./db')

// get datasetId from SODAS+

async function main(){
    const csvSourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.csvConnectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.csvSourceDefinitnionId,
        sourceType: 'file',
        name: "create_test_csv_source"
    }
    const sourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.sourceDefinitionId,
        sourceType: 'db',
        name: 'choiceSource1'
    }
    const destinationInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectDestination,
        workspaceId: configInfo.workspaceId,
        destinationDefinitionId: configInfo.destinationDefinitionId,
        name: 'choiceDestination1'
    }
    const connectionInfo = {
        defaultUrl: configInfo.defaultUrl,
        status: configInfo.status,
        operationId: configInfo.operationId,
        sync: true
    }

    console.log("######### Postgres to Postgres Migration Test with table selection #########")

    // Airybte source create -> get -> discover
    const prepare = await db.prepare(sourceInfo, destinationInfo)
    if(prepare != null){
        // User select drop tables
        const drop = ["covid_data", "_airbyte_raw_covid_data", "table1"]
        const cd = await db.choice(prepare, drop)
        const create = await db.create(destinationInfo, connectionInfo, cd)
        if(create == true){
            console.log(create)
            console.log("db.create succeeded")
        } else{
            console.log("db.create failed")
        }
    }else{
        console.log("db.prepare failed")
    }
    console.log("test db source end")

}

if (require.main == module){
    main()
}