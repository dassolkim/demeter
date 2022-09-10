const sourceLogic = require('./sourceLogic')

async function testSource(delSource){
    try{
        console.time('api call during time')
        const source = await sourceLogic.createSource()
        // console.log(source)
        let sourceId
        let catalog
        if (source != null){
            sourceId = source.sourceId
            console.log("sourceId: ", sourceId)
            const getSourceResult = await sourceLogic.getSource(sourceId)
            console.log(getSourceResult)
            console.log("source lookup is done")
        } else { console.log("get source api does not work")}
        if (getSourceResult != null){
            const discoverResult = await sourceLogic.discoverSchema(sourceId)
            catalog = discoverResult.catalog
            console.log(JSON.stringify(catalog, null, 2))
            console.log("source validation is done")
        } else { console.log("discover_schema does not work")}
        if (discoverResult != null && delSource == true){
            const deleteSourceResult = await sourceLogic.deleteSource(sourceId)
            console.log(deleteSourceResult)
            console.log("source deletion is done")
        } else { console.log("delete source api does not work")}
        console.timeEnd('api call during time')
        if (delSource != true){
            return sourceId
        }
        else {
            return catalog
        }
    } catch (error) {
        console.log(error)
    }
}

testSource(true)