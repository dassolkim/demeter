const configInfo = require('../../../config/connectConfig')
const validate = require('../validate/validate')
const remove = require('./remove')

async function main(){
    const sourceInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectSource,
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.sourceDefinitionId,
        name: "remove_test_source"
    }
    const destinationInfo = {
        defaultUrl: configInfo.defaultUrl,
        connectionConfiguration: configInfo.connectDestination,
        workspaceId: configInfo.workspaceId,
        destinationDefinitionId: configInfo.destinationDefinitionId,
        name: "remove_test_destination"
    }

    /**
     * distribution/remove test
     * remove two lines: delDestination and removeDestination
     */
    const delDestination = false
    const removeDestination = await validate.validateDestination(destinationInfo, delDestination)
    const delSource = false
    const removeSource = await validate.validateSource(sourceInfo, delSource)
    console.log("######### Remove #########")
    const connection = await remove.remove(sourceInfo, removeSource, destinationInfo, removeDestination)
    if (connection == true){
        console.log("distribution/remove succeeded")
    } else {
        console.log("distribution/remove failed")
    }
}

if (require.main == module){
    main()
}