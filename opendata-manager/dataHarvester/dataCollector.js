const axios = require('axios').default

// shared api
module.exports = { getCatalog, getNextCatalog, getDataset, getSocrata, getOpenDataSoft, getDKANJson }

function getCatalog(sourceInfo) {
  
    const url = sourceInfo.defaultUrl + "catalog.rdf"

    const result = axios.post(url)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function getDataset(sourceInfo) {

    const url = sourceInfo.defaultUrl + ".rdf"
   
    const result = axios.post(url)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function getNextCatalog(sourceInfo, page) {
    
    const url = sourceInfo.defaultUrl + "catalog.rdf?page=" + page
    

    const result = axios.get(url) // when 405 error occurs, change post to get
        .then(function (response) {
            const data = response.data
            // console.log(data)
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function getSocrata(sourceInfo) {
  
    const url = sourceInfo.defaultUrl + "data.json"

    const result = axios.get(url)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function getDKANJson(sourceInfo) {
  
    const url = sourceInfo.defaultUrl + "data.json"

    const result = axios.get(url)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function getOpenDataSoft(sourceInfo) {
  
    const url = sourceInfo.defaultUrl + "/api/v2/catalog/exports/rdf"

    const result = axios.get(url)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}