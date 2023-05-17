const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser')

module.exports = { catalogParser, distributionParser, datasetParser, schemaParser, socrataDatasetParser, odsDatasetParser }


function catalogParser(data) {
    const options = {
        ignoreAttributes: false,
        attributeNamePrefix: "@_"
    }
    const catalogParser = new XMLParser(options);
    const catalog = catalogParser.parse(data);

    return catalog
}

function distributionParser(catalog, format) {

    const data = catalog
    const dist = data['rdf:RDF']['dcat:Distribution'] // US & UK catalog, DKAN (Oklahoma)
    // const dist = data['rdf:RDF']['rdf:Description']  // CA catalog
    
    if (dist) {
        const count = Object.keys(dist).length;
        console.log(`Number of Distribution in Catalog: ${count}`)
        let i = 0
        let j = 0
        let url_list = []
        while (i < count) {
            const exist = dist[i]
            if(exist != undefined){
                if (dist[i]['dct:format'] == format) {
                    if (dist[i]['dcat:accessURL']){
                        url_list[j] = dist[i]['dcat:accessURL']['@_rdf:resource']
                        j++
                    }
                }
                i++
            } else {i++}
            
        }
        return url_list
    } else { return false }
    //console.log(dist)
}

function datasetParser(catalog) {

    //console.log(data)
    const dataset = catalog['rdf:RDF']['dcat:Catalog']['dcat:dataset'] // US & UK catalog, DKAN (Oklahoma)
    
    // const dataset = catalog['rdf:RDF']['rdf:Description'][0]['dcat:dataset']  // CA catalog
    // const dataset = catalog['rdf:RDF']['dcat:Catalog']['dcat:dataset']['dcat:Dataset']['dcat:distribution']
    // console.log(dataset)
    
    const count = dataset.length
    console.log(`Number of Datasets in Catalog: ${count}`)

    return dataset
}

function schemaParser(catalog) {
    const schema = catalog['rdf:RDF']['hydra:PagedCollection']

    const fp = schema['hydra:firstPage']
    const lp = schema['hydra:lastPage']
    const np = schema['hydra:nextPage']
    const ti = schema['hydra:totalItems']['#text']

    const results = {
        firstPage: fp,
        lastPage: lp,
        nextPage: np,
        totalItem: ti
    }

    return results
}

function socrataDatasetParser(catalog) {

    const dataset = catalog.dataset
    const dataset_count = dataset.length
    // console.log(dataset_count)
    let dist_list = []
 
    for (let nd = 0; nd < dataset_count; nd++) {
        dist_list[nd] = dataset[nd]['distribution']
    }

    return dist_list
}

function odsDatasetParser(catalog, format) {
    const data = catalog
    const dist = data['rdf:RDF']['rdf:Description']
    // const dataset_count = dataset.length
    // console.log(dataset)
    if (dist) {
        const count = Object.keys(dist).length;
        console.log(`Number of Distribution in Catalog: ${count}`)
        let i = 0
        let j = 0
        let url_list = []
        while (i < count) {
            const exist = dist[i]
            if(exist != undefined){
                if (dist[i]['dct:format'] == format) {
                    if (dist[i]['dcat:accessURL']){
                        url_list[j] = dist[i]['dcat:accessURL']['@_rdf:resource']
                        j++
                    }
                }
                i++
            } else {i++}
        }
        return url_list
    } else { return false }

}