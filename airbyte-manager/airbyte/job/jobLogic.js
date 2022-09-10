const axios = require('axios').default

module.exports = {debugJob, getJob, cancelJob, cancelAllJob}

function getJob(defaultUrl, jobId) {

    const url = defaultUrl + "jobs/get"
    const body = {
        id: jobId
    }
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
}

function debugJob(defaultUrl, jobId){

    const url = defaultUrl + "jobs/get_debug_info"
    const body = {
        id: jobId
    }
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
}

function cancelJob(defaultUrl, jobId){

    const url = defaultUrl + "jobs/cancel"
    const body = {
        id: jobId
    }
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
}

function cancelAllJob(defaultUrl, jobId){

    const url = defaultUrl + "jobs/cancel"
    const body = {
        id: jobId
    }
    const result = axios.post(url, body)
    .then(function (response){
        // const data = response.data
        // console.log(data)
        return true
    }).catch(function (error){
        // console.log(error)
        return false
    })
    return result
}