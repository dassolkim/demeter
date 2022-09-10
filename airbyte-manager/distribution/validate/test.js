const configInfo = require('../../config/connectConfig')
const validate = require('./validate')


async function main(){
    
    const sourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.sourceDefinitionId,
        name: "validate_test_db_source"
    }
    const csvSourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.csvConnectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.csvSourceDefinitnionId,
        name: "validate_test_csv_source"
    }
    const destinationInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectDestination,
        workspaceId: configInfo.workspaceId,
        destinationDefinitionId: configInfo.destinationDefinitionId,
        name: "validate_test_destination"
    }

    /**
     * distribution/validate test (CSV source)
     */
    console.log("######### Validate #########")
    const csvSource = await validate.validate(csvSourceInfo)
    if (csvSource != false){
        console.log("CSV file migration is possible, distribution/validate succedeed")
        console.log(csvSource)
    } else {
        console.log("distribution/validate failed")
    }

    /**
     * distribution/validate test (DB source)
     */
    console.log("######### Validate #########")
    const dbSource = await validate.validate(sourceInfo)
    if (dbSource != false){
        console.log("DB migration is possible, distribution/validate succedeed")
        console.log(dbSource)
    } else {
        console.log("distribution/validate failed")
    }
 

    /**
     * source and destination validate logic test
     */
    // console.log("######### Validate Source Using delete option #########")
    // const delSource = false
    // const source = await validate.validateSource(sourceInfo, delSource)
    // if (source != false){
    //     console.log("validateSource succeeded")
    // }
    // else {
    //     console.log("validateSource failed")
    // }

    // console.log("######### Validate Destination Using delete option #########")
    // const delDestination = true
    // const destination = await validate.validateDestination(destinationInfo, delDestination)
    // if (destination == true){
    //     console.log("validateDestination succeeded")
    // }
    // else {
    //     console.log("validateDestination failed")
    // }
}

if (require.main == module){
    main()
}