const configInfo = require('../../../config/connectConfig')
const job = require('./jobLogic')

async function testGet() {

    const jobId = 1869 //24
    // const defaultUrl = "114.70.235.40:18000"
    const get_result = await job.getJob(configInfo.defaultUrl, jobId)
    // const attemts = get_result.attemts
    const attempt = get_result.attempts[0].attempt
    const logs = get_result.attempts[0].logs

    // console.log(get_result)

    console.log(attempt)
    console.log(logs['logLines'])

}
// testGet()

async function testDebug() {

    const jobId = 24 //2028
    // const defaultUrl = "114.70.235.40:18000"
    const get_result = await job.debugJob(configInfo.defaultUrl, jobId)
    // const attemts = get_result.attemts
    const attempt = get_result.attempts[0].attempt
    const logs = get_result.attempts[0].logs

    console.log(get_result)

    console.log(attempt)
    console.log(logs)

}
// testDebug()

async function testCancel() {

    const jobId = 24 //2028

    const get_result = await job.cancelJob(configInfo.defaultUrl, jobId)

    console.log(get_result)

}
// testCancel()

async function testAllCancel(start, end) {

    // const jobId =  2090 //24
    let i = start
    while(i <= end){
        const get_result = await job.cancelAllJob(configInfo.defaultUrl, i)
        if (get_result == true) {
            console.log(i)
            i++
        }else{
            // console.log(i)
            i++
        }
    }
}
testAllCancel(1550, 1881)