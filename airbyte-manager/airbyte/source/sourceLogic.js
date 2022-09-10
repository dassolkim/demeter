const axios = require('axios').default

// defined APIs
module.exports = { validateLogic, createLogic, removeLogic, odlLogic, odlValidatewithDiscover,
    odlValidatewithoutDiscover, odlCreateWithSource, odlValidatewithCheckConnection, odlValidateFinal }

function createSource(sourceInfo) {
    const url = sourceInfo.defaultUrl + "sources/create"
    const body = {
        workspaceId: sourceInfo.workspaceId,
        sourceDefinitionId: sourceInfo.sourceDefinitionId,
        connectionConfiguration: sourceInfo.connectionConfiguration,
        name: sourceInfo.name
    }
    const result = axios.post(url, body)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function getSource(defaultUrl, sourceId) {
    const url = defaultUrl + "sources/get"
    const body = {
        sourceId: sourceId
    };
    const result = axios.post(url, body)
        .then(function (response) {
            const data = response.data
            return data

        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function discoverSource(defaultUrl, sourceId) {
    const url = defaultUrl + "sources/discover_schema"
    const body = {
        sourceId: sourceId
    }
    const result = axios.post(url, body)
        .then(function (response) {
            const data = response.data
            return data
        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function checkConnectionSource(defaultUrl, sourceId) {
    const url = defaultUrl + "sources/check_connection"
    const body = {
        sourceId: sourceId
    }
    const result = axios.post(url, body)
        .then(function (response) {
            const data = response.data
            return data
        }).catch(function (error) {
            console.log(error)
        })
    return result
}

function deleteSource(defaultUrl, sourceId) {
    const url = defaultUrl + "sources/delete"
    const body = {
        sourceId: sourceId
    }
    const result = axios.post(url, body)
        .then(function (response) {
            const data = response.data
            console.log("deleteSource result: ", data)
            return true
        }).catch(function (error) {
            console.log(error)
        })
    return result
}

async function validateLogic(sourceInfo, delSource) {
    try {
        const defaultUrl = sourceInfo.defaultUrl
        const source = await createSource(sourceInfo)
        const sourceId = source.sourceId
        let catalog
        if (source != null) {
            console.log("created sourceId: ", sourceId)
            const getSourceResult = await getSource(defaultUrl, sourceId)
            if (getSourceResult.sourceId == sourceId) {
                console.log("getSource succeeded")
                const discoverResult = await discoverSource(defaultUrl, sourceId)
                catalog = discoverResult.catalog
                if (catalog != null) {
                    console.log("discoverSource succeeded")
                } else {
                    console.log("discoverSource failed")
                }
                if (delSource == true) {
                    const deleteSourceResult = await deleteSource(defaultUrl, sourceId)
                    if (deleteSourceResult == true) {
                        console.log("deleteSource succeeded")
                    } else {
                        console.log("deleteSource failed")
                    }
                } else {
                    console.log("do not delete source")
                }
            } else {
                console.log("getSource failed")
            }
        } else {
            console.log("createSource failed")
        }
        if (catalog != null && delSource == true) {
            return catalog
        } else {
            const null_catalog = {
                sourceId: sourceId,
                streams: null
            }
            return null_catalog
        }
    } catch (error) {
        console.log(error)
    }
}

async function createLogic(sourceInfo) {
    try {
        const defaultUrl = sourceInfo.defaultUrl
        const source = await createSource(sourceInfo)
        const sourceId = source.sourceId
        console.log("created sourceId: ", sourceId)
        const getSourceResult = await getSource(defaultUrl, sourceId)
        if (getSourceResult.sourceId == sourceId) {
            console.log("discverSource succeeded")
        } else {
            console.log("discoverSource failed")
            return null
        }
        return sourceId
    } catch (error) {
        console.log(error)
    }
}

async function odlLogic(sourceInfo) {
    try {
        const defaultUrl = sourceInfo.defaultUrl
        const source = await createSource(sourceInfo)
        const sourceId = source.sourceId
        console.log("created sourceId: ", sourceId)
        const getSourceResult = await getSource(defaultUrl, sourceId)
        if (getSourceResult.sourceId == sourceId) {
            const discoverResult = await discoverSource(defaultUrl, sourceId)
            catalog = discoverResult.catalog
            console.log("discverSource succeeded")
        } else {
            console.log("discoverSource failed")
            return null
        }
        const results = {
            sourceId: sourceId,
            syncCatalog: catalog
        }
        return results
    } catch (error) {
        console.log(error)
    }
}

async function odlValidatewithDiscover(sourceInfo) {
    try {
        const defaultUrl = sourceInfo.defaultUrl
        const source = await createSource(sourceInfo)
        const sourceId = source.sourceId
        console.log("created sourceId: ", sourceId)
        const getSourceResult = await getSource(defaultUrl, sourceId)
        if (getSourceResult.sourceId == sourceId) {
            const discoverResult = await discoverSource(defaultUrl, sourceId)
            catalog = discoverResult.catalog
            console.log("discverSource succeeded")
        } else {
            console.log("discoverSource failed")
            return null
        }
        return sourceId
    } catch (error) {
        console.log(error)
    }
}

async function odlValidatewithoutDiscover(sourceInfo) {
    try {
        const defaultUrl = sourceInfo.defaultUrl
        const source = await createSource(sourceInfo)
        const sourceId = source.sourceId
        const getSourceResult = await getSource(defaultUrl, sourceId)
        if (getSourceResult.sourceId == sourceId) {
            console.log("created and validated sourceId: ", sourceId)
            return sourceId
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

async function odlValidateFinal(sourceInfo) {
    try {
        const defaultUrl = sourceInfo.defaultUrl
        const source = await createSource(sourceInfo)
        const sourceId = source.sourceId
        const checkSource = await checkConnectionSource(defaultUrl, sourceId)
        if (checkSource.status == 'succeeded') {
            console.log("created and validated sourceId: ", sourceId)
            return sourceId
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

async function odlValidatewithCheckConnection(sourceInfo) {
    try {
        const defaultUrl = sourceInfo.defaultUrl
        const sourceId = sourceInfo.sourceId
        const check = await checkConnectionSource(defaultUrl, sourceId)
        if (check.status == 'succeeded') {
            console.log("check connection is succeeded: ", sourceId)
            return true
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

async function odlCreateWithSource(sourceInfo) {
    try {
        const defaultUrl = sourceInfo.defaultUrl
        const sourceId = sourceInfo.sourceId
        const getSourceResult = await getSource(defaultUrl, sourceId)
        if (getSourceResult.sourceId == sourceId) {
            const discoverResult = await discoverSource(defaultUrl, sourceId)
            catalog = discoverResult.catalog
            console.log("discverSource succeeded")
        } else {
            console.log("discoverSource failed")
            return null
        }
        const results = {
            sourceId: sourceId,
            syncCatalog: catalog
        }
        return results
    } catch (error) {
        console.log(error)
    }
}

async function removeLogic(defaultUrl, sourceId) {
    try {
        if (sourceId != null) {
            const getSourceResult = await getSource(defaultUrl, sourceId)
            if (getSourceResult.sourceId == sourceId) {
                console.log("removed sourceId: ", sourceId)
                console.log("getSource succeeded")
            }
            const delSourceResult = await deleteSource(defaultUrl, sourceId)
            if (delSourceResult == true) {
                console.log("deleteSource succeeded")
                return true
            } else {
                console.log("deleteSource failed")
            }
        } else {
            console.log("getSource failed")
        }
        return false
    } catch (error) {
        console.log(error)
    }
}